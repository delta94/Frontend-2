import { ULTILS_TYPES } from './../constants/ultils';
import { NAVIGATION_INFO } from './../constants/navigation-info';
import { ISaveDataCampain } from './../common/model/campaign-navigation.model';
import { FORM_LANDING, REWARD_MAIL, INTRO_MAIL } from 'app/constants/common';

const initialState: ISaveDataCampain = {
  campaignTypeId: '',
  name: '',
  fromDate: '',
  toDate: '',
  description: '',
  customerCampaigns: [],
  reward: { type: parseInt(ULTILS_TYPES.NO_SELECT_REWARD, 0), voucherId: null },
  contentTemplates: [
    {
      subject: '',
      content: '',
      templateId: '',
      channelId: '2',
      contentType: FORM_LANDING,
      parameter: []
    },
    {
      subject: '',
      content: '',
      templateId: '',
      channelId: '1',
      contentType: REWARD_MAIL,
      parameter: []
    },
    {
      subject: '',
      content: '',
      templateId: '',
      channelId: '1',
      contentType: INTRO_MAIL,
      parameter: []
    }
  ]
};

export type NavigationInfo = Readonly<typeof initialState>;

export default (state: ISaveDataCampain = initialState, action): ISaveDataCampain => {
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
      let newListContentTemplate = state.contentTemplates;
      newListContentTemplate.forEach(item => {
        if (item.contentType === action.contentType) {
          item[action.typeParam] = action.data;
        }
      });
      return { ...state, contentTemplates: newListContentTemplate };
    case NAVIGATION_INFO.REFRESH_NAVIGATION_INFO:
      let newState = initialState;
      return newState;
    default:
      return state;
  }
};
