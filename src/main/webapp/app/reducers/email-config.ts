import { EMAIL_CONFIG } from '../constants/email-config';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IEmailData, IEmail, IEmailTemplateData } from 'app/common/model/email-config.model';
import { IOpenModal } from './modal';
import { ERROR } from '../constants/common';
import { MODAL_ACTION } from '../constants/modal';

export interface IContentParams {
  id?: number;
  paramCode?: string;
  paramName?: string;
  sampleValue?: string;
  groupParam?: string;
}

export interface IEmailTemplateCategory {
  id?: string;
  name?: string;
  code?: string;
}

const initialState = {
  loading: false,
  emailTemplateData: {} as IEmailTemplateData,
  emailData: {} as IEmailData,
  contentParams: [] as IContentParams[],
  emailDetail: {} as IEmail,
  emailTemplateCategories: [] as IEmailTemplateCategory[],
  contentTemplate: '' as string,
  modalResponse: {
    type: 'warning',
    text: 'Thiếu trường thông tin',
    title: 'Thông báo',
    show: false,
    payload: {}
  } as IOpenModal
};

export type EmailConfigState = Readonly<typeof initialState>;

export default (state: EmailConfigState = initialState, action): EmailConfigState => {
  switch (action.type) {
    case REQUEST(EMAIL_CONFIG.GET_EMAIL):
    case REQUEST(EMAIL_CONFIG.DELETE_EMAIL):
    case REQUEST(EMAIL_CONFIG.GET_CONTENT_PARAM):
    case REQUEST(EMAIL_CONFIG.GET_EMAIL_DETAIL):
    case REQUEST(EMAIL_CONFIG.GET_EMAIL_TEMP_CATEGORY):
    case REQUEST(EMAIL_CONFIG.GET_EMAIL_TEMPLATE):
    case REQUEST(EMAIL_CONFIG.PREVIEW_EMAIL_TEMPLATE):
    case REQUEST(EMAIL_CONFIG.CREATE_EMAIL):
    case REQUEST(EMAIL_CONFIG.CREATE_EMAIL_TEMPLATE):
    case REQUEST(EMAIL_CONFIG.EDIT_EMAIL):
      return {
        ...state,
        loading: true
      };

    case FAILURE(EMAIL_CONFIG.GET_EMAIL):
      return {
        ...state,
        loading: false
      };

    case FAILURE(EMAIL_CONFIG.DELETE_EMAIL):
      return {
        ...state,
        loading: false
      };

    case FAILURE(EMAIL_CONFIG.GET_CONTENT_PARAM):
      return {
        ...state,
        loading: false
      };

    case FAILURE(EMAIL_CONFIG.GET_EMAIL_DETAIL):
      return {
        ...state,
        loading: false
      };

    case FAILURE(EMAIL_CONFIG.GET_EMAIL_TEMP_CATEGORY):
      return {
        ...state,
        loading: false
      };

    case FAILURE(EMAIL_CONFIG.GET_EMAIL_TEMPLATE):
      return {
        ...state,
        loading: false
      };
    case FAILURE(EMAIL_CONFIG.PREVIEW_EMAIL_TEMPLATE):
      return {
        ...state,
        loading: false
      };

    case FAILURE(EMAIL_CONFIG.EDIT_EMAIL):
      return {
        ...state,
        loading: false,
        modalResponse: {
          type: ERROR,
          text: 'Sửa email thất bại',
          title: 'Thông báo',
          show: true
        }
      };

    case FAILURE(EMAIL_CONFIG.CREATE_EMAIL):
      return {
        ...state,
        loading: false,
        modalResponse: {
          type: ERROR,
          text: 'Thêm mới email thất bại',
          title: 'Thông báo',
          show: true
        }
      };
    case FAILURE(EMAIL_CONFIG.CREATE_EMAIL_TEMPLATE):
      return {
        ...state,
        loading: false,
        modalResponse: {
          type: ERROR,
          text: 'Thêm mới email template thất bại',
          title: 'Thông báo',
          show: true
        }
      };

    case SUCCESS(EMAIL_CONFIG.EDIT_EMAIL):
      return {
        ...state,
        loading: false,
        modalResponse: {
          type: 'success',
          text: 'Sửa email thành công',
          title: 'Thông báo',
          show: true
        }
      };

    case SUCCESS(EMAIL_CONFIG.CREATE_EMAIL):
      return {
        ...state,
        loading: false,
        modalResponse: {
          type: 'success',
          text: 'Thêm mới email thành công',
          title: 'Thông báo',
          show: true
        }
      };

    case SUCCESS(EMAIL_CONFIG.CREATE_EMAIL_TEMPLATE):
      return {
        ...state,
        loading: false,
        modalResponse: {
          type: 'success',
          text: 'Thêm mới email template thành công',
          title: 'Thông báo',
          show: true
        }
      };

    case SUCCESS(EMAIL_CONFIG.DELETE_EMAIL):
      return {
        ...state,
        loading: false
      };

    case SUCCESS(EMAIL_CONFIG.GET_EMAIL):
      return {
        ...state,
        loading: false,
        emailData: action.payload.data
      };

    case SUCCESS(EMAIL_CONFIG.GET_CONTENT_PARAM):
      return {
        ...state,
        loading: false,
        contentParams: action.payload.data
      };

    case SUCCESS(EMAIL_CONFIG.GET_EMAIL_DETAIL):
      return {
        ...state,
        loading: false,
        emailDetail: action.payload.data
      };

    case SUCCESS(EMAIL_CONFIG.GET_EMAIL_TEMP_CATEGORY):
      return {
        ...state,
        loading: false,
        emailTemplateCategories: action.payload.data
      };

    case SUCCESS(EMAIL_CONFIG.GET_EMAIL_TEMPLATE):
      return {
        ...state,
        loading: false,
        emailTemplateData: action.payload.data
      };

    case SUCCESS(EMAIL_CONFIG.PREVIEW_EMAIL_TEMPLATE):
      return {
        ...state,
        loading: false,
        contentTemplate: action.payload.data
      };

    case MODAL_ACTION.CLOSE_MODAL:
      return {
        ...state,
        loading: false,
        modalResponse: {
          show: false
        }
      };

    default:
      return state;
  }
};
