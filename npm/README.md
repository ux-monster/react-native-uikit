> This version is not yet complete...

Installing the package

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

# Components

## BottomSheet

```tsx
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BottomSheet} from 'react-native-uikit';

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
