export interface IListFieldData {
  id?: string;
  type?: string;
  title?: string;
  fieldValue?: string;
  personalizationTag?: string;
  value?: string;
  code?: string;
}

export interface IDataCustomer {
  id?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  merchantId?: string;
  fields: IFieldCustomer[];
}

export interface IFieldCustomer {
  id?: string;
  type?: string;
  titler?: string;
  fieldValue?: string;
  vlaue?: string;
}

export interface ISearchAdvanced {
  field?: string;
  value?: string;
  operator?: string;
}
