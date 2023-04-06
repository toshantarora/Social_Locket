import { in200s } from '../helpers';
import { API } from './ApiClient';

function GetUsers() {
  return API.get('search/tabs/users')
    .then((response) => {
      if (in200s(response.status)) {
        return response.data?.result;
      }
      return null;
    })
    .catch((error) => error.response);
}

function GetUserAddress() {
  return API.get('search/tabs/users')
    .then((response) => {
      if (in200s(response.status)) {
        return response.data?.result;
      }
      return null;
    })
    .catch((error) => error.response);
}

async function GetPosts() {
  return await API.get('search/tabs/posts')
    .then((response) => {
      if (in200s(response.status)) {
        return response.data?.result;
      }
      return null;
    })
    .catch((error) => error.response);
}

export const searchService = {
  GetUsers,
  GetPosts,
  GetUserAddress,
};
