export interface ICampaignCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  categories: string;
  customerCode: any;
  categorys: [];
}

export const defaultValue: Readonly<ICampaignCustomer> = {
  id: '',
  name: '',
  phone: '',
  email: '',
  categories: '',
  customerCode: '',
  categorys: []
};
