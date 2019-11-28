import { ICampaignTestMailLanding } from './../common/model/campaign.model';
import axios from 'axios';
import { IUser } from 'app/common/model/user.model';
import { ICategory } from 'app/common/model/category.model';
import { toast } from 'react-toastify';
import { IListNewCustomer } from 'app/common/model/campaign-new-customer.model';
import categories from 'app/views/campaign/user-campaign/create/navigation/select-customer/customer-dialog/categories/categories';

const apiUrl = 'v1/campaigns';

/**
 *
 * @param page -number
 * @param pageSize - number
 * @param category - string
 * @param textSearch - string
 * @return {code: number, data: Object{item: [{id: string, name: string, gmail: string, catagories: string, }, pageIndex: number, pageSize: number] }}
 */

// get campaign info by id
export const getCampaignInfoByIdService = id => {
  return axios.get(`v1/campaign/${id}`);
};

// display list customer in campaign by campaign id
export const getCampaignDetailService = (id, page, pageSize, textSearch?: string) => {
  return axios.get(`v1/campaign/${id}/customers${`?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`}`);
};

// display quantity of campaign  by status
export const getCountCampaignService = () => {
  return axios.get(`v1/campaigns/count`);
};

// display list campaign by status follow tab by tab
export const getCampaignInfoByStatusService = status => {
  return axios.get(`v1/campaigns?status=${status}`);
};

// update status 1->0, 0->1
export const updateCampStatusService = data => {
  const urlUpdate = `v1/campaign/${data.id}/status`;
  return axios.post(urlUpdate, data);
};

export const getNewCustomer = (page, pageSize, category?: string, textSearch?: string) => {
  return axios.get<IListNewCustomer>(
    `v1/customer?type=MgM&page=${page}&pageSize=${pageSize}&category=${category}&textSearch=${textSearch}`
  );
};

export const getInformationService = () => {
  return axios.get('v1/campaign-types');
};

export const getSumAllContactService = categories => {
  return axios.post(`v1/customer/summary-statistics`, categories);
};
export const getStep = id => {
  return axios.get(`v1/campaign-types/${id}/step`);
};

// get typeName category
export const getUserCategoriesService = () => {
  return axios.get<ICategory>(`${apiUrl}/category-name?textSearch`);
};

export const getRolesService = () => {
  return axios.get(`${apiUrl}/authorities`);
};

export const getFile = () => {
  return axios.get(`http://192.168.0.103:8088/v1/customer/template-import`);
};

export const getUserService = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return axios.get<IUser>(requestUrl);
};

export const getUserId = id => {
  return {
    id: id
  };
};

export const createUserService = user => {
  return axios.post(apiUrl, user);
};

export const updateUserService = user => {
  const urlUpdate = `${apiUrl}/${user.id}/update`;
  return axios.post(urlUpdate, user);
};

export const deleteUserService = id => {
  const requestUrl = `${apiUrl}/${id}/delete`;
  return axios.post(requestUrl);
};

// phân trang client
export const listUserService = (users, itemsPerPage, activePage) => {
  return users.slice(itemsPerPage * activePage, itemsPerPage * activePage + itemsPerPage);
};

export const getDoSearch = (page, pageSize, category, textSearch) => {
  const requestUrl = `${apiUrl}${`?page=${page}&pageSize=${pageSize}&category=${category}&textSearch=${textSearch}`}`;
  // return axios.get<IUser>(`${apiUrl}/search`);

  return axios.get<IUser>(requestUrl);
};
export const downloadFileTotalResults = file => {
  const requestUrl = `${`v1/customer/import-result?fileName=${file}`}`;
  return axios.get(requestUrl);
};

export const downloadFile = () => {
  return axios.get('v1/customer/template-import');
};

export const UploaddFile = data => {
  return axios.post('v1/customer/import', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

//GET: v1/contentParams API => lấy thông tin landing page param
export const getContentPageParamsService = () => {
  const requestUrl = `${`v1/content-param`}`;
  var data = axios.get(requestUrl);
  return data;
};

// POST v1/email/send => Api test gửi email test
export const postTestMailLandingService = (data: ICampaignTestMailLanding) => {
  const requestUrl = `${`v1/email/send`}`;
  return axios.post(requestUrl, data);
};

//TODO: POST v1/campaign => Api lưu thông tin chiến dịch
export const postSaveDataCampainService = (data: any) => {
  const requestURL = `${`v1/campaign`}`;
  return axios.post(requestURL, data);
};

//GET v1/content-template?templateType=EMAIL => Api lấy danh sách loại content template
export const getContentTemplateAsTypeService = type => {
  let defaultTemplate = 'LANDING';
  if (type) {
    defaultTemplate = type;
  }
  const requestUrl = `${`v1/content-template?templateType=${defaultTemplate}`}`;
  return axios.get(requestUrl);
};

// GET v1/content-template
export const getContentTemplateService = id => {
  const requestUrl = `${`v1/content-template/${id} `}`;
  return axios.get(requestUrl);
};

export const getCategory = name => {
  return axios.get(`v1/category?type=Customer&textSearch=${name}`);
};

//get api statitis phone & email
export const getStatitis = category => {
  return axios.get(`v1/customer/statistics?categories=${category}`);
};
// get api duplicate
export const getDuplicate = category => {
  return axios.get(`v1/customer/duplicate?categories=${category}`);
};

//get list evoucher
export const getEvoucher = () => {
  return axios.get(`v1/e-voucher`);
};

//get evoucher detail
export const getDetail = id => {
  return axios.get(`v1/e-voucher/${id}/code`);
};
