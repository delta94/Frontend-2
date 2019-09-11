import { MODAL_ACTION } from 'app/constants/modal';
import { IOpenModal } from 'app/reducers/modal';

export const openModal = (data: IOpenModal) => {
  return {
    type: MODAL_ACTION.OPEN_MODAL,
    data
  };
};

export const closeModal = () => {
  return {
    type: MODAL_ACTION.CLOSE_MODAL
  };
};
