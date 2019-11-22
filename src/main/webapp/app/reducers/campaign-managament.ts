import { CAMPAIGN_MANAGAMENT } from 'app/constants/campaign-managament';
import { REQUEST, FAILURE, SUCCESS } from './action-type.util';
import { number } from 'prop-types';

interface IDataTreeFolder {
  id: string;
  name: string;
  path: string;
  parentId: string;
  cjFolders: [
    {
      id: string;
      name: string;
      path: string;
      parentId: string;
      cjFolders: any[];
    }
  ];
}

interface ICampaign {
  total: number;
  data: [
    {
      id: string;
      name: string;
      cjVersionId: string;
      version: number;
      tags: string;
      status: string;
      contactNumbers: number;
    }
  ];
}

const initialModalState = {
  tree_folder: [] as IDataTreeFolder[],
  campaign: {} as ICampaign,
  loading: false
};

export type HandleCampaignManagament = typeof initialModalState;

export default (state = initialModalState, action) => {
  switch (action.type) {
    case REQUEST(CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER):
      return {
        ...state,
        loading: true
      };

    case FAILURE(CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER):
      return {
        ...state,
        loading: false
      };
    case SUCCESS(CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER):
      return {
        ...state,
        loading: false,
        tree_folder: action.payload.data
      };

    case CAMPAIGN_MANAGAMENT.CREATE_TREE_FOLDER:
      return { ...state, data: action.data };

    case REQUEST(CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER):
      return {
        ...state,
        loading: true
      };

    case FAILURE(CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER):
      return {
        ...state,
        loading: false
      };
    case SUCCESS(CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER):
      return {
        ...state,
        loading: false,
        campaign: action.payload.data
      };

    case CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER:
      return { ...state, data: action.data };

    default:
      return state;
  }
};
