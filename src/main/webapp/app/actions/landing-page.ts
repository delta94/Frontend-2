import { LANDING_PAGE_ACTION_TYPES } from 'app/constants/landing-page';
import { landingSubmitService, bindingLandingPageService } from 'app/services/landing-page';

//count campaign
const apiUrl = 'v1/campaigns';
// Actions

export const landingSubmit = (customerCode, campaignId) => {
  return {
    type: LANDING_PAGE_ACTION_TYPES.BINDING_LANDINGPAGE,
    payload: landingSubmitService(customerCode, campaignId)
  };
};

// put landingpage content to empty page
export const bindingLandingPage = (customerCode, idCampaign) => {
  return {
    type: LANDING_PAGE_ACTION_TYPES.BINDING_LANDINGPAGE,
    payload: bindingLandingPageService(customerCode, idCampaign)
  };
};
