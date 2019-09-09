import { NAVIGATION_INFO } from './../constants/navigation-info';

export const getNavigationId = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_ID,
    data
  };
};

export const getNavigationName = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_NAME,
    data
  };
};

export const getNavigationFromDate = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_FROMDATE,
    data
  };
};

export const getNavigationToDate = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_TODATE,
    data
  };
};

export const getNavigationCustomerCampaign = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_CUSTOMER_CAMPAIGNS,
    data
  };
};

export const getNavigationReward = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_REWARDS,
    data
  };
};

export const getNavigationContentTemplates = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_CONTENT_TEMPLATES,
    data
  };
};

export const getNavigationDescription = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_DESCRIPTION,
    data
  };
};
