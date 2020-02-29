import { EMAIL_PROFILE } from '../constants/email-profile';
import { emailService } from 'app/services/email-profile';
import { IEmailSave } from 'app/common/models/email-config.model';
import { emailProfileDto } from '../common/dtos/email-profile.dto';

export const getEmailsProfile = () => ({
  type: EMAIL_PROFILE.GET_EMAIL,
  payload: emailService.getEmailsProfile()
});
export const createEmailsProfile = (emailProfileDto: emailProfileDto) => ({
  type: EMAIL_PROFILE.CREATE_EMAIL,
  payload: emailService.createEmail(emailProfileDto)
});
export const deleteEmailsProfile = (id: string) => ({
  type: EMAIL_PROFILE.DELETE_EMAIL,
  payload: emailService.deleteEmail(id)
});
export const reactiveEmailProfile = (id: string) => ({
  type: EMAIL_PROFILE.SEND_CODE_ACTIVE_EMAIL,
  payload: emailService.reactiveEmail(id)
});
export const setDefaultEmailProfile = (id: string) => ({
  type: EMAIL_PROFILE.SET_DEFAULT_EMAIL,
  payload: emailService.setDefaultEmail(id)
});
export const verifileEmailProfile = (code: string) => ({
  type: EMAIL_PROFILE.VERIFILE_EMAIL,
  payload: emailService.verifileEmail(code)
});
