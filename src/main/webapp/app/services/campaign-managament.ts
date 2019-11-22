import { authHeaders } from './header';
import axios from 'axios';

const urlCJ = 'v1/cj-folders';

//call API get list Tree
export const getTreeFolderService = () => {
  return axios.get(urlCJ);
};

//call API insert tree
export const insertTreeFolderService = data => {
  const url = `${urlCJ}/create`;
  return axios.post(url, data);
};

//call API edit tree
export const editTreeFolderService = data => {
  const url = `${urlCJ}/${data.id}/update`;
  return axios.post(url, data.name);
};

//call API delete tree
export const deleteTreeFolderService = data => {
  const url = `${urlCJ}/${data}/delete`;
  return axios.post(url);
};

//call API move Tree Folder
export const moveTreeFolderService = data => {
  const url = `${urlCJ}/${data.idChil}/move/${data.idParent}`;
  return axios.post(url);
};
