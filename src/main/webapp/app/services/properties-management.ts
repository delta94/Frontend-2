import { authHeaders } from './header';
import axios from 'axios';

const tagUrl = 'v1/props';

export const getListProps = (type?, textSearch?) => {
  return axios.get('http://localhost:9000/content/json_data/prop-cus.json', { headers: authHeaders });
};

export const postMergeProp = (id: number) => {
  const mergePropApi = `${tagUrl}/${id}/merge`;
  return axios.post(mergePropApi, null, { headers: authHeaders });
};

export const postInsertProp = (data: any) => {
  const insertPropApi = `${tagUrl}/insert`;
  return axios.post(insertPropApi, data, { headers: authHeaders });
};

export const postUpdateProp = (id: number, data: any) => {
  const updatePropApi = `${tagUrl}/${id}/update`;
  return axios.post(updatePropApi, data, { headers: authHeaders });
};

export const postDeleteProp = id => {
  const mergePropApi = `${tagUrl}/${id}/delete`;
  return axios.post(mergePropApi, null, { headers: authHeaders });
};
