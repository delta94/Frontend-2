import { authHeaders } from './header';
import axios from 'axios';
const cjTagUrl = 'v1/cj-tags';
const cjUrl = 'v1/cjs';

export const getCjTags = (textSearch?: string) => {
  return axios.get(cjTagUrl, { params: { textSearch } });
};

export const createCjTag = data => {
  return axios.post(cjUrl + '/' + data.cjId + '/create-tag', data, { headers: authHeaders });
};

export const deleteCjTag = cjTagId => {
  return axios.post(cjTagUrl + '/' + cjTagId + '/delete');
};
