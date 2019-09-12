import { LOADING_ACTION } from 'app/constants/loading';

export const openLoading = () => {
  return {
    type: LOADING_ACTION.OPEN_LOADING
  };
};

export const closeLoading = () => {
  return {
    type: LOADING_ACTION.CLOSE_LOADING
  };
};
