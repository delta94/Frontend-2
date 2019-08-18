import axios from 'axios';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { ICategory } from 'app/common/model/category.model';

const apiUrl = 'v1/customer';

export const getUsersService = (page, size, sort, category?) => {
  const urlCategory = category ? category.map(cate => cate.id) : '';
  if (category) {
    console.log(urlCategory.join(','));
  }
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&category=${category ? urlCategory.join(',') : ''}` : ''}`;
  // return axios.get<IUser>(`${apiUrl}/search`);

  return axios.get<IUser>(requestUrl);
};

// get typeName category
export const getUserCategoriesService = () => {
  return axios.get<ICategory>(`${apiUrl}/category-name?textSearch`);
};

export const getRolesService = () => {
  return axios.get(`${apiUrl}/authorities`);
};

export const getUserService = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return axios.get<IUser>(requestUrl);
};

export const getUserId = id => {
  return {
    id: id
  };
};

export const createUserService = user => {
  return axios.post(apiUrl, user);
};

export const updateUserService = user => {
  console.log(user);
  const urlUpdate = `${apiUrl}/${user.id}/update`;
  return axios.post(urlUpdate, user);
};

export const deleteUserService = id => {
  const requestUrl = `${apiUrl}/${id}/delete`;
  return axios.post(requestUrl);
};

// phân trang client
export const listUserService = (users, itemsPerPage, activePage) => {
  return users.slice(itemsPerPage * activePage, itemsPerPage * activePage + itemsPerPage);
};

export const getDoSearch = (page, pageSize, category, textSearch) => {
  const requestUrl = `${apiUrl}${`?page=${page}&pageSize=${pageSize}&category=${category}&textSearch=${textSearch}`}`;
  // return axios.get<IUser>(`${apiUrl}/search`);

  return axios.get<IUser>(requestUrl);
};
