import { TAG_MANAGEMENT } from '../constants/tag-management';
import { getListTags } from '../services/tag-management';

export const getListTagData = (textSearch?: string, page?: number, pageSize?: number) => ({
  type: TAG_MANAGEMENT.GET_LIST_TAG,
  payload: getListTags(textSearch, page, pageSize)
});
