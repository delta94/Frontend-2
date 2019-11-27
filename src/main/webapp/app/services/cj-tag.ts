import { authHeaders } from './header';
import axios from 'axios';
const cjTagUrl = 'v1/cj-tags';

export const getCjTags = (textSearch?: string) => {
  return axios.get(cjTagUrl, { params: { textSearch } });
};

export const createCjTag = cjTag => {
  return axios.post(cjTagUrl + '/create', cjTag, { headers: authHeaders });
};

export const deleteCjTag = cjTagId => {
  return axios.post(cjTagUrl + '/' + cjTagId + '/delete');
};
