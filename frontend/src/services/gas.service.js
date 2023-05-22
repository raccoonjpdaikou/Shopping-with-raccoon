import axios from "axios";
const API_URL = `${process.env.REACT_APP_SERVER_CONNECTION}gas`;

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
