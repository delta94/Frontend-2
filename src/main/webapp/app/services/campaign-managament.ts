import { authHeaders } from './header';
import axios from 'axios';

const urlCJ = 'v1/cj-folders';
const urlCampaign = 'v1/cjs';

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

export const getListCampaignInfolder = (folderId: string, textSearch?: string, tagIds?: string, page?: number, pageSize?: number) => {
  return axios.get(urlCJ + '/' + folderId + '/cjs', { params: { textSearch, tagIds, page, pageSize } });
};

// call API count status campaign
export const getStatusCampaignService = () => {
  const url = `${urlCampaign}/count`;
  return axios.get(url);
};

// call API get list campaign auto
export const getListCampaginService = () => {
  return axios.get(urlCampaign);
};
