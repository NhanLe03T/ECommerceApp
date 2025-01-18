import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ product, onPress, onCompare }) => {
  return (
    <TouchableOpacity onPress={() => onPress(product)} style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price} VNĐ</Text>
        <Text style={styles.productRating}>⭐ {product.rating || 0}/5</Text>
      </View>
      <TouchableOpacity onPress={() => onCompare(product)} style={styles.compareButton}>
        <Text style={styles.compareButtonText}>So sánh</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, margin: 10, padding: 10, elevation: 3 },
  image: { width: '100%', height: 200, borderRadius: 10 },
  info: { paddingTop: 10 },
  productName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#e60000', marginTop: 5 },
  productRating: { fontSize: 14, color: '#666', marginTop: 5 },
  compareButton: { backgroundColor: '#4CAF50', padding: 8, borderRadius: 5, marginTop: 10 },
  compareButtonText: { color: '#fff', textAlign: 'center' },
});

export default ProductCard;
