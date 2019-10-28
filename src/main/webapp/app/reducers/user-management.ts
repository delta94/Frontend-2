import { IModalData } from 'app/reducers/user-management';
import { MODAL_ACTION } from './../constants/modal';
import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IUser } from 'app/common/model/user.model';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import { IFileList } from 'app/common/model/sucess-file';
import { ICategory } from 'app/common/model/category.model';
import { ISearchAdvanced } from 'app/common/model/group-attribute-customer';

export interface IUserDetails {
  email?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  tags?: [
    {
      id?: string;
      name?: string;
    }
  ];
  fields?: [
    {
      id?: string;
      type?: string;
      title?: string;
      fieldValue?: string;
      personalizationTag?: string;
      value?: string;
    }
  ];
}

export interface ICompareUser {
  conflictNumbers?: number;
  email?: string;
  fieldConflicts?: string;
  fields: [
    {
      id?: string;
      type?: string;
      title?: string;
      fieldValue?: string;
      personalizationTag?: string;
      value?: string;
      code?: string;
    }
  ];
  firstName?: string;
  id?: string;
  lastName?: string;
  mobile?: string;
}

export interface IDuplicateUser {
  createdDate?: string;
  email?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
}

export interface IHeaderFile {
  fileName?: string;
  headerFields?: [
    {
      columnIndex?: number;
      columnName?: string;
      fieldCode?: string;
      fieldId?: string;
    }
  ];
}

export interface IListFields {
  id?: string;
  type?: string;
  title?: string;
  fieldValue?: string;
  personalizationTag?: string;
  value?: string;
  code?: string;
}

export interface IModalData {
  show?: boolean;
  type: string;
  text?: string;
  title: string;
}

const initialState = {
  loading: false,
  errorMessage: null,
  list_option: [],
  uploadScheduleFailure: false,
  uploadScheduleSuccess: false,
  users: [] as ReadonlyArray<IUser>,
  listFiles: {} as IFileList,
  listUsers: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: {} as IUserDetails,
  updating: false,
  updateSuccess: false,
  getNameFile: '',
  dowloadTemplate: null,
  totalItems: 0,
  categories: '',
  listCategory: [] as ReadonlyArray<ICategory>,
  totalElements: 0,
  data: {} as IUserDetails,
  listDuplicateUser: [] as ReadonlyArray<IDuplicateUser>,
  headerFile: {} as IHeaderFile,
  listFields: [] as ReadonlyArray<IListFields>,
  compareUser: [] as ReadonlyArray<ICompareUser>,
  isDelete: false,
  isMerge: false,
  isOpenModalImport: false,
  dataModal: {
    show: false,
    title: '',
    type: 'success',
    text: ''
  },
  list_save_advanced_search: [] as Array<{
    name?: string;
    id?: string;
    customerAdvancedSave: {
      advancedSearches?: ISearchAdvanced[];
      logicalOperator?: string;
    };
  }>,
  save_advanced_search: {
    name: '',
    id: '',
    customerAdvancedSave: {
      advancedSearches: [],
      logicalOperator: ''
    }
  }
};

export type UserManagementState = Readonly<typeof initialState>;

