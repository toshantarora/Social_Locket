import { in200s } from '../helpers';
import { API } from './ApiClient';

function supportRequest(data) {
  return API.post('support-requests', data)
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
function getAllUserProfile() {
  return API.get('users')
    .then((response) => {
      if (in200s(response.status)) {
        return response.data?.result;
      }
      return null;
    })
    .catch((error) => error.response);
}
function getUserTypes(userId) {
  return API.get(`user-types/${userId}`)
    .then((response) => {
      if (in200s(response.status)) {
        return response.data?.result;
      }
      return null;
    })
    .catch((error) => error.response);
}

function getUserPosts(userId) {
  return API.get(`users/${userId}/posts?id=1&user_id=13`)
    .then((response) => {
      if (in200s(response.status)) {
        return response.data;
      }
      return null;
    })
    .catch((error) => error.response);
}

// http://ec2-52-56-131-124.eu-west-2.compute.amazonaws.com/api/v1/users/:id
// http://ec2-52-56-131-124.eu-west-2.compute.amazonaws.com/api/v1/users/:id/posts?id=1&user_id=13
export const userService = {
  supportRequest,
  getUserProfile,
  getAllUserProfile,
  getUserTypes,
  getUserPosts,
};
