import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from '../config/Key';

const ShoppingDetail = ({route}) => {
  const [shoppingDetail, setShoppingDetail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          `https://assignment.mobile.mmtalk.kr/rest/shopping/product/${route.params.paramKey.hash}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setShoppingDetail(res.data);
        })
        .catch(err => console.log(err));
    };
    fetchData();
  }, [route.params.paramKey.hash]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{shoppingDetail.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    lineHeight: 25,
  },
});

export default ShoppingDetail;
