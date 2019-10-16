import { IOpenModal } from './modal';
import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { PROPS_MANAGEMENT } from '../constants/props-management';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';

export interface IPropertiesCustomer {
  code?: string;
  id?: string;
  title?: string;
  type?: string;
  personalizationTag?: string;
  fieldValue?: string;
}

export interface IListTemp {
  id?: string;
  title?: string;
}

export interface ITemp {
  id: string;
  type?: string;
  title?: string;
  personalizationTag?: boolean;
  fieldValue?: string;
}

const initialDataState = {
  loading: false,
  list_prop: [] as IPropertiesCustomer[],
  isCompelete: false,
  isDelete: false,
  openModalDelete: false,
  openModalEdit: false,
  isUpdate: false,
  ListTemp: [] as IListTemp[],
  Temp: [] as ITemp[]
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
    case REQUEST(PROPS_MANAGEMENT.GET_LIST_TEMP):
    case REQUEST(PROPS_MANAGEMENT.GET_TEMP):
      return {
        ...state,
        loading: true
      };
    case FAILURE(PROPS_MANAGEMENT.GET_LIST_TEMP):
    case FAILURE(PROPS_MANAGEMENT.GET_TEMP):
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

    case FAILURE(PROPS_MANAGEMENT.POST_DELETE_PROPS):
      return {
        ...state,
        loading: false
      };

    case SUCCESS(PROPS_MANAGEMENT.GET_LIST_TEMP):
      return {
        ...state,
        loading: false,
        ListTemp: action.payload.data,
        openModalEdit: false,
        openModalDelete: false
      };

    case SUCCESS(PROPS_MANAGEMENT.GET_TEMP):
      return {
        ...state,
        loading: false,
        Temp: action.payload.data,
        openModalEdit: false,
        openModalDelete: false
      };

    case SUCCESS(PROPS_MANAGEMENT.GET_LIST_PROPS):
      return {
        ...state,
        loading: false,
        list_prop: action.payload.data,
        openModalEdit: false,
        openModalDelete: false
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
        loading: false,
        openModalEdit: false,
        isUpdate: true
      };
    // success on post mail Test action
    case SUCCESS(PROPS_MANAGEMENT.POST_INSERT_PROPS):
      return {
        ...state,
        loading: false,
        openModalDelete: false,
        openModalEdit: false,
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
        loading: false,
        isDelete: true,
        openModalDelete: false
      };

    case PROPS_MANAGEMENT.RESET_PROPS:
      return {
        ...state,
        isDelete: false
      };
    case PROPS_MANAGEMENT.OPEN_MODAL_PROPS:
      return {
        ...state,
        openModalDelete: true,
        openModalEdit: false
      };
    case PROPS_MANAGEMENT.OPEN_MODAL_EDIT_PROPS:
      return {
        ...state,
        openModalEdit: true,
        openModalDelete: false
      };
    default:
      return state;
  }
};
