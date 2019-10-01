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
    targetTag: null,
    modalTitle: null
  };

  static getDerivedStateFromProps(props, state) {
    let option = state.option;
    let { modalTitle } = state;

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
      return { option, modalTitle };
    }

    return null;
  }

  reUseFunction = () => {
    let { param } = this.props;
    switch (param) {
      case DELETE_TAG:
        this.deleteTagFunction();
        break;
      case MERGE_TAG:
        this.mergeTagFunction();
        break;
      case EDIT_TAG:
        this.updateTagFunction();
        break;
      default:
        break;
    }

    this.props.closeFixModalData();
    setTimeout(() => {
      this.props.getListTagDataAction('', 0, 6);
    }, 250);
  };

  updateValueFromTagEdit = singleModalData => {
    this.setState({ singleModalData });
  };

  updateTargetTagFromTagMerge = targetTag => {
    this.setState({ targetTag });
  };

  updateTagFunction = () => {
    let { singleModalData } = this.state;
    this.props.postUpdateTagAction(singleModalData);
  };

  deleteTagFunction = () => {
    let { singleModalData, dataModal } = this.props;
    let listIdTag = [];

    if (singleModalData) {
      listIdTag = [{ id: singleModalData.id }];
    } else if (dataModal) {
      listIdTag = dataModal.map(item => ({ id: item.id }));
    }

    this.props.postDeleteTagAction(listIdTag);
  };

  mergeTagFunction = () => {
    let { singleModalData, dataModal } = this.props;
    let { targetTag } = this.state;
    let listIdTag = [];

    if (singleModalData) {
      listIdTag = [{ id: singleModalData.id }];
    } else if (dataModal) {
      listIdTag = dataModal.map(item => ({ id: item.id }));
    }

    this.props.postMergeTagAction(targetTag.id, listIdTag);
  };

  render() {
    let { openFixModal, param, dataModal, singleModalData } = this.props;
    let { option, targetTag, modalTitle } = this.state;
    let extendComponent: any = null;

    switch (param) {
      case DELETE_TAG:
        extendComponent = <TagDeleteComponent dataModal={dataModal} singleModalData={singleModalData} />;
        break;
      case MERGE_TAG:
        extendComponent = (
          <TagMergeComponent dataModal={dataModal} updateTargetTagFromTagMerge={this.updateTargetTagFromTagMerge} targetTag={targetTag} />
        );
        break;
      case EDIT_TAG:
        extendComponent = (
          <TagEditComponent dataModal={dataModal} singleModalData={singleModalData} updateValueFromTagEdit={this.updateValueFromTagEdit} />
        );
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
            <Button color="primary" onClick={this.reUseFunction}>
              {option.leftButton ? option.leftButton : 'Cancel'}
            </Button>
            <Button color="none" onClick={this.props.closeFixModalData}>
              {option.rightButton ? option.rightButton : 'Next'}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags
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
