import { TranslatorContext, Storage } from 'react-jhipster';
import { LOCALE_ACTION_TYPES } from 'app/constants/locale';

const initialState = {
  currentLocale: undefined
};

export type LocaleState = Readonly<typeof initialState>;

export default (state: LocaleState = initialState, action): LocaleState => {
  switch (action.type) {
    case LOCALE_ACTION_TYPES.SET_LOCALE:
      const currentLocale = action.locale;
      if (state.currentLocale !== currentLocale) {
        TranslatorContext.setLocale(currentLocale);
      }
      return {
        currentLocale
      };
    default:
      return state;
  }
};
