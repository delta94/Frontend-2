import { getListSaveAdvancedSearch, getSaveAdvancedSearch } from './../services/user-management';
import { getFindCustomerWithCondition } from './../services/group-atrribute-customer';
import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, translate } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-types';
import { toast } from 'react-toastify';
import { IUser } from 'app/common/models/user.model';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import {
  createUserService,
  deleteUserService,
  getListDuplicateService,
  getUserService,
  getUsersService,
  updateUserService,
  getInfoUser,
  importFileService,
  exportFileService,
  compareUserService,
  uploadFileExcelService,
  getFieldsService,
  postInsertUser,
  getDoSearch,
  mergeUserService,
  exportFileResultService,
  postSaveAdvancedSearch,
  deleteSaveAdvancedSearch
} from 'app/services/user-management';
import { IFileList } from 'app/common/models/file-list.model';
import { warn } from 'fullcalendar';
import { any } from 'prop-types';

const apiUrl = 'v1/customer';
// Actions
export const getUsers = (page, size, tagIds?: string, textSearch?: string) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_USERS,
    payload: getUsersService(page, size, tagIds, textSearch)
  };
};

export const getUserCategories = (name?) => ({
  type: USER_MANAGE_ACTION_TYPES.FETCH_USER_CATEGORIES,
  payload: axios.get(`v1/category?type=Customer&textSearch=${name}`)
});

export const getRoles = () => ({
  type: USER_MANAGE_ACTION_TYPES.FETCH_ROLES,
  payload: {}
});

export const updateCategory = category => ({
  type: USER_MANAGE_ACTION_TYPES.UPDATE_USER_CATEGORY,
  payload: { category }
});

export const getUser: ICrudGetAction<IUser> = id => {
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_USER,
    payload: getUserService(id)
  };
};

export const createUser: ICrudPutAction<IUser> = user => async dispatch => {
  //todo : đưa loading vào state = true
  const result = await dispatch({
    // thành công -> set loading = false
    type: USER_MANAGE_ACTION_TYPES.CREATE_USER,
    payload: createUserService(user)
  });
  return result;
};

export const updateUser: ICrudPutAction<IUser> = user => async dispatch => {
  const result = await dispatch({
    type: USER_MANAGE_ACTION_TYPES.UPDATE_USER,
    payload: updateUserService(user)
  });
  dispatch(getUser(user.id));
  return result;
};

export const deleteUser = (id, page, size, category?: string, textSearch?: string) => async dispatch => {
  // const requestUrl = `${apiUrl}/delete/${id}`;
  const result = await dispatch({
    type: USER_MANAGE_ACTION_TYPES.DELETE_USER,
    payload: deleteUserService(id)
  });
  dispatch(getUsers(page, size, category, textSearch));
  return result;
};
export const downloadTotalResults: ICrudDeleteAction<IFileList> = file => async dispatch => {
  const requestUrl = `${apiUrl}/${file}`;
  const result = await dispatch({
    type: USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILERE_SULTS,
    payload: downloadTotalResults(file)
  });
  return result;
};

export const getUserSearch = (page, pageSize, category, textSearch) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_SEARCH_USER,
    payload: getDoSearch(page, pageSize, category, textSearch)
  };
};
export const reset = () => ({
  type: USER_MANAGE_ACTION_TYPES.RESET
});

//Version 2

export const getFields = () => {
  return {
    type: USER_MANAGE_ACTION_TYPES.GET_FIELDS,
    payload: getFieldsService()
  };
};

export const uploadFileExcel = data => async dispatch => {
  const formData = new FormData();
  formData.append('file', data);
  const result = await dispatch({
    type: USER_MANAGE_ACTION_TYPES.UPLOAD_FILE,
    payload: uploadFileExcelService(formData)
  });
};

export const importFileAction = data => {
  return {
    type: USER_MANAGE_ACTION_TYPES.IMPORT_FILE,
    payload: importFileService(data)
  };
};

export const insertUser = data => {
  return {
    type: USER_MANAGE_ACTION_TYPES.CREATE_USER,
    payload: postInsertUser(data)
  };
};

export const deleteUserAction = id => {
  return {
    type: USER_MANAGE_ACTION_TYPES.DELETE_USER,
    payload: deleteUserService(id)
  };
};

export const getDetailUser = id => {
  return {
    type: USER_MANAGE_ACTION_TYPES.UPDATE_USER,
    payload: getInfoUser(id)
  };
};

export const updateUserAction = data => {
  return {
    type: USER_MANAGE_ACTION_TYPES.UPDATE_USER,
    payload: updateUserService(data)
  };
};

export const getListDuplicateAction = (id, email, phone) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.GET_LIST_DUPLICATE,
    payload: getListDuplicateService(id, email, phone)
  };
};

export const exportFile = data => {
  return {
    type: USER_MANAGE_ACTION_TYPES.EXPORT_FILE,
    payload: exportFileService(data)
  };
};
export const exportFileResult = fileName => {
  return {
    type: USER_MANAGE_ACTION_TYPES.EXPORT_FILE,
    payload: exportFileResultService(fileName)
  };
};

export const mergeUserAction = (id, data) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.MERGE_USER,
    payload: mergeUserService(id, data)
  };
};

export const compareUserAction = (firstUser, secondUser) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.COMPARE_USER,
    payload: compareUserService(firstUser, secondUser)
  };
};

export const openModalImport = () => ({
  type: USER_MANAGE_ACTION_TYPES.OPEN_MODAL
});

export const closeModalImport = () => ({
  type: USER_MANAGE_ACTION_TYPES.CLOSE_MODAL
});

export const resetMessage = () => ({
  type: USER_MANAGE_ACTION_TYPES.RESET_MESSAGE
});

// Find Customer with condition
export const getFindUserInManagerWithActionData = data => {
  return {
    type: USER_MANAGE_ACTION_TYPES.GET_FIND_USER_IN_MANAGEMENTS,
    payload: getFindCustomerWithCondition(data)
  };
};

// TODO: Save advanced search data
export const postSaveAdvancedSearchActionData = (data: any) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.POST_SAVE_ADVANCED_SEARCH,
    payload: postSaveAdvancedSearch(data)
  };
};

// Delete advanced search data
export const deleteSaveAdvancedSearchActionData = (id?: string) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.DELETE_ADVANCED_SEARCH,
    payload: deleteSaveAdvancedSearch(id)
  };
};

// Get list advanced search
export const getListSaveAdvancedSearchActionData = () => {
  return {
    type: USER_MANAGE_ACTION_TYPES.GET_LIST_ADVANCED_SEARCH,
    payload: getListSaveAdvancedSearch()
  };
};

//Get advanced search
export const getSaveAdvancedSearchActionData = (id?: string) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.GET_ADVANCED_SEARCH,
    payload: getSaveAdvancedSearch(id)
  };
};

export const getListOptionFilter = (data?: any) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.GET_OPTION_FILTER,
    payload: data
  };
};
