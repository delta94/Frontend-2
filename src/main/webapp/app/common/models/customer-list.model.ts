export interface CustomerList {
  id?: any;
  fullName?: string;
  phone?: any;
  email?: string;
  profiles?: string;
  feature?: string;
}

export const defaultValue: Readonly<CustomerList> = {
  id: '',
  fullName: '',
  phone: '',
  email: '',
  profiles: '',
  feature: ''
};
