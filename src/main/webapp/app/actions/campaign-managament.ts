import { CAMPAIGN_MANAGAMENT } from 'app/constants/campaign-managament';
import { getTreeFolderService } from 'app/services/campaign-managament';

//get Tree Folder
export const getTreeFolder = () => ({
  type: CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER,
  payload: getTreeFolderService()
});
