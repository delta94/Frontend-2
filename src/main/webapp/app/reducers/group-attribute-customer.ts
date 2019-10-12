import { ITags } from './tag-management';
import { IOpenModal } from './modal';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { CUSTOMER_GROUP_ATTRIBUTE } from '../constants/group-atrribute-customer';
import { ERROR } from '../constants/common';
import { IListFieldData, IDataCustomer } from 'app/common/model/group-attribute-customer';

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
  loading: false,
  list_group_customer: [] as ICatagoryGroup[],
  list_data_customer: [] as IDataCustomer[],
  totalElements: 0,
  totalPages: 0,
  size: 0,
  postMailRequest: {
    type: 'warning',
    text: 'Thiếu trường thông tin',
    title: 'Thông báo',
    show: false,
    payload: {}
  } as IOpenModal,
  list_field_data: [] as IListFieldData[]
};

export type GroupCustomerState = Readonly<typeof initialDataState>;

export default (state: GroupCustomerState = initialDataState, action): GroupCustomerState => {
  switch (action.type) {
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP):
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.POST_UPDATE_CUSTOMER_GROUP):
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.POST_INSERT_CUSTOMER_GROUP):
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.POST_FIND_CUSTOMER_WITH_CONDITION):
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP):
      return {
        ...state,
        loading: true
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_FIELD_DATA):
      return {
        ...state,
        loading: false
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: 'success',
          text: 'Xóa nhóm khách hàng thất bại',
          title: 'Thông báo',
          show: true
        }
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.POST_INSERT_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: ERROR,
          text: 'Thêm mới nhóm khách hàng thành công',
          title: 'Thông báo',
          show: true
        }
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.POST_FIND_CUSTOMER_WITH_CONDITION):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: ERROR,
          text: 'Tạo nhóm khách hàng thất bại',
          title: 'Thất bại',
          show: true
        }
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.POST_UPDATE_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: 'success',
          text: 'Email không hợp lệ',
          title: 'Thông báo',
          show: false
        }
      };

    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP):
      let data = action.payload.data;
      return {
        ...state,
        loading: false,
        list_group_customer: data,
        size: data.totalPages,
        totalPages: data.totalPages
      };

    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_FIELD_DATA):
      return {
        ...state,
        loading: false,
        list_field_data: action.payload.data
      };

    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: 'success',
          text: 'Xóa nhóm khách hàng thành công',
          title: 'Thông báo',
          show: true
        }
      };
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.POST_INSERT_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: 'success',
          text: 'Tạo mới thành công',
          title: 'Thông báo',
          show: true
        }
      };
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.POST_FIND_CUSTOMER_WITH_CONDITION):
      return {
        ...state,
        loading: false,
        list_data_customer: action.payload.data
      };
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: 'success',
          text: 'Xóa thông tin tag thành công',
          title: 'Thông báo',
          show: true
        }
      };
    default:
      return state;
  }
};
