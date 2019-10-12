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
};

export const postFindCustomerWithCondition = (textSearch?: string, data?: any) => {
  return axios.post('v2/customers', data, { params: textSearch, headers: authHeaders });
};

export const postInsertCustomerGroup = (data: any) => {
  const insertCustomerGroupApi = `v1/categories/insert`;
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
