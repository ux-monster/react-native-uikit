import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {};

const ScrollableTabView = (props: Props) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.tabListContainer}>
        {/* Tab List */}
        <Animated.ScrollView
          style={styles.tabList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {[
            'Hello',
            'Pepsi Cola',
            'Amazon Web Service',
            'Water',
            'JavaScript',
          ].map((o, i) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedTabIndex(i);
              }}
              key={i}
              style={[styles.tab]}>
              <Text
                style={[
                  selectedTabIndex === i && {
                    fontWeight: 'bold',
                  },
                ]}>
                {o}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
        {/* Bar or Marker */}
        <View style={styles.bar} />
      </View>
      <Animated.FlatList
        initialScrollIndex={0}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        onScroll={e => {
          const width = Dimensions.get('window').width;
          const index = Math.floor(e.nativeEvent.contentOffset.x / width + 0.1);
          console.log(e.nativeEvent.contentOffset.x, width);
          if (index !== selectedTabIndex) {
            setSelectedTabIndex(index);
          }
        }}
        pagingEnabled={true}
        style={styles.contentViewList}
        data={[0, 1, 2, 3, 4]}
        renderItem={({item}) => (
          <View
            style={[styles.contentView, {backgroundColor: sampleColors[item]}]}>
            <Text>Page</Text>
          </View>
        )}
      />
    </View>
  );
};

const sampleColors = ['#aeff00', '#d9ff1b', '#dcff4e', '#deff9c', '#f8ffcd'];

export default ScrollableTabView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
  },
  tabListContainer: {},
  tabList: {},
  tab: {
    padding: 20,
  },
  bar: {},
  contentViewList: {
    backgroundColor: 'black',
  },
  contentView: {
    height: '100%',
    width: Dimensions.get('window').width,
    backgroundColor: 'yellow',
  },
});
