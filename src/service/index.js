import axios from "axios";

const Axios = axios.create({
  baseURL: "https://brandyol-b1fe9-default-rtdb.firebaseio.com",
});


export { Axios };
