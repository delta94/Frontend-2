import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import './group-customer.scss';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Input, Icon, Menu, Button, Popover, Dropdown } from 'antd';
import $ from 'jquery';
import {
  getListCustomerGroupDataAction,
  getListCustomerWithGroupIdDataAction,
  postDeleteCustomerGroupAction,
  postUpdateCustomerGroupAction,
  getSingleCustomerGroupFieldDataAction
} from '../../../../actions/group-attribute-customer';
import { openModal, closeModal } from '../../../../actions/modal';
import GroupDeleteModal from './group-delete-modal/group-delete-modal';

interface IGroupCustomerProps extends StateProps, DispatchProps {
  setTitleForModalConfig: Function;
  setIdForListCustomer: Function;
}

interface IGroupCustomerState {
  listNewTag: INewTag[];
  textSearch?: string;
  listDropdownItem?: Array<IPopOver>[];
  open_modal_delete?: boolean;
  id_delete?: string;
  id_chose?: string;
}

interface INewTag {
  name?: string;
}

interface IPopOver {
  isShow: boolean;
  group_customer: {
    id: string;
    typeName: string;
    contactNumber: string;
  };
}

class GroupCustomer extends React.Component<IGroupCustomerProps, IGroupCustomerState> {
  state = {
    listNewTag: [],
    textSearch: '',
    listDropdownItem: [],
    open_modal_delete: false,
    id_delete: '',
    id_chose: ''
  };

  componentDidMount() {
    let { textSearch } = this.state;
    this.props.getListCustomerGroupDataAction(textSearch);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.list_group_customer !== prevState.list_group_customer) {
      let listDropdownItem = nextProps.list_group_customer && nextProps.list_group_customer.map(item => ({ ...item, isShow: false }));
      return {
        listDropdownItem,
        list_group_customer: nextProps.list_group_customer
      };
    }
    return null;
  }

  // Change state of dropdown
  handleVisibleChange = (id, isShow) => {
    let { listDropdownItem } = this.state;
    listDropdownItem.forEach(item => {
      if (item.id === id) {
        item.isShow = !isShow;
      }
    });

    this.setState({ listDropdownItem });
  };

  // Delete group
  async deleteGroupFromState(id: string) {
    let { postRequest } = this.props;
    let { textSearch } = this.state;
    await this.props.postDeleteCustomerGroupAction(id);
    await this.props.openModal(postRequest);
    await this.props.getListCustomerGroupDataAction(textSearch);
    this.setState({ open_modal_delete: false });
  }

  //TODO: Copy group

  // Render menu dropdown
  menuDropdown = id => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={() => this.hanldeDeleteModal(id)}>
          <Icon type="delete" /> Delete
        </Menu.Item>
        <Menu.Item key="2" onClick={() => this.handleUpdateGroup(id)}>
          <Icon type="edit" />
          Chỉnh sửa
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="copy" /> Copy
        </Menu.Item>
      </Menu>
    );
  };

  //TODO: Update group
  handleUpdateGroup = (id: string) => {
    console.log('test');
    this.props.getSingleCustomerGroupFieldDataAction(id);
    this.props.setTitleForModalConfig('THÔNG TIN NHÓM');
  };

  // Open delete modal
  hanldeDeleteModal = (id?: string) => {
    let { open_modal_delete, id_delete } = this.state;

    if (id) {
      id_delete = id;
    }

    this.setState({ open_modal_delete: !open_modal_delete, id_delete });
  };

  switchGroup = () => {};

  // Call list customer
  callListCustomer = (id?: string) => {
    let { textSearch } = this.state;
    this.props.setIdForListCustomer(id);
    this.props.getListCustomerWithGroupIdDataAction(textSearch, 0, 10, id);
    this.setState({ id_chose: id });
  };

  // Open dropdown item
  openDropdownItem = (id?: string) => {
    let { listDropdownItem } = this.state;
    listDropdownItem.forEach(item => {
      if (item && item.id === id) {
        item.isShow = true;
      }
    });

    this.setState({ listDropdownItem });
  };

  render() {
    let { textSearch, listDropdownItem, open_modal_delete, id_delete, id_chose } = this.state;
    let { loading } = this.props;
    let active = true;
    const spinner1 = <LoaderAnim type="ball-pulse" active={active} />;
    return (
      <Fragment>
        <GroupDeleteModal
          id_delete={id_delete}
          handleDeleteModal={this.hanldeDeleteModal}
          is_open={open_modal_delete}
          deleteGroupFromState={event => this.deleteGroupFromState(event)}
        />
        <div className="group-customer">
          <p className="group-header">Danh sách nhóm khách hàng</p>
          <Loader message={spinner1} show={loading} priority={1}>
            <div>
              {/* Block out */}
              <div className="block-out">
                <Input
                  id="searchText"
                  prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Tìm kiếm"
                  onChange={event => this.setState({ textSearch: event.target.value })}
                  onPressEnter={() => this.props.getListCustomerGroupDataAction(textSearch)}
                />
              </div>
              {/* Table? */}
              <Table striped>
                <thead>
                  <tr
                    className="text-center"
                    style={{ borderBottom: listDropdownItem[0] && id_chose === listDropdownItem[0].id ? 'solid gray 2px' : '' }}
                  >
                    <th className="checkbox-td">Stt</th>
                    <th>Tên nhóm</th>
                    <th>Số lượng khách hàng</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {listDropdownItem && listDropdownItem.length > 0 ? (
                    listDropdownItem.map((item, index) => {
                      return (
                        <tr key={item.id} style={{ border: id_chose === item.id ? 'solid gray 2px' : '' }}>
                          <td onClick={() => this.callListCustomer(item.id)}>{index}</td>
                          <td onClick={() => this.callListCustomer(item.id)}>{item.typeName}</td>
                          <td onClick={() => this.callListCustomer(item.id)}>
                            <div className="item-contact">
                              <Icon type="user" style={{ marginBottom: '10px' }} />
                              <label className="user-contact-item">{item.contactNumbers}</label>
                            </div>
                          </td>
                          <td>
                            <Dropdown.Button
                              overlay={() => this.menuDropdown(item.id)}
                              icon={<Icon type="caret-down" />}
                              onClick={() => this.openDropdownItem(item.id)}
                            >
                              <span>
                                <Icon type="edit" />
                              </span>
                            </Dropdown.Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr />
                  )}
                </tbody>
              </Table>
              {/* Blockout */}
              <div />
            </div>
          </Loader>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ groupCustomerState, handleModal }: IRootState) => ({
  loading: groupCustomerState.list_group_customer_index.loading,
  list_group_customer: groupCustomerState.list_group_customer,
  modalData: handleModal.data,
  postRequest: groupCustomerState.postRequest
});

const mapDispatchToProps = {
  getListCustomerGroupDataAction,
  getListCustomerWithGroupIdDataAction,
  postDeleteCustomerGroupAction,
  getSingleCustomerGroupFieldDataAction,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupCustomer);
