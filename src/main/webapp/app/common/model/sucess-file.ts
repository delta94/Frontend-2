export interface IFileList {
  total?: any;
  success?: any;
  error?: any;
  fileName?: string;
  listErrorImport?: any[];
}

export const defaultValueFile: Readonly<IFileList> = {
  total: '',
  success: '',
  error: '',
  fileName: '',
  listErrorImport: [
    {
      name: '',
      phone: '',
      email: '',
      type: '',
      error: ''
    }
  ]
};
