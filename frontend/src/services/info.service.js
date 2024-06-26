import axios from "axios";
const API_URL = `https://raccoonjpdaikou-e072c4b9d9a2.herokuapp.com/api/admin/info`;
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
