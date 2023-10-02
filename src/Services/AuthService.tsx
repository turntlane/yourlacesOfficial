import axios, { USERS_URL } from "../Config";

export default class AuthService {
  static async checkEmail(email: string) {
    const response = await axios.post("/check", email);
    // const response = await fetch(API_URL + "/login/app", {
    //   method: "POST",
    //   headers: this.getCommonHeaders(),
    //   body: JSON.stringify({
    //     email: email,
    //   }),
    // });
    // let jsonResponse = null;
    try {
      //   jsonResponse = await response.json();
    } catch (e) {
      //ignore this error now
    }
    if (response.status === 200) {
      console.log("weeoeeoemoem", response);
      return response;
    } else {
      console.log("error happened");
    }
  }
}
