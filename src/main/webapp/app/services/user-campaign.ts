import axios from 'axios';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { ICategory } from 'app/common/model/category.model';
import { toast } from 'react-toastify';
import { IListNewCustomer } from 'app/common/model/campaign-new-customer.model';

const apiUrl = 'v1/campaigns';

/**
 *
 * @param page -number
 * @param pageSize - number
 * @param category - string
 * @param textSearch - string
 * @return {code: number, data: Object{item: [{id: string, name: string, gmail: string, catagories: string, }, pageIndex: number, pageSize: number] }}
 */
export const getCampaignInfoService = () => {
  return axios.get(apiUrl);
};

export const getCampaignInfoByIdService = id => {
  return axios.get(`v1/campaign/${id}`);
};

export const getCampaignInfoByStatusService = status => {
  return axios.get(`v1/campaigns?status=${status}`);
};

export const getUsersService = (page, pageSize, category?: string, textSearch?: string) => {
  const requestUrl = `${apiUrl}${`?page=${page}&pageSize=${pageSize}&category=${category}&textSearch=${textSearch}`}`;
  return axios.get<IUser>(requestUrl);
};

export const getNewCustomer = (page, pageSize, category?: string) => {
  return axios.get<IListNewCustomer>(`v1/customer?type=MgM&page=${page}&pageSize=${pageSize}&category=${category}`);
};

export const getInformationService = () => {
  return axios.get('v1/campaignTypes');
};

export const getStep = id => {
  console.log(id);
  return axios.get(`v1/campaignType/${id}/step`);
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

// Get Landing Page Params
export const getContentPageParamsService = () => {
  const requestUrl = `${`v1/contentParams`}`;
  return axios.get(requestUrl);
};

export const getCategory = name => {
  return axios.get(`v1/category?type=Customer&textSearch=${name}`);
};
