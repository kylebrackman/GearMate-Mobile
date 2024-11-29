Need to follow this guide here to get the SHA-1 fingerprint. Follow the guide here:
`https://react-native-google-signin.github.io/docs/setting-up/get-config-file?firebase-or-not=firebase`
So far I only build for development this will be a TODO: for production

TODO: for the CI/CD:
Automate file injection for CI/CD: If you're using a CI/CD pipeline (e.g., GitHub Actions), store the google-services.json content in a secure secret and inject it during the build process.

I ran it for EAS build cause that's on my profile

Kyle you need to do this:
1. cd android && ./gradlew signingReport
2. This will run for  a min and then you want to get your SHA-1 fingerprint
3. If this fails then do this:
   4. Install Android Studio
   5. Go to Android Studio > Settings > Appearance & Behavior > Android SDK
   6. Copy the SDK Location and select the newest Android API (35 at time of writing)
   7. Add to your PATH: open zshrc
      8. I use sublime: `subl ~/.zshrc`
      9. Paste in 
      ` export ANDROID_HOME="$HOME/Library/Android/sdk" # This should be what you copied
         export ANDROID_SDK_ROOT="$ANDROID_HOME"
         export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH"`
      10. Save and close reload profile `source ~/.zshrc`
11. Now this should work lol 
12. Copy the SHA1 fingerprint
