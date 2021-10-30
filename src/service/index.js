import axios from "axios";

const Axios = axios.create({
  baseURL: "https://test-002-3ddc6-default-rtdb.firebaseio.com",
});

export { Axios };
