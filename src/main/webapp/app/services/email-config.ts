import axios from 'axios';
const customEmailUrl = 'v1/custom-emails';

export const getEmails = (textSearch?: string, page?: number, pageSize?: number) => {
  return axios.get(customEmailUrl, { params: { textSearch, page, pageSize } });
};

export const deleteEmail = (id: string) => {
  return axios.post(customEmailUrl + '/' + id + '/delete');
};
