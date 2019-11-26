import { CJ_TAG } from '../constants/cj-tag';
import { getCjTags, createCjTag, deleteCjTag } from 'app/services/cj-tag';

export const getCjTagsAction = (textSearch?: string) => ({
  type: CJ_TAG.GET_LIST_CJ_TAG,
  payload: getCjTags(textSearch)
});

export const createCjTagAction = data => ({
  type: CJ_TAG.CREATE_CJ_TAG,
  payload: createCjTag(data)
});

export const deleteCjTagAction = tagId => ({
  type: CJ_TAG.DELETE_CJ_TAG,
  payload: deleteCjTag(tagId)
});
