import { CUSTOMER_GROUP_ATTRIBUTE } from '../constants/group-atrribute-customer';
import {
  getListCustomerGroups,
  postInsertCustomerGroup,
  postUpdateCustomerGroup,
  getFindCustomerWithCondition,
  postDeleteCustomerGroup,
  getListFieldData,
  getSingleCustomerGroupField,
  getListCustomerWithGroupId
} from '../services/group-atrribute-customer';

// Get list customer group
export const getListCustomerGroupDataAction = (textSearch?: string) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP,
  payload: getListCustomerGroups(textSearch)
});

// Get list customer with group id
export const getListCustomerWithGroupIdDataAction = (textSearch: string, page: number, pageSize: number, id: string) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_WITH_GROUP_ID,
  payload: getListCustomerWithGroupId(textSearch, page, pageSize, id)
});

// Get list field data
export const getListFieldDataAction = () => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_FIELD_DATA,
  payload: getListFieldData()
});

// Post insert new group
export const postInsertCustomerGroupAction = data => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.POST_INSERT_CUSTOMER_GROUP,
  payload: postInsertCustomerGroup(data)
});

// Post delete customer group
export const postDeleteCustomerGroupAction = (data: any) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP,
  payload: postDeleteCustomerGroup(data)
});

// Find customer with condition
export const getFindCustomerWithConditionAction = (data: any) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.GET_FIND_CUSTOMER_WITH_CONDITION,
  payload: getFindCustomerWithCondition(data)
});

// Post update customer group
export const postUpdateCustomerGroupAction = (id: string, data: any) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.POST_UPDATE_CUSTOMER_GROUP,
  payload: postUpdateCustomerGroup(id, data)
});

// Get single data group
export const getSingleCustomerGroupFieldDataAction = (id: string) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.GET_SINGLE_CUSTOMER_GROUP_FIELD,
  payload: getSingleCustomerGroupField(id)
});
