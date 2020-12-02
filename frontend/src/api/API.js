import axios from "axios";

export default axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
  headers: {
    "Content-type": "application/json",
    //Authorization: `JWT ${sessionStorage.getItem("token")}`,
    Authorization: sessionStorage.getItem("token")
      ? "JWT " + sessionStorage.getItem("token")
      : null,
    accept: "application/json",
  },
});
