import React from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import useInteraction from './useInteraction';
import RootSiblings from 'react-native-root-siblings';
interface Props {
  children?: React.ReactNode;
  onClosed: () => void;
}

const BottomSheet = ({children, onClosed}: Props) => {
  const [animaatedStyles, events] = useInteraction({onClosed});
  return (
    <Modal style={styles.container} transparent>
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
              <View style={styles.bar} />
              <View>{children}</View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const show = (onClosed: () => void) => {
  const component = new RootSiblings(
    (
      <BottomSheet
        onClosed={() => {
          component.destroy();
          onClosed();
        }}
      />
    ),
  );
};

export default Object.assign(BottomSheet, {
  show,
});

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
