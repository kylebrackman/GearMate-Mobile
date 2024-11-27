# Welcome to GearMate 👋

## About the Project

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

GearMate is an application where users can rent out various types of gear, games, or hardware, that others may just need for a few days, or just want to test out! Currently, to rent outdoor gear, outdoor enthuiasasts must go to a large, corporate, recreational store to rent out low quality equipment for too high of prices. Now, people can rent out their gear to whoever may need it!

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo



# To run the Maestro E2E tests:
First time need to download:
1. `brew tap mobile-dev-inc/tap`
2. `brew install maestro`

Then for each time you e2e run:
1. eas build:configure
2. npx expo prebuild
3. npm run ios
   - ^ This will take a sec
4. `cd maestro`
5. `maestro test login.yaml`
   - ^ This runs one flow

To run all flows:
1. Make sure you are back in the root dir
2. `eas build --profile build-and-maestro-test`
   - Select All of you have both simulator and emulator running. Otherwise, pick the test platform
   - ^ This will also take a sec

