import axios from "axios";
const API_URL = `https://raccoonjpdaikou-e072c4b9d9a2.herokuapp.com/api/gas`;

class GasService {
  orderGet1(username) {
    return axios.post(API_URL + "/order1", {
      username,
    });
  }
  /*跟團 */
  orderGet2(username) {
    return axios.post(API_URL + "/order2", {
      username,
    });
  }

  /*現地*/
  orderGet3(username) {
    return axios.post(API_URL + "/order3", {
      username,
    });
  }
}

/* https://cors-anywhere.herokuapp.com/ */
/* https://crossorigin.me/ */

export default new GasService();
