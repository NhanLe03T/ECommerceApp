// NavigationBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavigationBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Thông báo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Lịch sử giao dịch</Text>
      </TouchableOpacity>
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
