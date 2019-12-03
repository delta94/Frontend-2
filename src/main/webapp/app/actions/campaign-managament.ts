import { CAMPAIGN_MANAGAMENT } from 'app/constants/campaign-managament';
import { getTreeFolderService, getListCampaignInfolder } from 'app/services/campaign-managament';
import {
  insertTreeFolderService,
  editTreeFolderService,
  deleteTreeFolderService,
  moveTreeFolderService,
  getStatusCampaignService,
  getListCampaginService
} from 'app/services/campaign-managament';

//get Tree Folder
export const getTreeFolder = () => ({
  type: CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER,
  payload: getTreeFolderService()
});

export const getListCampaignInfolderDataAction = (folderId, textSearch, tagIds, page, pageSize) => ({
  type: CAMPAIGN_MANAGAMENT.GET_CAMPAIGN_IN_FOLDER,
  payload: getListCampaignInfolder(folderId, textSearch, tagIds, page, pageSize)
});
//insert Tree Folder
export const insertTreeFolder = data => ({
  type: CAMPAIGN_MANAGAMENT.CREATE_TREE_FOLDER,
  payload: insertTreeFolderService(data)
});

//edit Tree Folder
export const editTreeFolder = data => ({
  type: CAMPAIGN_MANAGAMENT.EDIT_TREE_FOLDER,
  payload: editTreeFolderService(data)
});

// delete Tree Folder
export const deleteTreefolder = data => ({
  type: CAMPAIGN_MANAGAMENT.DELETE_TREE_FOLDER,
  payload: deleteTreeFolderService(data)
});

// move Tree Folder
export const moveTreeFolder = data => ({
  type: CAMPAIGN_MANAGAMENT.MOVE_TREE_FOLDER,
  payload: moveTreeFolderService(data)
});

//count status campaign
export const statusCampaign = () => ({
  type: CAMPAIGN_MANAGAMENT.COUNT_CAMPAIGN,
  payload: getStatusCampaignService()
});

// get list CJ
export const getListCampaginAuto = () => ({
  type: CAMPAIGN_MANAGAMENT.GET_LIST_CAMPAIGN_AUTO,
  payload: getListCampaginService()
});

//get value from Flow
export const getNode = (data?: any) => ({
  type: CAMPAIGN_MANAGAMENT.GET_NODE,
  payload: data
});
