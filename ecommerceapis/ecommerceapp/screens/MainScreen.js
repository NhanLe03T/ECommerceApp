import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thư viện lưu trữ vai trò người dùng
import { getProducts } from '../utils/api'; // API lấy sản phẩm
import ProductCard from '../components/ProductCard'; // Component hiển thị sản phẩm
import NavigationBar from '../components/NavigationBar'; // Thanh điều hướng dưới

const MainScreen = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [searchQuery, setSearchQuery] = useState(''); // Từ khóa tìm kiếm
  const [page, setPage] = useState(1); // Trang hiện tại (dùng phân trang)
  const [loading, setLoading] = useState(false); // Trạng thái đang tải dữ liệu
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn sản phẩm để tải hay không
  const [role, setRole] = useState(null); // Vai trò người dùng (user hoặc seller)

  // Lấy vai trò người dùng từ bộ nhớ cục bộ
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const parsedData = JSON.parse(userData);
        setRole(parsedData?.role || 'user'); // Mặc định là user
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserRole();
  }, []);

  // Hàm lấy danh sách sản phẩm từ API
  const fetchProducts = async (page = 1) => {
    if (loading || !hasMore) return; // Nếu đang tải hoặc không còn sản phẩm để tải
    setLoading(true); // Bật trạng thái loading
    try {
      const { products: newProducts } = await getProducts(page, 20, searchQuery); // Lấy sản phẩm từ API
      if (newProducts.length < 20) {
        setHasMore(false); // Nếu ít hơn 20 sản phẩm, không cần tải thêm
      }
      setProducts((prevProducts) => [...prevProducts, ...newProducts]); // Thêm sản phẩm mới vào danh sách
    } catch (error) {
      console.error(error); // Xử lý lỗi
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  // Gọi fetchProducts khi page hoặc searchQuery thay đổi
  useEffect(() => {
    fetchProducts(page);
  }, [page, searchQuery]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (text) => {
    setSearchQuery(text); // Cập nhật từ khóa tìm kiếm
    setPage(1); // Reset lại trang về 1 khi tìm kiếm
    setHasMore(true); // Cho phép tải thêm sản phẩm
    setProducts([]); // Reset danh sách sản phẩm
  };

  // Hàm tải thêm khi cuộn xuống
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1); // Tăng số trang lên để tải thêm sản phẩm
    }
  };

  // Hàm render từng sản phẩm
  const renderProduct = ({ item }) => (
    <ProductCard product={item} /> // Gọi component ProductCard để hiển thị từng sản phẩm
  );

  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm sản phẩm */}
      <TextInput
        value={searchQuery}
        onChangeText={handleSearch} // Cập nhật từ khóa tìm kiếm
        placeholder="Tìm sản phẩm..."
        style={styles.searchInput} // Áp dụng style cho ô tìm kiếm
      />

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products} // Dữ liệu sản phẩm
        renderItem={renderProduct} // Hàm render từng sản phẩm
        keyExtractor={(item) => item.id.toString()} // Khóa duy nhất cho mỗi sản phẩm
        onEndReached={loadMore} // Tải thêm sản phẩm khi cuộn đến cuối
        onEndReachedThreshold={0.5} // Kích hoạt khi cuộn 50% cuối danh sách
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null} // Hiển thị loading nếu đang tải
      />

      {/* Thanh điều hướng dưới */}
      <NavigationBar role={role} /> {/* Truyền vai trò để hiển thị nút phù hợp */}
    </View>
  );
};

// Style cho MainScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Màu nền cho màn hình
    paddingTop: 20, // Khoảng cách từ trên cùng
  },
  searchInput: {
    height: 40, // Chiều cao ô tìm kiếm
    borderColor: '#ccc', // Màu viền
    borderWidth: 1, // Độ dày viền
    margin: 10, // Khoảng cách xung quanh ô tìm kiếm
    paddingLeft: 10, // Khoảng cách bên trái trong ô tìm kiếm
    borderRadius: 5, // Bo góc
    backgroundColor: '#fff', // Màu nền ô tìm kiếm
  },
});

export default MainScreen;
