export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  mobile?: string;
  email?: string;
  merchantId?: string;
  tag?: string;
  createdDate?: string;
  createdDateOrder?: string;
  deleted?: number;
  modifiedDate?: string;
  fields?: [
    {
      id?: string;
      fieldValue?: string;
      code?: string;
      title?: string;
      type?: string;
      value?: string;
    }
  ];
  tags?: any[];
}
