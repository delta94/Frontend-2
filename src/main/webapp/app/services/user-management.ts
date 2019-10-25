import axios from 'axios';
import { IUser } from 'app/common/model/user.model';
import { ICategory } from 'app/common/model/category.model';
import { toast } from 'react-toastify';
import { authHeaders, authHeadersForFile } from './header';

const apiUrl = 'v1/customer';
const apiUrl2 = 'v2/customers';
// <<<<<<< HEAD
// export const getUsersServic
//   const requestUrl = `${api
//   return axios.get<IUser>(r
//   //return axios.get<IUser>
// =======

/**
 *
 * @param page -number
 * @param pageSize - number
 * @param category - string
 * @param textSearch - string
 * @return {code: number, data: Object{item: [{id: string, name: string, gmail: string, catagories: string, }, pageIndex: number, pageSize: number] }}
 */

export const getUsersService = (page, pageSize, tagIds?: string, textSearch?: string) => {
  const requestUrl = `${apiUrl2}${`?page=${page}&pageSize=${pageSize}&tagIds=${tagIds}&textSearch=${textSearch}`}`;
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

export const getListDuplicateService = (id, email, phone) => {
  const requestUrl = `${apiUrl2}/${id}/duplicate?email=${email}&mobile=${phone}`;
  return axios.get(requestUrl);
};

export const mergeUserService = (id, data) => {
  const requestUrl = `${apiUrl2}/${id}/merge`;
  return axios.post(requestUrl, data, { headers: authHeaders });
};

export const exportFileService = (textSearch?: string, tagIds?: string) => {
  const requestUrl = `${apiUrl2}/export?textSearch=${textSearch}&tagIds=${tagIds}`;

  return axios({
    url: requestUrl,
    method: 'GET',
    responseType: 'blob' // important
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Customer.xlsx');
    document.body.appendChild(link);
    link.click();
  });
};

export const exportFileResultService = fileName => {
  const requestUrl = `v1/customer/import-result?fileName=${fileName}`;

  return axios({
    url: requestUrl,
    method: 'GET',
    responseType: 'blob' // important
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'FileResult.xlsx');
    document.body.appendChild(link);
    link.click();
  });
};

export const createUserService = user => {
  return axios.post(apiUrl, user);
};

export const updateUserService = user => {
  const urlUpdate = `${apiUrl2}/${user.id}/update`;
  return axios.post(urlUpdate, user);
};

export const deleteUserService = id => {
  const requestUrl = `${apiUrl2}/${id}/delete`;
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

export const uploadFileExcelService = data => {
  const insertPropApi = `${apiUrl2}/header-import`;
  return axios.post(insertPropApi, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const compareUserService = (firstUser, secondUser) => {
  const compareApi = `${apiUrl2}/${firstUser}/compare/${secondUser}`;
  return axios.get(compareApi);
};

export const getFieldsService = () => {
  return axios.get(`v1/fields`);
};

export const postInsertUser = (data: any) => {
  const insertPropApi = `${apiUrl2}/insert`;
  return axios.post(insertPropApi, data, { headers: authHeaders });
};

export const importFileService = (data: any) => {
  const insertPropApi = `${apiUrl2}/import`;
  return axios.post(insertPropApi, data, { headers: authHeaders });
};

export const getInfoUser = (id: any) => {
  const insertPropApi = `${apiUrl2}/${id}`;
  return axios.get(insertPropApi, { headers: authHeaders });
};

const advancedSearchApi = 'v1/saved-advance-searches';

// TODO: Save advanced search data
export const postSaveAdvancedSearch = (data: any) => {
  const postSearchApi = `${advancedSearchApi}/insert`;
  return axios.post(postSearchApi, data, { headers: authHeaders });
};

// TODO: Delete advanced search data
export const deleteSaveAdvancedSearch = (id?: string) => {
  const deleteSearchApi = `${advancedSearchApi}/${id}/delete`;
  return axios.post(deleteSearchApi, { headers: authHeaders });
};

// TODO: Get list advanced search
export const getListSaveAdvancedSearch = (id?: string) => {
  const getListSearchApi = `${advancedSearchApi}`;
  return axios.get(getListSearchApi, { headers: authHeaders });
};

// TODO: Get advanced search
export const getSaveAdvancedSearch = (id?: string) => {
  const getListSearchApi = `${advancedSearchApi}/${id}`;
  return axios.get(getListSearchApi, { headers: authHeaders });
};
