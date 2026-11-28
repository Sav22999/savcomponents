#!/bin/sh
# SavComponents — releases the library by itself when dist/sav.js carries a version newer than every v/<version>/ folder:
# what tools/release.sh does on a computer (v/<version>/, the version menu, llms.txt, sitemap.xml), then a commit of it on main.
# Run by .github/workflows/release.yml after every push to main; tools/github-release.sh then makes the tag and the GitHub release.
#   sh tools/auto-release.sh            releases and pushes (in the workflow)
#   DRY_RUN=1 sh tools/auto-release.sh  says what it would do, changes nothing
# A version is released only once: when v/<version>/ already exists (released by hand with tools/release.sh) it does nothing.
# Before it releases, CHANGELOG.md needs the section "## <version> — <date>" and both files their header with the version.
set -e
cd "$(dirname "$0")/.."
VERSION=$(sed -n "s/.*version: '\([0-9][0-9.]*\)'.*/\1/p" dist/sav.js | head -1)
[ -n "$VERSION" ] || { echo "::error::version not found in dist/sav.js"; exit 1; }
NEWEST=$(ls v | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -t. -k1,1n -k2,2n -k3,3n | tail -1)
if [ -d "v/$VERSION" ]; then echo "v/$VERSION already exists: nothing to release"; exit 0; fi
HIGHER=$(printf '%s\n%s\n' "$NEWEST" "$VERSION" | sort -t. -k1,1n -k2,2n -k3,3n | tail -1)
if [ "$HIGHER" != "$VERSION" ]; then echo "dist/sav.js says $VERSION, older than $NEWEST: nothing to release"; exit 0; fi

# what a release needs, said plainly in the run (and the push stays as it is: nothing half released)
MISSING=''
grep -q "^## $VERSION " CHANGELOG.md || MISSING="$MISSING CHANGELOG.md has no section '## $VERSION — date'."
head -3 dist/sav.js | grep -q "v$VERSION" || MISSING="$MISSING The header of dist/sav.js does not say v$VERSION."
head -3 dist/sav.css | grep -q "v$VERSION" || MISSING="$MISSING The header of dist/sav.css does not say v$VERSION."
if [ -n "$MISSING" ]; then echo "::error::Version $VERSION not released:$MISSING Fix it and push again."; exit 1; fi

if [ -n "$DRY_RUN" ]; then echo "would release $VERSION (newest so far: $NEWEST)"; exit 0; fi
sh tools/release.sh
git add "v/$VERSION" index.html llms.txt llms-full.txt sitemap.xml
git -c user.name='github-actions[bot]' -c user.email='41898282+github-actions[bot]@users.noreply.github.com' commit -q -m "$VERSION"
git pull -q --rebase origin main   # a push that came in meanwhile: the release goes on top of it
git push origin HEAD:main
echo "released $VERSION"
