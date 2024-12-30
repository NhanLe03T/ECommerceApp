// ShopForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const ShopForm = ({ onSubmit }) => {
  const [storeName, setStoreName] = useState(''); // State để lưu tên cửa hàng

  const handleChange = (text) => {
    setStoreName(text); // Cập nhật tên cửa hàng
  };

  const handleSubmit = () => {
    if (storeName.trim() !== '') {
      onSubmit(storeName); // Gửi tên cửa hàng lên màn hình chính
    } else {
      alert("Tên cửa hàng không được để trống!");
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        value={storeName}
        onChangeText={handleChange}
        placeholder="Nhập tên cửa hàng"
      />
      <Button title="Lưu tên cửa hàng" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default ShopForm;
