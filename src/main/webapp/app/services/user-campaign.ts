import axios from 'axios';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { ICategory } from 'app/common/model/category.model';
import { toast } from 'react-toastify';

const apiUrl = 'v1/campaigns';

/**
 *
 * @param page -number
 * @param pageSize - number
 * @param category - string
 * @param textSearch - string
 * @return {code: number, data: Object{item: [{id: string, name: string, gmail: string, catagories: string, }, pageIndex: number, pageSize: number] }}
 */

export const getCampaignInfoService = () => {
  return axios.get(apiUrl);
};
