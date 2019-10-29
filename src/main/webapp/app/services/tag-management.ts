import { authHeaders } from './header';
import axios from 'axios';

const tagUrl = 'v1/tags';

export const getListTags = (textSearch, page, pageSize) => {
  // return axios.get('http://localhost:9000/content/json_data/tag_data.json');
  return axios.get(tagUrl);
};

export const getComboTags = (textSearch: string) => {
  // return axios.get('http://localhost:9000/content/json_data/tag_data.json');
  return axios.get(tagUrl, { params: { textSearch } });
};

export const postMergeTag = (id?: string, data?: any) => {
  const mergeTagApi = `${tagUrl}/${id}/merge`;
  return axios.post(mergeTagApi, data, { headers: authHeaders });
};

export const postInsertTag = (data: any) => {
  const insertTagApi = `${tagUrl}`;
  return axios.post(insertTagApi, data, { headers: authHeaders });
};

export const postUpdateTag = (data: any) => {
  const updateTagApi = `${tagUrl}/${data.id}/update`;
  return axios.post(updateTagApi, data, { headers: authHeaders });
};

export const postDeleteTag = data => {
  const mergeTagApi = `${tagUrl}/delete`;
  return axios.post(mergeTagApi, data, { headers: authHeaders });
};
