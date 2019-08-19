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
  UploaddFile,
  listUserService,
  getUserCategoriesService,
  getDoSearch
} from 'app/services/user-management';
import { IFileList } from 'app/common/model/sucess-file';
import { warn } from 'fullcalendar';

const apiUrl = 'v1/customer';
// Actions
export const getUsers = (page, size, category?: string, textSearch?: string) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_USERS,
    payload: getUsersService(page, size, category, textSearch)
    // payload: axios.get('./content/json_data/account.json')
    //     payload: getUsersService(page, size, sort, category)
    // >>>>>>> hungdv
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
  dispatch(getUsers());
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

// export const updateUser: ICrudPutAction<IUser> = user  => {
//   return {
//     type: USER_MANAGE_ACTION_TYPES.UPDATE_USER,
//     payload: updateUserService(user)
//   };
// };

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
  dispatch(getUsers());
  return result;
};

export const getUserSearch = (page, pageSize, category, textSearch) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_SEARCH_USER,
    payload: getDoSearch(page, pageSize, category, textSearch)
    // payload: axios.get(apiUrl)

    // payload: axios.get('./content/json_data/account.json')
  };
};
export const reset = () => ({
  type: USER_MANAGE_ACTION_TYPES.RESET
});

export const downloadFileExcel = () => {
  return {
    type: USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILE,
    // payload: downloadFile(),
    payload: axios.get('v1/customer/template-import'),
    meta: {}
  };
};
export const uploadFileExcel = data => async dispatch => {
  const formData = new FormData();
  formData.append('file', data);
  const result = await dispatch({
    type: USER_MANAGE_ACTION_TYPES.UPLOAD_FILE,
    payload: axios.post('v1/customer/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
    meta: {}
  });
  if (result.action.payload.data.success) {
  } else {
  }
};
export const resetDownloadInterview = () => {
  return {
    type: USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILE,
    payload: '',
    meta: {}
  };
};
