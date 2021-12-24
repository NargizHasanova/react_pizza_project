import axios from "axios";

const Axios = axios.create({
  baseURL: "https://test001-f52b4-default-rtdb.firebaseio.com",
});


export { Axios };
