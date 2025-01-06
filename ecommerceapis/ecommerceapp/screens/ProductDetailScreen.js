import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';

const ProductDetailScreen = ({ route, navigation }) => {
  // Nhận tham số từ màn hình ProductCard
  const { product, relatedProducts } = route.params;
  const [reviewsVisible, setReviewsVisible] = useState(5); // Hiển thị tối đa 5 bình luận
  const [newReview, setNewReview] = useState(''); // Bình luận mới
  const [rating, setRating] = useState(0); // Đánh giá sao
  const [commentReplies, setCommentReplies] = useState({}); // Lưu trữ phản hồi cho từng bình luận

  // Hàm tăng số bình luận hiển thị
  const showMoreReviews = () => {
    setReviewsVisible((prev) => prev + 5);
  };

  // Hàm thêm bình luận mới
  const addReview = () => {
    if (newReview.trim()) {
      product.reviews.push({ review: newReview, rating, replies: [] }); // Thêm bình luận mới vào danh sách bình luận
      setNewReview(''); // Xóa nội dung ô nhập
      setRating(0); // Reset rating sau khi gửi bình luận
    }
  };

  // Hàm thêm phản hồi cho bình luận
  const addReply = (index, reply) => {
    if (reply.trim()) {
      const updatedReplies = [...product.reviews[index].replies, reply];
      product.reviews[index].replies = updatedReplies;
      setCommentReplies({ ...commentReplies, [index]: '' }); // Reset ô nhập phản hồi
    }
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

      {/* Chức năng đánh giá sao */}
      <View style={styles.ratingContainer}>
        <Text>Đánh giá của bạn: </Text>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)} // Chọn sao khi bấm vào
            style={[styles.star, star <= rating && styles.selectedStar]}
          >
            <Text>⭐</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ô nhập bình luận mới */}
      <TextInput
        style={styles.input}
        placeholder="Viết bình luận của bạn..."
        value={newReview}
        onChangeText={setNewReview}
      />
      <Button title="Gửi bình luận" onPress={addReview} />

      {/* Danh sách bình luận */}
      <FlatList
        data={product.reviews.slice(0, reviewsVisible)} // Hiển thị số lượng bình luận giới hạn
        keyExtractor={(item, index) => index.toString()} // Tạo key duy nhất
        renderItem={({ item, index }) => (
          <View style={styles.reviewContainer}>
            <Text style={styles.review}>- {item.review}</Text>
            {/* Hiển thị rating của bình luận */}
            <Text>⭐ {item.rating}/5</Text>

            {/* Phản hồi bình luận */}
            {item.replies.length > 0 && (
              <View style={styles.replies}>
                {item.replies.map((reply, idx) => (
                  <Text key={idx} style={styles.reply}>Phản hồi: {reply}</Text>
                ))}
              </View>
            )}

            {/* Phản hồi cho bình luận */}
            <TextInput
              style={styles.input}
              placeholder="Phản hồi bình luận..."
              value={commentReplies[index] || ''}
              onChangeText={(text) => setCommentReplies({ ...commentReplies, [index]: text })}
            />
            <Button title="Gửi phản hồi" onPress={() => addReply(index, commentReplies[index])} />
          </View>
        )}
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
    padding: 10, // Khoảng cách bên trong
  },
  image: {
    width: '100%', // Chiều rộng full
    height: 300, // Chiều cao hình
  },
  name: {
    fontSize: 24, // Kích thước tên sản phẩm
    fontWeight: 'bold', // In đậm
    marginTop: 10, // Khoảng cách phía trên
  },
  price: {
    fontSize: 18, // Kích thước giá sản phẩm
    color: '#e60000', // Màu đỏ
    marginTop: 5, // Khoảng cách phía trên
  },
  rating: {
    fontSize: 16, // Kích thước đánh giá
    color: '#666', // Màu chữ xám
    marginTop: 5, // Khoảng cách phía trên
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10, // Khoảng cách dọc
  },
  star: {
    marginRight: 5, // Khoảng cách giữa các sao
  },
  selectedStar: {
    color: '#ffcc00', // Màu vàng cho sao đã chọn
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  reviewContainer: {
    marginVertical: 10, // Khoảng cách dọc giữa các bình luận
  },
  review: {
    fontSize: 14, // Kích thước font bình luận
    color: '#333', // Màu chữ
  },
  replies: {
    marginLeft: 20, // Khoảng cách trái cho phản hồi
  },
  reply: {
    fontSize: 12, // Kích thước font phản hồi
    color: '#555', // Màu chữ cho phản hồi
  },
  relatedTitle: {
    fontSize: 18, // Kích thước tiêu đề "Sản phẩm khác"
    fontWeight: 'bold', // In đậm
    marginTop: 20, // Khoảng cách phía trên
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
