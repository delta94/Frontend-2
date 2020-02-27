import { CAMPAIGN_MANAGEMENT } from 'app/constants/campaign-management';
import { REQUEST, FAILURE, SUCCESS } from './action-types';
import {
  IListCloneVersion,
  IListVersion,
  ICampaign,
  IDataTreeFolder,
  IListCampaignAuto,
  IListCustomerVersionProcess,
  IListCustomerInteractive,
  IListTemplateCampaign,
  ISaveCampaign,
  IListValidate
} from 'app/common/models/campaign-management.model';

interface IStatusCampaign {
  total: string;
  totalDraft: string;
  totalRunning: string;
  totalStop: string;
  totalFinish: string;
}

interface IInfoCampaign {
  des: string;
  name: string;
  tag: [];
}

interface IListDiagram {
  nodes: any[];
  edges: any[];
  // groups: any[];
}

interface IListFieldData {
  listCampign: any[];
  emailConfig: any[];
  messageConfig: any[];
  timerEvent: any[];
  timer: any[];
  getway: any[];
}

interface IListEmailTest {
  id: string;
  email: string;
}

interface IInfoVersion {
  type: string;
  nameVersion: string;
  idVersion: string;
  status: string;
}

const initialCampaignManagement = {
  tree_folder: [] as IDataTreeFolder[],
  campaign: {} as ICampaign,
  loading: false,
  statusCampaign: {} as IStatusCampaign,
  listCampaignAuto: [] as IListCampaignAuto[],
  totalCampaign: 0,
  listNode: '',
  listInfoCampaing: {} as IInfoCampaign,
  listDiagram: {} as IListDiagram,
  listFieldData: {} as IListFieldData,
  listEmailTest: [] as IListEmailTest[],
  infoVersion: {} as IInfoVersion,
  listVersion: [] as IListVersion[],
  cloneInfoVersion: {} as IListCloneVersion,
  listCustomerVersionProcess: [] as IListCustomerVersionProcess[],
  countCustomerVersionProcess: 0,
  listCustomerInteractive: [] as IListCustomerInteractive[],
  listTemplateCampaign: [] as IListTemplateCampaign[],
  idActive: {} as ISaveCampaign,
  list_validate: [] as IListValidate[],
  isCheckValidate: false
};

export type HandleCampaignManagement = typeof initialCampaignManagement;

