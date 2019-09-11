import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import { getContentTemplateService, getContentTemplateAsTypeService, postSaveDataCampainService } from '../services/user-campaign';
import {
  getSumAllContactService,
  updateCampStatusService,
  getCampaignDetailService,
  getCountCampaignService,
  getInformationService,
  getCampaignInfoByIdService,
  getCampaignInfoByStatusService,
  getStep,
  getContentPageParamsService,
  getNewCustomer,
  postTestMailLandingService,
  getCategory,
  getStatitis,
  getEvoucher,
  getDetail
} from 'app/services/user-campaign';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';

const apiUrl = 'v1/campaigns';
// Actions

//display campaign detail to modal follow campaign's id
export const getCampaignDetailById = (id, activePage, itemsPerPage, textSearch?) => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.CAMPAIGN_DETAIL,
    payload: getCampaignDetailService(id, activePage, itemsPerPage, textSearch)
  };
};

// get quantity of campaign by status
export const getCountCampaignByStatus = () => ({
  type: USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_COUNT,
  payload: getCountCampaignService()
});

//get list equal status
export const getCampaignInfoByStatus = status => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS,
    payload: getCampaignInfoByStatusService(status)
  };
};

// Update status : 0->1, 1->0
export const updateCampStatus = (data, id) => async dispatch => {
  await dispatch({
    type: USER_CAMPAIGN_ACTION_TYPES.UPDATE_STATUS,
    payload: updateCampStatusService(data)
  });
  await dispatch(getCampaignInfoByStatus(id));
  dispatch(getCountCampaignByStatus());
};

//get step of campagin script
export const getStepCampaign = id => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS,
    payload: getStep(id)
  };
};

//get campaign info by id
export const getCampaignInfoById = id => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID,
    payload: getCampaignInfoByIdService(id)
  };
};

//get type campagin script
export const getInformation = () => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN,
    payload: getInformationService()
  };
};

//get new list customer
export const getCustomer = (page, pageSize, category?: string, textSearch?: string) => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.GET_LIST_CUSTOMER_GROUP,
    payload: getNewCustomer(page, pageSize, category, textSearch)
  };
};

export const resetMessage = () => ({
  type: USER_CAMPAIGN_ACTION_TYPES.RESET_MESSAGE
});

// GET: landing params
export const getContentPageParams = () => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_PARAMS,
    payload: getContentPageParamsService()
  };
};

// POST: testMail
export const postTestMailLanding = data => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.POST_TEST_MAIL,
    payload: postTestMailLandingService(data)
  };
};

// get catelogy
export const getUserCategories = (name?) => ({
  type: USER_CAMPAIGN_ACTION_TYPES.FETCH_USER_CATEGORIES,
  payload: getCategory(name)
});

//call api statistic phone and mail, appi get count duplicate and call api all contact
export const getStatistic = category => async dispatch => {
  await dispatch({
    type: USER_CAMPAIGN_ACTION_TYPES.GET_STATISTIC_PHONE_AND_EMAIL,
    payload: getStatitis(category)
  });
};

//get list evoucher
export const getListEvoucher = () => ({
  type: USER_CAMPAIGN_ACTION_TYPES.GET_LIST_EVOUCHER,
  payload: getEvoucher()
});

export const getDetailEvoucher = id => ({
  type: USER_CAMPAIGN_ACTION_TYPES.GET_EVOUCHER_DETAIL,
  payload: getDetail(id)
});

//  get content template
export const getContentTemplate = id => ({
  type: USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_TEMPLATE,
  payload: getContentTemplateService(id)
});

//post save data campain
export const postSaveDataCampain = data => ({
  type: USER_CAMPAIGN_ACTION_TYPES.POST_SAVE_DATA_CAMPAIN,
  payload: postSaveDataCampainService(data)
});

//action count all contact
export const getSumAllContact = categories => ({
  type: USER_CAMPAIGN_ACTION_TYPES.SUM_ALL_CONTACT,
  payload: getSumAllContactService(categories)
});

//  get content template as type
export const getContentTemplateAsType = typeContent => {
  let type = USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_TEMPLATE_AS_TYPE_LANDING;
  switch (typeContent) {
    case 'EMAIL_INTRO':
      type = USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_TEMPLATE_AS_TYPE_EMAIL_INTRO;
      break;
    case 'EMAIL_EWARD':
      type = USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_TEMPLATE_AS_TYPE_EMAIL_EWARD;
      break;
    case 'LANDING':
      type = USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_TEMPLATE_AS_TYPE_LANDING;
      break;
    default:
      break;
  }

  return {
    type,
    payload: getContentTemplateAsTypeService(typeContent)
  };
};
