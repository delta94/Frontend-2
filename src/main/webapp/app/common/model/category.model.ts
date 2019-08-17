export interface ICategory {
  id?: string;
  typeName?: string;
}

export const defaultValue: Readonly<ICategory> = {
  id: '',
  typeName: ''
};
