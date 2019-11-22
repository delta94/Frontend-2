import { authHeaders } from './header';
import axios from 'axios';

const urlCJ = 'v1/cj-folders';

export const getTreeFolderService = () => {
  return axios.get(urlCJ);
};

export const getFindCustomerWithCondition = data => {
  return axios.post('v2/customers', data, { headers: authHeaders });
};

export const getListCampaignInfolder = (folderId: string, textSearch?: string, tagIds?: string, page?: number, pageSize?: number) => {
  return axios.get(urlCJ + '/' + folderId + '/cjs', { params: { textSearch, tagIds, page, pageSize } });
};
