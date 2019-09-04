import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import {
  getCountCampaignService,
  getCampaignInfoService,
  getInformationService,
  getCampaignInfoByIdService,
  getCampaignInfoByStatusService,
  getStep,
  getContentPageParamsService,
  getNewCustomer,
  postTestMailLandingService,
  getCategory,
  getStatitis
} from 'app/services/user-campaign';

//count campaign
export const getCountCampaignByStatus = status => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_COUNT,
    payload: getCountCampaignService(status)
  };
};

//get list equal status
export const getCampaignInfoByStatus = status => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS,
    payload: getCampaignInfoByStatusService(status)
  };
};

//get step of campagin script
export const getStepCampaign = id => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS,
    payload: getStep(id)
  };
};

//get detail list campagin customer
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

//get statistic phone and email
export const getStatistic = category => ({
  type: USER_CAMPAIGN_ACTION_TYPES.GET_STATISTIC_PHONE_AND_EMAIL,
  payload: getStatitis(category)
});
