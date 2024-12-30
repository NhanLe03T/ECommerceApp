// NotificationsScreen.js - Màn hình logic của thông báo
// Đường dẫn: ./screens/NotificationsScreen.js

import React, { useState, useEffect } from 'react'; // React hooks
import NotificationsForm from '../components/NotificationsForm'; // Import form hiển thị thông báo

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]); // State danh sách thông báo

  // Effect để lấy thông báo từ API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Thay thế 'API_URL' bằng endpoint API backend thật
        const response = await fetch('API_URL'); // Gọi API lấy thông báo
        const data = await response.json(); // Chuyển đổi kết quả sang JSON
        setNotifications(data.notifications); // Lưu thông báo vào state
      } catch (error) {
        console.error('Lỗi khi gọi API thông báo:', error); // In lỗi nếu thất bại
      }
    };

    fetchNotifications(); // Gọi hàm lấy thông báo
  }, []); // Chỉ chạy một lần khi component được render lần đầu

  return <NotificationsForm notifications={notifications} />; // Truyền thông báo xuống form
};

export default NotificationsScreen;
