import React, { Fragment } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import { Input } from 'antd';
import { createCjTagAction, getCjTagsAction } from 'app/actions/cj-tag';
import './cj-tag-insert-modal.scss';

interface ICjTagInsertModalProps extends StateProps, DispatchProps {
  isOpenModalCjTagInsert?: boolean;
  toogleModalCjTagInsert?: Function;
  closeModalCjTagInsert?: Function;
  dataModalTag?: string;
  refreshListCjTag?: Function;
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
    if (value && value.includes(',')) {
      value = value.replace(',', '');
    }
    let cjTag = this.state.cjTag;
    cjTag[type] = value;
    this.setState({ cjTag: cjTag });
    this.validateForm(cjTag);
  };

  submit = async () => {
    let { createCjTagAction, closeModalCjTagInsert, refreshListCjTag, dataModalTag } = this.props;
    let { cjTag } = this.state;
    this.validateForm(cjTag);
    if (cjTag.name && cjTag.name.trim() !== '') {
      let cjTagData = {
        cjTag: { ...cjTag, name: cjTag.name.trim() },
        cjId: dataModalTag
      };
      await createCjTagAction(cjTagData);
      await refreshListCjTag();
      closeModalCjTagInsert();
      this.resetField();
    }
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

  resetField = () => {
    this.setState({ cjTag: {} });
  };

  render() {
    let { isOpenModalCjTagInsert, closeModalCjTagInsert, toogleModalCjTagInsert } = this.props;
    let { cjTag, messageErrorCjTagName } = this.state;

    return (
      <Modal id="modal-cj-tag-insert" isOpen={isOpenModalCjTagInsert}>
        <ModalHeader toggle={toogleModalCjTagInsert}>THÊM TAG MỚI</ModalHeader>
        <ModalBody>
          <div className="cj-tag-insert-content">
            <div className="cj-tag-insert-input">
              <span>Tag</span>
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
          <Button
            color="black"
            onClick={() => {
              this.props.closeModalCjTagInsert();
              this.resetField();
            }}
          >
            Hủy
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
  createCjTagAction,
  getCjTagsAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CJTagInsertModal);
