// Develop File
import {BottomSheet} from './src';
import {DraggableListView} from './src';

// Build File
// import {BottomSheet} from './npm';

// Deploy File
// import {BottomSheet} from '@ux-monster/react-native-uikit';

import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
      <DraggableListView
        items={[
          {id: '1'},
          {id: '2'},
          {id: '3'},
          {id: '4'},
          {id: '5'},
          {id: '6'},
          {id: '7'},
          {id: '8'},
          {id: '9'},
          {id: '10'},
          {id: '11'},
          {id: '12'},
          {id: '13'},
          {id: '14'},
          {id: '15'},
        ]}
      />
    </View>
  );
};

export default App;
