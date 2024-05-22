import axios from "axios";
const API_URL = `https://raccoonjpdaikou-e072c4b9d9a2.herokuapp.com/api/`;

class GuestService {
  rate() {
    return axios.get(API_URL + "rate");
  }
  info() {
    return axios.get(API_URL + "info");
  }
  comment(comment, display) {
    return axios.post(API_URL + "comment", { comment, display });
  }
  reply() {
    return axios.get(API_URL + "reply");
  }
}

export default new GuestService();
