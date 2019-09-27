import { PROPS_MANAGEMENT } from 'app/constants/props-management';
import { getListProps } from 'app/services/properties-management';
import axios from 'axios';

const apiUrl = 'v1/campaigns';
// Actions

//display campaign detail to modal follow campaign's id
export const getListProp = (type?, textsearch?) => {
  return {
    type: PROPS_MANAGEMENT.GET_LIST_PROPS,
    payload: getListProps(type, textsearch)
  };
};
