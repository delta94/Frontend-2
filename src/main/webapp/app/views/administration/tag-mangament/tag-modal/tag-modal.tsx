import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import TagMerge from './merge-tags/merge-tags';
import TagDelete from './delete-tags/delete-tags';
import TagEdit from './edit-tags/edit-tags';

import './tag-modal.scss';
import { MERGE_TAG, DELETE_TAG, EDIT_TAG } from '../../../../constants/tag-management';
import { openModal } from '../../../../actions/modal';
import { postUpdateTagAction, postDeleteTagAction, getListTagDataAction, postMergeTagAction } from '../../../../actions/tag-management';

const TagMergeComponent = (props: any) => {
  return <TagMerge {...props} />;
};

const TagDeleteComponent = (props: any) => {
  return <TagDelete {...props} />;
};

const TagEditComponent = (props: any) => {
  return <TagEdit {...props} />;
};

interface ITagModalProps extends StateProps, DispatchProps {
  param?: string;
  openFixModal?: boolean;
  toggleFixModal?: Function;
  dataModal?: any;
  closeFixModalData: Function;
  title?: string;
  singleModalData?: any;
  callData: Function;
  activePage?: number;
}

interface ITagModalState {
  option?: {
    rightButton?: string;
    leftButton?: string;
  };
  extendComponent: any;
  singleModalData: any;
  param: string;
  listIdtag: String[];
  targetTag?: {
    id: string;
    name: string;
  };
  modalTitle?: string;
}

class TagModal extends React.Component<ITagModalProps, ITagModalState> {
  state = {
    content: null,
    openModal: false,
    option: {
      rightButton: '',
      leftButton: ''
    },

    extendComponent: null,
    singleModalData: null,
    param: '',
    listIdtag: [],
    modalTitle: null,
    targetTag: null
  };

  static getDerivedStateFromProps(props, state) {
    let { modalTitle, option } = state;
    let { dataModal } = props;

    if (props.param !== state.param || props.dataModal !== state.dataModal) {
      option.rightButton = translate('tag-management.cancel');
      switch (props.param) {
        case DELETE_TAG:
          option.leftButton = translate('tag-management.btn-tag-delete');
          modalTitle = translate('tag-management.tag-delete-title');
          break;
        case MERGE_TAG:
          option.leftButton = translate('tag-management.btn-tag-merge');
          modalTitle = translate('tag-management.tag-merge-title');
          break;

        case EDIT_TAG:
          option.leftButton = translate('tag-management.btn-tag-edit');
          modalTitle = translate('tag-management.tag-edit-title');
          break;
        default:
          break;
      }
      return { option, modalTitle, dataModal };
    }

    return null;
  }

  async reUseFunction() {
    let { param } = this.props;
    switch (param) {
      case DELETE_TAG:
        await this.deleteTagFunction();
        break;
      case MERGE_TAG:
        await this.mergeTagFunction();
        break;
      case EDIT_TAG:
        await this.updateTagFunction();
        break;
      default:
        break;
    }

    await this.props.callData();
    this.props.closeFixModalData();
  }

  updateValueFromTagEdit = singleModalData => {
    this.setState({ singleModalData });
  };

  removeSingleData = () => {
    this.setState({
      singleModalData: { id: null, description: null, name: null }
    });
  };

  updateTargetTagFromTagMerge = targetTag => {
    this.setState({ targetTag });
  };

  async updateTagFunction() {
    let { singleModalData } = this.state;
    await this.props.postUpdateTagAction(singleModalData);
  }

  async deleteTagFunction() {
    let { singleModalData, dataModal } = this.props;
    let listIdTag = [];

    singleModalData && singleModalData.id
      ? (listIdTag = [{ id: singleModalData.id }])
      : dataModal &&
        dataModal.forEach(element => {
          element.checked && listIdTag.push({ id: element.id });
        });

    await this.props.postDeleteTagAction(listIdTag);
  }

  async mergeTagFunction() {
    let { singleModalData, dataModal } = this.props;
    let { targetTag } = this.state;
    let listIdTag = [];

    if (singleModalData) {
      listIdTag = [{ id: singleModalData.id }];
    } else if (dataModal && dataModal.length > 0) {
      dataModal.forEach(item => {
        item.checked && listIdTag.push({ id: item.id });
      });
    }

    await this.props.postMergeTagAction(targetTag.id, listIdTag);
  }

  render() {
    let { openFixModal, param, dataModal, singleModalData, activePage } = this.props;
    let { option, targetTag, modalTitle } = this.state;
    let extendComponent: any = null;
    let color: string = 'primary';

    switch (param) {
      case DELETE_TAG:
        extendComponent = <TagDeleteComponent dataModal={dataModal} singleModalData={singleModalData} />;
        color = 'danger';
        break;
      case MERGE_TAG:
        extendComponent = (
          <TagMergeComponent dataModal={dataModal} updateTargetTagFromTagMerge={this.updateTargetTagFromTagMerge} targetTag={targetTag} />
        );
        color = 'primary';
        break;
      case EDIT_TAG:
        extendComponent = (
          <TagEditComponent dataModal={dataModal} singleModalData={singleModalData} updateValueFromTagEdit={this.updateValueFromTagEdit} />
        );
        color = 'primary';
        break;
      default:
        break;
    }

    return (
      <div className="tag-modal">
        <Modal isOpen={openFixModal} toggle={this.props.toggleFixModal}>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalBody>{extendComponent}</ModalBody>
          <ModalFooter>
            <Button
              color="none"
              onClick={() => {
                this.props.closeFixModalData();
                this.removeSingleData();
              }}
            >
              {option.rightButton ? option.rightButton : 'Next'}
            </Button>
            <Button color={color} onClick={() => this.reUseFunction()}>
              {option.leftButton ? option.leftButton : 'Cancel'}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState, handleModal }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags,
  tagResponse: tagDataState.tagResponse
});

const mapDispatchToProps = {
  openModal,
  postUpdateTagAction,
  postDeleteTagAction,
  postMergeTagAction,
  getListTagDataAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagModal);
