import { IOpenModal } from './modal';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { PROPS_MANAGEMENT } from '../constants/props-management';

export interface IPropertiesCustomer {
  id?: string;
  title?: string;
  type?: string;
  personalizationTag?: boolean;
  fieldValue?: string;
}

const initialDataState = {
  loading: false,
  list_prop: [] as IPropertiesCustomer[],
  isCompelete: false
};

export type PropertiesDataState = Readonly<typeof initialDataState>;

// Reducer

export default (state: PropertiesDataState = initialDataState, action): PropertiesDataState => {
  switch (action.type) {
    case REQUEST(PROPS_MANAGEMENT.GET_LIST_PROPS):
    case REQUEST(PROPS_MANAGEMENT.POST_DELETE_PROPS):
    case REQUEST(PROPS_MANAGEMENT.POST_INSERT_PROPS):
    case REQUEST(PROPS_MANAGEMENT.POST_MERGE_PROPS):
    case REQUEST(PROPS_MANAGEMENT.POST_UPDATE_PROPS):
      return {
        ...state,
        loading: true
      };

    case FAILURE(PROPS_MANAGEMENT.POST_DELETE_PROPS):
      return {
        ...state,
        loading: false
      };

    case FAILURE(PROPS_MANAGEMENT.GET_LIST_PROPS):
      return {
        ...state,
        loading: false
      };

    case FAILURE(PROPS_MANAGEMENT.POST_INSERT_PROPS):
      return {
        ...state,
        loading: false,
        isCompelete: false
      };

    case FAILURE(PROPS_MANAGEMENT.POST_MERGE_PROPS):
      return {
        ...state,
        loading: false
      };

    case FAILURE(PROPS_MANAGEMENT.POST_UPDATE_PROPS):
      return {
        ...state,
        loading: false
      };

    case SUCCESS(PROPS_MANAGEMENT.GET_LIST_PROPS):
      return {
        ...state,
        loading: false,
        list_prop: action.payload.data
      };

    // success on post mail Test action
    case SUCCESS(PROPS_MANAGEMENT.GET_LIST_PROPS):
      return {
        ...state,
        loading: false
      };
    // success on get content template
    case SUCCESS(PROPS_MANAGEMENT.POST_UPDATE_PROPS):
      return {
        ...state,
        loading: false
      };
    // success on post mail Test action
    case SUCCESS(PROPS_MANAGEMENT.POST_INSERT_PROPS):
      return {
        ...state,
        loading: false,
        isCompelete: true
      };

    // success on post merge tage
    case SUCCESS(PROPS_MANAGEMENT.POST_MERGE_PROPS):
      return {
        ...state,
        loading: false
      };

    // success on post merge tage
    case SUCCESS(PROPS_MANAGEMENT.POST_DELETE_PROPS):
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
