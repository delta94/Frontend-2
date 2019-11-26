import { authHeaders } from './header';
import axios from 'axios';
const cjTagUrl = 'v1/cjs';

export const getCjTagsByCjId = cjId => {
  return axios.get(cjTagUrl + '/' + cjId + '/cj-tags');
};

export const postUpdateCjTags = (data: any) => {
  return axios.post(cjTagUrl + '/' + data.id + '/update-tags', data, { headers: authHeaders });
};
