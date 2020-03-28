import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './auth';
// import applicationProfile, { ApplicationProfileState } from './application-profile';
import themeOptions, { ThemeOptionsState } from './theme-options';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  // readonly applicationProfile: ApplicationProfileState;
  readonly themeOptions: ThemeOptionsState;
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  // applicationProfile,
  themeOptions,
  loadingBar,
});

export default rootReducer;
