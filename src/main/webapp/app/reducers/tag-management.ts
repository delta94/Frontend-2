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

export interface IComboTags {
  id?: string;
  name?: string;
}

const initialDataState = {
  loading: false,
  list_tags: [] as ITags[],
  combo_tag: [] as IComboTags[],
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
    case REQUEST(TAG_MANAGEMENT.GET_COMBOBOX_TAG):
      return {
        ...state,
        loading: true
      };

    case FAILURE(TAG_MANAGEMENT.GET_LIST_TAG):
      return {
        ...state,
        loading: false
      };

    case FAILURE(TAG_MANAGEMENT.GET_COMBOBOX_TAG):
      return {
        ...state,
        loading: false
      };

    case FAILURE(TAG_MANAGEMENT.POST_DELETE_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: ERROR,
          text: 'Xóa thẻ thất bại',
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
          text: 'Thêm mới thẻ không thành công',
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
          text: 'Gộp thẻ thất bại',
          title: 'Thông báo',
          show: true
        }
      };

    case FAILURE(TAG_MANAGEMENT.POST_UPDATE_TAG):
      return {
        ...state,
        loading: false,
        tagResponse: {
          type: ERROR,
          text: 'Sửa thẻ thất bại',
          title: 'Thông báo',
          show: true
        }
      };

    case SUCCESS(TAG_MANAGEMENT.GET_COMBOBOX_TAG):
      let dataTag = action.payload.data;
      return {
        ...state,
        loading: false,
        combo_tag: dataTag
      };

    case SUCCESS(TAG_MANAGEMENT.GET_LIST_TAG):
      let data = action.payload.data;
      return {
        ...state,
        loading: false,
        list_tags: data.content,
        size: data.size,
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
          text: 'Sửa thẻ thành công',
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
          text: 'Tạo mới thẻ thành công',
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
          text: 'Gộp thông tin thẻ thành công',
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
          text: 'Xóa thông tin thẻ thành công',
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
