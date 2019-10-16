import { authHeaders } from './header';
import axios from 'axios';

const customerGroup = 'v1/category-customers';

export const getListCustomerGroups = (textSearch?: string) => {
  return axios.get(customerGroup, { params: { textSearch } });
};

// Get list customer group for data
export const getListCustomerWithGroupId = (textSearch: string, page: number, pageSize: number, id: string) => {
  return axios.get(`v1/categories/${id}/customers`, { params: { textSearch, page, pageSize }, headers: authHeaders });
};

export const getListFieldData = () => {
  return axios.get('v1/fields', { headers: authHeaders });
};

export const getFindCustomerWithCondition = (data?: any) => {
  return axios.post('v2/customers', data, { headers: authHeaders });
};

// Post insert customer group
export const postInsertCustomerGroup = (data: any) => {
  const insertCustomerGroupApi = `v1/categories/insert`;
  return axios.post(insertCustomerGroupApi, data, { headers: authHeaders });
};

// Post update customer group
export const postUpdateCustomerGroup = (id: string, data: any) => {
  const updateCustomerGroupApi = `${customerGroup}/${id}/update`;
  return axios.post(updateCustomerGroupApi, data, { headers: authHeaders });
};

// Post delete customer group
export const postDeleteCustomerGroup = (id: string) => {
  const mergeCustomerGroupApi = `v1/categories/${id}/delete`;
  return axios.post(mergeCustomerGroupApi, null, { headers: authHeaders });
};

// Get field of customer group
export const getSingleCustomerGroupField = (id: string) => {
  const customerGroup = `v1/categories/${id}/customer-filter-groups`;
  return axios.get(customerGroup, { headers: authHeaders });
};
