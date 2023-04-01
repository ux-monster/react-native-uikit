import React, {useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gesture} from 'react-native-gesture-handler';
import Animated, {interpolate} from 'react-native-reanimated';

const tabs = [
  'Hello',
  'Pepsi Cola',
  'Amazon Web Service',
  'Water',
  'JavaScript',
  'Design',
  'Muzli',
  'Github',
  'Coursera',
  'Reddit',
];

interface Props {}

const ScrollableTabView = (props: Props) => {
  const tabSliderGesture = Gesture.Pan();
  const pageSliderGesture = Gesture.Pan();

  const widthInterpolate = (targetValue: number) => {
    const pageWidth = Dimensions.get('window').width;
    const tabWidthArray = [0, 0, 0, 0, 0];

    const currentIndex = 0;
    const nextIndex = 0;

    const currentWidth = tabWidthArray[currentIndex];
    const nextWidth = tabWidthArray[nextIndex];

    const scrollInput = [currentIndex * pageWidth, nextIndex * pageWidth];
    const widthOutput = [currentWidth, nextWidth];

    return interpolate(targetValue, scrollInput, widthOutput);
  };

  return (
    <View>
      {/* Tab Container */}
      <View>
        {/* Tab Slider */}
        <View>
          {/* Tab */}
          {tabs.map((tab, i) => (
            <TouchableOpacity key={i}>
              <Text>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Tab Bar */}
        <View style={{}} />
      </View>
      {/* Page Container */}
      <View>
        {/* Page Slider */}
        <View>
          {/* Page */}
          {tabs.map((page, i) => (
            <View key={i}>
              <Text>{page}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ScrollableTabView;

const styles = StyleSheet.create({});
