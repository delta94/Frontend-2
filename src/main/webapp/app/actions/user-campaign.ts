import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, translate } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/reducers/action-type.util';
import { toast } from 'react-toastify';
import { IUser, defaultValue } from 'app/common/model/user.model';
import { USER_CAMPAIGN_ACTION_TYPES } from 'app/constants/user-campaign';
import { getCampaignInfoService } from 'app/services/user-campaign';
import { IFileList } from 'app/common/model/sucess-file';
import { warn } from 'fullcalendar';

const apiUrl = 'v1/customer';
// Actions
export const getCampaignInfo = () => {
  return {
    type: USER_CAMPAIGN_ACTION_TYPES.FETCH_CAMPAIGNS,
    payload: getCampaignInfoService()
  };
};

// export const updateUser: ICrudPutAction<IUser> = user  => {
//   return {
//     type: USER_CAMPAIGN_ACTION_TYPES.UPDATE_USER,
//     payload: updateUserService(user)
//   };
// };
