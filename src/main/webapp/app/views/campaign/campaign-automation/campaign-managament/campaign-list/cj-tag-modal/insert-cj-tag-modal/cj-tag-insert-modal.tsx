import React, { Fragment } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import { Input } from 'antd';
import { createCjTagAction } from 'app/actions/cj-tag';

interface ICjTagInsertModalProps extends StateProps, DispatchProps {
  isOpenModalCjTagInsert?: boolean;
  toogleModalCjTagInsert?: Function;
  closeModalCjTagInsert?: Function;
}

interface ICjTagInsertModalState {
  cjTag: ITCjagEditEntity;
  messageErrorCjTagName: any;
}

interface ITCjagEditEntity {
  name?: string;
}

class CJTagInsertModal extends React.Component<ICjTagInsertModalProps, ICjTagInsertModalState> {
  state: ICjTagInsertModalState = {
    cjTag: {},
    messageErrorCjTagName: ''
  };

  onChangeInput = (value, type) => {
    let cjTag = this.state.cjTag;
    cjTag[type] = value;
    this.setState({ cjTag: cjTag });
  };

  submit = () => {
    let cjTagValue = this.state.cjTag;
    this.validateForm(cjTagValue);
    if (cjTagValue.name && cjTagValue.name.trim() !== '') {
      this.props.createCjTagAction(cjTagValue);
    }

    this.props.closeModalCjTagInsert();
  };

  validateForm = (cjTag: ITCjagEditEntity) => {
    if (cjTag.name && cjTag.name.trim() !== '') {
      this.setState({
        messageErrorCjTagName: ''
      });
    } else {
      this.setState({
        messageErrorCjTagName: <label className="message-error">Tên thẻ không được để trống</label>
      });
    }
  };

  render() {
    let { isOpenModalCjTagInsert, closeModalCjTagInsert, toogleModalCjTagInsert } = this.props;
    let { cjTag, messageErrorCjTagName } = this.state;
    return (
      <Modal id="modal-cj-tag-insert" isOpen={isOpenModalCjTagInsert}>
        <ModalHeader toggle={toogleModalCjTagInsert}>Thêm tag</ModalHeader>
        <ModalBody>
          <div className="cj-tag-insert-content">
            <div className="cj-tag-insert-input">
              Tag
              <Input
                className="tab-info"
                id="name"
                type="text"
                placeholder=""
                value={cjTag.name}
                onChange={event => this.onChangeInput(event.target.value, 'name')}
                maxLength={160}
              />
            </div>
            {messageErrorCjTagName}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="link" onClick={closeModalCjTagInsert}>
            Hủy bỏ
          </Button>
          <Button color="primary" onClick={() => this.submit()}>
            Chọn
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ cjTagState }: IRootState) => ({});

const mapDispatchToProps = {
  createCjTagAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CJTagInsertModal);
