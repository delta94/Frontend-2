import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-types';
import { AUTH_ACTION_TYPES, AUTH_TOKEN_KEY, ROLE_ADMIN } from 'app/constants/auth';
// import sideBar6  from 'app/assets/utils/images/sidebar/city1.jpg';
import { THEME_OPTIONS_ACTION_TYPES } from 'app/constants/theme-options';
// import * as action from 'app/actions/theme-options';

const initialState = {
  backgroundColor: '',
  headerBackgroundColor: '',
  enableMobileMenuSmall: '',
  enableMobileMenu: false,
  enableBackgroundImage: false,
  enableClosedSidebar: false,
  enableFixedHeader: true,
  enableHeaderShadow: true,
  enableSidebarShadow: true,
  enableFixedFooter: true,
  enableFixedSidebar: true,
  colorScheme: 'white',
  backgroundImage: 'app/assets/utils/images/sidebar/city1.jpg',
  backgroundImageOpacity: 'opacity-06',
  enablePageTitleIcon: true,
  enablePageTitleSubheading: true,
  enablePageTabsAlt: true
};

export type ThemeOptionsState = Readonly<typeof initialState>;

export default (state: ThemeOptionsState = initialState, action): ThemeOptionsState => {
  switch (action.type) {
    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_BACKGROUND_IMAGE:
      return {
        ...state,
        enableBackgroundImage: action.enableBackgroundImage
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_FIXED_HEADER:
      return {
        ...state,
        enableFixedHeader: action.enableFixedHeader
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_HEADER_SHADOW:
      return {
        ...state,
        enableHeaderShadow: action.enableHeaderShadow
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_SIDEBAR_SHADOW:
      return {
        ...state,
        enableSidebarShadow: action.enableSidebarShadow
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_PAGETITLE_ICON:
      return {
        ...state,
        enablePageTitleIcon: action.enablePageTitleIcon
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_PAGETITLE_SUBHEADING:
      return {
        ...state,
        enablePageTitleSubheading: action.enablePageTitleSubheading
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_PAGE_TABS_ALT:
      return {
        ...state,
        enablePageTabsAlt: action.enablePageTabsAlt
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_FIXED_SIDEBAR:
      return {
        ...state,
        enableFixedSidebar: action.enableFixedSidebar
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_MOBILE_MENU:
      return {
        ...state,
        enableMobileMenu: action.enableMobileMenu
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_MOBILE_MENU_SMALL:
      return {
        ...state,
        enableMobileMenuSmall: action.enableMobileMenuSmall
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_CLOSED_SIDEBAR:
      return {
        ...state,
        enableClosedSidebar: action.enableClosedSidebar
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_ENABLE_FIXED_FOOTER:
      return {
        ...state,
        enableFixedFooter: action.enableFixedFooter
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: action.backgroundColor
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_HEADER_BACKGROUND_COLOR:
      return {
        ...state,
        headerBackgroundColor: action.headerBackgroundColor
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_COLOR_SCHEME:
      return {
        ...state,
        colorScheme: action.colorScheme
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_BACKGROUND_IMAGE:
      return {
        ...state,
        backgroundImage: action.backgroundImage
      };

    case THEME_OPTIONS_ACTION_TYPES.SET_BACKGROUND_IMAGE_OPACITY:
      return {
        ...state,
        backgroundImageOpacity: action.backgroundImageOpacity
      };
    default:
      return state;
  }
};
