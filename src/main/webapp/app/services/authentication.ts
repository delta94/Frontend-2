import axios from 'axios';
import * as SERVICE_URL from './service-url';

export const getSessionService = () => {
  return axios.get(SERVICE_URL.GET_SESSION_URL)
};

export const loginService = (accessToken) => {
  return axios.post(SERVICE_URL.LOGIN_URL, accessToken)
};