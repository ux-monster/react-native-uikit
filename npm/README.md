# Installing the package

```sh
yarn add react-native-reanimated react-native-device-info react-native-gesture-handler
```

# Babel plugin

Add Reanimated's Babel plugin to your babel.config.js:

```js
module.exports = {
  presets: [
    ...
  ],
  plugins: [
    ...
    'react-native-reanimated/plugin',
  ],
};
```

# Android

No additional steps are necessary.

## Proguard

If you're using Proguard, make sure to add rules preventing it from optimizing Turbomodule classes:

**android/app/proguard-rules.pro**

```
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
```
