export interface ICampaign {
  id?: string;
  name?: string;
  status?: string;
  total?: any;
  time?: string;
}

export const defaultValue: Readonly<ICampaign> = {
  id: '',
  name: '',
  status: '',
  total: '',
  time: ''
};
