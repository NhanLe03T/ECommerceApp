import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thư viện lưu trữ vai trò người dùng
import { getProducts } from '../utils/api'; // Hàm gọi API để lấy danh sách sản phẩm
import ProductCard from '../components/ProductCard'; // Component hiển thị sản phẩm
import NavigationBar from '../components/NavigationBar'; // Component thanh điều hướng dưới

const MainScreen = () => {
  // State lưu trữ danh sách sản phẩm
  const [products, setProducts] = useState([]);
  // State lưu từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');
  // State lưu trang hiện tại (phục vụ phân trang)
  const [page, setPage] = useState(1);
  // State kiểm soát trạng thái đang tải dữ liệu
  const [loading, setLoading] = useState(false);
  // State kiểm soát xem còn sản phẩm để tải thêm hay không
  const [hasMore, setHasMore] = useState(true);
  // State lưu vai trò của người dùng (lấy từ AsyncStorage)
  const [role, setRole] = useState(null);

  // Hàm lấy vai trò người dùng từ bộ nhớ cục bộ
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData'); // Lấy dữ liệu từ AsyncStorage
        const parsedData = JSON.parse(userData); // Parse dữ liệu JSON
        setRole(parsedData?.role || 'user'); // Gán vai trò mặc định là user
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error); 
      }
    };

    fetchUserRole(); 
  }, []);

  // Hàm lấy danh sách sản phẩm từ API
  const fetchProducts = async (page = 1) => {
    if (loading || !hasMore) return; // nếu đang load thì klgi

    setLoading(true); // Bật trạng thái loading
    try {
      const { products: newProducts, total } = await getProducts(page, 20, searchQuery); // Gọi API lấy sản phẩm

      if (newProducts.length < 20) {
        setHasMore(false); // Nếu trả về ít hơn 20 sản phẩm, ngừng phân trang
      }

      setProducts((prevProducts) => [...prevProducts, ...newProducts]); // Thêm sản phẩm mới vào danh sách
    } catch (error) {
      console.error(error); // Log lỗi nếu xảy ra
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  // Gọi hàm fetchProducts khi component được mount hoặc khi trang/từ khóa thay đổi
  useEffect(() => {
    fetchProducts(page); // Gọi hàm fetchProducts
  }, [page, searchQuery]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (text) => {
    setSearchQuery(text); // Cập nhật từ khóa tìm kiếm
    setPage(1); // Đặt lại trang về 1
    setHasMore(true); // Cho phép tải thêm dữ liệu
    setProducts([]); // Reset danh sách sản phẩm hiện tại
  };

  // Hàm xử lý khi cuộn đến cuối danh sách để tải thêm
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1); // Tăng số trang lên
    }
  };

  // Render từng sản phẩm trong danh sách
  const renderProduct = ({ item }) => <ProductCard product={item} />;

  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm sản phẩm */}
      <TextInput
        value={searchQuery}
        onChangeText={handleSearch} // Gọi hàm khi nhập từ khóa
        placeholder="Tìm sản phẩm..." // Văn bản gợi ý
        style={styles.searchInput} // Áp dụng style
      />

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products} // Dữ liệu sản phẩm
        renderItem={renderProduct} // Hàm render từng item
        keyExtractor={(item) => item.id.toString()} // Khóa duy nhất cho mỗi item
        onEndReached={loadMore} // Gọi loadMore khi cuộn đến cuối
        onEndReachedThreshold={0.5} // Kích hoạt loadMore khi cuộn đến 50% cuối
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        } // Hiển thị loading indicator khi đang tải
      />

      {/* Thanh điều hướng dưới */}
      <NavigationBar role={role} /> {/* Truyền role để hiển thị nút phù hợp */}
    </View>
  );
};

// Style cho MainScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Màu nền
    paddingTop: 20, // Khoảng cách trên
  },
  searchInput: {
    height: 40, // Chiều cao ô tìm kiếm
    borderColor: '#ccc', // Màu viền
    borderWidth: 1, // Độ dày viền
    margin: 10, // Khoảng cách xung quanh
    paddingLeft: 10, // Khoảng cách nội dung bên trái
    borderRadius: 5, // Bo tròn góc
    backgroundColor: '#fff', // Màu nền ô tìm kiếm
  },
});

export default MainScreen;
