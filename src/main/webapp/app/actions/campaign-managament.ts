import { CAMPAIGN_MANAGAMENT } from 'app/constants/campaign-managament';
import {
  getTreeFolderService,
  insertTreeFolderService,
  editTreeFolderService,
  deleteTreeFolderService,
  moveTreeFolderService
} from 'app/services/campaign-managament';

//get Tree Folder
export const getTreeFolder = () => ({
  type: CAMPAIGN_MANAGAMENT.GET_TREE_FOLDER,
  payload: getTreeFolderService()
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
  return: CAMPAIGN_MANAGAMENT.DELETE_TREE_FOLDER,
  payload: deleteTreeFolderService(data)
});

// move Tree Folder
export const moveTreeFolder = data => ({
  return: CAMPAIGN_MANAGAMENT.MOVE_TREE_FOLDER,
  payload: moveTreeFolderService(data)
});
