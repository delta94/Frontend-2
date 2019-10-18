import { ITags } from './tag-management';
import { IOpenModal } from './modal';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { CUSTOMER_GROUP_ATTRIBUTE } from '../constants/group-atrribute-customer';
import { ERROR } from '../constants/common';
import { IListFieldData, IDataCustomer } from 'app/common/model/group-attribute-customer';
import { IDataCustomerCondition, ISearchAdvanced } from '../common/model/group-attribute-customer';
import { string } from 'prop-types';
import { MODAL_ACTION } from '../constants/modal';

interface IPostRequestReturn {
  code?: number;
  name?: number;
  openModal?: boolean;
}

interface ICatagoryGroup {
  id?: string;
  typeName?: string;
  contactNumbers?: string;
}

const initialDataState = {
  list_group_customer: [] as ICatagoryGroup[],
  list_customer_with_group_id: [] as IDataCustomerCondition[],
  list_customer_with_condition: [] as IDataCustomerCondition[],
  single_customer_field: {
    categoryId: '',
    categoryName: '',
    customerAdvancedSave: {
      logicalOperator: '',
      advancedSearches: []
    }
  },

  list_group_customer_index: {
    totalElements: 0,
    loading: false
  },

  list_customer_with_group_id_index: {
    totalElements: 0,
    loading: false
  },

  list_customer_with_condition_index: {
    totalElements: 0,
    loading: false
  },

  postRequest: {
    type: 'success',
    text: 'Thiếu trường thông tin',
    title: 'Thông báo',
    show: false
  } as IOpenModal,

  list_field_data: [] as IListFieldData[]
};

export type GroupCustomerState = Readonly<typeof initialDataState>;

export default (state: GroupCustomerState = initialDataState, action): GroupCustomerState => {
  let data;
  let list_customer_with_condition_index = state.list_customer_with_condition_index;
  let list_group_customer_index = state.list_customer_with_group_id_index;
  let list_customer_with_group_id_index = state.list_customer_with_group_id_index;

  switch (action.type) {
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP):
      list_group_customer_index.loading = true;
      return {
        ...state,
        list_group_customer_index
      };

    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_WITH_GROUP_ID):
      list_customer_with_group_id_index.loading = true;
      return {
        ...state,
        list_group_customer_index
      };

    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.GET_FIND_CUSTOMER_WITH_CONDITION):
      list_customer_with_condition_index.loading = true;
      return {
        ...state,
        list_group_customer_index
      };

    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.POST_UPDATE_CUSTOMER_GROUP):
      list_group_customer_index.loading = true;
      return {
        ...state,
        list_group_customer_index
      };

    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.POST_INSERT_CUSTOMER_GROUP):
      list_group_customer_index.loading = true;
      return {
        ...state,
        list_group_customer_index
      };

    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.GET_SINGLE_CUSTOMER_GROUP_FIELD):
      return {
        ...state
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP):
      list_group_customer_index.loading = false;
      return {
        ...state,
        list_group_customer_index
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_FIELD_DATA):
      return {
        ...state
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.GET_SINGLE_CUSTOMER_GROUP_FIELD):
      return {
        ...state
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP):
      list_group_customer_index.loading = false;
      return {
        ...state,
        list_group_customer_index,
        postRequest: {
          type: 'success',
          text: 'Xóa nhóm khách hàng thất bại',
          title: 'Thông báo',
          show: true
        }
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.POST_INSERT_CUSTOMER_GROUP):
      list_group_customer_index.loading = false;
      return {
        ...state,
        list_group_customer_index,
        postRequest: {
          type: ERROR,
          text: 'Thêm mới nhóm khách hàng thành công',
          title: 'Thông báo',
          show: true
        }
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.GET_FIND_CUSTOMER_WITH_CONDITION):
      list_customer_with_condition_index.loading = false;
      return {
        ...state,
        list_customer_with_condition_index,
        postRequest: {
          type: ERROR,
          text: 'Tạo nhóm khách hàng thất bại',
          title: 'Thất bại',
          show: true
        }
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.POST_UPDATE_CUSTOMER_GROUP):
      list_group_customer_index.loading = false;
      return {
        ...state,
        list_group_customer_index,
        postRequest: {
          type: 'success',
          text: 'Sửa thông tin nhóm thất bại',
          title: 'Thông báo',
          show: false
        }
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_WITH_GROUP_ID):
      list_customer_with_group_id_index.loading = false;
      return {
        ...state,
        list_group_customer_index,
        list_customer_with_group_id_index
      };

    // Get customer group
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP):
      data = action.payload.data;
      list_group_customer_index.totalElements = data.totalElements;
      list_group_customer_index.loading = false;
      return {
        ...state,
        list_group_customer: data,
        list_group_customer_index
      };

    // Get list customer with group id
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.GET_FIND_CUSTOMER_WITH_CONDITION):
      data = action.payload.data;
      list_customer_with_condition_index.totalElements = data.total;
      list_customer_with_condition_index.loading = false;
      return {
        ...state,
        list_customer_with_condition: data.data,
        list_customer_with_condition_index
      };

    // Get list customer with condition
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_WITH_GROUP_ID):
      data = action.payload.data;
      list_customer_with_group_id_index.totalElements = data.total;
      list_customer_with_group_id_index.loading = false;
      return {
        ...state,
        list_customer_with_group_id: data.data,
        list_customer_with_group_id_index
      };

    // Get list field data;
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_FIELD_DATA):
      return {
        ...state,
        list_field_data: action.payload.data
      };

    // Post delete list customer group
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP):
      data = action.payload.data;
      list_group_customer_index.loading = false;
      return {
        ...state,
        list_group_customer_index,
        postRequest: {
          type: 'success',
          text: 'Xóa nhóm khách hàng thành công',
          title: 'Thông báo',
          show: true
        }
      };

    // Post insert customer group
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.POST_INSERT_CUSTOMER_GROUP):
      data = action.payload.data;
      list_group_customer_index.loading = false;
      return {
        ...state,
        list_group_customer_index,
        postRequest: {
          type: 'success',
          text: 'Tạo mới thành công',
          title: 'Thông báo',
          show: true
        }
      };

    // Post update customer group
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.POST_UPDATE_CUSTOMER_GROUP):
      data = action.payload.data;
      list_group_customer_index.loading = false;
      return {
        ...state,
        list_group_customer_index,
        postRequest: {
          type: 'success',
          text: 'Sửa thông tin nhóm thành công',
          title: 'Thông báo',
          show: true
        }
      };

    // Get single customer field
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.GET_SINGLE_CUSTOMER_GROUP_FIELD):
      data = action.payload.data;
      return {
        ...state,
        single_customer_field: data
      };

    case MODAL_ACTION.CLOSE_MODAL:
      return {
        ...state,
        postRequest: {
          show: false
        }
      };
    default:
      return state;
  }
};
