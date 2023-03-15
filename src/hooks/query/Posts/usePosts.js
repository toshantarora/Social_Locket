import { useQuery } from "react-query";
import { postsService } from "../../../services/PostApi";

const getPosts = async () => {
  const res = await postsService.getPosts();

  if (res) {
    return res;
  }
  return null;
};

export default function usePosts(options = {}) {
  return useQuery("posts", getPosts, options);
}
