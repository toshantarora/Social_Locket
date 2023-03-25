import { in200s } from "../helpers";
import { API } from "./ApiClient";

function getPosts() {
  return API.get("posts")
    .then((response) => {
      console.log("response ***** ", response);
      if (in200s(response.status)) {
        // console.log(response.data);
        return response.data?.result;
      }

      return null;
    })
    .catch((error) => error.response);
}

export const postsService = {
  getPosts,
};
