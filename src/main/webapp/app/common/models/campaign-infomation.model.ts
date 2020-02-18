export interface ICampaignInfo {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
}
export const defaultValue: Readonly<ICampaignInfo> = {
  id: '',
  name: '',
  description: '',
  status: ''
};
