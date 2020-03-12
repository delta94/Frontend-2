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
import { IEmail, IEmailSave } from 'app/common/models/email-config.model';
import { SUCCESS } from 'app/reducers/action-types';

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

export const updateEmailSettingAction = (emailDetail: IEmail) => ({
  type: SUCCESS(EMAIL_CONFIG.UPDATE_EMAIL_DETAIL_SETTING),
  payload: { data: emailDetail }
});

export const updateEmailContentAction = (emailDetail: IEmail) => ({
  type: EMAIL_CONFIG.UPDATE_EMAIL_DETAIL_CONTENT,
  payload: { data: emailDetail }
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
