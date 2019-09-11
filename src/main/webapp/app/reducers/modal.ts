import { MODAL_ACTION } from 'app/constants/modal';

export interface IOpenModal {
  show: boolean;
  type: string;
  title: string;
  text: string;
}

const initialModalState = {
  show: false,
  type: '',
  title: '',
  text: ''
};

export type HandleModal = Readonly<typeof initialModalState>;

export default (state: IOpenModal = initialModalState, action): IOpenModal => {
  switch (action.type) {
    case MODAL_ACTION.OPEN_MODAL:
      return { ...state, show: true, title: action.title, text: action.text, type: action.type };
    default:
      return { ...state, show: false };
  }
};
