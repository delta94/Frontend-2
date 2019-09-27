import { IOpenModal } from './modal';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { PROPS_MANAGEMENT } from '../constants/props-management';

export interface IPropertiesCustomer {
  name?: string;
  type?: string;
  personalization?: boolean;
}

const initialDataState = {
  loading: false,
  list_prop: [] as IPropertiesCustomer[],
  postMailRequest: {
    type: 'warning',
    text: 'Thiếu trường thông tin',
    title: 'Thông báo',
    show: false,
    payload: {}
  } as IOpenModal
};

export type PropertiesDataState = Readonly<typeof initialDataState>;

// Reducer

export default (state: PropertiesDataState = initialDataState, action): PropertiesDataState => {
  switch (action.type) {
    case REQUEST(PROPS_MANAGEMENT.GET_LIST_PROPS):
    case REQUEST(PROPS_MANAGEMENT.POST_DELETE_PROPS):
    case REQUEST(PROPS_MANAGEMENT.POST_INSERT_PROPS):
    case REQUEST(PROPS_MANAGEMENT.POST_MERGE_PROPS):
    case REQUEST(PROPS_MANAGEMENT.POST_UPDATE_PROPS):
      return {
        ...state,
        loading: true
      };

    case FAILURE(PROPS_MANAGEMENT.POST_DELETE_PROPS):
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

    case FAILURE(PROPS_MANAGEMENT.GET_LIST_PROPS):
      return {
        ...state,
        loading: false
      };

    case FAILURE(PROPS_MANAGEMENT.POST_INSERT_PROPS):
      return {
        ...state,
        loading: false,
        postMailRequest: {
          type: 'warning',
          text: 'Thiếu trường thông tin',
          title: 'Thông báo',
          show: false
        }
      };

    case FAILURE(PROPS_MANAGEMENT.POST_MERGE_PROPS):
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

    case FAILURE(PROPS_MANAGEMENT.POST_UPDATE_PROPS):
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

    case SUCCESS(PROPS_MANAGEMENT.GET_LIST_PROPS):
      return {
        ...state,
        loading: false,
        list_prop: action.payload.data
      };

    // success on post mail Test action
    case SUCCESS(PROPS_MANAGEMENT.GET_LIST_PROPS):
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
    // success on get content template
    case SUCCESS(PROPS_MANAGEMENT.POST_UPDATE_PROPS):
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
    case SUCCESS(PROPS_MANAGEMENT.POST_INSERT_PROPS):
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
    case SUCCESS(PROPS_MANAGEMENT.POST_MERGE_PROPS):
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

    // success on post merge tage
    case SUCCESS(PROPS_MANAGEMENT.POST_DELETE_PROPS):
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
    default:
      return state;
  }
};
