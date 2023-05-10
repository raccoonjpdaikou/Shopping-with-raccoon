import axios from "axios";
let token;
if (localStorage.getItem("raccoon")) {
  token = JSON.parse(localStorage.getItem("raccoon")).token;
} else {
  token = "";
}
axios.defaults.headers.common["Authorization"] = token;
const API_URL = `${process.env.REACT_APP_SERVER_CONNECTION}admin/rate`;

class RateService {
  post(rate) {
    return axios.post(API_URL, { rate }, { token });
  }
  delete() {
    return axios.delete(API_URL, {}, { token });
  }
}

export default new RateService();
