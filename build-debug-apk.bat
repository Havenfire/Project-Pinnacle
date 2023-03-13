cmd /c npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

cd android

cmd /c gradlew assembleDebug

cd ..
mv ./android/app/build/outputs/apk/debug/app-debug.apk ./app-debug.apk

pause