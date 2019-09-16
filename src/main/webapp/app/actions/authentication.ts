import axios from 'axios';
import { Storage } from 'react-jhipster';
import { setLocale } from 'app/actions/locale';
import { AUTH_ACTION_TYPES, AUTH_TOKEN_KEY } from 'app/constants/authentication';
import { getSessionService, loginService } from 'app/services/authentication';

export const displayAuthError = message => ({ type: AUTH_ACTION_TYPES.ERROR_MESSAGE, message });

export const getSession = () => async (dispatch, getState) => {
  await dispatch({
    type: AUTH_ACTION_TYPES.GET_SESSION,
    payload: getSessionService()
    // payload: axios.get('./content/json_data/account.json')
  });

  const { account } = getState().authentication;
  if (account && account.langKey) {
    const langKey = Storage.session.get('locale', account.langKey);
    await dispatch(setLocale(langKey));
  }
};

export const login = (accessToken, rememberMe = false) => async (dispatch, getState) => {
  const result = await dispatch({
    type: AUTH_ACTION_TYPES.LOGIN,
    // payload: axios.post(`login-google/${accessToken.accessToken}`, { headers: { ['Content-Type']: 'application/json' } })
    payload: loginService(accessToken)
  });
  // const bearerToken = result.value.data.jwt;
  // Storage.local.set(AUTH_TOKEN_KEY, bearerToken);

  // if (rememberMe) {
  //   Storage.local.set(AUTH_TOKEN_KEY, bearerToken);
  // } else {
  //   Storage.session.set(AUTH_TOKEN_KEY, bearerToken);
  // }

  await dispatch(getSession());
};

export const clearAuthToken = () => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout = () => dispatch => {
  clearAuthToken();
  dispatch({
    type: AUTH_ACTION_TYPES.LOGOUT
  });
};

export const clearAuthentication = messageKey => (dispatch, getState) => {
  clearAuthToken();
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: AUTH_ACTION_TYPES.CLEAR_AUTH
  });
};
