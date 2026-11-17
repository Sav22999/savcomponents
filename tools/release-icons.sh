#!/bin/sh
# SavComponents — publishes a new version of the icon set, shared by every library version: icons/<version>/
#   sh tools/release-icons.sh 1.1.0 path/to/folder-with-new-or-changed-svgs
# The new set starts as a copy of the newest one, then the given SVG files are added or replaced.
# Afterwards: add the new names (and search words) to icons/<version>/index.json, set Sav.iconsVersion in
# dist/sav.js and release the library. Published sets never change, so older library versions keep their icons.
set -e
cd "$(dirname "$0")/.."
NEW="$1"; SRC="$2"
[ -n "$NEW" ] || { echo "usage: sh tools/release-icons.sh <new-version> [folder-with-svgs]"; exit 1; }
[ -d "icons/$NEW" ] && { echo "icons/$NEW already exists: a published icon set must not change."; exit 1; }
LAST=$(ls icons | sort -t. -k1,1n -k2,2n -k3,3n | tail -1)
cp -R "icons/$LAST" "icons/$NEW"
if [ -n "$SRC" ]; then cp "$SRC"/*.svg "icons/$NEW/"; fi
echo "created icons/$NEW from icons/$LAST — now update icons/$NEW/index.json and Sav.iconsVersion"
