import { CUSTOMER_GROUP_ATTRIBUTE } from '../constants/group-atrribute-customer';
import { getListFieldData } from '../services/group-atrribute-customer';
import {
  getCustomerGroups,
  postInsertCustomerGroup,
  postUpdateCustomerGroup,
  postMergeCustomerGroup,
  postDeleteCustomerGroup
} from '../services/group-atrribute-customer';

export const getListCustomerGroupDataAction = (textSearch?: string) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP,
  payload: getCustomerGroups(textSearch)
});

export const getListFieldDataAction = () => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_FIELD_DATA,
  payload: getListFieldData()
});

export const postInsertCustomerGroupAction = data => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.POST_INSERT_CUSTOMER_GROUP,
  payload: postInsertCustomerGroup(data)
});

export const postDeleteCustomerGroupAction = (data: any) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.POST_DELETE_CUSTOMER_GROUP,
  payload: postDeleteCustomerGroup(data)
});

export const postMergeCustomerGroupAction = (id: string, data: any) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.POST_MERGE_CUSTOMER_GROUP,
  payload: postMergeCustomerGroup(id, data)
});

export const postUpdateCustomerGroupAction = (data: any) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.POST_UPDATE_CUSTOMER_GROUP,
  payload: postUpdateCustomerGroup(data)
});
