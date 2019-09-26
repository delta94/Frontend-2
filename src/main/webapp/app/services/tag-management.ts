import { authHeaders } from './header';
import axios from 'axios';

const tagUrl = 'v1/tags';

export const getListTags = () => {
  return axios.get(tagUrl, { headers: authHeaders });
};

export const postMergeTag = (id: number) => {
  const mergeTagApi = `${tagUrl}/${id}/merge`;
  return axios.post(mergeTagApi, null, { headers: authHeaders });
};

export const postInsertTag = (data: any) => {
  const insertTagApi = `${tagUrl}/insert`;
  return axios.post(insertTagApi, data, { headers: authHeaders });
};

export const postUpdateTag = (id: number, data: any) => {
  const updateTagApi = `${tagUrl}/${id}/update`;
  return axios.post(updateTagApi, data, { headers: authHeaders });
};

export const postDeleteTag = id => {
  const mergeTagApi = `${tagUrl}/${id}/delete`;
  return axios.post(mergeTagApi, null, { headers: authHeaders });
};
