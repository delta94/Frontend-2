import axios from 'axios';
import { authHeaders, authHeadersForFile } from './header';
import { urlConfig } from '../constants/configUrl';
import { IUser } from 'app/common/models/user.model';

// get list deleted customer
export const getListDeletedCustomer = (fromDate, toDate, page, pageSize, sort?: any[], textSearch?: string) => {
  const requestUrl = `${
    urlConfig.dev
  }${`deleted-customers?fromDate=${fromDate}&page=${page}&pageSize=${pageSize}&sort=${sort}&textSearch=${textSearch}&toDate=${toDate}`}`;
  return axios.get<IUser>(requestUrl);
};

// handle restore customer by list id
export const postRestoreCustomerBatchSevice = (data: any) => {
  const configUrl = `${urlConfig.dev}/restore/batch`;
  return axios.post(configUrl, data, { headers: authHeaders });
};

// handle restore all customer by simple filter
export const postRestoreCustomerSimpleFilterSevice = (data: any) => {
  const configUrl = `${urlConfig.dev}/delete/simple-filter`;
  return axios.post(configUrl, data, { headers: authHeaders });
};
