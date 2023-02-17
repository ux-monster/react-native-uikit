import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

interface Props {
  message: string;
  duration: number;
  type: string;
  onDestroy: () => void;
}

const Toast = ({message, duration, type, onDestroy}: Props) => {
  const {width: deviceWidth, height: deviceHeight} = useWindowDimensions();
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const styles = createStyles(
    (deviceHeight - (StatusBar.currentHeight || 0) - size.height) / 2,
    (deviceWidth - size.width) / 2,
  );

  const origin = useRef(new Animated.Value(0)).current;
  const opacity = origin.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [0, 1, 1, 0],
  });

  useEffect(() => {
    Animated.timing(origin, {
      toValue: 1,
      useNativeDriver: false,
      duration,
    }).start(() => {
      onDestroy();
    });
  }, [origin, duration, onDestroy]);

  return (
    <Animated.View
      style={[
        styles.container,
        type === 'top' && styles.containerTop,
        type === 'middle' && styles.containerMiddle,
        type === 'bottom' && styles.containerBottom,
        {opacity},
      ]}
      onLayout={e =>
        setSize({
          height: e.nativeEvent.layout.height,
          width: e.nativeEvent.layout.width,
        })
      }>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const show = (
  message: string,
  duration?: number,
  type?: string,
  onDestroy?: () => void,
) => {
  const component = new RootSiblings(
    (
      <Toast
        message={message}
        duration={duration || 3000}
        type={type || 'top'}
        onDestroy={() => {
          component.destroy();
          onDestroy && onDestroy();
        }}
      />
    ),
  );
};

export default Object.assign(Toast, {show});

const createStyles = (top: number, left: number) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    containerTop: {
      top: 50 - (StatusBar.currentHeight || 0),
      left,
    },
    containerMiddle: {
      top,
      left,
    },
    containerBottom: {
      bottom: 70,
      left,
    },
    message: {
      fontSize: 16,
      color: '#fff',
    },
  });
