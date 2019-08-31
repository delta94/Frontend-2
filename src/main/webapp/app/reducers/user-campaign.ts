import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IUser } from 'app/common/model/user.model';
import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import { ICampaignInfo } from 'app/common/model/infomation-campaign.model';
import { ICampaign } from 'app/common/model/campaign.model';
import { ICampaignId, defaultCampValue } from 'app/common/model/campaign-id.model';

export interface IlistCampaignInfo {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
}

export interface IStepCampaign {
  id?: string;
  mgmCampaignTypeId?: string;
  step?: string;
  status?: string;
  description?: string;
}

const initialState = {
  loading: false,
  totalElements: 0,
  totalItems: 0,

  listCampaignInfo: [] as ReadonlyArray<ICampaignInfo>,
  listStepCampaign: [] as ReadonlyArray<IStepCampaign>,
  camp: {} as ReadonlyArray<ICampaignId>,
  camps: [] as ReadonlyArray<ICampaign>,
  users: [] as ReadonlyArray<IUser>
};

export type UserCampaignState = Readonly<typeof initialState>;

// Reducer
export default (state: UserCampaignState = initialState, action): UserCampaignState => {
  switch (action.type) {
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS):
      return {
        ...state,
        loading: true
      };

    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        loading: true
      };

    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS):
      return {
        ...state,
        loading: false
      };

    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        loading: false
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS):
      return {
        ...state,
        listStepCampaign: action.payload.data,
        loading: false
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        listCampaignInfo: action.payload.data,
        loading: false
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
      return {
        ...state,
        loading: false,
        camp: action.payload.data
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
      return {
        ...state,
        loading: false,
        camps: action.payload.data,
        totalElements: action.payload.data.total
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
      console.log(action.payload.data);
      return {
        ...state,
        loading: false,
        camps: action.payload.data,
        totalElements: action.payload.data.totalElements
      };

    case USER_CAMPAIGN_ACTION_TYPES.RESET_MESSAGE:
      return {
        ...state
      };
    default:
      return state;
  }
};
