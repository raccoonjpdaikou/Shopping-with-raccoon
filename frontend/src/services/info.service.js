import axios from "axios";
const API_URL = `http://localhost:8080/api/admin/info`;
let token;
if (localStorage.getItem("raccoon")) {
  token = JSON.parse(localStorage.getItem("raccoon")).token;
} else {
  token = "";
}
axios.defaults.headers.common["Authorization"] = token;

class InfoService {
  post(title, content) {
    return axios.post(API_URL, { title, content }, { token });
  }
  patch(_id, title, content) {
    return axios.patch(API_URL + "/" + _id, { title, content }, { token });
  }
  delete(_id) {
    return axios.delete(API_URL + "/" + _id, { token });
  }
}

export default new InfoService();
