import { authHeaders } from './header';
import axios from 'axios';

const tagUrl = 'v1/tags';

export const getListTags = (textSearch: string, page: number, pageSize: number) => {
  // return axios.get('http://localhost:9000/content/json_data/tag_data.json');
  return axios.get(tagUrl, { params: { textSearch, page, pageSize, type: 'pagingEnable' } });

  // return axios.get(tagUrl+`?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`);
};

export const getComboTags = (textSearch: string) => {
  // return axios.get('http://localhost:9000/content/json_data/tag_data.json');
  return axios.get(tagUrl, { params: { textSearch } });

  // return axios.get(tagUrl+`?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`);
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
