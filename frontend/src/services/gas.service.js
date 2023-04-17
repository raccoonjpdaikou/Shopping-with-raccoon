import axios from "axios";
const API_URL =
  "https://script.google.com/macros/s/AKfycbzYgTg66ZG3KbkzxaFSvuieh4MT_SX2IK79Q8Qa727bYkEIDpP0moeW76vf_ZN8eQU/exec?uid=";

class GasService {
  get(user_id) {
    return axios.get(API_URL + user_id, {});
  }
}

export default new GasService();