export default (state = initialCampaignManagement, action) => {
  switch (action.type) {
    case REQUEST(CAMPAIGN_MANAGEMENT.COPY_CJID_CAMPAIGN):
    case REQUEST(CAMPAIGN_MANAGEMENT.VALIDATE_GRAPH):
    case REQUEST(CAMPAIGN_MANAGEMENT.CLONE_VERSION_BY_ID):
    case REQUEST(CAMPAIGN_MANAGEMENT.GET_TEMPLATE_CAMPAIGN):
    case REQUEST(CAMPAIGN_MANAGEMENT.VIEW_INTERACTIVE):
    case REQUEST(CAMPAIGN_MANAGEMENT.LIST_CUSTOMER_VERSION_PROCESS):
    case REQUEST(CAMPAIGN_MANAGEMENT.CLONE_VERSION):
    case REQUEST(CAMPAIGN_MANAGEMENT.GET_LIST_CAMPAIGN_AUTO):
    case REQUEST(CAMPAIGN_MANAGEMENT.COUNT_CAMPAIGN):
    case REQUEST(CAMPAIGN_MANAGEMENT.GET_TREE_FOLDER):
    case REQUEST(CAMPAIGN_MANAGEMENT.GET_EMAIL_TEST):
    case REQUEST(CAMPAIGN_MANAGEMENT.GET_LIST_VERSION):
      return {
        ...state,
        loading: true
      };
    case FAILURE(CAMPAIGN_MANAGEMENT.COPY_CJID_CAMPAIGN):
    case FAILURE(CAMPAIGN_MANAGEMENT.VALIDATE_GRAPH):
    case FAILURE(CAMPAIGN_MANAGEMENT.CLONE_VERSION_BY_ID):
    case FAILURE(CAMPAIGN_MANAGEMENT.GET_TEMPLATE_CAMPAIGN):
    case FAILURE(CAMPAIGN_MANAGEMENT.VIEW_INTERACTIVE):
    case FAILURE(CAMPAIGN_MANAGEMENT.LIST_CUSTOMER_VERSION_PROCESS):
    case FAILURE(CAMPAIGN_MANAGEMENT.CLONE_VERSION):
    case FAILURE(CAMPAIGN_MANAGEMENT.GET_LIST_VERSION):
    case FAILURE(CAMPAIGN_MANAGEMENT.GET_LIST_CAMPAIGN_AUTO):
    case FAILURE(CAMPAIGN_MANAGEMENT.COUNT_CAMPAIGN):
    case FAILURE(CAMPAIGN_MANAGEMENT.GET_TREE_FOLDER):
    case FAILURE(CAMPAIGN_MANAGEMENT.GET_EMAIL_TEST):
      return {
        ...state,
        loading: false,
        isCheckValidate: false
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.VALIDATE_GRAPH):
      return {
        ...state,
        isCheckValidate: true,
        list_validate: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.CLONE_VERSION_BY_ID):
      return {
        ...state,
        loading: false,
        cloneInfoVersion: action.payload.data
        // idActive : {}
      };

    case SUCCESS(CAMPAIGN_MANAGEMENT.SAVE_CAMPAIGN_AUTO):
      return {
        ...state,
        loading: false,
        idActive: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.GET_TEMPLATE_CAMPAIGN):
      return {
        ...state,
        loading: false,
        listTemplateCampaign: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.VIEW_INTERACTIVE):
      return {
        ...state,
        loading: false,
        listCustomerInteractive: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.LIST_CUSTOMER_VERSION_PROCESS):
      return {
        ...state,
        loading: false,
        listCustomerVersionProcess: action.payload.data.data,
        countCustomerVersionProcess: action.payload.data.total
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.CLONE_VERSION):
      return {
        ...state,
        cloneInfoVersion: action.payload.data,
        loading: false
      };

    case SUCCESS(CAMPAIGN_MANAGEMENT.GET_LIST_VERSION):
      return {
        ...state,
        loading: false,
        listVersion: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.GET_EMAIL_TEST):
      return {
        ...state,
        loading: false,
        listEmailTest: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.GET_LIST_CAMPAIGN_AUTO):
      return {
        ...state,
        loading: false,
        listCampaignAuto: action.payload.data.data,
        totalCampaign: action.payload.data.total
      };

    case SUCCESS(CAMPAIGN_MANAGEMENT.COUNT_CAMPAIGN):
      return {
        ...state,
        loading: false,
        statusCampaign: action.payload.data
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.GET_TREE_FOLDER):
      return {
        ...state,
        loading: false,
        tree_folder: action.payload.data
      };

    case CAMPAIGN_MANAGEMENT.CREATE_TREE_FOLDER:
      return { ...state, data: action.data };

    case REQUEST(CAMPAIGN_MANAGEMENT.GET_CAMPAIGN_IN_FOLDER):
      return {
        ...state,
        loading: true
      };

    case FAILURE(CAMPAIGN_MANAGEMENT.GET_CAMPAIGN_IN_FOLDER):
      return {
        ...state,
        loading: false
      };
    case SUCCESS(CAMPAIGN_MANAGEMENT.GET_CAMPAIGN_IN_FOLDER):
      return {
        ...state,
        loading: false,
        campaign: action.payload.data
      };

    case CAMPAIGN_MANAGEMENT.GET_CAMPAIGN_IN_FOLDER:
      return { ...state, data: action.payload };

    case CAMPAIGN_MANAGEMENT.GET_NODE:
      return { ...state, listNode: action.payload };

    case CAMPAIGN_MANAGEMENT.GET_INFO_CAMPAIGN:
      return { ...state, listInfoCampaing: action.payload };
    case CAMPAIGN_MANAGEMENT.RESET_DATA_CAMPAIGN:
      return {
        ...state,
        listFieldData: []
      };
    case CAMPAIGN_MANAGEMENT.GET_DIAGRAM_CAMPAIGN:
      return { ...state, listDiagram: action.payload };
    case CAMPAIGN_MANAGEMENT.VALIDATE_DIAGRAM_CAMPAIGN:
      return { ...state, listFieldData: action.payload };
    case CAMPAIGN_MANAGEMENT.SAVE_CAMPAIGN_AUTO_VERSION:
      return { ...state, infoVersion: action.payload };
    case CAMPAIGN_MANAGEMENT.RESET_VERSION:
      return { ...state, cloneInfoVersion: {}, idActive: { id: null, cjId: null } };
    case SUCCESS(CAMPAIGN_MANAGEMENT.COPY_CJID_CAMPAIGN):
      action.payload.data.cjId = null;
      return {
        ...state,
        loading: false,
        cloneInfoVersion: action.payload.data
      };
    default:
      return state;
  }
};
