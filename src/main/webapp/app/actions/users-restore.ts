import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, translate } from 'react-jhipster';
// import { userRestoreService } from '../services/user-restore';
import { USER_RESTORE_ACTION_TYPES } from '../constants/user-restore';
import { getListDeletedCustomer, postRestoreCustomerBatchSevice, postRestoreCustomerSimpleFilterSevice } from '../services/user-restore';

// get deleted Users list
export const getDeletedUsers = (fromDate, toDate, page, pageSize, sort?: any[], textSearch?: string) => {
  return {
    type: USER_RESTORE_ACTION_TYPES.GET_USERS_DELETED_LIST,
    payload: getListDeletedCustomer(fromDate, toDate, page, pageSize, sort, textSearch)
  };
};
// remove list customer by list id
export const postDeleteCustomerBatch = (data: any) => {
  return {
    type: USER_RESTORE_ACTION_TYPES.RESTORE_USERS_BY_IDS,
    payload: postRestoreCustomerBatchSevice(data)
  };
};
// remove list all customer with simple filter
export const postDeleteCustomerSimpleSearch = (data: any) => {
  return {
    type: USER_RESTORE_ACTION_TYPES.RESTORE_ALL_USERS_WITH_FILTER,
    payload: postRestoreCustomerSimpleFilterSevice(data)
  };
};
