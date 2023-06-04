import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  AnimationCallback,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {wp} from '../assets/globalStyles';

interface Props {
  value?: boolean;
  onChange?: (value: boolean) => void;
  type?: 'small' | 'medium' | 'large';
}

const ToggleButtonSize = {
  small: {
    width: wp(20) * 2 + wp(10),
    height: wp(20),
  },
  medium: {
    width: wp(110),
    height: wp(50),
  },
  large: {
    width: wp(110),
    height: wp(50),
  },
};

const ToggleButton = ({value = false, onChange, type = 'small'}: Props) => {
  const size = ToggleButtonSize[type];
  const styles = useStyles(size);
  const [animationFinished, setAnimationFinished] = useState(true);

  // Animation Properties
  const enableX = size.width - wp(10) - size.height;
  const disableX = 0;
  const x = useSharedValue(value ? enableX : disableX);
  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  }, []);
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(x.value, [disableX, enableX], [0, 1]),
    };
  }, []);

  // If you want to use runOnJS, declare function on same file.
  const setValue = (_value: boolean) => {
    onChange && onChange(_value);
    setAnimationFinished(true);
  };

  // Animation Interaction
  const enable = () => {
    if (animationFinished) {
      setAnimationFinished(false);
      x.value = withTiming(enableX, {duration: 200}, () => {
        runOnJS(setValue)(true);
      });
    }
  };
  const disable = () => {
    if (animationFinished) {
      setAnimationFinished(false);
      x.value = withTiming(disableX, {duration: 200}, () => {
        runOnJS(setValue)(false);
      });
    }
  };

  // Event Handler
  const handleToggle = () => {
    if (x.value === 0) {
      enable();
    } else {
      disable();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={handleToggle}>
      <Animated.View style={[styles.background, animatedBackgroundStyle]} />
      <Animated.View style={[styles.circle, animatedCircleStyle]} />
    </TouchableOpacity>
  );
};

export default ToggleButton;

const useStyles = (size: {width: number; height: number}) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      paddingVertical: wp(4),
      paddingHorizontal: wp(5),
      width: size.width,
      height: wp(8) + size.height,
      backgroundColor: '#eee',
      borderRadius: size.width,
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size.width,
      height: wp(8) + size.height,
      borderRadius: size.width,
      zIndex: -1,
      backgroundColor: '#91DE91',
      opacity: 0,
    },
    circle: {
      height: size.height,
      width: size.height,
      backgroundColor: '#ffffff',
      borderRadius: size.height,
    },
  });
