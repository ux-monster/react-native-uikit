// Develop File
import {BottomSheet} from './src';

// Build File
// import {BottomSheet} from './npm';

// Deploy File
// import {BottomSheet} from '@ux-monster/react-native-uikit';

import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DraggableListView from '@/components/DraggableListView';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{flex: 1}}>
      {/* <TouchableOpacity
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
      )} */}
      <DraggableListView />
    </View>
  );
};

export default App;
