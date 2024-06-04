const baseUrl = 'http://localhost:5206/api';

export const apiEndpoint = {
  AuthEndPoint: {
    login: `${baseUrl}/Authorisation/Login`,
    register: `${baseUrl}/Authorisation/Register`,
    validateToken: `${baseUrl}/Auth/ValidateToken`
  },
  UserEndPoint: {
    addUser: `${baseUrl}/User/AddUser`,
    getUserById: `${baseUrl}/User/GetUserById`,
    getAllUsers: `${baseUrl}/User/GetAllUsers`,
    deleteUser: `${baseUrl}/User/DeleteUser`,
    updateUser: `${baseUrl}/User/UpdateUserUpgrades`
  },
};
