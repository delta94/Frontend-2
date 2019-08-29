export interface ICampaign {
  id?: string;
  name?: string;
  status?: string;
  contactNumber?: any;
  fromDate?: Date;
  toDate?: Date;
}

export const defaultValue: Readonly<ICampaign> = {
  id: '',
  name: '',
  status: '',
  contactNumber: '',
  fromDate: new Date(),
  toDate: new Date()
};
