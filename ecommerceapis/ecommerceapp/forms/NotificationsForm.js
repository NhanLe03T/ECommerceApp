// NotificationsForm.js - Form hiển thị danh sách thông báo
// Đường dẫn: ./components/NotificationsForm.js

import React from 'react'; // Import React
import { View, FlatList, Text, StyleSheet } from 'react-native'; // Import các component cơ bản

// Component để render một thông báo
const NotificationItem = ({ notification }) => {
  return (
    <View style={styles.notificationBox}>
      <Text style={styles.notificationContent}>{notification.content}</Text> {/* Nội dung thông báo */}
      <Text style={styles.notificationTime}>{notification.time}</Text> {/* Thời gian nhận thông báo */}
    </View>
  );
};

// Form hiển thị danh sách thông báo
const NotificationsForm = ({ notifications }) => {
  return (
    <View style={styles.container}> {/* Container chính */}
      <FlatList
        data={notifications} // Dữ liệu thông báo
        renderItem={({ item }) => <NotificationItem notification={item} />} // Render từng thông báo
        keyExtractor={(item) => item.id.toString()} // Khóa duy nhất
        contentContainerStyle={styles.list} // Style cho container của danh sách
      />
    </View>
  );
};

// Style cho các thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    padding: 16,
  },
  notificationBox: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  notificationContent: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  notificationTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
});

export default NotificationsForm;
