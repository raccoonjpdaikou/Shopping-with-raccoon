import axios from "axios";
const API_URL = `${process.env.REACT_APP_SERVER_CONNECTION}`;

class GasService {
  orderGet1(user_id) {
    return axios.get(API_URL + "?uid=" + user_id);
  }
  /*  orderGet1(user_id) {
    return axios.get(
      "https://script.google.com/macros/s/AKfycbyvjLtLKOiHiZA_TYLZg6xKflV0UyJBOdkIDCPQ1B00oT8knEHBlz60xNkhhmBuyTfWiQ/exec?uid=" +
        user_id
    );
  } */
  /*跟團 */
  orderGet2(user_id) {
    return axios.get(
      "https://script.google.com/macros/s/AKfycbzYgTg66ZG3KbkzxaFSvuieh4MT_SX2IK79Q8Qa727bYkEIDpP0moeW76vf_ZN8eQU/exec?uid=" +
        user_id
    );
  }
  /*現地*/
  orderGet3(user_id) {
    return axios.get(
      "https://script.google.com/macros/s/AKfycbziVmtE-ysNtsceAgSLHZgGcb8TYhT3GnTYDRD8pc4sO6vcL-E0QC998lkHkHyyoPUi/exec?uid=" +
        user_id
    );
  }
}

export default new GasService();
