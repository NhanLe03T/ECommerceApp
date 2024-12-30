// ShopSellerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getProducts } from '../utils/api'; // API lấy sản phẩm
import ProductCard from '../components/ProductCard'; // Card sản phẩm
import ShopForm from '../forms/ShopForm'; // Form nhập tên cửa hàng
import NavigationBar from '../components/NavigationBar'; // Thanh điều hướng dưới

const ShopSellerScreen = () => {
  const [storeName, setStoreName] = useState(''); // Tên cửa hàng
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [page, setPage] = useState(1); // Trang hiện tại
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn sản phẩm để load không
  const [searchQuery, setSearchQuery] = useState(''); // Từ khóa tìm kiếm

  // Hàm lấy sản phẩm từ API
  const fetchProducts = async (page = 1) => {
    if (loading || !hasMore) return; // Nếu đang load hoặc không còn sản phẩm để load thì không gọi API

    setLoading(true);
    try {
      const { products: newProducts, total } = await getProducts(page, 20, searchQuery);

      if (newProducts.length < 20) {
        setHasMore(false); // Nếu sản phẩm trả về ít hơn 20 thì không còn dữ liệu để tải nữa
      }

      setProducts((prevProducts) => [...prevProducts, ...newProducts]); // Thêm sản phẩm mới vào danh sách hiện tại
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect để load dữ liệu ban đầu
  useEffect(() => {
    if (storeName) {
      fetchProducts(page); // Nếu đã có tên cửa hàng, mới load sản phẩm
    }
  }, [page, searchQuery, storeName]);

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
      {/* Nếu chưa có tên cửa hàng, hiển thị form để nhập */}
      {!storeName ? (
        <ShopForm onSubmit={(name) => setStoreName(name)} />
      ) : (
        <>
          {/* Hiển thị tên cửa hàng */}
          <Text style={styles.storeName}>{storeName}</Text>

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

          {/* Hai nút Thêm và Xóa sản phẩm */}
          <View style={styles.buttonContainer}>
            <Button title="Thêm sản phẩm" onPress={() => console.log('Thêm sản phẩm')} />
            <Button title="Xóa sản phẩm" onPress={() => console.log('Xóa sản phẩm')} />
          </View>
        </>
      )}

      {/* Thanh điều hướng dưới */}
      <NavigationBar role="seller" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 20,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default ShopSellerScreen;
