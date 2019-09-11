import { MODAL_ACTION } from 'app/constants/modal';

export interface IOpenModal {
  show?: boolean;
  type?: string;
  title?: string;
  text?: string;
}

const initialModalState = {
  data: {
    show: false,
    type: '',
    title: '',
    text: ''
  } as Readonly<IOpenModal>
};

export type HandleModal = typeof initialModalState;

export default (state = initialModalState, action) => {
  switch (action.type) {
    case MODAL_ACTION.OPEN_MODAL:
      return { ...state, data: action.data };
    case MODAL_ACTION.CLOSE_MODAL:
      return { ...state, data: action.data };
    default:
      return state;
  }
};
