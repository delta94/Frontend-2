export interface ICustomerCampaigns {
  name?: string;
  categories?: Array<String>;
}

export interface IReward {
  type?: number;
  voucherId?: string;
}

export interface IParamester {
  code?: string;
  name?: string;
  id?: string;
}

export interface IContentTemplate {
  subject?: string;
  content?: string;
  templateId?: string;
  channelId?: string;
  contentType?: string;
  parameter: Array<IParamester>;
}

export interface ISaveDataCampain {
  campaignTypeId?: string;
  name?: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
  customerCampaigns?: Array<ICustomerCampaigns>;
  reward?: IReward;
  contentTemplates?: Array<IContentTemplate>;
}
