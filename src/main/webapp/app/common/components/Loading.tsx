import React from 'react';
import './Loading.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export interface LoadingProps {
  isOpen: boolean;
}

class Loading extends React.Component<LoadingProps> {
  constructor(props) {
    super(props);
  }
  render() {
    const { isOpen } = this.props;
    return (
      <div className="ModalLoading">
        <Modal isOpen={isOpen} id="create time title" className="ModalLoading" autoFocus={false}>
          <div>
            <img src="http://interview-test.izzi.vn/content/images/loading.svg" alt="" />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Loading;
