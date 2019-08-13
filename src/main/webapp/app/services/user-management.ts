import axios from 'axios';
import { IUser, defaultValue } from 'app/common/model/user.model';

const apiUrl = 'api/users';

export const getUsersService = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  // return axios.get<IUser>(requestUrl)
  return axios.get<IUser>('/content/json_data/list-candidate.json');
};

export const getRolesService = () => {
  return axios.get(`${apiUrl}/authorities`);
};

export const getFile = () => {
  return axios.get(`http://192.168.0.103:8088/v1/customer/template-import`);
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
