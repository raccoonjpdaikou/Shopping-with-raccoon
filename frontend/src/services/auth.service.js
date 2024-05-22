import axios from "axios";

const API_URL = `https://raccoonjpdaikou-e072c4b9d9a2.herokuapp.com/api/user`;

class AuthService {
  register(username, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      password,
      role,
    });
  }
  login(username, password) {
    return axios.post(API_URL + "/login", {
      username,
      password,
    });
  }
  logout() {
    localStorage.removeItem("raccoon");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("raccoon"));
  }
  check(username) {
    return axios.post(API_URL + "/check", {
      username,
    });
  }
}

export default new AuthService();
