import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IUser } from 'app/common/model/user.model';
import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import { ICampaignInfo } from 'app/common/model/campaign-infomation.model';
import { ICampaign, defaultValue } from 'app/common/model/campaign.model';
// import { ICampaignId, defaultValue } from 'app/common/model/campaign-id.model';

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

export interface ICampaignContentParams {
  id?: number;
  paramCode?: string;
  paramName?: string;
  sampleValue?: string;
  description?: string;
  merchantId?: string;
}

export interface IListNewCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  categories: string;
  categorys: [];
}

const initialState = {
  listCampaignInfo: [] as ReadonlyArray<IlistCampaignInfo>,
  listStepCampaign: [] as ReadonlyArray<IStepCampaign>,
  listCampainContentParams: [] as ICampaignContentParams[],
  listNewCustomer: [] as ReadonlyArray<IListNewCustomer>,
  camp: {} as ReadonlyArray<ICampaign>,
  camps: [] as ReadonlyArray<ICampaign>,
  users: [] as ReadonlyArray<IUser>,

  loading: false,
  totalElements: 0,
  totalItems: 0
};

export type UserCampaignState = Readonly<typeof initialState>;

// Reducer
export default (state: UserCampaignState = initialState, action): UserCampaignState => {
  switch (action.type) {
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_PARAMS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.GET_LIST_CUSTOMER_GROUP):
      return {
        ...state,
        loading: true
      };

    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        loading: true
      };
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.GET_LIST_CUSTOMER_GROUP):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_PARAMS):
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
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.GET_LIST_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        listNewCustomer: action.payload.data.content,
        totalElements: action.payload.data.totalElements
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS):
      return {
        ...state,
        listStepCampaign: action.payload.data.data,
        loading: false
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        listCampaignInfo: action.payload.data.data,
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
        camps: action.payload.data.data,
        totalElements: action.payload.data.data.total
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
      return {
        ...state,
        loading: false,
        camps: action.payload.data.data,
        totalElements: action.payload.data.data.total
      };

    // success on get campain action content params
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_PARAMS):
      return {
        ...state,
        loading: false,
        listCampainContentParams: action.payload.data,
        totalElements: action.payload.data.total
      };

    case USER_CAMPAIGN_ACTION_TYPES.RESET_MESSAGE:
      return {
        ...state
      };
    default:
      return state;
  }
};
