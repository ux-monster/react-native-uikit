import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface Props {
  children?: React.ReactNode;
  onClosed?: () => void;
}

const ChatBottomSheet = ({children, onClosed}: Props) => {
  const [visible, setVisible] = useState(false);

  const [heightState, setHeightState] = useState(0);
  const height = useRef<number>(0);
  const positionY = useRef<number>(0);
  const panY = useRef(new Animated.Value(0)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const opacity = translateY.interpolate({
    inputRange: [0, heightState],
    outputRange: [1, 0],
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderStart(e, gestureState) {
        panY.setValue(positionY.current);
      },
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(positionY.current + gestureState.dy);
        console.log('translateY', translateY);
      },
      onPanResponderRelease: (event, gestureState) => {
        const newPositionY = positionY.current + gestureState.dy;
        positionY.current = newPositionY < 0 ? 0 : newPositionY;

        console.log(newPositionY, 30);
        if (newPositionY > 30) {
          close();
        } else {
          open();
        }
      },
    }),
  ).current;

  const open = useCallback(() => {
    console.log('open');
    Animated.timing(panY, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
    }).start(() => {
      positionY.current = 0;
    });
  }, [panY]);

  const close = () => {
    console.log('close');
    Animated.timing(panY, {
      toValue: height.current,
      useNativeDriver: true,
      duration: 300,
    }).start(() => {
      console.log('closed', positionY, panY, translateY);
      positionY.current = 0;
      onClosed && onClosed();
    });
  };

  useEffect(() => {
    console.log('Hello');
  }, []);

  return (
    <GestureHandlerRootView>
      <Modal visible={true} transparent style={[{opacity: 0}]}>
        <Animated.View
          style={[
            {
              backgroundColor: 'rgba(0,0,0,0.3)',
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              zIndex: -1,
            },
            visible && {opacity},
          ]}
        />
        <TouchableOpacity style={{flex: 1}} onPress={close} />
        <Animated.View
          style={[{transform: [{translateY}]}]}
          onLayout={e => {
            setHeightState(e.nativeEvent.layout.height);
            height.current = e.nativeEvent.layout.height;

            panY.setValue(e.nativeEvent.layout.height);
            setVisible(true);

            open();
          }}>
          <Animated.View
            style={{
              height: 40,
              backgroundColor: 'aqua',
              opacity: visible ? 1 : 0,
            }}
            {...panResponder.panHandlers}>
            <View />
          </Animated.View>
          <View style={{backgroundColor: '#fff', opacity: visible ? 1 : 0}}>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
            <Text>123</Text>
          </View>
        </Animated.View>
      </Modal>
    </GestureHandlerRootView>
  );
};

export default ChatBottomSheet;
