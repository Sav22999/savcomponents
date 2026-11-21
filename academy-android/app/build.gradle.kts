import java.util.Properties

plugins {
    id("com.android.application")
}

// Signing data for the release build: keystore.properties (git-ignored, see keystore.properties.sample)
val keystoreProps = Properties().apply {
    val f = rootProject.file("keystore.properties")
    if (f.exists()) f.inputStream().use { load(it) }
}

// SavComponents Academy on Google Play: a Trusted Web Activity, i.e. the web app (https://savcomponents.com/academy/)
// full screen in the browser the user already has, with its sign-in and its offline copy. No WebView, no native code.
val host = "savcomponents.com"
val launchUrl = "https://$host/academy/"

android {
    namespace = "com.savcomponents.academy"
    compileSdk = 36

    defaultConfig {
        // The applicationId is the identity of the app on Google Play: it can never change after the first upload
        applicationId = "com.savcomponents.academy"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"

        manifestPlaceholders["hostName"] = host
        manifestPlaceholders["launchUrl"] = launchUrl
        // the same blue as the theme colour of the web app manifest
        manifestPlaceholders["themeColor"] = "#66CBFF"
        manifestPlaceholders["navigationColor"] = "#0F1320"
        manifestPlaceholders["backgroundColor"] = "#0F1320"
    }

    signingConfigs {
        if (keystoreProps.getProperty("storeFile") != null) {
            create("release") {
                storeFile = file(keystoreProps.getProperty("storeFile"))
                storePassword = keystoreProps.getProperty("storePassword")
                keyAlias = keystoreProps.getProperty("keyAlias")
                keyPassword = keystoreProps.getProperty("keyPassword")
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfigs.findByName("release")?.let { signingConfig = it }
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    // Google's helper for Trusted Web Activities: the launcher activity, the splash screen, the fallback to a Custom Tab
    implementation("com.google.androidbrowserhelper:androidbrowserhelper:2.5.0")
}
