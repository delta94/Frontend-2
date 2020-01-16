import { EMAIL_CONFIG } from '../constants/email-config';
import { getEmails, deleteEmail, getContentParam } from 'app/services/email-config';

export const getEmailsAction = (textSearch?: string, page?: number, pageSize?: number) => ({
  type: EMAIL_CONFIG.GET_EMAIL,
  payload: getEmails(textSearch, page, pageSize)
});

export const deleteEmailAction = (id: string) => ({
  type: EMAIL_CONFIG.DELETE_EMAIL,
  payload: deleteEmail(id)
});

export const getContentParamAction = (groupParam?: string) => ({
  type: EMAIL_CONFIG.GET_CONTENT_PARAM,
  payload: getContentParam(groupParam)
});



