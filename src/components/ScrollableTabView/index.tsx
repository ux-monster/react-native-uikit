import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {};

const ScrollableTabView = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabListContainer}>
        {/* Tab List */}
        <Animated.ScrollView style={styles.tabList} horizontal={true}>
          {[1, 2, 3, 4, 5].map((o, i) => (
            <View key={i} style={styles.tab}>
              <Text>Tab {i}</Text>
            </View>
          ))}
        </Animated.ScrollView>
        {/* Bar or Marker */}
        <View style={styles.bar} />
      </View>
      <Animated.FlatList
        style={styles.contentViewList}
        data={[1, 2, 3, 4, 5]}
        renderItem={() => (
          <View style={styles.contentView}>
            <Text>Page</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ScrollableTabView;

const styles = StyleSheet.create({
  container: {},
  tabListContainer: {},
  tabList: {},
  tab: {},
  bar: {},
  contentViewList: {},
  contentView: {},
});
