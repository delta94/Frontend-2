import { ITags } from './tag-management';
import { IOpenModal } from './modal';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { TAG_MANAGEMENT } from '../constants/tag-management';
import { ERROR } from '../constants/common';
import { MODAL_ACTION } from '../constants/modal';

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
  list_tags: [] as ITags[],
  totalElements: 0,
  totalPages: 0,
  size: 0,
  tagResponse: {
    type: 'warning',
    text: 'Thiếu trường thông tin',
    title: 'Thông báo',
    show: false,
    payload: {}
  } as IOpenModal
};

export type TagDataState = Readonly<typeof initialDataState>;

export default (state: TagDataState = initialDataState, action): TagDataState => {
  switch (action.type) {
    case REQUEST(TAG_MANAGEMENT.GET_LIST_TAG):
    case REQUEST(TAG_MANAGEMENT.POST_DELETE_TAG):
    case REQUEST(TAG_MANAGEMENT.POST_INSERT_TAG):
    case REQUEST(TAG_MANAGEMENT.POST_MERGE_TAG):
    case REQUEST(TAG_MANAGEMENT.POST_UPDATE_TAG):
      return {
        ...state,
        loading: true
      };

    case FAILURE(TAG_MANAGEMENT.GET_LIST_TAG):
      return {
        ...state,
        loading: false
      };

    case FAILURE(TAG_MANAGEMENT.POST_DELETE_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: 'success',
          text: 'Email không hợp lệ',
          title: 'Thông báo',
          show: true
        }
      };

    case FAILURE(TAG_MANAGEMENT.POST_INSERT_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: ERROR,
          text: 'Thêm mới tag không thành công',
          title: 'Thông báo',
          show: true
        }
      };

    case FAILURE(TAG_MANAGEMENT.POST_MERGE_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: ERROR,
          text: 'Gộp tag thất bại',
          title: 'Thất bại',
          show: true
        }
      };

    case FAILURE(TAG_MANAGEMENT.POST_UPDATE_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: 'success',
          text: 'Email không hợp lệ',
          title: 'Thông báo',
          show: false
        }
      };

    case SUCCESS(TAG_MANAGEMENT.GET_LIST_TAG):
      let data = action.payload.data;
      console.log(data);
      return {
        ...state,
        loading: false,
        list_tags: data.content,
        size: data.totalPages,
        totalElements: data.totalElements,
        totalPages: data.totalPages
      };

    // success on get content template
    case SUCCESS(TAG_MANAGEMENT.POST_UPDATE_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: 'success',
          text: 'Sửa tag thành công',
          title: 'Thông báo',
          show: true
        }
      };
    // success on post mail Test action
    case SUCCESS(TAG_MANAGEMENT.POST_INSERT_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: 'success',
          text: 'Tạo mới thành công',
          title: 'Thông báo',
          show: true
        }
      };

    // success on post merge tage
    case SUCCESS(TAG_MANAGEMENT.POST_MERGE_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: 'success',
          text: 'Gộp thông tin tag thành công',
          title: 'Thông báo',
          show: true
        }
      };

    // success on post merge tage
    case SUCCESS(TAG_MANAGEMENT.POST_DELETE_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: 'success',
          text: 'Xóa thông tin tag thành công',
          title: 'Thông báo',
          show: true
        }
      };
    case MODAL_ACTION.CLOSE_MODAL:
      return {
        ...state,
        loading: false,
        tagResponse: {
          show: false
        }
      };
    default:
      return state;
  }
};
