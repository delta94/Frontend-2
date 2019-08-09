export interface IUser {
  // id?: any;
  // login?: string;
  // firstName?: string;
  // lastName?: string;
  // email?: string;
  // activated?: boolean;
  // langKey?: string;
  // authorities?: any[];
  // createdBy?: string;
  // createdDate?: Date;
  // lastModifiedBy?: string;
  // lastModifiedDate?: Date;
  // password?: string;
  id?: any;
  fullName?: string;
  phone?: any;
  email?: string;
  profiles?: string;
  feature?: string;
}

export const defaultValue: Readonly<IUser> = {
  // id: '',
  // login: '',
  // firstName: '',
  // lastName: '',
  // email: '',
  // activated: false,
  // langKey: '',
  // authorities: [],
  // createdBy: '',
  // createdDate: null,
  // lastModifiedBy: '',
  // lastModifiedDate: null,
  // password: ''
  id: '',
  fullName: '',
  phone: '',
  email: '',
  profiles: '',
  feature: ''
};
