import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import { IFileList } from 'app/common/model/sucess-file';
import { ICategory } from 'app/common/model/category.model';
import { ICampaignInfo } from 'app/common/model/infomation-campaign.model';
import { ICampaign } from 'app/common/model/campaign.model';

const initialState = {
  loading: false,
  errorMessage: null,
  camps: [] as ReadonlyArray<ICampaign>,
  users: [] as ReadonlyArray<IUser>,
  listFiles: {} as IFileList,
  listUsers: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: defaultValue,
  listCampaignInfo: [] as ReadonlyArray<ICampaignInfo>,
  updating: false,
  updateSuccess: false,
  getNameFile: '',
  dowloadTemplate: null,
  errorTemplate: null,
  totalItems: 0,
  categories: defaultValue,
  listCategory: [] as ReadonlyArray<ICategory>,
  totalElements: 0
};

export type UserCampaignState = Readonly<typeof initialState>;

// Reducer
export default (state: UserCampaignState = initialState, action): UserCampaignState => {
  switch (action.type) {
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
      return {
        ...state,
        loading: true
      };

    case REQUEST(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };

    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS):
      return {
        ...state,
        loading: true
      };

    case FAILURE(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.INFORMATION_CAMPAIGN):
      return {
        ...state,
        listCampaignInfo: action.payload.data,
        loading: false
      };
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_ID):
    case SUCCESS(USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS_STATUS):
      return {
        ...state,
        loading: false,
        camps: action.payload.data,
        totalElements: action.payload.data.totalElements
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
