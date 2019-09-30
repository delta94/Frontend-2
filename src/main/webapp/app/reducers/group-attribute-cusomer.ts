import { ITags } from './tag-management';
import { IOpenModal } from './modal';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { CUSTOMER_GROUP_ATTRIBUTE } from '../constants/group-atrribute-customer';
import { ERROR } from '../constants/common';

export interface IPostRequestReturn {
  code?: number;
  name?: number;
  openModal?: boolean;
}

export interface ITags {
  id?: string;
  name?: string;
  contactNumbers?: string;
  description?: string;
}

const initialDataState = {
  loading: false,
  list_group_customer: [] as ITags[],
  totalElements: 0,
  totalPages: 0,
  size: 0,
  postMailRequest: {
    type: 'warning',
    text: 'Thiếu trường thông tin',
    title: 'Thông báo',
    show: false,
    payload: {}
  } as IOpenModal
};

export type GroupCustomerState = Readonly<typeof initialDataState>;

export default (state: GroupCustomerState = initialDataState, action): GroupCustomerState => {
  switch (action.type) {
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP):
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.POST_UPDATE_CUSTOMER_GROUP):
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.POST_INSERT_CUSTOMER_GROUP):
    case REQUEST(CUSTOMER_GROUP_ATTRIBUTE.POST_MERGE_CUSTOMER_GROUP):
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

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: 'success',
          text: 'Email không hợp lệ',
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
          text: 'Thêm mới tag không thành công',
          title: 'Thông báo',
          show: true
        }
      };

    case FAILURE(CUSTOMER_GROUP_ATTRIBUTE.POST_MERGE_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: ERROR,
          text: 'Gộp tag thất bại',
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
      console.log(data);
      return {
        ...state,
        loading: false,
        list_group_customer: data.content,
        size: data.totalPages,
        totalElements: data.totalElements,
        totalPages: data.totalPages
      };

    // success on get content template
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: 'success',
          text: 'Gửi mail thành công',
          title: 'Thông báo',
          show: true
        }
      };
    // success on post mail Test action
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

    // success on post merge tage
    case SUCCESS(CUSTOMER_GROUP_ATTRIBUTE.POST_MERGE_CUSTOMER_GROUP):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: 'success',
          text: 'Gộp thông tin tag thành công',
          title: 'Thông báo',
          show: true
        }
      };

    // success on post merge tage
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
