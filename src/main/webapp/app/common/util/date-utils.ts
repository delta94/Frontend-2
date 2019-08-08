import moment from 'moment';

import {
  APP_LOCAL_DATETIME_FORMAT,
  APP_LOCAL_DATETIME_FORMAT_Z,
  APP_LOCAL_DATETIME_FOMAT_DASH,
  APP_LOCAL_DATE_FORMAT_DASH,
  APP_LOCAL_DATE_FORMAT,
  APP_LOCAL_TIME_FORMAT,
  APP_LOCAL_MONTH_FORMAT,
  APP_LOCAL_YEAR_FORMAT,
  APP_LOCAL_DAY_NUMBER
} from 'app/config/constants';

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? moment(date, APP_LOCAL_DATETIME_FORMAT_Z).toDate() : null);

export const convertDateTimeDash = date => (date ? moment(date, APP_LOCAL_DATETIME_FOMAT_DASH).toDate() : null);

export const convertDateLocal = date => (date ? moment(date, APP_LOCAL_DATE_FORMAT_DASH).toDate() : null);

export const formatDateTimeDashLocal = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FOMAT_DASH) : null);

export const formatDateTimeDash = date => (date ? moment(date).format(APP_LOCAL_DATE_FORMAT_DASH) : null);

export const formatTimeToServer = date => (date ? moment(date).format(APP_LOCAL_TIME_FORMAT) : null);

export const formatTimeVN = date => (date ? moment(date).format(APP_LOCAL_DATE_FORMAT) : null);

export const formatMonthNumber = date => (date ? moment(date).format(APP_LOCAL_MONTH_FORMAT) : null);

export const formatYearNumber = date => (date ? moment(date).format(APP_LOCAL_YEAR_FORMAT) : null);

export const formatDayNumber = date => (date ? moment(date).format(APP_LOCAL_DAY_NUMBER) : null);
