import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Để điều hướng giữa các màn hình

const NavigationBar = ({ role }) => {
  const navigation = useNavigation(); // Hook điều hướng từ React Navigation

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

      {/* Nút Cửa hàng, chỉ hiển thị khi người dùng có role là 'seller' */}
      {role === 'seller' && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Store')} // Điều hướng đến màn hình cửa hàng
        >
          <Text style={styles.buttonText}>Cửa hàng</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5, // Để có hiệu ứng bóng
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default NavigationBar;
