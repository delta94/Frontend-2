import { CAMPAIGN_MANAGAMENT } from 'app/constants/campaign-managament';
import { REQUEST, FAILURE, SUCCESS } from './action-type.util';

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

const initialCampaignManagament = {
  tree_folder: [] as IDataTreeFolder[],
  loading: false
};

export type HandleCampaignManagament = typeof initialCampaignManagament;

export default (state = initialCampaignManagament, action) => {
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
    default:
      return state;
  }
};
