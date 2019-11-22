import { CAMPAIGN_MANAGAMENT } from 'app/constants/campaign-managament';
import { getTreeFolderService, getListCampaignInfolder } from 'app/services/campaign-managament';

//get Tree Folder
export const getTreeFolder = () => ({
  type: CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER,
  payload: getTreeFolderService()
});

export const getListCampaignInfolderDataAction = (folderId, textSearch, tagIds, page, pageSize) => ({
  type: CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER,
  payload: getListCampaignInfolder(folderId, textSearch, tagIds, page, pageSize)
});
