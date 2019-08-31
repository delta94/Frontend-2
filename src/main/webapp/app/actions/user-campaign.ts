import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, translate } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { toast } from 'react-toastify';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import {
  getCampaignInfoService,
  getInformationService,
  getCampaignInfoByIdService,
  getCampaignInfoByStatusService
} from 'app/services/user-campaign';
import { IFileList } from 'app/common/model/sucess-file';
import { warn } from 'fullcalendar';

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

export const getCampaignInfoById = id => {
  console.log('Đã vào service' + id);
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

export const getUserCategories = (name?) => ({
  type: USER_CAMPAIGN_ACTION_TYPES.FETCH_USER_CATEGORIES,
  payload: axios.get(`v1/category?type=Customer&textSearch=${name}`)
});

export const getRoles = () => ({
  type: USER_CAMPAIGN_ACTION_TYPES.FETCH_ROLES,
  payload: {}
});

export const resetMessage = () => ({
  type: USER_CAMPAIGN_ACTION_TYPES.RESET_MESSAGE
});
