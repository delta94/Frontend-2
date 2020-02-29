import { EMAIL_PROFILE } from '../constants/email-profile';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-types';
import { IEmailData, IEmail, IEmailTemplateData } from 'app/common/models/email-config.model';
import { IOpenModal } from './modal';
import { ERROR } from '../constants/common';
import { toast } from 'react-toastify';
import { EmailProfile, IEmailProfileData } from 'app/common/models/email-profile.model';
import { number } from 'prop-types';
import { verifileEmailProfile } from '../actions/email-profile';

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
  emailProfileData: {} as IEmailProfileData,
  contentParams: [] as IContentParams[],
  emailDetail: {} as IEmail,
  emailTemplateCategories: [] as IEmailTemplateCategory[],
  contentTemplate: '' as string,
  verifileCode: ''
};

export type EmailProfileState = Readonly<typeof initialState>;

export default (state: EmailProfileState = initialState, action): EmailProfileState => {
  switch (action.type) {
    case REQUEST(EMAIL_PROFILE.GET_EMAIL):
    case REQUEST(EMAIL_PROFILE.CREATE_EMAIL):
    case REQUEST(EMAIL_PROFILE.DELETE_EMAIL):
    case REQUEST(EMAIL_PROFILE.SEND_CODE_ACTIVE_EMAIL):
    case REQUEST(EMAIL_PROFILE.SET_DEFAULT_EMAIL):
    case REQUEST(EMAIL_PROFILE.VERIFILE_EMAIL):
      return {
        ...state,
        loading: true
      };

    case FAILURE(EMAIL_PROFILE.GET_EMAIL):
    case FAILURE(EMAIL_PROFILE.CREATE_EMAIL):
    case FAILURE(EMAIL_PROFILE.DELETE_EMAIL):
    case FAILURE(EMAIL_PROFILE.SEND_CODE_ACTIVE_EMAIL):
    case FAILURE(EMAIL_PROFILE.SET_DEFAULT_EMAIL):
    case FAILURE(EMAIL_PROFILE.VERIFILE_EMAIL):
      toast.error(ERROR);
      return {
        ...state,
        loading: false
      };

    case SUCCESS(EMAIL_PROFILE.GET_EMAIL):
      // toast.success('Lấy thành công danh sách email profile');
      return {
        ...state,
        emailProfileData: action.payload.data,
        loading: false
      };
    case SUCCESS(EMAIL_PROFILE.CREATE_EMAIL):
      toast.success('Tạo email thành công');
      return {
        ...state,
        loading: false,
        verifileCode: action.payload.data
      };
    case SUCCESS(EMAIL_PROFILE.DELETE_EMAIL):
      toast.success('Xóa email thành công');
      return {
        ...state,
        loading: false
      };
    case SUCCESS(EMAIL_PROFILE.SET_DEFAULT_EMAIL):
      toast.success('Thiết lập mặc định email thành công');
      return {
        ...state,
        loading: false
      };
    case SUCCESS(EMAIL_PROFILE.SEND_CODE_ACTIVE_EMAIL):
      toast.success('Gửi mã xác nhận email thành công');
      return {
        ...state,
        loading: false
      };
    case SUCCESS(EMAIL_PROFILE.VERIFILE_EMAIL):
      // toast.success('Thiết lập mặc định email thành công');
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
