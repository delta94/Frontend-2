export interface IEmailData {
  totalElements: number;
  totalPages: number;
  content: [IEmail];
}

export interface IEmailTemplateData {
  totalElements: number;
  totalPages: number;
  content: [IEmailTemplate];
}

export interface IEmail {
  id: string;
  type: string;
  name: string;
  subject: string;
  content: string;
  jsonContent: string;
  createdBy: string;
  createdUser: string;
  modifiedDate: string;
}

export interface IEmailValidationMessage {
  type?: string;
  name?: string;
  subject?: string;
  content?: string;
  jsonContent?: string;
}

export interface IEmailTemplate {
  id: string;
  name: string;
  subject: string;
  thumbnail: string;
}

export interface IContentParams {
  id?: number;
  paramCode?: string;
  paramName?: string;
  sampleValue?: string;
  groupParam?: string;
}

export interface IEmailSave {
  id?: string;
  type?: string;
  name?: string;
  subject?: string;
  content?: string;
  jsonContent?: string;
}
