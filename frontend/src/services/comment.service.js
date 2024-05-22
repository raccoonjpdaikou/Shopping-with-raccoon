import axios from "axios";
const API_URL = `https://raccoonjpdaikou-e072c4b9d9a2.herokuapp.com/api/admin/comment`;
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
