export interface IFileList {
  total?: any;
  success?: any;
  error?: any;
  fileName?: string;
  listErrorImport?: Array<{
    email?: string;
    error?: string;
    field?: any[];
    firstName?: string;
    lastName?: string;
    id?: string;
    mobile?: string;
    tag?: string;
  }>;
}
