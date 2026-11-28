#!/bin/sh
# SavComponents — publishes every released version (v/<version>/) as a GitHub release: the tag v<version>, a zip of the library
# (sav.css, sav.js, LICENSE, NOTICE, README.md) and the notes of that version from CHANGELOG.md. A version that already has a release is
# skipped, so it can run again and again. The tag and the zip use the last commit that changed v/<version>/: the files as the
# site serves them (some early versions were fixed after their first commit), not the newest commit of the repository.
#   sh tools/github-release.sh            run by .github/workflows/release.yml after every push to main that touches v/
#   DRY_RUN=1 sh tools/github-release.sh  shows what it would publish and builds the zips, without publishing anything
# Needs git (with the whole history), gh (logged in, or GH_TOKEN) and zip.
set -e
cd "$(dirname "$0")/.."
SITE='https://savcomponents.com'
OUT="${RUNNER_TEMP:-${TMPDIR:-/tmp}}/savcomponents-release"
rm -rf "$OUT" && mkdir -p "$OUT"
VERSIONS=$(ls v | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -t. -k1,1n -k2,2n -k3,3n)
NEWEST=$(echo "$VERSIONS" | tail -1)

# oldest first, so the newest release is also the last one created
for VERSION in $VERSIONS; do
  TAG="v$VERSION"
  [ -f "v/$VERSION/sav.js" ] && [ -f "v/$VERSION/sav.css" ] || { echo "skip $VERSION: v/$VERSION has no sav.js and sav.css"; continue; }
  if gh release view "$TAG" >/dev/null 2>&1; then echo "skip $VERSION: already released"; continue; fi
  COMMIT=$(git log --format=%H -1 -- "v/$VERSION")
  [ -n "$COMMIT" ] || { echo "skip $VERSION: v/$VERSION is not committed yet"; continue; }

  # the zip: the two files of the library as the site serves them, with the licence, the notices and the readme
  DIR="$OUT/savcomponents-$VERSION"
  mkdir -p "$DIR"
  git show "$COMMIT:v/$VERSION/sav.css" > "$DIR/sav.css"
  git show "$COMMIT:v/$VERSION/sav.js" > "$DIR/sav.js"
  cp LICENSE NOTICE README.md "$DIR/"
  ZIP="$OUT/savcomponents-$VERSION.zip"
  (cd "$OUT" && zip -qr "savcomponents-$VERSION.zip" "savcomponents-$VERSION")

  # the Subresource Integrity hashes of this release (v/<version>/integrity.json), so the snippet can pin the exact bytes;
  # a release frozen before integrity.json existed has none, and the snippet is then shown without integrity
  CSS_INT=''; JS_INT=''
  SRI=$(git show "$COMMIT:v/$VERSION/integrity.json" 2>/dev/null || true)
  CSS_SRI=$(printf '%s' "$SRI" | sed -n 's/.*"sav.css": *"\([^"]*\)".*/\1/p')
  JS_SRI=$(printf '%s' "$SRI" | sed -n 's/.*"sav.js": *"\([^"]*\)".*/\1/p')
  [ -n "$CSS_SRI" ] && CSS_INT=" integrity=\"$CSS_SRI\" crossorigin=\"anonymous\""
  [ -n "$JS_SRI" ] && JS_INT=" integrity=\"$JS_SRI\" crossorigin=\"anonymous\""

  # the notes: the section "## <version> — <date>" of CHANGELOG.md, then how to use it
  NOTES="$OUT/notes-$VERSION.md"
  awk -v v="$VERSION" '/^## / { if (on) exit; on = (index($0, "## " v " ") == 1); next } on' CHANGELOG.md > "$NOTES"
  [ -s "$NOTES" ] || echo "See CHANGELOG.md." > "$NOTES"
  cat >> "$NOTES" <<EOF

### Use it

From the site (this address never changes):

\`\`\`html
<link rel="stylesheet" href="$SITE/v/$VERSION/sav.css"$CSS_INT>
<script src="$SITE/v/$VERSION/sav.js" defer$JS_INT></script>
\`\`\`

Or host the two files of \`savcomponents-$VERSION.zip\` yourself. Icons, flags and maps still come from savcomponents.com,
unless the script tag sets \`data-icon-base\`.
EOF

  if [ "$VERSION" = "$NEWEST" ]; then LATEST='--latest'; else LATEST='--latest=false'; fi
  if [ -n "$DRY_RUN" ]; then
    echo "would release $TAG at $(git log --format='%h %s' -1 "$COMMIT") $LATEST: $ZIP ($(wc -c < "$ZIP" | tr -d ' ') bytes), notes $NOTES"
  else
    gh release create "$TAG" "$ZIP" --target "$COMMIT" --title "SavComponents $VERSION" --notes-file "$NOTES" $LATEST
    echo "released $TAG"
  fi
done
