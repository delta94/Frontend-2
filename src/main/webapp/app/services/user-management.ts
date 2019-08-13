import axios from 'axios';
import { IUser, defaultValue } from 'app/common/model/user.model';

// const apiUrl = 'api/users';
const apiUrl = 'api/user';

export const getUsersService = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  // return axios.get<IUser>(requestUrl)
  return axios.get<IUser>('http://5d521fdf3432e70014e6b5ae.mockapi.io/api/user');
};

export const getRolesService = () => {
  return axios.get(`${apiUrl}/authorities`);
};

export const getUserService = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return axios.get<IUser>(requestUrl);
};

export const createUserService = user => {
  return axios.post(apiUrl, user);
};

export const updateUserService = user => {
  return axios.put(apiUrl, user);
};

export const deleteUserService = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return axios.delete(requestUrl);
};
