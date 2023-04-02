import React, {useRef, useState} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gesture} from 'react-native-gesture-handler';
import Animated, {interpolate} from 'react-native-reanimated';

interface Props {}

interface Tab {
  id: string;
  name: string;
}

interface TabWidthList {
  [key: string]: number;
}

const ScrollableTabView = (props: Props) => {
  const tabSliderGesture = Gesture.Pan();
  const pageSliderGesture = Gesture.Pan();

  const [tabs, setTabs] = useState<Tab[]>([
    {id: '0', name: 'Hello'},
    {id: '1', name: 'Pepsi Cola'},
    {id: '2', name: 'Amazon Web Service'},
    {id: '3', name: 'Water'},
    {id: '4', name: 'JavaScript'},
    {id: '5', name: 'Design'},
    {id: '6', name: 'Muzli'},
    {id: '7', name: 'Github'},
    {id: '8', name: 'Coursera'},
    {id: '9', name: 'Reddit'},
  ]);

  const tabWdthList = useRef<TabWidthList>({});

  const handleLayoutTab = (e: LayoutChangeEvent, tab: Tab) => {
    tabWdthList.current[tab.id] = e.nativeEvent.layout.width;
  };

  const widthInterpolate = (
    scrollValue: number,
    currentTab: Tab,
    nextTab: Tab,
  ) => {
    const pageWidth = Dimensions.get('window').width;

    const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab.id);
    const nextTabIndex = tabs.findIndex(tab => tab.id === nextTab.id);

    const currentTabWidth = tabWdthList.current[currentTabIndex];
    const nextTabWidth = tabWdthList.current[nextTabIndex];

    const scrollInput = [currentTabIndex * pageWidth, nextTabIndex * pageWidth];
    const widthOutput = [currentTabWidth, nextTabWidth];

    return interpolate(scrollValue, scrollInput, widthOutput);
  };

  return (
    <View>
      {/* Tab Container */}
      <View>
        {/* Tab Slider */}
        <View>
          {/* Tab */}
          {tabs.map((tab, i) => (
            <TouchableOpacity key={i} onLayout={e => handleLayoutTab(e, tab)}>
              <Text>{tab.name}</Text>
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
              <Text>{page.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ScrollableTabView;

const styles = StyleSheet.create({});
