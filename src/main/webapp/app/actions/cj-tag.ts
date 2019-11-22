import { CJ_TAG } from '../constants/cj-tag';
import { getCjTags } from 'app/services/cj-tag';

export const getCjTagsAction = (textSearch?: string) => ({
  type: CJ_TAG.GET_LIST_CJ_TAG,
  payload: getCjTags(textSearch)
});
