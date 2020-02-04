import { PROPS_MANAGEMENT } from 'app/constants/props-management';
import {
  getListProps,
  postInsertProp,
  postInsertOneProp,
  deleteProp,
  postUpdateProp,
  getTemp,
  getId
} from 'app/services/properties-management';

export const getListProp = (type?, textsearch?) => {
  return {
    type: PROPS_MANAGEMENT.GET_LIST_PROPS,
    payload: getListProps(type, textsearch)
  };
};

export const getListTemp = (textsearch?) => {
  return {
    type: PROPS_MANAGEMENT.GET_LIST_TEMP,
    payload: getTemp(textsearch)
  };
};

export const getTempId = id => {
  return {
    type: PROPS_MANAGEMENT.GET_TEMP,
    payload: getId(id)
  };
};

export const insertProp = data => {
  return {
    type: PROPS_MANAGEMENT.POST_INSERT_PROPS,
    payload: postInsertProp(data)
  };
};

export const insertOneProp = data => {
  return {
    type: PROPS_MANAGEMENT.POST_INSERT_ONE_PROP,
    payload: postInsertOneProp(data)
  };
};

export const updateProp = (id, data) => {
  return {
    type: PROPS_MANAGEMENT.POST_INSERT_PROPS,
    payload: postUpdateProp(id, data)
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
