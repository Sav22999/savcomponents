#!/bin/sh
# Renders tools/og-banner.html to docs/og.png (1200×630) with headless Chrome.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --window-size=1200,630 --virtual-time-budget=3000 --screenshot="$PWD/docs/og.png" "file://$PWD/tools/og-banner.html"
echo "docs/og.png updated"
