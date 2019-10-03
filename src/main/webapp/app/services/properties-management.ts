import { authHeaders } from './header';
import axios from 'axios';

const tagUrl = 'v1/fields';

export const getListProps = (type?, textSearch?) => {
  const mergePropApi = `${tagUrl}${`?${type ? `type=` + type : ''}&textSearch=${textSearch ? textSearch : ''}`}`;
  return axios.get(mergePropApi, { headers: authHeaders });
};

export const getTemp = (textSearch?) => {
  const mergePropApi = `v1/field-templates${`?textSearch=${textSearch}`}`;
  return axios.get(mergePropApi, { headers: authHeaders });
};
export const getId = (id?) => {
  const mergePropApi = `v1/field-templates/${id}/fields`;
  return axios.get(mergePropApi, { headers: authHeaders });
};

export const postMergeProp = (id: number) => {
  const mergePropApi = `${tagUrl}/${id}/merge`;
  return axios.post(mergePropApi, null, { headers: authHeaders });
};

export const postInsertProp = (data: any) => {
  const insertPropApi = `${tagUrl}`;
  return axios.post(insertPropApi, data, { headers: authHeaders });
};

export const postUpdateProp = (id, data: any) => {
  const updatePropApi = `${tagUrl}/${id}/update`;
  return axios.post(updatePropApi, data, { headers: authHeaders });
};

export const deleteProp = id => {
  const mergePropApi = `${tagUrl}/${id}/delete`;
  return axios.post(mergePropApi, null, { headers: authHeaders });
};
