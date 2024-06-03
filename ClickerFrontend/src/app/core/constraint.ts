const baseUrl = 'http://localhost:5206/api';

export const apiEndpoint = {
  AuthEndPoint: {
    login: `${baseUrl}/Auth/Login`,
    register: `${baseUrl}/Auth/Register`,
    validateToken: `${baseUrl}/Auth/ValidateToken`
  },
  UserEndPoint: {
    addUser: `${baseUrl}/User/AddUser`,
    getUserById: `${baseUrl}/User/GetUserById`,
    getAllUsers: `${baseUrl}/User/GetAllUsers`,
    deleteUser: `${baseUrl}/User/DeleteUser`
  },
};
