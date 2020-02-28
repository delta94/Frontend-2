import axios from 'axios';
import { authHeaders } from './header';
import { IEmailSave } from 'app/common/models/email-config.model';
import { urlConfig } from '../constants/configUrl';
import { emailProfileDto } from 'app/common/dtos/email-profile.dto';

const getEmailsProfile = () => {
  return axios.get(`${urlConfig}/email-profiles`, { params: {}, headers: authHeaders });
};
const createEmail = (emailProfileDto: emailProfileDto) => {
  return axios.post(`${urlConfig}/email-profiles`, emailProfileDto, { headers: authHeaders });
};
const setDefaultEmail = (id: string) => {
  return axios.post(`${urlConfig}/email-profiles/${id}/default`, {}, { headers: authHeaders });
};
const deleteEmail = (id: string) => {
  return axios.post(`${urlConfig}/email-profiles/${id}/delete`, {}, { headers: authHeaders });
};
const reactiveEmail = (id: string) => {
  return axios.post(`${urlConfig}/email-profiles/${id}/reactive`, {}, { headers: authHeaders });
};
const verifileEmail = (verifiedCode: string) => {
  return axios.get(`${urlConfig}/email-profiles/verify/${verifiedCode}`, { headers: authHeaders });
};

export const emailService = {
  getEmailsProfile,
  createEmail,
  setDefaultEmail,
  deleteEmail,
  reactiveEmail,
  verifileEmail
};
