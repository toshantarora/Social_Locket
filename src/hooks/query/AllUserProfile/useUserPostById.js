import { useQuery } from 'react-query';
import { userService } from '../../../services/UserService';

const getUserPostById = async (userId) => {
  const res = await userService.getUserPosts(userId);
  console.log('res:', res);
  if (res) {
    return res;
  }
  return null;
};

export default function useUserPosts(id) {
  const result = useQuery(['users-post', id], () => getUserPostById(id));
  return result;
}
