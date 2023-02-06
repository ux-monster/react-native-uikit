import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import useInteraction from './useInteraction';

type Props = {
  onClosed: () => void;
};

const BottomSheet = ({onClosed}: Props) => {
  const [animaatedStyles, events] = useInteraction({onClosed});
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, animaatedStyles.background]} />
      <GestureHandlerRootView style={styles.gestureContainer}>
        <TouchableOpacity
          style={styles.backgroundTouchContainer}
          onPress={events.handleBackgroundClick}
        />
        <Animated.View
          style={[styles.bottomContainer, animaatedStyles.bottomContainer]}
          onLayout={events.handleBottomContainerRendering}>
          <PanGestureHandler onGestureEvent={events.handleGesture}>
            <Animated.View style={styles.barContainer}>
              <View style={styles.bar}></View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    flexDirection: 'column',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  gestureContainer: {
    flex: 1,
  },
  backgroundTouchContainer: {
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: '#ffffff',
    marginTop: 'auto',
    height: 500, // TODO - Remove
    borderRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  barContainer: {
    paddingVertical: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bar: {
    backgroundColor: '#dfdfdf',
    borderRadius: 20,
    width: '25%',
    height: 4,
  },
});
