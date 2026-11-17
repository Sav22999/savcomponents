<?php
/**
 * SavComponents — the CSS of a saved theme, for any site: https://savcomponents.com/theme/<id>.css
 * (.htaccess rewrites it here). Themes live in the accounts database on saveriomorelli.com: this file asks the API
 * and keeps a copy for 5 minutes, so external sites only ever talk to savcomponents.com.
 */

declare(strict_types=1);

const API = 'https://www.saveriomorelli.com/projects/savcomponents/api/?r=theme.css&id=';
const TTL = 300;

header('Content-Type: text/css; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');

$id = (string)($_GET['id'] ?? '');
if (!preg_match('/^[a-f0-9]{16}$/', $id)) {
    http_response_code(404);
    echo "/* SavComponents: unknown theme */\n";
    exit;
}

$api = getenv('SAVCOMPONENTS_API') ?: API; // local tests point it elsewhere
$dir = __DIR__ . '/cache';
$file = "$dir/theme-$id.css";
if (is_file($file) && filemtime($file) > time() - TTL) {
    header('Cache-Control: public, max-age=' . TTL);
    readfile($file);
    exit;
}

$css = false;
$status = 0;
if (function_exists('curl_init')) {
    $ch = curl_init($api . $id);
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8, CURLOPT_CONNECTTIMEOUT => 4, CURLOPT_USERAGENT => 'savcomponents.com theme proxy']);
    $css = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
} else {
    $css = @file_get_contents($api . $id, false, stream_context_create(['http' => ['timeout' => 8, 'ignore_errors' => true]]));
    $headers = function_exists('http_get_last_response_headers') ? (http_get_last_response_headers() ?? []) : ($http_response_header ?? []);
    $status = isset($headers[0]) && preg_match('/\s(\d{3})\s/', $headers[0], $m) ? (int)$m[1] : 0;
}

if ($status === 200 && is_string($css)) {
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    @file_put_contents($file, $css, LOCK_EX);
    header('Cache-Control: public, max-age=' . TTL);
    echo $css;
} elseif ($status === 404) {
    @unlink($file);
    http_response_code(404);
    header('Cache-Control: no-store');
    echo "/* SavComponents: this theme does not exist (any more) */\n";
} elseif (is_file($file)) {
    // the API did not answer: an older copy is better than nothing
    header('Cache-Control: public, max-age=60');
    readfile($file);
} else {
    http_response_code(503);
    header('Cache-Control: no-store');
    echo "/* SavComponents: the theme is not available right now */\n";
}
