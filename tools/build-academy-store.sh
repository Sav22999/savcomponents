#!/bin/sh
# SavComponents Academy — the Google Play graphics: 8 phone screenshots (1080×1920) and the feature graphic (1024×500),
# taken from the real app by academy-android/store/kit.html in headless Chrome.
# It starts its own local server (PHP, several workers, port 8093) and needs Google Chrome.
# Usage: sh tools/build-academy-store.sh
set -e
ROOT=$(cd "$(dirname "$0")/.." && pwd)
OUT="$ROOT/academy-android/store/en-GB"
CHROME=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}
PORT=${PORT:-8093}
BASE="http://localhost:$PORT/academy-android/store/kit.html"
PROFILE=$(mktemp -d)
mkdir -p "$OUT"
# several workers: kit.html holds its load event back with a slow image (wait.php) while the app keeps loading
PHP_CLI_SERVER_WORKERS=6 php -S "localhost:$PORT" -t "$ROOT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null; rm -rf "$PROFILE"' EXIT
sleep 1
shoot() { # name size query: the screenshot is taken when the page has loaded, i.e. after wait.php (real time)
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run --user-data-dir="$PROFILE" --force-device-scale-factor=1 \
    --window-size="$2" --screenshot="$OUT/$1.png" "$BASE?$3" >/dev/null 2>&1
  echo "$OUT/$1.png"
}
shoot phone-1-home 1080,1920 "shot=1&wait=3500"
shoot phone-2-path 1080,1920 "shot=2&wait=3500"
shoot phone-3-try-it 1080,1920 "shot=3&wait=4000"
shoot phone-4-quiz 1080,1920 "shot=4&wait=4500"
shoot phone-5-challenge 1080,1920 "shot=5&wait=7000"
shoot phone-6-collection 1080,1920 "shot=6&wait=3500"
shoot phone-7-daily 1080,1920 "shot=7&wait=3500"
shoot phone-8-dark 1080,1920 "shot=8&wait=3500"
shoot feature-graphic-1024x500 1024,500 "shot=feature&wait=4000"
