<?php
// Used only by kit.html in local builds: an invisible image that arrives after ?ms= milliseconds, so the page's load event
// (and the screenshot that headless Chrome takes then) waits for the app to finish (for example the checks of a challenge).
usleep(max(0, min(15000, (int)($_GET['ms'] ?? 0))) * 1000);
header('Content-Type: image/gif');
header('Cache-Control: no-store');
echo base64_decode('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
