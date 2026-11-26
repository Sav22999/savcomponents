<?php
/**
 * SavComponents — serves a released file of the library (/v/<version>/sav.js or sav.css, rewritten here by .htaccess)
 * and counts how many sites use it, without keeping who they are:
 *  - only the site of the page is read (the Referer header the browser sends: for another site, just its origin);
 *  - it is kept as a salted hash (the salt never leaves the server), once a day per site, with the version;
 *  - no IP address, no cookie, nothing about the visitor; local addresses and savcomponents.com itself are not counted.
 * Counting can never stop the file: if it fails, the file is served all the same.
 *
 * usage.php?report gives the totals as JSON (sites per month and per version, sites per day): numbers only.
 * The data lives in cache/usage/ (git-ignored, never served).
 */

declare(strict_types=1);

const OWN_HOSTS = ['savcomponents.com', 'www.savcomponents.com'];
const KEEP_MONTHS = 24;

$dir = __DIR__ . '/cache/usage';

if (isset($_GET['report'])) {
    report($dir);
    exit;
}

$v = (string)($_GET['v'] ?? '');
$f = (string)($_GET['f'] ?? 'sav.js');
if (!preg_match('/^\d+\.\d+\.\d+$/', $v) || !in_array($f, ['sav.js', 'sav.css'], true) || !is_file(__DIR__ . "/v/$v/$f")) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo "Not found\n";
    exit;
}
$file = __DIR__ . "/v/$v/$f";

try {
    count_site($dir, $v);
} catch (Throwable $e) { /* counting never stops the library */
}

// the same answer as the static file: a released version never changes, so it is cached for a year
$size = filesize($file);
$mtime = filemtime($file);
$etag = '"' . md5("$v/$f/$mtime/$size") . '"';
header('Content-Type: ' . ($f === 'sav.js' ? 'application/javascript' : 'text/css') . '; charset=utf-8');
header('Cache-Control: public, max-age=31536000, immutable');
header('Access-Control-Allow-Origin: *');
header('X-Content-Type-Options: nosniff');
header('ETag: ' . $etag);
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $mtime) . ' GMT');
if (trim((string)($_SERVER['HTTP_IF_NONE_MATCH'] ?? '')) === $etag) {
    http_response_code(304);
    exit;
}
header('Content-Length: ' . $size);
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') readfile($file);
exit;

/** The site of the page that loads the library: the host of the Referer (or Origin), or '' when it does not count. */
function site_host(): string
{
    $src = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
    if ($src === '' || $src === 'null') $src = (string)($_SERVER['HTTP_REFERER'] ?? '');
    $host = strtolower(trim((string)parse_url($src, PHP_URL_HOST), '.'));
    if ($host === '' || in_array($host, OWN_HOSTS, true)) return '';
    // local and private: development machines, not projects
    if ($host === 'localhost' || filter_var($host, FILTER_VALIDATE_IP) || filter_var(trim($host, '[]'), FILTER_VALIDATE_IP)) return '';
    if (preg_match('/\.(localhost|local|test|internal|lan|home|example|invalid)$/', $host)) return '';
    if (!preg_match('/^[a-z0-9.-]+\.[a-z0-9-]{2,}$/', $host)) return '';
    // www.example.com and example.com are one site
    return preg_replace('/^www\./', '', $host);
}

function count_site(string $dir, string $version): void
{
    $host = site_host();
    if ($host === '') return;
    if (!is_dir($dir) && !@mkdir($dir, 0750, true) && !is_dir($dir)) return;
    $saltFile = "$dir/salt";
    if (!is_file($saltFile)) @file_put_contents($saltFile, bin2hex(random_bytes(32)), LOCK_EX);
    $salt = (string)@file_get_contents($saltFile);
    if (strlen($salt) < 32) return;
    $id = substr(hash_hmac('sha256', $host, $salt), 0, 20);

    $day = gmdate('Y-m-d');
    $fh = @fopen("$dir/" . substr($day, 0, 7) . '.log', 'c+');
    if (!$fh) return;
    if (flock($fh, LOCK_EX)) {
        // one line per site, day and version: "2026-11-22 <hash> 1.0.0"
        $line = "$day $id $version";
        $seen = false;
        while (($l = fgets($fh)) !== false) {
            if (rtrim($l) === $line) {
                $seen = true;
                break;
            }
        }
        if (!$seen) {
            fseek($fh, 0, SEEK_END);
            fwrite($fh, $line . "\n");
        }
        flock($fh, LOCK_UN);
    }
    fclose($fh);
    // months older than KEEP_MONTHS go away
    if (random_int(1, 200) === 1) {
        foreach (glob("$dir/*.log") ?: [] as $old) {
            if (basename($old, '.log') < gmdate('Y-m', strtotime('-' . KEEP_MONTHS . ' months'))) @unlink($old);
        }
    }
}

/** Totals only: how many different sites per month (and per version), and per day in the last 60 days. */
function report(string $dir): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: private, max-age=300');
    $months = [];
    $days = [];
    $since = gmdate('Y-m-d', strtotime('-60 days'));
    foreach (glob("$dir/*.log") ?: [] as $file) {
        $month = basename($file, '.log');
        $sites = [];
        $byVersion = [];
        foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $l) {
            [$day, $id, $v] = array_pad(explode(' ', $l, 3), 3, '');
            $sites[$id] = true;
            $byVersion[$v][$id] = true;
            if ($day >= $since) $days[$day][$id] = true;
        }
        $months[$month] = ['sites' => count($sites), 'versions' => array_map('count', $byVersion)];
    }
    ksort($months);
    ksort($days);
    echo json_encode([
        'ok' => true,
        'note' => 'Different sites that loaded the library from savcomponents.com (copies hosted elsewhere are not counted).',
        'months' => $months,
        'days' => array_map('count', $days),
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
}
