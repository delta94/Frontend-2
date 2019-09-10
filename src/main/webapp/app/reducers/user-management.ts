import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import { IFileList } from 'app/common/model/sucess-file';
import { ICategory } from 'app/common/model/category.model';

const initialState = {
  loading: false,
  errorMessage: null,
  uploadScheduleFailure: false,
  uploadScheduleSuccess: false,
  users: [] as ReadonlyArray<IUser>,
  listFiles: {} as IFileList,
  listUsers: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: defaultValue,
  updating: false,
  updateSuccess: false,
  getNameFile: '',
  dowloadTemplate: null,
  errorTemplate: null,
  totalItems: 0,
  categories: defaultValue,
  listCategory: [] as ReadonlyArray<ICategory>,
  totalElements: 0,
  showDeleteSuccessAlert: true,
  showDeleteErrorAlert: false,
  showUpdateSuccessAlert: false
};

export type UserManagementState = Readonly<typeof initialState>;

// Reducer
export default (state: UserManagementState = initialState, action): UserManagementState => {
  switch (action.type) {
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_ROLES):
      return {
        ...state
      };
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_USER_CATEGORIES):
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_USERS):
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_USER):
    case REQUEST(USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILE):
    case REQUEST(USER_MANAGE_ACTION_TYPES.UPLOAD_FILE):
    case REQUEST(USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILERE_SULTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,

        loading: true
      };
    case REQUEST(USER_MANAGE_ACTION_TYPES.CREATE_USER):
    case REQUEST(USER_MANAGE_ACTION_TYPES.UPDATE_USER):
    case REQUEST(USER_MANAGE_ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
        loading: true,
        showDeleteSuccessAlert: false,
        showUpdateSuccessAlert: false
      };
    case FAILURE(USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILE):
      return {
        ...state
      };
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_USERS):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_USER_CATEGORIES):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_ROLES):
    case FAILURE(USER_MANAGE_ACTION_TYPES.CREATE_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.UPDATE_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.DELETE_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.UPLOAD_FILE):
    case FAILURE(USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILERE_SULTS):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_SEARCH_USER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        uploadScheduleFailure: true,
        errorMessage: action.payload,
        showUpdateSuccessAlert: false
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_USER_CATEGORIES):
      console.log(action.payload.data);
      return {
        ...state,
        loading: false,
        listCategory: action.payload.data
      };

    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_ROLES):
      return {
        ...state,
        authorities: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        loading: false,
        users: action.payload.data.content,
        categories: action.payload.data.content.categories,
        totalItems: action.payload.data.content.totalItems,
        totalElements: action.payload.data.totalElements
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_SEARCH_USER):
      return {
        ...state,
        loading: false,
        users: action.payload.data.content,
        totalElements: action.payload.data.totalElements
      };

    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_USER):
      return {
        ...state,
        loading: false,
        user: action.payload.data
      };

    case SUCCESS(USER_MANAGE_ACTION_TYPES.CREATE_USER):

    case SUCCESS(USER_MANAGE_ACTION_TYPES.UPDATE_USER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: true,
        showUpdateSuccessAlert: true

        // user: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        user: defaultValue,
        loading: false,
        showDeleteSuccessAlert: true
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        dowloadTemplate: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.UPLOAD_FILE):
    case SUCCESS(USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILERE_SULTS):
      console.log(action);
      const { listErrorImport, total, success, error, fileName } = action.payload.data;
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: true,
        uploadScheduleSuccess: true,
        listFiles: {
          total: total,
          success: success,
          error: error,
          fileName: fileName,
          listErrorImport: listErrorImport
        }
      };

    case USER_MANAGE_ACTION_TYPES.UPDATE_USER_CATEGORY:
      return {
        ...state,
        user: {
          ...state.user,
          categorys: action.payload.category
        }
      };
    case USER_MANAGE_ACTION_TYPES.RESET:
    case USER_MANAGE_ACTION_TYPES.DOWNLOAD_FILE:
      return {
        ...initialState,
        dowloadTemplate: null
      };
    case USER_MANAGE_ACTION_TYPES.RESET_MESSAGE:
      return {
        ...state,
        showDeleteSuccessAlert: false,
        showDeleteErrorAlert: false,
        showUpdateSuccessAlert: false
      };
    default:
      return state;
  }
};
