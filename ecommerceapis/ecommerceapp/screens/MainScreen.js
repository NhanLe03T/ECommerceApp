// File: screens/MainScreen.js - Màn hình hiển thị danh sách sản phẩm

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Dùng để điều hướng giữa các màn hình
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thư viện lưu trữ dữ liệu cục bộ
import { getProducts } from '../utils/api'; // API lấy danh sách sản phẩm
import ProductCard from '../components/ProductCard'; // Component hiển thị thông tin sản phẩm
import NavigationBar from '../components/NavigationBar'; // Thanh điều hướng dưới cùng

const MainScreen = () => {
  // State quản lý danh sách sản phẩm
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Từ khóa tìm kiếm
  const [page, setPage] = useState(1); // Trang hiện tại cho phân trang
  const [loading, setLoading] = useState(false); // Trạng thái đang tải dữ liệu
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn dữ liệu để tải không
  const [role, setRole] = useState(null); // Vai trò người dùng (user hoặc seller)

  const navigation = useNavigation(); // Lấy hàm điều hướng

  // Lấy vai trò người dùng từ bộ nhớ cục bộ
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const parsedData = JSON.parse(userData);
        setRole(parsedData?.role || 'user'); // Mặc định là 'user'
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserRole();
  }, []);

  // Hàm gọi API lấy danh sách sản phẩm
  const fetchProducts = async (page = 1) => {
    if (loading || !hasMore) return; // Dừng nếu đang tải hoặc không còn dữ liệu
    setLoading(true);
    try {
      const { products: newProducts } = await getProducts(page, 20, searchQuery); // API trả về danh sách sản phẩm
      if (newProducts.length < 20) {
        setHasMore(false); // Hết dữ liệu
      }
      setProducts((prevProducts) => [...prevProducts, ...newProducts]); // Thêm dữ liệu mới vào danh sách
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Kết thúc trạng thái tải
    }
  };

  // Lấy dữ liệu khi thay đổi trang hoặc từ khóa tìm kiếm
  useEffect(() => {
    fetchProducts(page);
  }, [page, searchQuery]);

  // Hàm xử lý khi nhập từ khóa tìm kiếm
  const handleSearch = (text) => {
    setSearchQuery(text); // Cập nhật từ khóa
    setPage(1); // Reset lại trang về đầu
    setHasMore(true); // Cho phép tải thêm dữ liệu
    setProducts([]); // Reset danh sách sản phẩm
  };

  // Hàm tải thêm dữ liệu khi cuộn xuống cuối danh sách
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1); // Tăng số trang
    }
  };

  // Hàm xử lý khi nhấn vào một sản phẩm
  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product }); // Điều hướng đến màn hình chi tiết sản phẩm
  };

  // Hàm render từng sản phẩm trong danh sách
  const renderProduct = ({ item }) => (
    <ProductCard product={item} onPress={() => handleProductPress(item)} />
  );

  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm */}
      <TextInput
        value={searchQuery}
        onChangeText={handleSearch} // Xử lý tìm kiếm khi nhập
        placeholder="Tìm sản phẩm..."
        style={styles.searchInput}
      />

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()} // Đảm bảo mỗi sản phẩm có một key duy nhất
        onEndReached={loadMore} // Gọi hàm tải thêm dữ liệu
        onEndReachedThreshold={0.5} // Kích hoạt khi cuộn đến 50% cuối danh sách
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null} // Hiển thị loading khi đang tải
      />

      {/* Thanh điều hướng */}
      <NavigationBar role={role} />
    </View>
  );
};

// Style của màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Màu nền
    paddingTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default MainScreen;
