import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Hàm component ProductCard
const ProductCard = ({ product }) => {
  // Tính toán số sao (giới hạn tối đa là 5 sao)
  const rating = product.rating || 0; // Nếu không có rating thì mặc định là 0 sao
  const fullStars = Math.floor(rating); // Số sao đầy (số nguyên)
  const emptyStars = 5 - fullStars; // Số sao rỗng (để đạt tổng cộng 5 sao)

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} /> {/* Hiển thị hình ảnh sản phẩm */}
      <View style={styles.info}>
        <Text style={styles.productName}>{product.name}</Text> {/* Hiển thị tên sản phẩm */}
        <Text style={styles.productPrice}>{product.price} VNĐ</Text> {/* Hiển thị giá sản phẩm */}
        
        {/* Hiển thị số sao đánh giá */}
        <View style={styles.rating}>
          {[...Array(fullStars)].map((_, index) => (
            <Text key={index} style={styles.star}>★</Text> // Hiển thị sao đầy
          ))}
          {[...Array(emptyStars)].map((_, index) => (
            <Text key={index + fullStars} style={styles.starEmpty}>★</Text> // Hiển thị sao rỗng
          ))}
        </View>
      </View>
    </View>
  );
};

// Style cho ProductCard
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    elevation: 3, // Hiệu ứng bóng cho card
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
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e60000',
    marginTop: 5,
  },
  rating: {
    flexDirection: 'row', // Các sao sẽ nằm theo hàng ngang
    marginTop: 5,
  },
  star: {
    color: '#FFD700', // Màu vàng cho sao đầy
    fontSize: 18,
  },
  starEmpty: {
    color: '#ddd', // Màu xám cho sao rỗng
    fontSize: 18,
  },
});

export default ProductCard;
