// Develop File
import {BottomSheet} from './src';
import {DraggableListView} from './src';
import {Toast} from './src';

// Build File
// import {BottomSheet} from './npm';

// Deploy File
// import {BottomSheet} from '@ux-monster/react-native-uikit';

import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import KeyboardAttachedView from '@/components/KeyboardAttachedView';

const BottomSheetExample = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        style={styles.button}>
        <Text>Open BottomSheet</Text>
      </TouchableOpacity>
      {visible && (
        <BottomSheet
          onClosed={() => {
            setVisible(false);
          }}>
          <Text>This is a BottomSheet</Text>
          <Text>This is a BottomSheet</Text>
          <Text>This is a BottomSheet</Text>
          <Text>This is a BottomSheet</Text>
          <Text>This is a BottomSheet</Text>
        </BottomSheet>
      )}
    </>
  );
};
const DraggableListExample = ({type}: {type?: 'longpress' | 'normal'}) => {
  return (
    <DraggableListView
      type={type}
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
  );
};
const ToastExample = () => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Toast.show('Hello~!', 3000, 'top');
        Toast.show('Hello~!', 3000, 'middle');
        Toast.show('Hello~!', 3000, 'bottom');
      }}>
      <Text>Open Toast</Text>
    </TouchableOpacity>
  );
};
const KeyboardAttachedViewExample = () => {
  return <KeyboardAttachedView />;
};

const App = () => {
  return (
    <RootSiblingParent>
      <View style={{flex: 1, paddingTop: 40}}>
        {/* <BottomSheetExample /> */}
        {/* <DraggableListExample type="longpress" /> */}
        {/* <DraggableListExample type="normal" /> */}
        {/* <ToastExample /> */}
        <KeyboardAttachedViewExample />
      </View>
    </RootSiblingParent>
  );
};

export default App;

const styles = StyleSheet.create({
  button: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfdfdf',
  },
});
