// ProductDetailScreen.js - Màn hình hiển thị chi tiết sản phẩm
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button } from 'react-native';

const ProductDetailScreen = ({ route, navigation }) => {
  // Nhận tham số từ màn hình ProductCard
  const { product, relatedProducts } = route.params;
  const [reviewsVisible, setReviewsVisible] = useState(5); // Hiển thị tối đa 5 bình luận

  // Hàm tăng số bình luận hiển thị
  const showMoreReviews = () => {
    setReviewsVisible((prev) => prev + 5);
  };

  return (
    <View style={styles.container}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: product.image }} style={styles.image} />
      {/* Tên sản phẩm */}
      <Text style={styles.name}>{product.name}</Text>
      {/* Giá sản phẩm */}
      <Text style={styles.price}>{product.price} VNĐ</Text>
      {/* Số sao đánh giá */}
      <Text style={styles.rating}>⭐ {product.rating || 0}/5</Text>

      {/* Danh sách bình luận */}
      <FlatList
        data={product.reviews.slice(0, reviewsVisible)} // Hiển thị số lượng bình luận giới hạn
        keyExtractor={(item, index) => index.toString()} // Tạo key duy nhất
        renderItem={({ item }) => (
          // Hiển thị từng bình luận
          <Text style={styles.review}>- {item}</Text>
        )}
        // Nút hiển thị thêm bình luận
        ListFooterComponent={
          reviewsVisible < product.reviews.length && (
            <Button title="Hiển thị thêm bình luận" onPress={showMoreReviews} />
          )
        }
      />

      {/* Sản phẩm khác */}
      <Text style={styles.relatedTitle}>Sản phẩm khác:</Text>
      <FlatList
        data={relatedProducts} // Danh sách sản phẩm liên quan
        keyExtractor={(item) => item.id.toString()} // Tạo key duy nhất
        renderItem={({ item }) => (
          // Hiển thị từng sản phẩm liên quan
          <View style={styles.relatedItem}>
            <Image source={{ uri: item.image }} style={styles.relatedImage} />
            <Text>{item.name}</Text>
          </View>
        )}
        horizontal // Hiển thị theo chiều ngang
      />
    </View>
  );
};

// Style cho màn hình chi tiết sản phẩm
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Màu nền
  },
  image: {
    width: '100%', // Chiều rộng full
    height: 300, // Chiều cao hình
  },
  name: {
    fontSize: 24, // Kích thước tên sản phẩm
    fontWeight: 'bold', // In đậm
    margin: 10, // Khoảng cách xung quanh
  },
  price: {
    fontSize: 18, // Kích thước giá sản phẩm
    color: '#e60000', // Màu đỏ
    marginHorizontal: 10, // Khoảng cách ngang
  },
  rating: {
    fontSize: 16, // Kích thước đánh giá
    color: '#666', // Màu chữ xám
    marginHorizontal: 10, // Khoảng cách ngang
  },
  review: {
    marginHorizontal: 10, // Khoảng cách ngang
    marginVertical: 5, // Khoảng cách dọc
    fontSize: 14, // Kích thước font bình luận
    color: '#333', // Màu chữ
  },
  relatedTitle: {
    fontSize: 18, // Kích thước tiêu đề "Sản phẩm khác"
    fontWeight: 'bold', // In đậm
    margin: 10, // Khoảng cách xung quanh
  },
  relatedItem: {
    margin: 10, // Khoảng cách giữa các sản phẩm liên quan
    alignItems: 'center', // Căn giữa nội dung
  },
  relatedImage: {
    width: 100, // Chiều rộng hình sản phẩm liên quan
    height: 100, // Chiều cao hình sản phẩm liên quan
    borderRadius: 10, // Bo góc
  },
});

export default ProductDetailScreen;
