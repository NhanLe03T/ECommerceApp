// Các hàm gọi API ( test api như get,post,...)
export const registerUser = async (username, password, avatar, role) => {
    try {
      // gọi API đăng ký
      return { status: 'success', username, role };  // Trả về dữ liệu khi đăng ký thành công
    } catch (error) {
      return { status: 'error', message: 'Registration thất bại!' };  // Trả về lỗi khi đăng ký thất bại
    }
  };
  
  export const loginUser = async (username, password) => {
    try {
      // gọi API đăng nhập
      return { status: 'success', role: 'user' };  // Trả về dữ liệu khi đăng nhập thành công
    } catch (error) {
      return { status: 'error', message: 'Login thất bại!' };  // Trả về lỗi khi đăng nhập thất bại
    }
  };
  