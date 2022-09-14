import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const ShoppingDetail = ({route}) => {
  const brandNameOrigin = route.params.paramKey.brand;
  const brandName = brandNameOrigin.substring(1, brandNameOrigin.length - 1);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{brandName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ShoppingDetail;
