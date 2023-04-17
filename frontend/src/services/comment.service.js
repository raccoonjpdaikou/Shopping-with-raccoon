import axios from "axios";
const API_URL = `${process.env.REACT_APP_SERVER_CONNECTION}admin/comment`;
let token;
if (localStorage.getItem("raccoon")) {
  token = JSON.parse(localStorage.getItem("raccoon")).token;
} else {
  token = "";
}
axios.defaults.headers.common["Authorization"] = token;

class CommentService {
  get() {
    return axios.get(API_URL, {}, { token });
  }
  patch(_id, comment, display, reply) {
    return axios.patch(
      API_URL + "/" + _id,
      { comment, display, reply },
      { token }
    );
  }
  delete(_id) {
    return axios.delete(API_URL + "/" + _id, { token });
  }
}

export default new CommentService();
