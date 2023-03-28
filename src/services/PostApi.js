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
async function getPostsById(id) {
  return API.get(`posts/${id}`)
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
// http://ec2-52-56-131-124.eu-west-2.compute.amazonaws.com/api/v1/posts/:id
export const postsService = {
  getPosts,
  getPostsById,
};
