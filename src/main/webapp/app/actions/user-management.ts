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
  listUserService
} from 'app/services/user-management';

const apiUrl = 'api/users';
// Actions
export const getUsers: ICrudGetAllAction<IUser> = (page, size, sort) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_USERS,
    //  payload: getUsersService(page, size, sort)
    payload: axios.get('./content/json_data/account.json')
  };
};
export const paginationUser = (users, itemsPerPage, activePage) => {
  return {
    type: USER_MANAGE_ACTION_TYPES.FETCH_LIST_USER,
    payload: axios.get('./content/json_data/account.json')
  };
};
export const getRoles = () => ({
  type: USER_MANAGE_ACTION_TYPES.FETCH_ROLES,
  payload: {}
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
