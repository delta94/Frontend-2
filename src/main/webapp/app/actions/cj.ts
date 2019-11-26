import { CJ } from '../constants/cj';
import { getCjTagsByCjId, postUpdateCjTags } from 'app/services/cj';

export const getCjTagsByCjIdAction = (cjId?: string) => ({
  type: CJ.GET_LIST_CJ_TAG_BY_CJ_ID,
  payload: getCjTagsByCjId(cjId)
});

export const updateCjTagsAction = data => ({
  type: CJ.UPDATE_CJ_TAG,
  payload: postUpdateCjTags(data)
});
