# SavComponents Academy — Android (Google Play)

The Android app is a **Trusted Web Activity**: it opens https://savcomponents.com/academy/ full screen in the browser the user
already has (Chrome or another browser that supports it), with the same sign-in, the same progress and the offline copy of the
web app. There is no WebView and no native code to maintain: every update of the web app is in the Android app at once.

This folder is in the website repository but is never served (`.htaccess` answers 404 for `/academy-android/`).

## Build

1. Open this folder in Android Studio (it creates the Gradle wrapper on the first sync).
2. Create the upload key: *Build › Generate Signed App Bundle / APK › Create new…*. Copy `keystore.properties.sample` to
   `keystore.properties` and fill it in. Both the `.jks` file and `keystore.properties` are git-ignored: keep them safe,
   without them the app cannot be updated.
3. *Build › Generate Signed App Bundle* (release) gives `app/release/app-release.aab`, the file to upload to Google Play.
4. Raise `versionCode` (and `versionName`) in `app/build.gradle.kts` for every new upload. The `applicationId`
   (`com.savcomponents.academy`) can never change after the first upload.

## Digital Asset Links (no address bar)

The app and the site must vouch for each other, otherwise the browser shows its address bar over the Academy:

- the app: `asset_statements` in `app/src/main/res/values/strings.xml` (already there);
- the site: `https://savcomponents.com/.well-known/assetlinks.json`, made from `assetlinks.sample.json` with the
  **SHA-256 fingerprint of the app signing key**. With Play App Signing it is in Play Console › *Test and release ›
  App integrity › App signing key certificate* (not the upload key). Add the upload key's fingerprint too to test a
  locally signed build.

## Icons

`python3 tools/build-academy-icons.py` (from the repository root, needs Pillow) draws every icon again: the web ones
(`academy/icons/`), the launcher icons (`app/src/main/res/mipmap-*`) and the store icon (`store/play-store-icon-512.png`).

## Store listing

`store/listing.md`: texts for the Google Play page. `store/en-GB/`: the eight phone screenshots (1080×1920) and the feature graphic
(1024×500), made from the real app by `sh tools/build-academy-store.sh` (it opens `store/kit.html` in headless Chrome, with a sample
learner; `store/wait.php` only holds the screenshot back until the app has finished, in that local build).
