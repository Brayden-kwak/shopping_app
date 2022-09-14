import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from '../config/Key';

const MainPage = () => {
  const [shoppingData, setShoppingData] = useState('');

  const fetchData = async () => {
    axios
      .get(
        `https://assignment.mobile.mmtalk.kr/rest/shopping/products?offset=0&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        console.log('res', res.data);
        setShoppingData(res);
      })
      .catch(err => console.log(err));
  };
  //   console.log(shoppingData);
  useEffect(() => {
    // fetch('https://assignment.mobile.mmtalk.kr/rest/shopping/products', {
    //   method: 'GET',
    //   headers: new Headers({
    //     Authorization: `Bearer ${process.env.API_KEY}`,
    //     'Content-Type': 'application/json',
    //   }),
    // });
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>mainPage</Text>
    </View>
  );
};

export default MainPage;
