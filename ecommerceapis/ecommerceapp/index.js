import { AppRegistry } from 'react-native'; // Import AppRegistry từ react-native
import App from './App'; // Import App.js
import { name as appName } from './app.json'; // Import tên ứng dụng từ app.json

// Đăng ký ứng dụng với AppRegistry
AppRegistry.registerComponent(appName, () => App);
