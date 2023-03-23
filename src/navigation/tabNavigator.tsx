import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// 라우팅 파라미터
export type TabParams = {
  Feed: {
    id: string;
  };
  Messages: {};
};

const Tab = createBottomTabNavigator<TabParams>();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={() => <></>} />
    <Tab.Screen name="Messages" component={() => <></>} />
  </Tab.Navigator>
);

export default TabNavigator;

/**
 * [스크린 사용방법 - 탭]
 * interface FeedScreenProps extends BottomTabScreenProps<TabParams, 'Feed'> {}
 * const FeedScreen = () => {
 *   const hello = useNavigation<FeedScreenProps>();
 *   hello.route.params.id;
 *   return <></>
 * }
 */
