#!/bin/sh
# SavComponents — freezes the current library (dist/sav.css, dist/sav.js) as a version that never changes: v/<version>/
#   sh tools/release.sh            uses the version written in dist/sav.js (Sav.version)
# Sites link to https://savcomponents.com/v/<version>/sav.js: a new release never breaks them.
# It also refreshes the copy of sav.css that the accounts API (saveriomorelli.com) uses to build theme CSS.
set -e
cd "$(dirname "$0")/.."
VERSION=$(sed -n "s/.*version: '\([0-9][0-9.]*\)'.*/\1/p" dist/sav.js | head -1)
[ -n "$VERSION" ] || { echo "version not found in dist/sav.js"; exit 1; }
DEST="v/$VERSION"
if [ -d "$DEST" ] && [ "$1" != "--force" ]; then
  echo "$DEST already exists: a published version must not change. Bump Sav.version (or pass --force before publishing)."
  exit 1
fi
rm -rf "$DEST"
mkdir -p "$DEST"
cp dist/sav.css dist/sav.js "$DEST/"
echo "released $DEST"
# icons are not copied: every version uses the shared set icons/<Sav.iconsVersion>/ (see tools/release-icons.sh)
ICONS=$(sed -n "s/.*Sav.iconsVersion = '\([0-9][0-9.]*\)'.*/\1/p" dist/sav.js | head -1)
[ -d "icons/$ICONS" ] || echo "warning: icons/$ICONS does not exist (Sav.iconsVersion in dist/sav.js)"
for KIND in flags maps; do
  V=$(sed -n "s/.*Sav.${KIND}Version = '\([0-9][0-9.]*\)'.*/\1/p" dist/sav.js | head -1)
  [ -d "$KIND/$V" ] || echo "warning: $KIND/$V does not exist (Sav.${KIND}Version in dist/sav.js)"
done


API_DIR="${SAVCOMPONENTS_API_DIR:-$HOME/Documents/Projects/SaverioMorelli/projects/savcomponents}"
if [ -d "$API_DIR/lib" ]; then
  cp dist/sav.css "$API_DIR/lib/sav.css"
  echo "updated $API_DIR/lib/sav.css (upload it with the API)"
else
  echo "API folder not found ($API_DIR): copy dist/sav.css to projects/savcomponents/lib/sav.css on saveriomorelli.com"
fi
