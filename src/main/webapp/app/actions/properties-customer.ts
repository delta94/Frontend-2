import { PROPS_MANAGEMENT } from 'app/constants/props-management';
import { getListProps, postInsertProp, deleteProp } from 'app/services/properties-management';

export const getListProp = (type?, textsearch?) => {
  return {
    type: PROPS_MANAGEMENT.GET_LIST_PROPS,
    payload: getListProps(type, textsearch)
  };
};

export const insertProp = data => {
  return {
    type: PROPS_MANAGEMENT.POST_INSERT_PROPS,
    payload: postInsertProp(data)
  };
};

export const postDeleteProp = id => {
  return {
    type: PROPS_MANAGEMENT.POST_DELETE_PROPS,
    payload: deleteProp(id)
  };
};

export const resetState = () => {
  return {
    type: PROPS_MANAGEMENT.RESET_PROPS
  };
};

export const openModalDel = () => {
  return {
    type: PROPS_MANAGEMENT.OPEN_MODAL_PROPS
  };
};
export const openModalEdit = () => {
  return {
    type: PROPS_MANAGEMENT.OPEN_MODAL_EDIT_PROPS
  };
};
