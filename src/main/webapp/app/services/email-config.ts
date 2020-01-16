import axios from 'axios';
const customEmailUrl = 'v1/custom-emails';
const contentParamUrl = 'v1/content-param';

export const getEmails = (textSearch?: string, page?: number, pageSize?: number) => {
  return axios.get(customEmailUrl, { params: { textSearch, page, pageSize } });
};

export const deleteEmail = (id: string) => {
  return axios.post(customEmailUrl + '/' + id + '/delete');
};

export const getContentParam = (groupParam?: string) => {
  return axios.get(contentParamUrl, { params: { groupParam } });
};

