import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import {
  getCampaignInfoService,
  getInformationService,
  getCampaignInfoByIdService,
  getCampaignInfoByStatusService,
  getStep
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

export const resetMessage = () => ({
  type: USER_CAMPAIGN_ACTION_TYPES.RESET_MESSAGE
});
