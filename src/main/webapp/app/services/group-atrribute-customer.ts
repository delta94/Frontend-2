import { authHeaders } from './header';
import axios from 'axios';

const customerGroup = 'v1/category-customers';

export const getCustomerGroups = (textSearch: string) => {
  return axios.get(customerGroup, { params: { textSearch } });
};

export const getListCustomerGroups = (textSearch: string, pageIndex: number, pageSize: number, id: string) => {
  return axios.get(`v1/category/${id}/customers`, { params: { textSearch, pageIndex, pageSize } });
};

export const getListFieldData = () => {
  return axios.get('v1/fields', { headers: authHeaders });
  // return axios.get('http://localhost:9000/content/json-data');
};

export const postMergeCustomerGroup = (id?: string, data?: any) => {
  const mergeCustomerGroupApi = `${customerGroup}/${id}/merge`;
  return axios.post(mergeCustomerGroupApi, data, { headers: authHeaders });
};

export const postInsertCustomerGroup = (data: any) => {
  const insertCustomerGroupApi = `${customerGroup}`;
  return axios.post(insertCustomerGroupApi, data, { headers: authHeaders });
};

export const postUpdateCustomerGroup = (data: any) => {
  const updateCustomerGroupApi = `${customerGroup}/${data.id}/update`;
  return axios.post(updateCustomerGroupApi, data, { headers: authHeaders });
};

export const postDeleteCustomerGroup = data => {
  const mergeCustomerGroupApi = `${customerGroup}/delete`;
  return axios.post(mergeCustomerGroupApi, data, { headers: authHeaders });
};
