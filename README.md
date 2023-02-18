> This version is not yet complete...

# Installing the package

```
yarn add react-native-reanimated
yarn add react-native-device-info
yarn add react-native-gesture-handler
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

# Getting Started

### 1) When modifying or creating a component

```tsx
import {BottomSheet} from './src';
```

### 2) When you need to test after build and before deployment

```tsx
import {BottomSheet} from './npm';
```

### 3) When to test after deployment

```tsx
import {BottomSheet} from '@ux-monster/react-native-uikit';
```

### 4) Sample code

```tsx
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {
  BottomSheet,
  DraggableListView,
  Toast,
} from '@ux-monster/react-native-uikit';

const App = () => {
  return (
    <RootSiblingParent>
      <View style={{flex: 1, paddingTop: 40}}>
        <BottomSheetExample />
        <ToastExample />
        <DraggableListExample type="normal" />
        <DraggableListExample type="longpress" />
        <>... to be continue </>
      </View>
    </RootSiblingParent>
  );
};
```
