import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-types';
import { AUTH_ACTION_TYPES, AUTH_TOKEN_KEY, ROLE_ADMIN } from 'app/constants/auth';

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: null as string, // Errors returned from server side
  redirectMessage: null as string,
  sessionHasBeenFetched: false,
  idToken: null as string,
  logoutUrl: null as string,
  isAdmin: false,
  isConverter: false,
  isInterviewer: false
};

export type AuthenticationState = Readonly<typeof initialState>;

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(AUTH_ACTION_TYPES.LOGIN):
    case REQUEST(AUTH_ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: true
      };
    case FAILURE(AUTH_ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        errorMessage: action.payload,
        showModalLogin: true,
        loginError: true
      };
    case FAILURE(AUTH_ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.payload
      };
    case SUCCESS(AUTH_ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true
      };
    case AUTH_ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        showModalLogin: true
      };
    case SUCCESS(AUTH_ACTION_TYPES.GET_SESSION): {
      // const isAdmin = action.payload.data.name;
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload.data
        // isAdmin
      };
    }
    case AUTH_ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        showModalLogin: true,
        redirectMessage: action.message
      };
    case AUTH_ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
