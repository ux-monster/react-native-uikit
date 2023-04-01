import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gesture} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

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
