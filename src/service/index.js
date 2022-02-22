import axios from "axios";

const Axios = axios.create({
  baseURL: "https://test-003-6b46f-default-rtdb.firebaseio.com",
});


export { Axios };
