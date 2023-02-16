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

### 4) Sample code - BottomSheet

```tsx
import {BottomSheet} from '@ux-monster/react-native-uikit';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        style={{
          marginTop: 40,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#dfdfdf',
        }}>
        <Text>Open BottomSheet</Text>
      </TouchableOpacity>
      {visible && (
        <BottomSheet
          onClosed={() => {
            setVisible(false);
          }}
        />
      )}
    </View>
  );
};

export default App;
```
