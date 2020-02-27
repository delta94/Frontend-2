import { EMAIL_PROFILE } from '../constants/email-profile';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-types';
import { IEmailData, IEmail, IEmailTemplateData } from 'app/common/models/email-config.model';
import { IOpenModal } from './modal';
import { ERROR } from '../constants/common';
import { toast } from 'react-toastify';

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
  contentTemplate: '' as string
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

    case REQUEST(EMAIL_PROFILE.GET_EMAIL):
    case REQUEST(EMAIL_PROFILE.CREATE_EMAIL):
    case REQUEST(EMAIL_PROFILE.DELETE_EMAIL):
    case REQUEST(EMAIL_PROFILE.SEND_CODE_ACTIVE_EMAIL):
    case REQUEST(EMAIL_PROFILE.SET_DEFAULT_EMAIL):
    case REQUEST(EMAIL_PROFILE.VERIFILE_EMAIL):
    case FAILURE(EMAIL_PROFILE.GET_EMAIL):
      toast.error(ERROR);
      return {
        ...state,
        loading: false
      };

    case SUCCESS(EMAIL_PROFILE.GET_EMAIL):
      toast.success('Lấy thành công danh sách email profile');
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
