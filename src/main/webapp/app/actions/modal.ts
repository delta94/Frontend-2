import { MODAL_ACTION } from 'app/constants/modal';

export const openModal = data => {
  return {
    type: MODAL_ACTION.OPEN_MODAL,
    data
  };
};

export const closeModal = () => {
  return {
    type: MODAL_ACTION.CLOSE_MODAL,
    data: {
      show: false
    }
  };
};
