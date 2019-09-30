import { PROPS_MANAGEMENT } from 'app/constants/props-management';
import { getListProps, postInsertProp } from 'app/services/properties-management';

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
