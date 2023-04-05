import { useQuery } from "react-query";
import { userService } from "../../../services/UserService";

const getUserById = async (userId) => {
  const res = await userService.getUserProfile(userId);

  if (res) {
    return res;
  }
  return null;
};

export default function useSelectedTypesBy(id) {
  const result = useQuery(["users", id], () => getUserById(id));
  return result;
}
