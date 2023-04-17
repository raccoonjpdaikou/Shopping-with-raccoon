import axios from "axios";
const API_URL = `${process.env.REACT_APP_SERVER_CONNECTION}`;

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
