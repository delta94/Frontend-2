import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, translate } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { toast } from 'react-toastify';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import {
  createUserService,
  deleteUserService,
  getRolesService,
  getUserService,
  getUsersService,
  updateUserService,
  getFile,
  downloadFile,
  UploaddFile
} from 'app/services/user-management';

const apiUrl = 'api/users';
// Actions
export const getUsers: ICrudGetAllAction<IUser> = (page, size, sort) => {
  // debugger
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_USERS,
    payload: getUsersService(page, size, sort)
    // payload: axios.get('./content/json_data/account.json')
  };
};

export const getRoles = () => ({
  type: USER_MANAGE_ACTION_TYPES.FETCH_ROLES,
  payload: getRolesService()
});

export const getUser: ICrudGetAction<IUser> = id => {
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_USER,
    payload: getUserService(id)
  };
};

export const createUser: ICrudPutAction<IUser> = user => async dispatch => {
  const result = await dispatch({
    type: USER_MANAGE_ACTION_TYPES.CREATE_USER,
    payload: createUserService(user)
  });
  dispatch(getUsers());
  return result;
};

export const updateUser: ICrudPutAction<IUser> = user => async dispatch => {
  const result = await dispatch({
    type: USER_MANAGE_ACTION_TYPES.UPDATE_USER,
    payload: updateUserService(user)
  });
  dispatch(getUsers());
  return result;
};

export const deleteUser: ICrudDeleteAction<IUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: USER_MANAGE_ACTION_TYPES.DELETE_USER,
    payload: deleteUserService(id)
  });
  dispatch(getUsers());
  return result;
};

export const reset = () => ({
  type: USER_MANAGE_ACTION_TYPES.RESET
});

export const downloadFileExcel = () => {
  debugger;
  return {
    type: USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILE,
    payload: downloadFile()
  };
};
debugger;
export const uploadFileExcel = data => async dispatch => {
  const formData = new FormData();
  formData.append('files', data);
  const result = await dispatch({
    type: USER_MANAGE_ACTION_TYPES.UPLOAD_FILE,
    payload: axios.post('v1/customer/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
    meta: {
      errorMessage: translate('bookSchedule.messages.upload-file-interview-failure')
    }
  });
  if (result.action.payload.data.success) {
    toast.info(translate('bookSchedule.messages.upload-file-interview-success'));
  } else {
    toast.warn(translate('bookSchedule.messages.upload-file-interview-failure-due-to-data'));
  }
};
export const resetDownloadInterview = () => {
  return {
    type: USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILE,
    payload: '',
    meta: {}
  };
};
