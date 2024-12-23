// api.js
export const registerUser = async (username, password, avatar, role) => {
  try {
    // Gọi API đăng ký người dùng
    console.log('Đăng ký', { username, password, avatar, role });
    return { status: 'success', username, role }; // Trả về dữ liệu khi đăng ký thành công
  } catch (error) {
    return { status: 'error', message: 'Registration thất bại!' }; // Trả về lỗi khi đăng ký thất bại
  }
};

export const loginUser = async (username, password) => {
  try {
    // Gọi API đăng nhập
    console.log('Đăng nhập', { username, password });
    return { status: 'success', role: 'user' }; // Trả về dữ liệu khi đăng nhập thành công
  } catch (error) {
    return { status: 'error', message: 'Login thất bại!' }; // Trả về lỗi khi đăng nhập thất bại
  }
};

const API_URL = 'https://your-backend-api.com/products';  // Thay bằng URL của backend
// Hàm gọi API để lấy danh sách sản phẩm (có phân trang và tìm kiếm)
export const getProducts = async (page = 1, limit = 20, searchQuery = '') => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}&search=${searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Định dạng JSON
      },
    });

    if (!response.ok) {
      throw new Error('Không thể lấy sản phẩm từ server');
    }

    const data = await response.json();
    const { products, total } = data; // Sản phẩm và tổng số sản phẩm

    return {
      products,
      total, // Tổng số sản phẩm để phân trang
    };
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    return { products: [], total: 0 }; // Trả về mảng sản phẩm rỗng nếu có lỗi
  }
};

