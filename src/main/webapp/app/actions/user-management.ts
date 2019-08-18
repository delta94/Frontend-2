import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import {
  createUserService,
  deleteUserService,
  getRolesService,
  getUserService,
  getUsersService,
  updateUserService,
  listUserService,
  getUserCategoriesService
} from 'app/services/user-management';

const apiUrl = 'v1/customer';
// Actions
export const getUsers: ICrudGetAllAction<IUser> = (page, size, sort, category?) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_USERS,
    payload: getUsersService(page, size, sort, category)
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

export const deleteUser: ICrudDeleteAction<IUser> = id => async dispatch => {
  // const requestUrl = `${apiUrl}/delete/${id}`;
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
