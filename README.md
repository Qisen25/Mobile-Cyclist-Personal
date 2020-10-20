# Expektus - Mobile - Cyclist Application

This application will track the location of cyclists/other vulnerable road users and
relay this information to relevant motorists via the Expektus backend server.

# How to run

1. Install Android Studio
2. Install node.js
3. Run `npm install` in the project root
4. Open Android Studio
5. Go to Device Manager and create an emulator (Tested on Google Pixel 3a, Android 10)
6. Run the emulator
7. Run `npm run android` in the project root

# Change log
1. <del>Watch pos or location task now get direction by Location.getHeadingAsync() since it provides more consistent direction</del>. (Removed this idea ( using bearing to help get direction ), found to be unsuitable for cyclist app when testing.
