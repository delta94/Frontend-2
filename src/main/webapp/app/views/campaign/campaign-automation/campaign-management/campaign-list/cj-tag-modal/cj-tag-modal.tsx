import React, { Fragment } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import CampaignTag from '../campaign-tag/campaign-tag';
import CjTagInsertModal from './insert-cj-tag-modal/cj-tag-insert-modal';
import CjTagListModal from './list-cj-tag-modal/cj-tag-list-modal';
import { updateCjTagsAction } from 'app/actions/cj';
import './cj-tag-modal.scss';

interface ICjTagModalProps extends StateProps, DispatchProps {
  openModalCjTag?: boolean;
  toogleModalCjTag?: Function;
  dataModalTag: {
    cjId?: string;
    cjTags?: any[];
  };
  closeModalCjTag?: Function;
  getCjs?: Function;
}

interface TCjTagModalState {
  cjTags?: any[];
  isOpenModalCjTagInsert?: boolean;
  isOpenModalCjTagList?: boolean;
  cjId?: string;
}

class CJTagModal extends React.Component<ICjTagModalProps, TCjTagModalState> {
  state: TCjTagModalState = {
    cjTags: [],
    isOpenModalCjTagInsert: false,
    isOpenModalCjTagList: false
  };

  componentDidMount() { }

  handleChange = cjTags => {
    this.setState({
      cjTags: cjTags
    });
  };

  handleSubmit = async cjId => {
    let cjEdit = {
      id: cjId,
      cjTags: this.state.cjTags
    };

    await this.props.updateCjTagsAction(cjEdit);
    this.props.closeModalCjTag();
    this.props.getCjs();
  };

  openModalCjTag = () => {
    this.props.closeModalCjTag();
    this.setState({
      isOpenModalCjTagInsert: true,
      cjId: this.props.dataModalTag.cjId
    });
  };

  toogleModalCjTagInsert = () => {
    let isOpenModalCjTagInsert = this.state.isOpenModalCjTagInsert;
    this.setState({
      isOpenModalCjTagInsert: !isOpenModalCjTagInsert
    });
  };

  closeModalCjTagInsert = () => {
    let isOpenModalCjTagInsert = this.state.isOpenModalCjTagInsert;
    this.setState({
      isOpenModalCjTagInsert: !isOpenModalCjTagInsert
    });
  };

  openModalListCjTag = () => {
    this.props.closeModalCjTag();
    this.setState({
      isOpenModalCjTagList: true
    });
  };

  toogleModalCjTagList = () => {
    let isOpenModalCjTagList = this.state.isOpenModalCjTagList;
    this.setState({
      isOpenModalCjTagList: !isOpenModalCjTagList
    });
  };

  closeModalCjTagList = () => {
    let isOpenModalCjTagList = this.state.isOpenModalCjTagList;
    this.setState({
      isOpenModalCjTagList: !isOpenModalCjTagList
    });
  };

  refreshListCjTag = () => {
    this.props.getCjs();
    if (this.props.openModalCjTag) {
      this.props.closeModalCjTag();
    }
  };

  render() {
    let { openModalCjTag, toogleModalCjTag, closeModalCjTag, dataModalTag } = this.props;
    let extendComponent: any = null;
    let color: string = 'primary';
    let isDisable = false;
    let { isOpenModalCjTagInsert, isOpenModalCjTagList, cjId } = this.state;
    return (
      <div className="modal-cj-tag">
        <CjTagInsertModal
          toogleModalCjTagInsert={this.toogleModalCjTagInsert}
          isOpenModalCjTagInsert={isOpenModalCjTagInsert}
          closeModalCjTagInsert={this.closeModalCjTagInsert}
          dataModalTag={cjId}
          refreshListCjTag={this.refreshListCjTag}
        />
        <CjTagListModal
          toogleModalCjTagList={this.toogleModalCjTagList}
          isOpenModalCjTag={isOpenModalCjTagList}
          closeModalCjTag={this.closeModalCjTagList}
          refreshListCjTag={this.refreshListCjTag}
        />

        <Modal id="modal-cj-tag" isOpen={openModalCjTag}>
          <ModalHeader toggle={toogleModalCjTag}><Translate contentKey="campaign-auto.list.chosse-tag" /></ModalHeader>
          <ModalBody>
            <div className="combobox-cj-tag">
              <CampaignTag handleChange={this.handleChange} defaultValue={dataModalTag.cjTags} />
            </div>
            <br />
            <div className="link">
              <a onClick={() => this.openModalCjTag()}><Translate contentKey="campaign-auto.list.add-tag" /></a>
              <br />
              <a onClick={() => this.openModalListCjTag()}><Translate contentKey="campaign-auto.list.tag" /></a>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={closeModalCjTag}>
              <Translate contentKey="campaign-auto.modal.cancel" />
            </Button>
            <Button
              onClick={() => {
                this.handleSubmit(dataModalTag.cjId);
              }}
              color="primary"
            >
              <Translate contentKey="campaign-auto.btn-chosse" />
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ cjState }: IRootState) => ({});

const mapDispatchToProps = {
  updateCjTagsAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CJTagModal);
