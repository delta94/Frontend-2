import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import { LANDING_PAGE_ACTION_TYPES } from 'app/constants/landing-page';
import { getContentTemplateService, getContentTemplateAsTypeService } from '../services/user-campaign';
import { landingSubmitService } from 'app/services/landing-page';

//count campaign
const apiUrl = 'v1/campaigns';
// Actions

export const landingSubmit = (customerCode, campaignId) => {
  return {
    type: LANDING_PAGE_ACTION_TYPES.BINDING_LANDINGPAGE,
    payload: landingSubmitService(customerCode, campaignId)
  };
};
