const config = {
  VERSION: process.env.VERSION
};

export default config;

export const SERVER_API_URL = process.env.SERVER_API_URL;
// export const SERVER_API_URL = 'http://103.137.4.12:8080';

export const AUTHORITIES = {
  ADMIN: 'Admin',
  USER: 'ROLE_USER',
  SUPER_MOD: 'SMOD',
  CONVERTER: 'Converter',
  INTERVIEWER: 'Interviewer',
  REVIWER: 'REW',
  REVIWER1: 'REW1',
  REVIWER2: 'REW2'
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error'
};

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATE_FORMAT_DASH = 'YYYY-MM-DD';
export const APP_LOCAL_TIME_FORMAT = 'HH:mm';
export const APP_LOCAL_DAY_NUMBER = 'D';
export const APP_LOCAL_MONTH_FORMAT = 'M';
export const APP_LOCAL_YEAR_FORMAT = 'YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_LOCAL_DATETIME_FOMAT_DASH = 'YYYY-MM-DD HH:mm';
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

export const MODAL_EVENT_TYPE = {
  INTERVIEW_INFO: 'DELETE_INTERVIEW',
  FREE_INFO: 'DELETE_FREE_TIME',
  CREATE_FREE_EVENT: 'CREATE_INTERVIEW'
};

export const SELECTBOX_TYPE = {
  MAIN_BOOK_SCHEDULE: 'MAIN_BOOK_SCHEDULE',
  LIST_CANDIDATE_BOOKED: 'LIST_CANDIDATE_BOOKED'
};

export const CALENDAR_VIEW = 'CALENDAR_VIEW';
export const LIST_VIEW = 'LIST_VIEW';

export type SCHEDULE_VIEW_TYPE = typeof CALENDAR_VIEW | typeof LIST_VIEW;

// export const DEFAULT_INTERVIEWER_ID = '4';

export const LIST_INTERVIEW_NUMBER = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 }
];

export const NAVIGATE_TYPE = {
  NEXT: 'NEXT',
  PREV: 'PREV',
  TODAY: 'TODAY'
};

export const MIN_TIME_BOOK_SCHEDULE = '07:30';

export const CANCEL_BOOK_INTERVIEW_REASON = [
  { value: 1, label: 'Lý do cá nhân' },
  { value: 2, label: 'Bận công việc' },
  { value: 3, label: 'Khác' }
];

export const URL_VALIDATE_PARTTERN = '(https?://(www.)?|(www.))[A-z0-9_-]{3,20}(.[A-z]{1,4}){1,2}';
