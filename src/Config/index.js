import axios from "axios";
export const USERS_URL = "/users";
export const REGISTER_URL = "/users/";

export default axios.create({
  baseURL: "http://localhost:4000/api/v1",
});
