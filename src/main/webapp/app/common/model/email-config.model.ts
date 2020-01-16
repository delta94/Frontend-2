export interface IEmailData {
  totalElements: number;
  totalPages: number;
  content: [
    IEmail
  ];
}

export interface IEmail {
  id: string;
  name: string;
  subject: string;
  content: string;
  createdBy: string;
  createdUser: string;
  modifiedDate: string;
}

export interface IContentParams {
  id?: number;
  paramCode?: string;
  paramName?: string;
  sampleValue?: string;
  groupParam?: string;
}

