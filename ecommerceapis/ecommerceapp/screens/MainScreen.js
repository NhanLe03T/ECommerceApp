// File: screens/MainScreen.js - Màn hình hiển thị danh sách sản phẩm

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Picker,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Điều hướng giữa các màn hình
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thư viện lưu trữ cục bộ
import { getProducts } from '../utils/api'; // API lấy danh sách sản phẩm
import ProductCard from '../components/ProductCard'; // Component hiển thị sản phẩm
import NavigationBar from '../components/NavigationBar'; // Thanh điều hướng

const MainScreen = () => {
  // State quản lý
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [searchQuery, setSearchQuery] = useState(''); // Từ khóa tìm kiếm
  const [page, setPage] = useState(1); // Trang hiện tại
  const [loading, setLoading] = useState(false); // Trạng thái đang tải
  const [hasMore, setHasMore] = useState(true); // Còn dữ liệu hay không
  const [role, setRole] = useState(null); // Vai trò người dùng
  const [filter, setFilter] = useState({ minPrice: '', maxPrice: '', store: '' }); // Bộ lọc
  const [sortBy, setSortBy] = useState('name'); // Tiêu chí sắp xếp: "name" hoặc "price"

  const navigation = useNavigation(); // Điều hướng

  // Lấy vai trò người dùng
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const parsedData = JSON.parse(userData);
        setRole(parsedData?.role || 'user'); // Mặc định là "user"
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserRole();
  }, []);

  // Hàm lấy sản phẩm từ API
  const fetchProducts = async (page = 1) => {
    if (loading || !hasMore) return; // Dừng nếu đang tải hoặc hết dữ liệu
    setLoading(true);

    try {
      const { products: newProducts } = await getProducts(page, 20, searchQuery, filter, sortBy); // API trả về danh sách sản phẩm
      if (newProducts.length < 20) {
        setHasMore(false); // Nếu số sản phẩm ít hơn 20 thì không còn dữ liệu
      }
      setProducts((prevProducts) => [...prevProducts, ...newProducts]); // Thêm sản phẩm mới vào danh sách
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Tải dữ liệu mỗi khi thay đổi các điều kiện
  useEffect(() => {
    setProducts([]); // Reset danh sách sản phẩm
    setPage(1); // Reset về trang đầu
    setHasMore(true); // Bật tải dữ liệu
    fetchProducts(1); // Gọi API lấy dữ liệu
  }, [searchQuery, filter, sortBy]);

  // Hàm tìm kiếm
  const handleSearch = (text) => {
    setSearchQuery(text); // Cập nhật từ khóa tìm kiếm
  };

  // Hàm tải thêm dữ liệu
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1); // Tăng trang
    }
  };

  // Hàm cập nhật bộ lọc
  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value })); // Cập nhật bộ lọc
  };

  // Hàm chọn sắp xếp
  const handleSortChange = (value) => {
    setSortBy(value); // Cập nhật tiêu chí sắp xếp
  };

  // Hàm hiển thị sản phẩm
  const renderProduct = ({ item }) => (
    <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        value={searchQuery}
        onChangeText={handleSearch} // Xử lý tìm kiếm
        placeholder="Tìm sản phẩm..."
        style={styles.searchInput}
      />

      {/* Bộ lọc sản phẩm */}
      <View style={styles.filterContainer}>
        <TextInput
          placeholder="Giá thấp nhất"
          value={filter.minPrice}
          onChangeText={(value) => handleFilterChange('minPrice', value)}
          keyboardType="numeric"
          style={styles.filterInput}
        />
        <TextInput
          placeholder="Giá cao nhất"
          value={filter.maxPrice}
          onChangeText={(value) => handleFilterChange('maxPrice', value)}
          keyboardType="numeric"
          style={styles.filterInput}
        />
        <TextInput
          placeholder="Tên cửa hàng"
          value={filter.store}
          onChangeText={(value) => handleFilterChange('store', value)}
          style={styles.filterInput}
        />
      </View>

      {/* Sắp xếp sản phẩm */}
      <View style={styles.sortContainer}>
        <Text>Sắp xếp theo:</Text>
        <Picker selectedValue={sortBy} onValueChange={handleSortChange} style={styles.sortPicker}>
          <Picker.Item label="Tên" value="name" />
          <Picker.Item label="Giá" value="price" />
        </Picker>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()} // đảm bảo mỗi sản phẩm có key duy nhất
        onEndReached={loadMore} // gọi hàm loadmore
        onEndReachedThreshold={0.5} // kích hoạt khi cuộn đến 50% danh sách
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />} // hiển thị loading khi tải
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
    backgroundColor: '#f7f7f7',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterInput: {
    width: '30%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  sortPicker: {
    flex: 1,
    marginLeft: 10,
  },
});

export default MainScreen;
