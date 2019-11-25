import React, { Fragment } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import CampaignTag from '../campaign-tag/campaign-tag';
import { updateCjTagsAction } from 'app/actions/cj';

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
}

class CJTagModal extends React.Component<ICjTagModalProps, TCjTagModalState> {
  state: TCjTagModalState = {
    cjTags: []
  };

  componentDidMount() {}

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

  render() {
    let { openModalCjTag, toogleModalCjTag, dataModalTag, closeModalCjTag } = this.props;
    let extendComponent: any = null;
    let color: string = 'primary';
    let isDisable = false;
    return (
      <div className="modal-cj-tag">
        <Modal id="modal-cj-tag" isOpen={openModalCjTag}>
          <ModalHeader toggle={toogleModalCjTag}>Chọn tag</ModalHeader>
          <ModalBody>
            <CampaignTag handleChange={this.handleChange} defaultValue={dataModalTag.cjTags} />
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={closeModalCjTag}>
              Hủy bỏ
            </Button>
            <Button
              onClick={() => {
                this.handleSubmit(dataModalTag.cjId);
              }}
              color="primary"
            >
              Chọn
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
