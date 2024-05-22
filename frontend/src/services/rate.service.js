import axios from "axios";
let token;
if (localStorage.getItem("raccoon")) {
  token = JSON.parse(localStorage.getItem("raccoon")).token;
} else {
  token = "";
}
axios.defaults.headers.common["Authorization"] = token;
const API_URL = `https://raccoonjpdaikou-e072c4b9d9a2.herokuapp.com/api/admin/rate`;

class RateService {
  post(rate) {
    return axios.post(API_URL, { rate }, { token });
  }
  delete() {
    return axios.delete(API_URL, {}, { token });
  }
}

export default new RateService();
