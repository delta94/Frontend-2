import { CAMPAIGN_MANAGAMENT } from 'app/constants/campaign-managament';
import { getTreeFolderService, getListCampaignInfolder } from 'app/services/campaign-managament';
import {
  insertTreeFolderService,
  editTreeFolderService,
  deleteTreeFolderService,
  moveTreeFolderService,
  getStatusCampaignService,
  getListCampaginService,
  saveCampaignAutoService,
  getEmailTestService,
  testCampaignService,
  getListVersionService,
  deleteVersionService,
  stopVersionService,
  cloneVersionService,
  getListCustomerVersionProcessService,
  viewInteractiveService,
  activeProcessCampaignService,
  getTemplateCampaignService,
  cloneVersionByIdService,
  validateGraphService,
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
export const getListCampaginAuto = (status: string, page?: number, pageSize?: number) => ({
  type: CAMPAIGN_MANAGAMENT.GET_LIST_CAMPAIGN_AUTO,
  payload: getListCampaginService(status, page, pageSize)
});

//get value from Flow
export const getNode = (data?: any) => ({
  type: CAMPAIGN_MANAGAMENT.GET_NODE,
  payload: data
});

//save Campaign in db
export const saveCampaignAuto = data => ({
  type: CAMPAIGN_MANAGAMENT.SAVE_CAMPAIGN_AUTO,
  payload: saveCampaignAutoService(data)
});

// get value edit modal update info campaign
export const updateInfoCampaign = (data?: any) => ({
  type: CAMPAIGN_MANAGAMENT.GET_INFO_CAMPAIGN,
  payload: data
});

//save diagram campaign
export const getDiagramCampaign = (data?: any) => ({
  type: CAMPAIGN_MANAGAMENT.GET_DIAGRAM_CAMPAIGN,
  payload: data
});

//validate node in flow
export const validateCampaign = (data: any) => ({
  type: CAMPAIGN_MANAGAMENT.VALIDATE_DIAGRAM_CAMPAIGN,
  payload: data
});
// get list Email test
export const getEmailTest = () => ({
  type: CAMPAIGN_MANAGAMENT.GET_EMAIL_TEST,
  payload: getEmailTestService()
});

// Test campaign
export const testCampaign = data => ({
  type: CAMPAIGN_MANAGAMENT.TEST_CAMPAIGN,
  payload: testCampaignService(data)
});

/* API Version */
// get id and name version to save campaign
export const saveCampaignAutoVersion = (data: any) => ({
  type: CAMPAIGN_MANAGAMENT.SAVE_CAMPAIGN_AUTO_VERSION,
  payload: data
});

//get list version
export const getListVersion = id => ({
  type: CAMPAIGN_MANAGAMENT.GET_LIST_VERSION,
  payload: getListVersionService(id)
});

//delete version
export const deleteVersion = data => ({
  type: CAMPAIGN_MANAGAMENT.DELETE_VERSION,
  payload: deleteVersionService(data)
});

//stop version
export const stopVersion = id => ({
  type: CAMPAIGN_MANAGAMENT.STOP_VERSION,
  payload: stopVersionService(id)
});

//clone info version
export const cloneVersion = id => async dispatch =>{
  const result = await dispatch({
  type: CAMPAIGN_MANAGAMENT.CLONE_VERSION,
  payload: cloneVersionService(id)
  })
  await dispatch(resetData())
  await dispatch(validateCampaign([]))
  await dispatch(saveCampaignAutoVersion([]))
  await dispatch(updateInfoCampaign({}))
  return result
};

//get list version customer process
export const getListCustomerVersionProcess = (textSearch: string, id, page?: number) => ({
  type: CAMPAIGN_MANAGAMENT.LIST_CUSTOMER_VERSION_PROCESS,
  payload: getListCustomerVersionProcessService(textSearch, id, page)
});

// view Interactive customer
export const viewInteractive = id => ({
  type: CAMPAIGN_MANAGAMENT.VIEW_INTERACTIVE,
  payload: viewInteractiveService(id)
});

//reset data
export const resetData = () => ({
  type: CAMPAIGN_MANAGAMENT.RESET_DATA_CAMPAIGN
});

// active process campaign automation
export const activeProcessCampaign = id => ({
  type: CAMPAIGN_MANAGAMENT.ACTIVE_PROCESS_CAMPAIGN,
  payload: activeProcessCampaignService(id)
});

// get template campaign automation
export const getTemplateCampaign = () => ({
  type: CAMPAIGN_MANAGAMENT.GET_TEMPLATE_CAMPAIGN,
  payload: getTemplateCampaignService()
});

// Clone version id campaign
export const cloneVersionById = id => ({
  type: CAMPAIGN_MANAGAMENT.CLONE_VERSION_BY_ID,
  payload: cloneVersionByIdService(id)
});

// validate graph
export const validateGraph = id => ({
  type: CAMPAIGN_MANAGAMENT.VALIDATE_GRAPH,
  payload: validateGraphService(id)
});
