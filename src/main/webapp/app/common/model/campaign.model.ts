export interface ICampaign {
  id?: string;
  name?: string;
  status?: string;
  time?: string;
  listCamp?: any[];
}

export const defaultValue: Readonly<ICampaign> = {
  id: '',
  name: '',
  status: '',
  time: '',
  listCamp: []
};
