import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
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
  listCheckBox?: any;
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
    let { listCheckBox } = props;

    if (props.param !== state.param || props.listCheckBox !== state.listCheckBox) {
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
      return { option, modalTitle, listCheckBox };
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

    this.props.closeFixModalData();
  }

  removeSingleData = () => {
    this.setState({
      singleModalData: { id: null, description: null, name: null }
    });
  };

  updateTargetTagFromTagMerge = targetTag => {
    console.log(targetTag);
    this.setState({ targetTag });
  };
  // UpdateTag
  updateValueFromTagEdit = singleModalData => {
    this.setState({ singleModalData });
  };

  async updateTagFunction() {
    let { singleModalData } = this.state;
    await this.props.postUpdateTagAction(singleModalData);
    await this.props.callData();
  }

  // Delete Tag
  async deleteTagFunction() {
    let { singleModalData, listCheckBox } = this.props;
    let listIdTag = [];

    singleModalData && singleModalData.id
      ? (listIdTag = [{ id: singleModalData.id }])
      : listCheckBox &&
        listCheckBox.forEach(element => {
          element.checked && listIdTag.push({ id: element.id });
        });

    await this.props.postDeleteTagAction(listIdTag);
    await this.props.getListTagDataAction('', 0, 6);
  }

  async mergeTagFunction() {
    let { singleModalData, listCheckBox } = this.props;
    let { targetTag } = this.state;
    let listIdTag = [];

    listCheckBox &&
      listCheckBox.length > 0 &&
      listCheckBox.forEach(item => {
        item.checked && listIdTag.push({ id: item.id });
      });

    console.log(targetTag, listIdTag);

    await this.props.postMergeTagAction(targetTag.id, listIdTag);
    await this.props.getListTagDataAction('', 0, 6);
  }

  render() {
    let { openFixModal, param, listCheckBox, singleModalData } = this.props;
    let { option, targetTag, modalTitle } = this.state;
    let extendComponent: any = null;
    let color: string = 'primary';
    let isDisable = false;

    switch (param) {
      case DELETE_TAG:
        extendComponent = <TagDeleteComponent listCheckBox={listCheckBox} singleModalData={singleModalData} />;
        color = 'danger';
        break;
      case MERGE_TAG:
        !targetTag || !targetTag.id ? (isDisable = true) : null;
        extendComponent = (
          <TagMergeComponent
            listCheckBox={listCheckBox}
            updateTargetTagFromTagMerge={this.updateTargetTagFromTagMerge}
            targetTag={targetTag}
          />
        );
        color = 'primary';
        break;
      case EDIT_TAG:
        !singleModalData.name || singleModalData.name.trim() === '' ? (isDisable = true) : null;
        extendComponent = <TagEditComponent singleModalData={singleModalData} updateValueFromTagEdit={this.updateValueFromTagEdit} />;

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
            <Button color={color} onClick={() => this.reUseFunction()} disabled={isDisable}>
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
