import { ICategory } from './../common/model/category.model';
import { IPostMail } from './user-campaign';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IUser } from 'app/common/model/user.model';
import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import { ICampaignInfo } from 'app/common/model/campaign-infomation.model';
import { ICampaign } from 'app/common/model/campaign.model';
import { ICampaignId, defaultValue } from 'app/common/model/campaign-id.model';
import { ICampaignCustomer } from 'app/common/model/campaign-customer';

export interface IlistCampaignInfo {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
}

export interface IPostMail {
  code?: number;
  value?: string;
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
  listNewCustomer: [] as ReadonlyArray<IListNewCustomer>,
  camps: [] as ReadonlyArray<ICampaign>,
  users: [] as ReadonlyArray<IUser>,
  listCampainContentParams: [] as ICampaignContentParams[],
  listCategory: [] as ReadonlyArray<ICategory>,

  camp: {} as ReadonlyArray<ICampaignId>,
  campDetail: [] as ReadonlyArray<ICampaignCustomer>,
  loading: false,
  totalElements: 0,
  totalItems: 0,
  totalEmail: 0,
  totalPhone: 0,
  postMailRequest: { code: 202, name: 'ok', openModal: false }
};

export type UserCampaignState = Readonly<typeof initialState>;

// Reducer
export default (state: UserCampaignState = initialState, action): UserCampaignState => {
  switch (action.type) {
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_COUNT):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.CAMPAIGN_DETAIL):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_PARAMS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.GET_LIST_CUSTOMER_GROUP):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.POST_TEST_MAIL):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_USER_CATEGORIES):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.GET_STATISTIC_PHONE_AND_EMAIL):
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
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_COUNT):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.CAMPAIGN_DETAIL):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_PARAMS):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.GET_STEP_CAMPAIGNS):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_USER_CATEGORIES):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.GET_STATISTIC_PHONE_AND_EMAIL):
      return {
        ...state,
        loading: false
      };

    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        loading: false
      };

    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.POST_TEST_MAIL):
      return {
        ...state,
        postMailRequest: { code: 500, name: 'fail', openModal: false }
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.GET_STATISTIC_PHONE_AND_EMAIL):
      console.log(action.payload.data.totalEmail);
      return {
        ...state,
        loading: false,
        totalEmail: action.payload.data.totalEmail,
        totalPhone: action.payload.data.totalPhone
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
        listStepCampaign: action.payload.data,
        loading: false
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        listCampaignInfo: action.payload.data,
        loading: false
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_USER_CATEGORIES):
      return {
        ...state,
        loading: false,
        listCategory: action.payload.data
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
      return {
        ...state,
        loading: false,
        camp: action.payload.data,
        totalElements: action.payload.totalElements
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
      return {
        ...state,
        loading: false,
        camps: action.payload.data
        // totalElements: action.payload.data.total
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_COUNT):
      return {
        ...state,
        loading: false,
        totalElements: action.payload.data
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.CAMPAIGN_DETAIL):
      return {
        ...state,
        loading: false,
        campDetail: action.payload.data.content,
        totalElements: action.payload.data.totalElements
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
      return {
        ...state,
        loading: false,
        camps: action.payload.data.data,
        totalElements: action.payload.data.total
      };

    // success on get campain action content params
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.GET_CONTENT_PARAMS):
      console.log('data is', action.payload.data);
      return {
        ...state,
        loading: false,
        listCampainContentParams: action.payload.data,
        totalElements: action.payload.data.length
      };
    // success on post mail Test action
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.POST_TEST_MAIL):
      return {
        ...state,
        loading: false,
        postMailRequest: { code: 202, name: 'Đã gửi mail thành công', openModal: true }
      };

    case USER_CAMPAIGN_ACTION_TYPES.RESET_MESSAGE:
      return {
        ...state
      };
    default:
      return state;
  }
};
