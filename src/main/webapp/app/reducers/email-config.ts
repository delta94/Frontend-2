import { EMAIL_CONFIG } from '../constants/email-config';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { IEmailData } from 'app/common/model/email-config.model';

const initialState = {
  loading: false,
  emailData: {} as IEmailData
};

export type EmailConfigState = Readonly<typeof initialState>;

export default (state: EmailConfigState = initialState, action): EmailConfigState => {
  switch (action.type) {
    case REQUEST(EMAIL_CONFIG.GET_EMAIL):
    case REQUEST(EMAIL_CONFIG.DELETE_EMAIL):
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

    case SUCCESS(EMAIL_CONFIG.DELETE_EMAIL):
      return {
        ...state,
        loading: false
      };

    case SUCCESS(EMAIL_CONFIG.GET_EMAIL):
      let data = action.payload.data;
      return {
        ...state,
        loading: false,
        emailData: action.payload.data
      };
    default:
      return state;
  }
};
