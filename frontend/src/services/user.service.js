import axios from "axios";
let token;
if (localStorage.getItem("raccoon")) {
  token = JSON.parse(localStorage.getItem("raccoon")).token;
} else {
  token = "";
}
axios.defaults.headers.common["Authorization"] = token;
const API_URL = `http://localhost:8080/api/admin/user`;

class UserService {
  get() {
    return axios.get(API_URL, { token });
  }
  delete(_id) {
    return axios.delete(API_URL + "/" + _id, { token });
  }
}

export default new UserService();
