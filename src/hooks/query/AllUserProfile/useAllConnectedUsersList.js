import { useQuery } from 'react-query';
import { userService } from '../../../services/UserService';

const getConnectedUserList = async (userId) => {
  const res = await userService.getUserMembers(userId);
  console.log('res:', res);
  if (res) {
    return res;
  }
  return null;
};

export default function useConnectedUsers(id) {
  const result = useQuery(['connect-user', id], () => getConnectedUserList(id));
  return result;
}
