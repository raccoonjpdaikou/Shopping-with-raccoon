import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVER_CONNECTION}user`;

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
