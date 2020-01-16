import { EMAIL_CONFIG } from '../constants/email-config';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IEmailData, IEmail } from 'app/common/model/email-config.model';
import { any } from 'prop-types';

export interface IContentParams {
  id?: number;
  paramCode?: string;
  paramName?: string;
  sampleValue?: string;
  groupParam?: string;
}

const initialState = {
  loading: false,
  emailData: {} as IEmailData,
  contentParams: [] as IContentParams[],
  emailDetail: {} as IEmail
};

export type EmailConfigState = Readonly<typeof initialState>;

export default (state: EmailConfigState = initialState, action): EmailConfigState => {
  switch (action.type) {
    case REQUEST(EMAIL_CONFIG.GET_EMAIL):
    case REQUEST(EMAIL_CONFIG.DELETE_EMAIL):
    case REQUEST(EMAIL_CONFIG.GET_CONTENT_PARAM):
    case REQUEST(EMAIL_CONFIG.GET_EMAIL_DETAIL):
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

    default:
      return state;
  }
};
