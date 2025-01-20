import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  Modal, 
  TextInput as RNTextInput 
} from 'react-native';
import { getProducts } from '../utils/api'; // API lấy sản phẩm
import ProductCard from '../components/ProductCard'; // Card sản phẩm
import NavigationBar from '../components/NavigationBar'; // Thanh điều hướng dưới
import AvatarPicker from '../components/AvatarPicker'; // Component chọn hình ảnh

const ShopSellerScreen = () => {
  const [storeName, setStoreName] = useState(''); // Tên cửa hàng
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [page, setPage] = useState(1); // Trang hiện tại
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn sản phẩm để load không
  const [searchQuery, setSearchQuery] = useState(''); // Từ khóa tìm kiếm
  const [isAdding, setIsAdding] = useState(false); // Trạng thái thêm sản phẩm
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' }); // Thông tin sản phẩm mới
  const [selectedProducts, setSelectedProducts] = useState([]); // Danh sách sản phẩm được chọn
  const [isSelectMode, setIsSelectMode] = useState(false); // Trạng thái chọn sản phẩm
  const [isStatsVisible, setIsStatsVisible] = useState(false); // Hiển thị thống kê
  const [statistics, setStatistics] = useState(null); // Dữ liệu thống kê

  // Hàm lấy sản phẩm từ API
  const fetchProducts = async (page = 1) => {
    if (loading || !hasMore) return; // Nếu đang load hoặc không còn sản phẩm để load thì không gọi API

    setLoading(true);
    try {
      const { products: newProducts } = await getProducts(page, 20, searchQuery);

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

  // Hàm lấy thống kê doanh thu
  const fetchStatistics = async () => {
    try {
      const data = await getStatistics(); // API trả về thống kê theo tháng, quý, năm
      setStatistics(data);
    } catch (error) {
      console.error(error);
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

  // Hàm thêm sản phẩm
  const handleAddProduct = () => {
    const newId = Math.random().toString(); // Tạo ID ngẫu nhiên
    setProducts((prev) => [
      ...prev,
      { id: newId, name: newProduct.name, price: newProduct.price, image: newProduct.image },
    ]);
    setIsAdding(false);
    setNewProduct({ name: '', price: '', image: '' });
  };

  // Hàm chọn/xóa sản phẩm
  const toggleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Hàm xóa sản phẩm
  const handleDeleteProducts = () => {
    setProducts((prev) => prev.filter((product) => !selectedProducts.includes(product.id)));
    setSelectedProducts([]);
    setIsSelectMode(false);
  };

  // Render một sản phẩm trong danh sách
  const renderProduct = ({ item }) => {
    const isSelected = selectedProducts.includes(item.id);
    return (
      <TouchableOpacity
        onLongPress={() => setIsSelectMode(true)} // Chuyển sang chế độ chọn sản phẩm
        onPress={() => (isSelectMode ? toggleSelectProduct(item.id) : null)} // Chọn sản phẩm
        style={[
          styles.productCard,
          isSelected && styles.selectedCard, // Đổi màu nền nếu được chọn
        ]}
      >
        <ProductCard product={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Nếu chưa có tên cửa hàng, hiển thị form để nhập */}
      {!storeName ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={storeName}
            onChangeText={setStoreName}
            placeholder="Nhập tên cửa hàng"
          />
          <Button title="Lưu tên cửa hàng" onPress={() => storeName.trim() && fetchProducts(page)} />
        </View>
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

          {/* Nút thêm/xóa sản phẩm và thống kê */}
          <View style={styles.buttonContainer}>
            <Button title="Thêm sản phẩm" onPress={() => setIsAdding(true)} />
            {isSelectMode && <Button title="Hủy" onPress={() => setIsSelectMode(false)} />}
            <Button
              title="Xóa sản phẩm"
              onPress={handleDeleteProducts}
              disabled={selectedProducts.length === 0}
            />
            <Button
              title="Xem thống kê"
              onPress={() => {
                setIsStatsVisible(true);
                fetchStatistics();
              }}
            />
          </View>

          {/* Hiển thị thống kê */}
          <Modal visible={isStatsVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <Text style={styles.statsTitle}>Thống kê doanh thu</Text>
              {statistics ? (
                <>
                  <Text>Tháng: {statistics.monthly} VND</Text>
                  <Text>Quý: {statistics.quarterly} VND</Text>
                  <Text>Năm: {statistics.annual} VND</Text>
                </>
              ) : (
                <ActivityIndicator size="large" color="#0000ff" />
              )}
              <Button title="Đóng" onPress={() => setIsStatsVisible(false)} />
            </View>
          </Modal>
        </>
      )}

      {/* Modal thêm sản phẩm */}
      <Modal visible={isAdding} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Thêm sản phẩm mới</Text>
          <RNTextInput
            placeholder="Tên sản phẩm"
            value={newProduct.name}
            onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
            style={styles.input}
          />
          <RNTextInput
            placeholder="Giá sản phẩm"
            value={newProduct.price}
            onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
            style={styles.input}
            keyboardType="numeric"
          />
          {/* AvatarPicker */}
          <AvatarPicker
            avatar={newProduct.image} // Đường dẫn ảnh sản phẩm
            setAvatar={(uri) => setNewProduct({ ...newProduct, image: uri })} // Cập nhật ảnh sản phẩm
          />
          <View style={styles.modalButtons}>
            <Button title="Hủy" onPress={() => setIsAdding(false)} />
            <Button title="Thêm" onPress={handleAddProduct} />
          </View>
        </View>
      </Modal>

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
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
  productCard: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedCard: {
    backgroundColor: '#d9f7be',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '80%',
    backgroundColor: '#f9f9f9',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
  

export default ShopSellerScreen;
