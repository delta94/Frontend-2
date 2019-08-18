import axios from 'axios';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { ICategory } from 'app/common/model/category.model';

const apiUrl = 'v1/customer';

// <<<<<<< HEAD
// export const getUsersService = (page, size, sort) => {
//   const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
//   return axios.get<IUser>(requestUrl);
//   //return axios.get<IUser>('/content/json_data/list-candidate.json');
// =======
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

export const getFile = () => {
  return axios.get(`http://192.168.0.103:8088/v1/customer/template-import`);
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
export const downloadFileTotalResults = file => {
  const requestUrl = `${`v1/customer/import-result?fileName=${file}`}`;
  return axios.get(requestUrl);
};

export const downloadFile = () => {
  return axios.get('v1/customer/template-import');
};

export const UploaddFile = data => {
  return axios.post('v1/customer/import', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
