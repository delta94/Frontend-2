import axios from 'axios';

import { TranslatorContext, Storage } from 'react-jhipster';
import { LOCALE_ACTION_TYPES } from 'app/constants/locale';

export const setLocale = locale => async dispatch => {
  if (!Object.keys(TranslatorContext.context.translations).includes(locale)) {
    const response = await axios.get(`i18n/${locale}.json?buildTimestamp=${process.env.BUILD_TIMESTAMP}`, { baseURL: '' });
    TranslatorContext.registerTranslations(locale, response.data);
  }
  dispatch({
    type: LOCALE_ACTION_TYPES.SET_LOCALE,
    locale
  });
};
