// MainScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Button, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getProducts } from '../utils/api'; // API lấy sản phẩm
import ProductCard from '../components/ProductCard'; // Card sản phẩm
import NavigationBar from '../components/NavigationBar'; // Thanh điều hướng dưới

const MainScreen = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [searchQuery, setSearchQuery] = useState(''); // Từ khóa tìm kiếm
  const [page, setPage] = useState(1); // Trang hiện tại
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [hasMore, setHasMore] = useState(true); // Kiểm tra có còn sản phẩm để load không
  const [totalProducts, setTotalProducts] = useState(0); // Tổng số sản phẩm

  // Hàm lấy sản phẩm từ API
  const fetchProducts = async (page = 1) => {
    if (loading || !hasMore) return; // Nếu đang load hoặc không còn sản phẩm để load thì không gọi API

    setLoading(true);
    try {
      const { products: newProducts, total } = await getProducts(page, 20, searchQuery);

      if (newProducts.length < 20) {
        setHasMore(false); // Nếu sản phẩm trả về ít hơn 20 thì không còn dữ liệu để tải nữa
      }

      setTotalProducts(total); // Cập nhật tổng số sản phẩm
      setProducts((prevProducts) => [...prevProducts, ...newProducts]); // Thêm sản phẩm mới vào danh sách hiện tại
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect để load dữ liệu ban đầu
  useEffect(() => {
    fetchProducts(page);
  }, [page, searchQuery]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (text) => {
    setSearchQuery(text);
    setPage(1); // Nếu tìm kiếm thì về trang 1
    setHasMore(true); // Khi tìm kiếm lại thì có thể tải thêm
    setProducts([]); // Reset lại danh sách sản phẩm
  };

  // Hàm load thêm khi cuộn xuống
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1); // Tăng trang lên để load sản phẩm tiếp theo
    }
  };

  // Render một sản phẩm trong danh sách
  const renderProduct = ({ item }) => {
    return <ProductCard product={item} />;
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Tìm sản phẩm..."
        style={styles.searchInput}
      />

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore} // Gọi loadMore khi người dùng cuộn đến cuối
        onEndReachedThreshold={0.5} // Khi nào cuộn đến 50% cuối list thì load thêm
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null} // Hiển thị loading indicator khi đang tải thêm
      />

      {/* Thanh điều hướng dưới */}
      <NavigationBar />
    </View>
  );
};

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
});

export default MainScreen;
