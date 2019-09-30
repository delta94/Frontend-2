import { authHeaders } from './header';
import axios from 'axios';

const customerGroup = 'v1/customer-group';

export const getListCustomerGroups = (textSearch: string, page: number, pageSize: number) => {
  // return axios.get(customerGroup, { params: { textSearch, page, pageSize, type: 'pagingEnable' } });
  return axios.get('http://localhost:9000/content/json_data/group-attribute-customer.json');
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
