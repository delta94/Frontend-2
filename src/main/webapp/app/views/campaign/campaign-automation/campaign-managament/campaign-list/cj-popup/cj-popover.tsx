import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Icon } from 'antd';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import CampaignTag from '../campaign-tag/campaign-tag';
import CjTagInsertModal from '../cj-tag-modal/insert-cj-tag-modal/cj-tag-insert-modal';
import CjTagListModal from '../cj-tag-modal/list-cj-tag-modal/cj-tag-list-modal';
import { updateCjTagsAction, getCjTagsByCjIdAction } from 'app/actions/cj';
import './cj-popover.scss';

interface ICjTagPopOverProps extends StateProps, DispatchProps {
  dataPopup: {
    id: string;
    name: string;
    cjVersionId: string;
    cjFolderId: string;
    version: number;
    tags: string;
    status: string;
    contactNumbers: number;
    modifiedDate: string;
  };
  getCjs?: Function;
}

interface TCjTagPopOverState {
  isOpen: boolean;
  cjTagsDefault?: any[];
  cjTags?: any[];
  isOpenModalCjTagInsert?: boolean;
  isOpenModalCjTagList?: boolean;
  cjId?: string;
}

class CJTagPopOver extends React.Component<ICjTagPopOverProps, TCjTagPopOverState> {
  state: TCjTagPopOverState = {
    isOpen: false,
    cjTags: [],
    isOpenModalCjTagInsert: false,
    isOpenModalCjTagList: false
  };

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
    this.closePopup();
    this.props.getCjs(this.props.dataPopup.cjFolderId);
  };

  togglePopup = async () => {
    await this.props.getCjTagsByCjIdAction(this.props.dataPopup.id);
    this.setState({
      cjTagsDefault: this.props.valueComboTag
    });
    let open = this.state.isOpen;
    this.setState({ isOpen: !open });
  };

  closePopup = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  openModalCjTag = () => {
    this.setState({
      isOpenModalCjTagInsert: true,
      cjId: this.props.dataPopup.id
    });
    this.closePopup();
  };

  toogleModalCjTagInsert = () => {
    let isOpenModalCjTagInsert = this.state.isOpenModalCjTagInsert;
    this.setState({
      isOpenModalCjTagInsert: !isOpenModalCjTagInsert
    });
  };

  closeModalCjTagInsert = () => {
    this.setState({
      isOpenModalCjTagInsert: false
    });
  };

  openModalListCjTag = () => {
    this.closePopup();
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
    this.setState({
      isOpenModalCjTagList: false
    });
  };

  refreshListCjTag = () => {
    this.props.getCjs(this.props.dataPopup.cjFolderId);
    this.closePopup();
  };

  render() {
    let { dataPopup } = this.props;
    let { isOpenModalCjTagInsert, isOpenModalCjTagList, cjId, cjTagsDefault, isOpen } = this.state;
    const img_tag = require('app/assets/utils/images/campaign-managament/tag-list.png');

    return (
      <span>
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
        <Button className="mr-1" color="white" id={'Popover-' + dataPopup.cjVersionId} type="button">
          <img src={img_tag} />
        </Button>
        <Popover
          placement={'bottom-end'}
          isOpen={isOpen}
          target={'Popover-' + dataPopup.cjVersionId}
          toggle={this.togglePopup}
          trigger="click"
        >
          <PopoverHeader>Chọn Tag</PopoverHeader>
          <PopoverBody>
            <div id="cj-tag-popover-body">
              <div className="combobox-cj-tag">
                <CampaignTag handleChange={this.handleChange} defaultValue={cjTagsDefault} />
              </div>
              <div className="link">
                <label onClick={() => this.openModalCjTag()} style={{ textDecoration: 'underline' }}>
                  <Icon type="tag" />
                  <span>Thêm mới tag</span>
                </label>
                <label onClick={() => this.openModalListCjTag()} style={{ float: 'right', textDecoration: 'underline' }}>
                  <Icon type="menu" />
                  <span>Danh sách tag</span>
                </label>
              </div>
              <div className="cj-tag-popup-footer">
                <Button color="black" onClick={this.closePopup}>
                  Hủy
                </Button>
                <Button
                  onClick={() => {
                    this.handleSubmit(dataPopup.id);
                  }}
                  color="primary"
                >
                  Chọn
                </Button>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

const mapStateToProps = ({ cjState }: IRootState) => ({
  valueComboTag: cjState.cj_tags
});

const mapDispatchToProps = {
  updateCjTagsAction,
  getCjTagsByCjIdAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CJTagPopOver);
