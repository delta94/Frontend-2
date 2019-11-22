import { authHeaders } from './header';
import axios from 'axios';
const cjTagUrl = 'v1/cj-tags';

export const getCjTags = (textSearch?: string) => {
  return axios.get(cjTagUrl, { params: { textSearch } });
};
