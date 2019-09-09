import { ULTILS_TYPES } from './../constants/ultils';
import { NAVIGATION_INFO } from './../constants/navigation-info';
import { ISaveDataCampain } from './../common/model/campaign-navigation.model';
export interface INavigationValue extends ISaveDataCampain {}

var initState: INavigationValue = {
  campaignTypeId: '',
  name: '',
  fromDate: '',
  toDate: '',
  description: '',
  customerCampaigns: [],
  reward: { type: parseInt(ULTILS_TYPES.NO_SELECT_REWARD), voucherId: null },
  contentTemplates: []
};

export type NavigationInfo = Readonly<typeof initState>;

export default (state = initState, action): INavigationValue => {
  switch (action.type) {
    case NAVIGATION_INFO.PUT_NAVIGATION_ID:
      return { ...state, campaignTypeId: action.data };
    case NAVIGATION_INFO.PUT_NAVIGATION_NAME:
      return { ...state, name: action.data };
    case NAVIGATION_INFO.PUT_NAVIGATION_FROMDATE:
      return { ...state, fromDate: action.data };
    case NAVIGATION_INFO.PUT_NAVIGATION_TODATE:
      return { ...state, toDate: action.data };
    case NAVIGATION_INFO.PUT_NAVIGATION_DESCRIPTION:
      return { ...state, description: action.data };
    case NAVIGATION_INFO.PUT_NAVIGATION_CUSTOMER_CAMPAIGNS:
      return { ...state, customerCampaigns: action.data };
    case NAVIGATION_INFO.PUT_NAVIGATION_REWARDS:
      return { ...state, reward: action.data };
    case NAVIGATION_INFO.PUT_NAVIGATION_CONTENT_TEMPLATES:
      return { ...state, contentTemplates: action.data };
    default:
      return state;
  }
};
