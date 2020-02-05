import { EMAIL_CONFIG } from '../constants/email-config';
import {
  getEmails,
  deleteEmail,
  getContentParam,
  createEmail,
  getEmailDetail,
  editEmail,
  getEmailCategories,
  getEmailTemplates,
  previewEmailTemplate,
  createEmailTemplate
} from 'app/services/email-config';
import { IEmailSave } from 'app/common/model/email-config.model';

export const getEmailsAction = (textSearch?: string, page?: number, pageSize?: number) => ({
  type: EMAIL_CONFIG.GET_EMAIL,
  payload: getEmails(textSearch, page, pageSize)
});

export const deleteEmailAction = (ids: string[]) => ({
  type: EMAIL_CONFIG.DELETE_EMAIL,
  payload: deleteEmail(ids)
});

export const getContentParamAction = (groupParam?: string) => ({
  type: EMAIL_CONFIG.GET_CONTENT_PARAM,
  payload: getContentParam(groupParam)
});

export const createEmailAction = (emailSave: IEmailSave) => ({
  type: EMAIL_CONFIG.CREATE_EMAIL,
  payload: createEmail(emailSave)
});

export const createEmailTemplateAction = (emailSave: IEmailSave) => ({
  type: EMAIL_CONFIG.CREATE_EMAIL_TEMPLATE,
  payload: createEmailTemplate(emailSave)
});

export const editEmailAction = (id: string, emailSave: IEmailSave) => ({
  type: EMAIL_CONFIG.EDIT_EMAIL,
  payload: editEmail(id, emailSave)
});

export const getEmailDetailAction = (id: string) => ({
  type: EMAIL_CONFIG.GET_EMAIL_DETAIL,
  payload: getEmailDetail(id)
});

export const getEmailCategoriesAction = () => ({
  type: EMAIL_CONFIG.GET_EMAIL_TEMP_CATEGORY,
  payload: getEmailCategories()
});

export const getEmailTemplatesAction = (emailCategoryId?: string, textSearch?: string, page?: number, pageSize?: number) => ({
  type: EMAIL_CONFIG.GET_EMAIL_TEMPLATE,
  payload: getEmailTemplates(emailCategoryId, textSearch, page, pageSize)
});

export const previewEmailTemplateAction = (emailTemplateId: string) => ({
  type: EMAIL_CONFIG.PREVIEW_EMAIL_TEMPLATE,
  payload: previewEmailTemplate(emailTemplateId)
});
