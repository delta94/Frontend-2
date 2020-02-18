import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './auth';
// import applicationProfile, { ApplicationProfileState } from './application-profile';
import userManagement, { UserManagementState } from './user-management';
import userCampaign, { UserCampaignState } from './user-campaign';
import campaignManagament, { HandleCampaignManagament } from './campaign-managament';
import landingPage, { LandingPageState } from './landing-page';
import themeOptions, { ThemeOptionsState } from './theme-options';
import navigationInfo, { NavigationInfo } from './navigation-info';
import handleModal, { HandleModal } from './modal';
import loadingState, { LoadingState } from './loading';
import tagDataState, { TagDataState } from './tag-management';
import propertiesState, { PropertiesDataState } from './properties-customer';
import groupCustomerState, { GroupCustomerState } from './group-attribute-customer';
import cjTagState, { CjTagState } from './cj-tag';
import cjState, { CjState } from './cj';
import emailConfigState, { EmailConfigState } from './email-config';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  // readonly applicationProfile: ApplicationProfileState;
  readonly userManagement: UserManagementState;
  readonly userCampaign: UserCampaignState;
  readonly themeOptions: ThemeOptionsState;
  readonly landingPage: LandingPageState;
  readonly loadingBar: any;
  readonly navigationInfo: NavigationInfo;
  readonly handleModal: HandleModal;
  readonly loadingState: LoadingState;
  readonly tagDataState: TagDataState;
  readonly propertiesState: PropertiesDataState;
  readonly groupCustomerState: GroupCustomerState;
  readonly campaignManagament: HandleCampaignManagament;
  readonly cjTagState: CjTagState;
  readonly cjState: CjState;
  readonly emailConfigState: EmailConfigState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  // applicationProfile,
  userManagement,
  themeOptions,
  loadingBar,
  userCampaign,
  landingPage,
  navigationInfo,
  handleModal,
  loadingState,
  tagDataState,
  propertiesState,
  groupCustomerState,
  campaignManagament,
  cjTagState,
  cjState,
  emailConfigState
});

export default rootReducer;
