#!/bin/bash

# Fox Trade IPA Builder (No-Xcode UI Version)
# This script builds the IPA using command line tools only.

PROJECT_DIR="/Volumes/MAK/IOS/daily-trade-tracker"
APP_NAME="FoxTrade"

echo "🚀 Starting Build Process for $APP_NAME..."

cd "$PROJECT_DIR"

# 1. Build Web Assets
echo "📦 Building Web Assets..."
npm run build

# 2. Sync with Capacitor
echo "🔄 Syncing with Capacitor iOS..."
npx cap sync ios

# 3. Clean previous builds
echo "🧹 Cleaning old builds..."
rm -rf build
rm -rf Payload
rm -f "$APP_NAME.ipa"

# 4. Build the native project using xcodebuild (CLI)
echo "🏗️ Building Native iOS App (this may take a minute)..."
xcodebuild -workspace ios/App/App.xcworkspace \
           -scheme App \
           -sdk iphoneos \
           -configuration Release \
           -derivedDataPath build \
           CODE_SIGNING_ALLOWED=NO \
           CODE_SIGNING_REQUIRED=NO \
           AD_HOC_CODE_SIGNING_ALLOWED=YES \
           | grep -E "build/Build/Products/Release-iphoneos/App.app|Succeeded"

# Verify if App.app exists
if [ ! -d "build/Build/Products/Release-iphoneos/App.app" ]; then
    echo "❌ Error: App.app was not found. Build failed."
    exit 1
fi

# 5. Package into IPA using the Payload trick
echo "🎁 Packaging into IPA..."
mkdir -p Payload
cp -r build/Build/Products/Release-iphoneos/App.app Payload/
# Ensure Info.plist exists inside
if [ ! -f "Payload/App.app/Info.plist" ]; then
    echo "❌ Error: Info.plist missing inside App.app. Sideloadly will fail."
    exit 1
fi

# Remove any existing .DS_Store files which cause issues in sideloading
find Payload -name ".DS_Store" -delete

# Create the zip without Mac-specific metadata (-X)
zip -rX "$APP_NAME.ipa" Payload > /dev/null

# 6. Cleanup
rm -rf Payload
rm -rf build

echo "✅ SUCCESS! Your IPA is ready at: $PROJECT_DIR/$APP_NAME.ipa"
echo "👉 You can now install it using Sideloadly or AltStore."