// Reducer
export default (state: UserManagementState = initialState, action): UserManagementState => {
  switch (action.type) {
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_ROLES):
      return {
        ...state
      };
    case REQUEST(USER_MANAGE_ACTION_TYPES.COMPARE_USER):
    case REQUEST(USER_MANAGE_ACTION_TYPES.GET_FIELDS):
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_USER_CATEGORIES):
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_USERS):
    case REQUEST(USER_MANAGE_ACTION_TYPES.FETCH_USER):
    case REQUEST(USER_MANAGE_ACTION_TYPES.EXPORT_FILE):
    case REQUEST(USER_MANAGE_ACTION_TYPES.UPLOAD_FILE):
    case REQUEST(USER_MANAGE_ACTION_TYPES.IMPORT_FILE):
    case REQUEST(USER_MANAGE_ACTION_TYPES.GET_LIST_DUPLICATE):
    case REQUEST(USER_MANAGE_ACTION_TYPES.GET_ADVANCED_SEARCH):
    case REQUEST(USER_MANAGE_ACTION_TYPES.GET_LIST_ADVANCED_SEARCH):
    case REQUEST(USER_MANAGE_ACTION_TYPES.POST_SAVE_ADVANCED_SEARCH):
    case REQUEST(USER_MANAGE_ACTION_TYPES.DELETE_ADVANCED_SEARCH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(USER_MANAGE_ACTION_TYPES.GET_FIND_USER_IN_MANAGEMENTS):
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
        isDelete: false
      };
    case FAILURE(USER_MANAGE_ACTION_TYPES.EXPORT_FILE):
      return {
        ...state
      };
    case FAILURE(USER_MANAGE_ACTION_TYPES.COMPARE_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.GET_FIELDS):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_USERS):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_USER_CATEGORIES):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_ROLES):
    case FAILURE(USER_MANAGE_ACTION_TYPES.CREATE_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.UPDATE_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.DELETE_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.UPLOAD_FILE):
    case FAILURE(USER_MANAGE_ACTION_TYPES.IMPORT_FILE):
    case FAILURE(USER_MANAGE_ACTION_TYPES.FETCH_SEARCH_USER):
    case FAILURE(USER_MANAGE_ACTION_TYPES.GET_LIST_DUPLICATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        uploadScheduleFailure: true,
        errorMessage: action.payload
      };
    case FAILURE(USER_MANAGE_ACTION_TYPES.POST_SAVE_ADVANCED_SEARCH):
      return {
        ...state,
        loading: false,
        dataModal: {
          show: true,
          title: 'Thành công',
          type: 'success',
          text: 'Lưu tìm kiếm thất bại'
        }
      };

    // TODO: Delete Advanced search
    case FAILURE(USER_MANAGE_ACTION_TYPES.DELETE_ADVANCED_SEARCH):
      return {
        ...state,
        loading: false,
        dataModal: {
          show: true,
          title: 'Thành công',
          type: 'success',
          text: 'Xóa tìm kiếm thất bại'
        }
      };

    case SUCCESS(USER_MANAGE_ACTION_TYPES.COMPARE_USER):
      return {
        ...state,
        loading: false,
        compareUser: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.GET_FIELDS):
      return {
        ...state,
        loading: false,
        listFields: action.payload.data
      };

    case SUCCESS(USER_MANAGE_ACTION_TYPES.GET_LIST_DUPLICATE):
      return {
        ...state,
        loading: false,
        listDuplicateUser: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_USER_CATEGORIES):
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
        users: action.payload.data.data,
        // categories: action.payload.data.content.categories,
        // totalItems: action.payload.data.content.totalItems,
        totalElements: action.payload.data.total
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_SEARCH_USER):
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        totalElements: action.payload.data.totalElements
      };

    case SUCCESS(USER_MANAGE_ACTION_TYPES.FETCH_USER):
      return {
        ...state,
        loading: false
      };

    case SUCCESS(USER_MANAGE_ACTION_TYPES.CREATE_USER):
      return {
        ...state,
        loading: false
      };

    case SUCCESS(USER_MANAGE_ACTION_TYPES.UPDATE_USER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: true,
        user: action.payload.data

        // user: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        loading: false,
        isDelete: true
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.MERGE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        loading: false,
        isMerge: true
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.EXPORT_FILE):
      return {
        ...state,
        updating: false,
        loading: false,
        updateSuccess: true,
        dowloadTemplate: action.payload
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.UPLOAD_FILE):
      return {
        ...state,
        loading: false,
        uploadScheduleSuccess: true,
        headerFile: action.payload.data
      };
    case SUCCESS(USER_MANAGE_ACTION_TYPES.IMPORT_FILE):
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

    case SUCCESS(USER_MANAGE_ACTION_TYPES.GET_FIND_USER_IN_MANAGEMENTS):
      return {
        ...state,
        loading: false,
        users: action.payload.data.data,
        totalElements: action.payload.data.total
      };

    // TODO: Get job search data
    case SUCCESS(USER_MANAGE_ACTION_TYPES.GET_ADVANCED_SEARCH):
      return {
        ...state,
        loading: false,
        save_advanced_search: action.payload.data
      };

    //TODO: Get list advanced Data
    case SUCCESS(USER_MANAGE_ACTION_TYPES.GET_LIST_ADVANCED_SEARCH):
      return {
        ...state,
        loading: false,
        list_save_advanced_search: action.payload.data
      };

    // TODO: Save advanced search
    case SUCCESS(USER_MANAGE_ACTION_TYPES.POST_SAVE_ADVANCED_SEARCH):
      return {
        ...state,
        loading: false,
        dataModal: {
          show: true,
          title: 'Thành công',
          type: 'success',
          text: 'Lưu tìm kiếm thành kiếm thành công'
        }
      };

    // TODO: Delete Advanced search
    case SUCCESS(USER_MANAGE_ACTION_TYPES.DELETE_ADVANCED_SEARCH):
      return {
        ...state,
        loading: false,
        dataModal: {
          show: true,
          title: 'Thành công',
          type: 'success',
          text: 'Xóa tìm kiếm thành kiếm thành công'
        }
      };

    case MODAL_ACTION.CLOSE_MODAL:
      return {
        ...state,
        dataModal: {
          show: false,
          title: '',
          type: 'success',
          text: ''
        }
      };

    case USER_MANAGE_ACTION_TYPES.UPDATE_USER_CATEGORY:
      return {
        ...state,
        user: {
          ...state.user,
          tags: action.payload.data
        }
      };

    case USER_MANAGE_ACTION_TYPES.GET_OPTION_FILTER:
      return {
        ...state,
        list_option: action.payload
      };

    case USER_MANAGE_ACTION_TYPES.OPEN_MODAL:
      return {
        ...initialState,
        loading: false,
        isOpenModalImport: true
      };
    case USER_MANAGE_ACTION_TYPES.CLOSE_MODAL:
      return {
        ...initialState,
        loading: false,
        isOpenModalImport: false
      };
    case USER_MANAGE_ACTION_TYPES.RESET:
    case USER_MANAGE_ACTION_TYPES.EXPORT_FILE:
      return {
        ...initialState,
        loading: false,
        dowloadTemplate: null
      };
    case USER_MANAGE_ACTION_TYPES.RESET_MESSAGE:
      return {
        ...state
      };

    case USER_MANAGE_ACTION_TYPES.GET_DATA:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};
