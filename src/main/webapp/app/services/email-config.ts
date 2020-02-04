import axios from 'axios';
import { authHeaders } from './header';
import { IEmailSave } from 'app/common/model/email-config.model';
const customEmailUrl = 'v1/custom-emails';
const contentParamUrl = 'v1/content-param';
const contentUrl = 'v1/contents';
const contentTemplateUrl = 'v1/content-template';
const emailTempCategoryUrl = 'v1/email-categories';
const emailTemplateUrl = 'v1/email-templates';

export const getEmails = (textSearch?: string, page?: number, pageSize?: number) => {
  return axios.get(customEmailUrl, { params: { textSearch, page, pageSize }, headers: authHeaders });
};

export const getEmailDetail = (id: string) => {
  return axios.get(contentUrl + '/' + id, { params: {}, headers: authHeaders });
};

export const deleteEmail = (ids: string[]) => {
  return axios.post(customEmailUrl + '/delete', ids, { headers: authHeaders });
};

export const getContentParam = (groupParam?: string) => {
  return axios.get(contentParamUrl, { params: { groupParam }, headers: authHeaders });
};

export const createEmail = (emailSave: IEmailSave) => {
  return axios.post(customEmailUrl + '/create', emailSave, { headers: authHeaders });
};

export const createEmailTemplate = (emailSave: IEmailSave) => {
  return axios.post(emailTemplateUrl + '/create', emailSave, { headers: authHeaders });
};

export const editEmail = (id: string, emailSave: IEmailSave) => {
  return axios.post(customEmailUrl + '/' + id + '/update', emailSave, { headers: authHeaders });
};

export const getEmailCategories = () => {
  return axios.get(emailTempCategoryUrl, { params: {}, headers: authHeaders });
};

export const getEmailTemplates = (emailCategoryId?: string, textSearch?: string, page?: number, pageSize?: number) => {
  return axios.get(emailTemplateUrl, { params: { emailCategoryId, textSearch, page, pageSize }, headers: authHeaders });
};

export const previewEmailTemplate = (emailTemplateId: string) => {
  return axios.get(contentTemplateUrl + '/' + emailTemplateId + '/preview', { params: {}, headers: authHeaders });
};
