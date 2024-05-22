import axios from "axios";
let token;
if (localStorage.getItem("raccoon")) {
  token = JSON.parse(localStorage.getItem("raccoon")).token;
} else {
  token = "";
}
axios.defaults.headers.common["Authorization"] = token;
const API_URL = `https://raccoonjpdaikou-e072c4b9d9a2.herokuapp.com/api/admin/user`;

class UserService {
  get() {
    return axios.get(API_URL, { token });
  }
  delete(_id) {
    return axios.delete(API_URL + "/" + _id, { token });
  }
}

export default new UserService();
