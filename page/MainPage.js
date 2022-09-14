import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from '../config/Key';

const MainPage = () => {
  const [shoppingData, setShoppingData] = useState('');

  const fetchData = async () => {
    axios
      .get(
        `https://assignment.mobile.mmtalk.kr/rest/shopping/products?offset=0&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        setShoppingData(res.data.products);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item, index}) => {
    const imageUrl = item.imgUrl;
    const brandName = item.brand.substring(1, item.brand.length - 1);
    // eslint-disable-next-line prettier/prettier
    const sellPrice = item.sellPrc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
      <View style={styles.container} key={index}>
        <Image source={{uri: imageUrl}} style={styles.imgBox} />
        <View style={styles.secondContainer}>
          <Text style={styles.brandName}>{`[${brandName}]`}</Text>
          <Text numberOfLines={2}>{item.name}</Text>
          <View style={styles.pricingContainer}>
            <Text style={styles.discountText}>{`${item.discountRate}%`}</Text>
            <Text style={styles.priceText}>{sellPrice}</Text>
          </View>
        </View>
        <View style={styles.thirdContainer}>
          <Text style={styles.deliverText}>무료배송</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={shoppingData}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        disableVirtualization={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 160,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  imgBox: {
    width: 160,
    height: 160,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
  secondContainer: {
    marginTop: 10,
    width: 160,
  },
  brandName: {
    fontSize: 11,
    color: 'gray',
    marginBottom: 3,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 3,
    marginBottom: 3,
  },
  discountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ED807B',
    marginRight: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  thirdContainer: {
    padding: 5,
    marginTop: 3,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  deliverText: {
    fontSize: 10,
  },
});

export default MainPage;
