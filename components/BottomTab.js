import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainPage from '../page/MainPage';
import MyPage from '../page/MyPage';

import ShoppingIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIcon from 'react-native-vector-icons/FontAwesome';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          height: 90,
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="쇼핑몰"
        component={MainPage}
        options={{
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: 10,
          },
          tabBarIcon: ({color}) => (
            <ShoppingIcon
              name="shopping"
              size={28}
              color={color}
              style={styles.iconStyle}
            />
          ),
        }}
      />
      <Tab.Screen
        name="내정보"
        component={MyPage}
        options={{
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: 10,
          },
          tabBarIcon: ({color}) => (
            <UserIcon
              name="user"
              size={28}
              color={color}
              style={styles.iconStyle}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginTop: 10,
  },
});

export default BottomTab;
