import { NAVIGATION_INFO } from './../constants/navigation-info';

// tslint:disable-next-line: ter-arrow-body-style
export const getNavigationId = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_ID,
    data
  };
};

// tslint:disable-next-line: ter-arrow-body-style
export const getNavigationName = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_NAME,
    data
  };
};

// tslint:disable-next-line: ter-arrow-body-style
export const getNavigationFromDate = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_FROMDATE,
    data
  };
};

// tslint:disable-next-line: ter-arrow-body-style
export const getNavigationToDate = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_TODATE,
    data
  };
};

// tslint:disable-next-line: ter-arrow-body-style
export const getNavigationCustomerCampaign = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_CUSTOMER_CAMPAIGNS,
    data
  };
};

// tslint:disable-next-line: ter-arrow-body-style
export const getNavigationReward = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_REWARDS,
    data
  };
};

// tslint:disable-next-line: ter-arrow-body-style
export const getNavigationContentTemplates = (data: any, contentType: string, typeParam: string) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_CONTENT_TEMPLATES,
    data,
    contentType,
    typeParam
  };
};

// tslint:disable-next-line: ter-arrow-body-style
export const getNavigationDescription = (data: any) => {
  return {
    type: NAVIGATION_INFO.PUT_NAVIGATION_DESCRIPTION,
    data
  };
};

export const refreshNavigationInfo = () => {
  return {
    type: NAVIGATION_INFO.REFRESH_NAVIGATION_INFO
  };
};
