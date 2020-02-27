import { MODAL_ACTION } from './../constants/modal';
import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-types';
import { IUser } from 'app/common/models/user.model';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import { USER_RESTORE_ACTION_TYPES } from 'app/constants/user-restore';
import { IFileList } from 'app/common/models/file-list.model';
import { ICategory } from 'app/common/models/category.model';
import { ISearchAdvanced } from 'app/common/models/group-attribute-customer';
import { toast } from 'react-toastify';

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

const initialState = {
  loading: false,
  errorMessage: null,
  isCreate: false,
  users: [] as ReadonlyArray<any>,
  listUsers: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: {} as IUserDetails,
  totalElements: 0,
  data: {} as IUserDetails,
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

export type UserRestoreState = Readonly<typeof initialState>;

// Reducer
export default (state: UserRestoreState = initialState, action): UserRestoreState => {
  switch (action.type) {
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
    case REQUEST(USER_RESTORE_ACTION_TYPES.GET_USERS_DELETED_LIST):
    case REQUEST(USER_RESTORE_ACTION_TYPES.RESTORE_USERS_BY_IDS):
    case REQUEST(USER_RESTORE_ACTION_TYPES.RESTORE_ALL_USERS_WITH_FILTER):
      return {
        ...state,
        errorMessage: null,
        loading: true,
        dataModal: {
          show: true,
          title: 'Thành công',
          type: 'success',
          text: 'Xóa tìm kiếm thành kiếm thành công'
        }
      };
    case FAILURE(USER_RESTORE_ACTION_TYPES.GET_USERS_DELETED_LIST):
    case FAILURE(USER_RESTORE_ACTION_TYPES.RESTORE_USERS_BY_IDS):
    case FAILURE(USER_RESTORE_ACTION_TYPES.RESTORE_ALL_USERS_WITH_FILTER):
      toast.error('Đã có lỗi xảy ra !');
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
        isCreate: false
      };

    case SUCCESS(USER_RESTORE_ACTION_TYPES.GET_USERS_DELETED_LIST):
      return {
        ...state,
        loading: false,
        users: action.payload.data.data,
        totalElements: action.payload.data.total
      };
    case SUCCESS(USER_RESTORE_ACTION_TYPES.RESTORE_USERS_BY_IDS):
      toast.success('Đã khôi phục người dùng thành công !');
      return {
        ...state,
        loading: false
      };
    case SUCCESS(USER_RESTORE_ACTION_TYPES.RESTORE_ALL_USERS_WITH_FILTER):
      toast.success('Đã khôi phục người dùng thành công !');
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
