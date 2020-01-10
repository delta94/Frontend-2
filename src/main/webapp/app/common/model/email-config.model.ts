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

