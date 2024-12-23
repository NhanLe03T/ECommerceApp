// ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productPrice}>{product.price} VNĐ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    elevation: 3, // Để tạo hiệu ứng bóng cho card
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  info: {
    paddingTop: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e60000',
    marginTop: 5,
  },
});

export default ProductCard;
