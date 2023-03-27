import { in200s } from "../helpers";
import { API } from "./ApiClient";

function login(data) {
  return API.post("login", data)
    .then((response) => {
      // console.log("response ***** ", response);
      if (in200s(response.status)) {
        // console.log(response.data);
        return response;
      }

      return null;
    })
    .catch((error) => error.response);
}

function register(data) {
  return API.post("register", data)
    .then((response) => {
      console.log("response ***** ", response);
      if (in200s(response.status)) {
        // console.log(response.data);
        return response;
      }

      return null;
    })
    .catch((error) => error.response);
}

function logout(userId) {
  return API.delete(`logout/${userId}`)
    .then((response) => {
      console.log("response ***** ", response);
      if (in200s(response.status)) {
        // console.log(response.data);
        return response;
      }

      return null;
    })
    .catch((error) => error.response);
}

export const authService = {
  login,
  register,
  logout,
};
