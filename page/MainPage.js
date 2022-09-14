/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
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
import Star from 'react-native-vector-icons/FontAwesome';

const MainPage = ({navigation}) => {
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
    const sellPrice = item.sellPrc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
      <View style={styles.container} key={index}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('상품 상세보기', {paramKey: item})
          }>
          <Image source={{uri: imageUrl, cache: 'only-if-cached'}} style={styles.imgBox} />
          <View style={styles.secondContainer}>
            <Text style={styles.brandName}>{`[${brandName}]`}</Text>
            <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
            <View style={styles.pricingContainer}>
              <Text style={styles.discountText}>{`${item.discountRate}%`}</Text>
              <Text style={styles.priceText}>{sellPrice}</Text>
            </View>
            {(item.reviewAvg > 0 && item.reviewCount > 0) &&
              <View style={styles.reviewContainer}>
                <Star name="star" size={12} color="#F8D73F" />
                <Text style={styles.reviewAvg}>{item.reviewAvg}</Text>
                <Text style={styles.reviewStandard}>/5</Text>
                <Text style={styles.reviewCount}>| 리뷰 {item.reviewCount}</Text>
              </View>
            }
            {(item.reviewAvg === 0 && item.reviewCount === 0) &&
              <View style={styles.reviewContainer}>
                <Star name="star" size={12} color="#F8D73F" />
                <Text style={styles.reviewAvg}>-</Text>
                <Text style={styles.reviewStandard}>/-</Text>
                <Text style={styles.reviewCount}>| 리뷰 {item.reviewCount}</Text>
              </View>
            }
          </View>
          <View style={styles.thirdContainer}>
            <Text style={styles.deliverText}>무료배송</Text>
          </View>
        </TouchableOpacity>
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
    height: 315,
    flexDirection: 'column',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: -15,
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
  name: {
    height: 34,
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
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewAvg: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 3,
    marginRight: 2,
  },
  reviewStandard: {
    fontSize: 12,
    color: 'gray',
  },
  reviewCount: {
    fontSize: 11,
    color: 'gray',
    marginLeft: 3,
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
