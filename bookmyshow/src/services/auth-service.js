import axios from "axios";
export const API_BASE_URL = 'http://localhost:5000';

class AuthService {
  login(username, password) {
    return axios
      .post(API_BASE_URL + '/api/auth/signin', {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_BASE_URL + '/api/auth/signup', {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();