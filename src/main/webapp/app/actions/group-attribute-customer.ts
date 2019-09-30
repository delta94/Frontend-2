import { CUSTOMER_GROUP_ATTRIBUTE } from '../constants/group-atrribute-customer';
import {
  getListCustomerGroups,
  postInsertCustomerGroup,
  postUpdateCustomerGroup,
  postMergeCustomerGroup,
  postDeleteCustomerGroup
} from '../services/group-atrribute-customer';

export const getListCustomerGroupDataAction = (textSearch?: string, page?: number, pageSize?: number) => ({
  type: CUSTOMER_GROUP_ATTRIBUTE.GET_LIST_CUSTOMER_GROUP,
  payload: getListCustomerGroups(textSearch, page, pageSize)
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
