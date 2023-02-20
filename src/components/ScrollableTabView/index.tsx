import React from 'react';
import {Text, View} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {};

const ScrollableTabView = (props: Props) => {
  return (
    <View>
      <View>
        {/* Tab List */}
        <Animated.ScrollView>
          {[1, 2, 3, 4, 5].map((o, i) => (
            <View key={i}>
              <Text>Tab</Text>
            </View>
          ))}
        </Animated.ScrollView>
        {/* Bar or Marker */}
        <View />
      </View>
      <Animated.FlatList
        data={[]}
        renderItem={() => (
          <View>
            <Text>Page</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ScrollableTabView;
