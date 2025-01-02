import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook điều hướng từ React Navigation

const NavigationBar = ({ role }) => {
  const navigation = useNavigation(); // Hook điều hướng

  return (
    <View style={styles.container}>
      {/* Nút Hồ sơ */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Profile')} // Điều hướng đến màn hình hồ sơ
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      {/* Nút Thông báo */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Notifications')} // Điều hướng đến màn hình thông báo
      >
        <Text style={styles.buttonText}>Thông báo</Text>
      </TouchableOpacity>

      {/* Nút Lịch sử giao dịch */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('TransactionHistory')} // Điều hướng đến màn hình lịch sử giao dịch
      >
        <Text style={styles.buttonText}>Lịch sử giao dịch</Text>
      </TouchableOpacity>

      {/* Nút Cửa hàng cho seller */}
      {role === 'seller' && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Store')} // Điều hướng đến màn hình cửa hàng
        >
          <Text style={styles.buttonText}>Cửa hàng</Text>
        </TouchableOpacity>
      )}

      {/* Nút Giỏ hàng cho user */}
      {role === 'user' && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Cart')} // Điều hướng đến màn hình giỏ hàng
        >
          <Text style={styles.buttonText}>Giỏ hàng</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Các nút sắp xếp theo hàng ngang
    justifyContent: 'space-around', // Căn đều các nút
    padding: 10,
    backgroundColor: '#fff', // Màu nền của thanh điều hướng
    elevation: 5, // Hiệu ứng bóng dưới thanh điều hướng
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
  button: {
    flex: 1, // Các nút có độ rộng đều
    alignItems: 'center', // Canh giữa nội dung trong nút
    padding: 10,
  },
  buttonText: {
    fontSize: 16, // Cỡ chữ của nút
    color: '#333', // Màu chữ
  },
});

export default NavigationBar;
