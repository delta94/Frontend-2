import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import {
  getCampaignInfoService,
  getInformationService,
  getCampaignInfoByIdService,
  getCampaignInfoByStatusService,
  getStep,
  getContentPageParamsService,
  getNewCustomer,
  postTestMailLandingService,
  getCategory
} from 'app/services/user-campaign';

const apiUrl = 'v1/campaigns';
// Actions
export const getCampaignInfo = () => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS,
    payload: getCampaignInfoService()
  };
};

export const getCampaignInfoByStatus = status => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS,
    payload: getCampaignInfoByStatusService(status)
  };
};

export const getStepCampaign = id => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS,
    payload: getStep(id)
  };
};

export const getCampaignInfoById = id => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID,
    payload: getCampaignInfoByIdService(id)
  };
};

export const getInformation = () => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN,
    payload: getInformationService()
  };
};

// export const getUsers = (page, size, category?: string, textSearch?: string) => {
//   return {
//     type: USER_MANAGE_ACTION_TYPES.FETCH_USERS,
//     payload: getUsersService(page, size, category, textSearch)
//   };
// };
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

export const getUserCategories = (name?) => ({
  type: USER_CAMPAIGN_ACTION_TYPES.FETCH_USER_CATEGORIES,
  payload: getCategory(name)
});
