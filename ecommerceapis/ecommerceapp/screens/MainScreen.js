// MainScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Picker,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import NavigationBar from '../components/NavigationBar';

// State quản lý
const MainScreen = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [searchQuery, setSearchQuery] = useState(''); // Từ khóa tìm kiếm
  const [page, setPage] = useState(1); // Trang hiện tại
  const [loading, setLoading] = useState(false); // Trạng thái đang tải
  const [hasMore, setHasMore] = useState(true); // Còn dữ liệu hay không
  const [role, setRole] = useState(null); // Vai trò người dùng
  const [filter, setFilter] = useState({ minPrice: '', maxPrice: '', store: '' }); // Bộ lọc
  const [sortBy, setSortBy] = useState('name'); // Tiêu chí sắp xếp
  const [comparisonList, setComparisonList] = useState([]); // Danh sách so sánh
  const [showComparison, setShowComparison] = useState(false); // Hiển thị modal so sánh

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const parsedData = JSON.parse(userData);
        setRole(parsedData?.role || 'user');
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserRole();
  }, []);

  const fetchProducts = async (page = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const { products: newProducts } = await getProducts(page, 20, searchQuery, filter, sortBy);
      if (newProducts.length < 20) {
        setHasMore(false);
      }
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [searchQuery, filter, sortBy]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Thêm sản phẩm vào danh sách so sánh
  const handleAddToCompare = (product) => {
    setComparisonList((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev; // Nếu đã có thì không thêm
      return [...prev, product];
    });
  };

  // Xóa sản phẩm khỏi danh sách so sánh
  const handleRemoveFromCompare = (productId) => {
    setComparisonList((prev) => prev.filter((item) => item.id !== productId));
  };

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      onCompare={handleAddToCompare} // Thêm callback xử lý so sánh
    />
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Tìm sản phẩm..."
        style={styles.searchInput}
      />

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

      <View style={styles.sortContainer}>
        <Text>Sắp xếp theo:</Text>
        <Picker selectedValue={sortBy} onValueChange={handleSortChange} style={styles.sortPicker}>
          <Picker.Item label="Tên" value="name" />
          <Picker.Item label="Giá" value="price" />
        </Picker>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
      />

      {/* Hiển thị danh sách so sánh */}
      <TouchableOpacity onPress={() => setShowComparison(true)}>
        <Text style={styles.compareButton}>Xem so sánh ({comparisonList.length})</Text>
      </TouchableOpacity>

      {showComparison && (
        <Modal visible={showComparison} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>So sánh sản phẩm</Text>
            <FlatList
              data={comparisonList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.compareItem}>
                  <Text>{item.name}</Text>
                  <Text>{item.price} VNĐ</Text>
                  <Text>⭐ {item.rating}/5</Text>
                  <TouchableOpacity onPress={() => handleRemoveFromCompare(item.id)}>
                    <Text style={styles.removeButton}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity onPress={() => setShowComparison(false)}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <NavigationBar role={role} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7', paddingTop: 20 },
  searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, margin: 10, paddingLeft: 10, borderRadius: 5, backgroundColor: '#fff' },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  filterInput: { width: '30%', borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 8, borderRadius: 5, backgroundColor: '#fff' },
  sortContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 10 },
  sortPicker: { flex: 1, marginLeft: 10 },
  compareButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, textAlign: 'center', color: '#fff', marginTop: 10 },
  modalContainer: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  compareItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  removeButton: { color: '#e60000' },
  closeButton: { backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: 10, borderRadius: 5, marginTop: 20 },
});

export default MainScreen;
