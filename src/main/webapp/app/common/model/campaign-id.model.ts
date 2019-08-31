export interface ICampaignId {
  id: string;
  type: any;
  name: string;
  fromDate: Date;
  toDate: Date;
  status: any;
  description: string;
  merchantId: any;
  createBy: any;
  contactNumber: any;
  rewardName: string;
  rewardType: any;
  landingPageName: string;
  channelName: string;
}

export const defaultCampValue: Readonly<ICampaignId> = {
  id: '',
  type: '',
  name: '',
  fromDate: new Date(),
  toDate: new Date(),
  status: '',
  description: '',
  merchantId: '',
  createBy: '',
  contactNumber: '',
  rewardName: '',
  rewardType: '',
  landingPageName: '',
  channelName: ''
};
