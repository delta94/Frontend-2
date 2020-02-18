import { CJ } from '../constants/cj';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-types';
export interface ICjTag {
  id?: string;
  name?: string;
}

const initialState = {
  loading: false,
  cj_tags: [] as ICjTag[]
};

export type CjState = Readonly<typeof initialState>;

export default (state: CjState = initialState, action): CjState => {
  switch (action.type) {
    case REQUEST(CJ.GET_LIST_CJ_TAG_BY_CJ_ID):
    case REQUEST(CJ.UPDATE_CJ_TAG):
      return {
        ...state,
        loading: true
      };

    case FAILURE(CJ.GET_LIST_CJ_TAG_BY_CJ_ID):
      return {
        ...state,
        loading: false
      };
    case FAILURE(CJ.UPDATE_CJ_TAG):
      return {
        ...state,
        loading: false
      };

    case SUCCESS(CJ.GET_LIST_CJ_TAG_BY_CJ_ID):
      let dataTag = action.payload.data;
      return {
        ...state,
        loading: false,
        cj_tags: action.payload.data
      };

    case SUCCESS(CJ.UPDATE_CJ_TAG):
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
