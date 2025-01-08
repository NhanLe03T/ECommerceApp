import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { getCartProducts, removeFromCart } from '../utils/api';
import ProductCard from '../components/ProductCard';

const CartScreen = ({ navigation }) => {  // Thêm 'navigation' vào props
  const [cartItems, setCartItems] = useState([]);  // State lưu trữ sản phẩm trong giỏ hàng
  const [loading, setLoading] = useState(false); // State kiểm tra trạng thái đang tải (loading)
  const [page, setPage] = useState(1);  // State lưu trang hiện tại (dùng để phân trang)
  const [hasMore, setHasMore] = useState(true);  // State kiểm tra xem còn sản phẩm để tải hay không
  const [selectedProducts, setSelectedProducts] = useState([]); // State lưu danh sách các sản phẩm đã được chọn để xóa

  // Hàm lấy sản phẩm giỏ hàng với phân trang
  const fetchCartProducts = async (page = 1) => {
    setLoading(true);  // Bắt đầu trạng thái loading
    try {
      const { products: newCartItems } = await getCartProducts(page, 20); // Lấy sản phẩm giỏ hàng với phân trang
      setCartItems((prevCartItems) => [...prevCartItems, ...newCartItems]); // Cập nhật giỏ hàng

      // Kiểm tra xem còn sản phẩm để tải không, nếu ít hơn 20 sản phẩm thì không tải thêm nữa
      if (newCartItems.length < 20) {
        setHasMore(false); // Không còn sản phẩm để tải thêm
      }
    } catch (error) {
      console.error(error);  // In lỗi nếu có lỗi xảy ra
    } finally {
      setLoading(false); // Dừng trạng thái loading khi xong
    }
  };

  // Hàm xóa các sản phẩm đã chọn
  const handleDeleteProducts = async () => {
    try {
      // Duyệt qua các sản phẩm đã chọn và gọi API để xóa
      for (let productId of selectedProducts) {
        await removeFromCart(productId);
      }
      
      // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
      setCartItems((prevCartItems) => prevCartItems.filter(item => !selectedProducts.includes(item.id)));
      
      // Reset lại danh sách sản phẩm đã chọn
      setSelectedProducts([]); 
    } catch (error) {
      console.error(error); // In lỗi nếu có lỗi xảy ra
    }
  };

  // Hàm toggle để chọn hoặc bỏ chọn sản phẩm khi nhấn vào thẻ sản phẩm
  const toggleSelectProduct = (productId) => {
    setSelectedProducts((prev) => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]  // Nếu sản phẩm đã được chọn, bỏ chọn; nếu chưa chọn, thêm vào
    );
  };

  // Hàm render sản phẩm trong giỏ hàng
  const renderCartItem = ({ item }) => {
    const isSelected = selectedProducts.includes(item.id);  // Kiểm tra sản phẩm có được chọn hay không
    return (
      <ProductCard
        product={item}  // Truyền sản phẩm cho ProductCard
        onPress={() => toggleSelectProduct(item.id)}  // Khi nhấn vào thẻ sản phẩm sẽ gọi toggleSelectProduct để chọn hoặc bỏ chọn sản phẩm
        style={[styles.cartItem, isSelected && styles.selectedItem]} // Nếu sản phẩm được chọn thì thay đổi style
      />
    );
  };

  // Dùng useEffect để lấy sản phẩm giỏ hàng khi trang được load
  useEffect(() => {
    fetchCartProducts(page); // Gọi hàm lấy sản phẩm giỏ hàng khi trang tải
  }, [page]); // Khi page thay đổi, gọi lại hàm fetchCartProducts

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}  // Dữ liệu là các sản phẩm trong giỏ hàng
        renderItem={renderCartItem}  // Hàm render từng sản phẩm
        keyExtractor={(item) => item.id.toString()}  // Chỉ định khóa duy nhất cho mỗi sản phẩm
        onEndReached={() => {
          if (hasMore) {  // Kiểm tra xem có còn sản phẩm để tải không
            setPage(page + 1);  // Tải thêm trang mới
          }
        }}
        onEndReachedThreshold={0.5}  // Ngưỡng khi cuộn 50% cuối màn hình thì tải thêm sản phẩm
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}  // Hiển thị loading khi đang tải thêm sản phẩm
      />
      <View style={styles.buttonContainer}>
        <Button title="Xóa sản phẩm" onPress={handleDeleteProducts} disabled={selectedProducts.length === 0} />  // Nút xóa sản phẩm
        {/* Thêm nút thanh toán, điều hướng đến màn hình Checkout */}
        <Button title="Thanh toán" onPress={() => navigation.navigate('Checkout')} />
      </View>
    </View>
  );
};

// Style cho trang giỏ hàng
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 20, // Khoảng cách phía trên
  },
  cartItem: {
    backgroundColor: '#fff',  // Màu nền cho thẻ sản phẩm
    borderRadius: 10,  // Bo góc cho thẻ sản phẩm
    margin: 10,  // Khoảng cách giữa các thẻ sản phẩm
    padding: 10,  // Khoảng cách bên trong thẻ sản phẩm
    elevation: 3,  // Bóng đổ cho thẻ sản phẩm
  },
  selectedItem: {
    backgroundColor: '#d9f7be',  // Màu nền khi sản phẩm được chọn
  },
  buttonContainer: {
    flexDirection: 'row',  // Sắp xếp các nút theo chiều ngang
    justifyContent: 'space-around',  // Giãn cách các nút
    padding: 10,  // Khoảng cách quanh các nút
  },
});

export default CartScreen;
