import { MODAL_ACTION } from 'app/constants/modal';
import { LOADING_ACTION } from 'app/constants/loading';

const initialLoadingState = {
  loading: false
};

export type LoadingState = typeof initialLoadingState;

export default (state = initialLoadingState, action) => {
  switch (action.type) {
    case LOADING_ACTION.OPEN_LOADING:
      return { ...state, loading: true };
    case LOADING_ACTION.CLOSE_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
