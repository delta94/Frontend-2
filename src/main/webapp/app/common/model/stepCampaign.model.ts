export interface IStepCampaign {
  id?: string;
  mgmCampaignTypeId?: string;
  step?: string;
  status?: string;
  description?: string;
}
export const defaultValue: Readonly<IStepCampaign> = {
  id: '',
  mgmCampaignTypeId: '',
  step: '',
  status: '',
  description: ''
};
