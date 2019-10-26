import { TAG_MANAGEMENT } from '../constants/tag-management';
import { getListTags, postInsertTag, postUpdateTag, postMergeTag, postDeleteTag, getComboTags } from '../services/tag-management';

export const getListTagDataAction = (textSearch?: string, page?: number, pageSize?: number) => ({
  type: TAG_MANAGEMENT.GET_LIST_TAG,
  payload: getListTags(textSearch, page, pageSize)
});

export const getComboTagsAction = (textSearch?: string) => ({
  type: TAG_MANAGEMENT.GET_COMBOBOX_TAG,
  payload: getComboTags(textSearch)
});

export const postInsertTagAction = data => ({
  type: TAG_MANAGEMENT.POST_INSERT_TAG,
  payload: postInsertTag(data)
});

export const postDeleteTagAction = (data: any) => ({
  type: TAG_MANAGEMENT.POST_DELETE_TAG,
  payload: postDeleteTag(data)
});

export const postMergeTagAction = (id: string, data: any) => ({
  type: TAG_MANAGEMENT.POST_MERGE_TAG,
  payload: postMergeTag(id, data)
});

export const postUpdateTagAction = (data: any) => ({
  type: TAG_MANAGEMENT.POST_UPDATE_TAG,
  payload: postUpdateTag(data)
});
