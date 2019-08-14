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
  profiles?: string[];
  // id?: string;
  // name?:string;
  // email?:string;
  // mobile?:string;
  // allType? :any[];
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
  profiles: []
  // id: '',
  // name:'',
  // email:'',
  // mobile:'',
  // allType:[],
};
