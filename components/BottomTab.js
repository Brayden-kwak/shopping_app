import React from 'react';
import {Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainPage from '../page/MainPage';
import MyPage from '../page/MyPage';

import ShoppingIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import ShoppingDetail from '../page/ShoppingDetail';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

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
      <Tab.Screen
        name="상품 상세보기"
        component={ShoppingDetail}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {display: 'none'},
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.navigate('쇼핑몰')}
              style={styles.backBtn}
              tintColor={'black'}
            />
          ),
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginTop: 10,
  },
  backBtn: {
    color: 'black',
    marginLeft: 15,
  },
});

export default BottomTab;
