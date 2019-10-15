export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  categories?: string;
  categorys?: any[];
}

export const defaultValue: Readonly<IUser> = {
  id: '',
  name: '',
  email: '',
  phone: '',
  categories: '',
  categorys: []
};
