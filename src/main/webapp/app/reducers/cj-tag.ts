import { CJ_TAG } from '../constants/cj-tag';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
export interface ICjTag {
  id?: string;
  name?: string;
}

const initialState = {
  loading: false,
  cj_tags: [] as ICjTag[]
};

export type CjTagState = Readonly<typeof initialState>;

export default (state: CjTagState = initialState, action): CjTagState => {
  switch (action.type) {
    case REQUEST(CJ_TAG.GET_LIST_CJ_TAG):
      return {
        ...state,
        loading: true
      };

    case FAILURE(CJ_TAG.GET_LIST_CJ_TAG):
      return {
        ...state,
        loading: false
      };

    case SUCCESS(CJ_TAG.GET_LIST_CJ_TAG):
      let dataTag = action.payload.data;
      return {
        ...state,
        loading: false,
        cj_tags: action.payload.data
      };
    default:
      return state;
  }
};
