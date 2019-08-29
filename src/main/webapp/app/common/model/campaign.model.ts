export interface ICampaign {
  id?: string;
  name?: string;
  status: any;
  fromDate: Date;
  toDate: Date;
  contactNumber: any;
}

export const defaultValue: Readonly<ICampaign> = {
  id: '',
  name: '',
  status: '',
  fromDate: new Date(),
  toDate: new Date(),
  contactNumber: 0
};
