// ProductCard.js - Component hiển thị sản phẩm
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  return (
    // Thẻ sản phẩm có thể nhấn
    <TouchableOpacity onPress={() => onPress(product)} style={styles.card}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        {/* Tên sản phẩm */}
        <Text style={styles.productName}>{product.name}</Text>
        {/* Giá sản phẩm */}
        <Text style={styles.productPrice}>{product.price} VNĐ</Text>
        {/* Số sao đánh giá */}
        <Text style={styles.productRating}>⭐ {product.rating || 0}/5</Text>
      </View>
    </TouchableOpacity>
  );
};

// Style cho thẻ sản phẩm
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', // Màu nền thẻ
    borderRadius: 10, // Bo góc
    margin: 10, // Khoảng cách giữa các thẻ
    padding: 10, // Khoảng cách bên trong
    elevation: 3, // Bóng đổ
  },
  image: {
    width: '100%', // Chiều rộng full
    height: 200, // Chiều cao hình
    borderRadius: 10, // Bo góc cho hình
  },
  info: {
    paddingTop: 10, // Khoảng cách phía trên thông tin
  },
  productName: {
    fontSize: 18, // Kích thước font tên sản phẩm
    fontWeight: 'bold', // In đậm tên sản phẩm
    color: '#333', // Màu chữ
  },
  productPrice: {
    fontSize: 16, // Kích thước font giá
    fontWeight: 'bold', // In đậm giá
    color: '#e60000', // Màu đỏ cho giá
    marginTop: 5, // Khoảng cách phía trên giá
  },
  productRating: {
    fontSize: 14, // Kích thước font đánh giá
    color: '#666', // Màu chữ xám
    marginTop: 5, // Khoảng cách phía trên đánh giá
  },
});

export default ProductCard;
