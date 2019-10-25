import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Label, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { openModal, closeModal } from 'app/actions/modal';
import './search-save-modal.scss';
import {
  getFields,
  getListSaveAdvancedSearchActionData,
  getSaveAdvancedSearchActionData,
  deleteSaveAdvancedSearchActionData,
  postSaveAdvancedSearchActionData
} from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import { List, Typography, Icon } from 'antd';
import LoaderAnim from 'react-loaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ISearchSaveModalProps extends StateProps, DispatchProps {
  open_list_save: boolean;
  toggleSearchSaveModal: Function;
  openAdvancedSearch: Fucntion;
}

export interface ISearchSaveModalState {
  open_new_save: boolean;
  delete_search: {
    id?: string;
    name?: string;
  };
}

export class SearchSaveModal extends React.Component<ISearchSaveModalProps, ISearchSaveModalState> {
  state: ISearchSaveModalState = {
    open_new_save: false,
    delete_search: {
      id: '',
      name: ''
    }
  };

  removeDeleteSearch = () => {
    this.setState({ delete_search: { id: '', name: '' } });
  };

  choseItemDelete = delete_search => {
    this.setState({ delete_search });
  };

  // Get list advanced search
  getListAdvancedSearch = () => {
    this.props.getListSaveAdvancedSearchActionData();
  };

  //Delete advanced search
  deleteAdvancedSearch = async (id?: string) => {
    await this.props.deleteSaveAdvancedSearchActionData(id);
    await this.props.getListSaveAdvancedSearchActionData();
  };

  //  Get advanced search
  getAdvancedSearch = async index => {
    let { list_save_advanced } = this.props;
    await this.props.getSaveAdvancedSearchActionData(list_save_advanced[index].id);
    await this.props.toggleSearchSaveModal();
    await this.props.openAdvancedSearch();
  };

  render() {
    let { open_list_save, list_save_advanced } = this.props;

    let { delete_search } = this.state;

    let data =
      list_save_advanced && list_save_advanced.length > 0
        ? list_save_advanced.map(item => {
            return item.name;
          })
        : [];

    return (
      <Modal isOpen={open_list_save}>
        <ModalHeader>Danh sách tìm kiếm</ModalHeader>
        <ModalBody>
          <List
            style={{ color: '#3866DD' }}
            bordered
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                onClick={() => {
                  this.getAdvancedSearch(index);
                }}
                actions={[
                  <span
                    style={{ color: 'red' }}
                    onClick={() => {
                      this.choseItemDelete(list_save_advanced[index]);
                    }}
                  >
                    <FontAwesomeIcon icon="trash" />
                    <a key="list-loadmore-edit">Xóa</a>
                  </span>
                ]}
              >
                {item}
              </List.Item>
            )}
          />
          {delete_search.id !== '' ? (
            <div className="delete-search">
              <label style={{ margin: '0px' }}>Bạn muốn xóa: {delete_search.name}</label>
              <Button color="danger" style={{ float: 'right' }} onClick={() => this.deleteAdvancedSearch(delete_search.id)}>
                Xóa
              </Button>
              <Button
                color="none"
                style={{
                  float: 'right',
                  border: '1px solid #E92020',
                  color: '#E92020',
                  margin: '0px 5px'
                }}
                onClick={this.removeDeleteSearch}
              >
                Hủy
              </Button>
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button
            color="none"
            style={{ float: 'right' }}
            onClick={async () => {
              await this.props.toggleSearchSaveModal();
              await this.removeDeleteSearch();
              await this.props.getListSaveAdvancedSearchActionData();
            }}
          >
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ userManagement }: IRootState) => ({
  list_save_advanced: userManagement.list_save_advanced_search
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  getFields,
  getListSaveAdvancedSearchActionData,
  getSaveAdvancedSearchActionData,
  deleteSaveAdvancedSearchActionData,
  postSaveAdvancedSearchActionData
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchSaveModal);
