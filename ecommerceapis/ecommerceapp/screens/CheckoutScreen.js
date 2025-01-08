import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { getCartProducts } from '../utils/api'; // Hàm lấy giỏ hàng
import { processPayment } from '../utils/paymentAPI'; // Giả sử có một API xử lý thanh toán (PayPal, Stripe, ZaloPay, Momo)

const CheckoutScreen = () => {
  const [cartItems, setCartItems] = useState([]);  // Danh sách sản phẩm trong giỏ hàng
  const [totalAmount, setTotalAmount] = useState(0); // Tổng tiền giỏ hàng
  const [paymentMethod, setPaymentMethod] = useState(''); // Phương thức thanh toán

  // Hàm tính tổng tiền giỏ hàng
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Lấy sản phẩm trong giỏ hàng
  useEffect(() => {
    const fetchCartItems = async () => {
      const { products } = await getCartProducts(1, 20); // Giả sử lấy tất cả sản phẩm trong giỏ hàng
      setCartItems(products);
      setTotalAmount(calculateTotal(products)); // Cập nhật tổng tiền giỏ hàng
    };
    
    fetchCartItems();
  }, []);

  // Hàm xử lý thanh toán
  const handlePayment = async () => {
    if (!paymentMethod) {
      Alert.alert('Thông báo', 'Vui lòng chọn phương thức thanh toán!');
      return;
    }

    try {
      const response = await processPayment(paymentMethod, totalAmount);
      if (response.status === 'success') {
        Alert.alert('Thanh toán thành công!', 'Cảm ơn bạn đã mua sắm!');
      } else {
        Alert.alert('Lỗi thanh toán', 'Có lỗi xảy ra trong quá trình thanh toán!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi hệ thống', 'Không thể xử lý thanh toán.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>

      <Text style={styles.total}>Tổng tiền: {totalAmount} VND</Text>

      <Text style={styles.subtitle}>Chọn phương thức thanh toán</Text>
      <Button title="Thanh toán tiền mặt khi nhận hàng" onPress={() => setPaymentMethod('cash_on_delivery')} />
      <Button title="Thanh toán ZaloPay" onPress={() => setPaymentMethod('zalopay')} />
      <Button title="Thanh toán Momo" onPress={() => setPaymentMethod('momo')} />

      <Button title="Xác nhận thanh toán" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default CheckoutScreen;
