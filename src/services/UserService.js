import { in200s } from "../helpers";
import { API } from "./ApiClient";

function supportRequest(data) {
  return API.post("support-requests", data)
    .then((response) => {
      if (in200s(response.status)) {
        return response.data;
      }

      return null;
    })
    .catch((error) => error.response);
}
function getUserProfile(userId) {
  return API.get(`users/${userId}`)
    .then((response) => {
      if (in200s(response.status)) {
        return response.data?.result[0];
      }
      return null;
    })
    .catch((error) => error.response);
}

export const userService = { supportRequest, getUserProfile };
