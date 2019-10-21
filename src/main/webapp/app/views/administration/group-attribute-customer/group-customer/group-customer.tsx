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
  getSingleCustomerGroupFieldDataAction
} from '../../../../actions/group-attribute-customer';
import { openModal, closeModal } from '../../../../actions/modal';
import GroupDeleteModal from './group-delete-modal/group-delete-modal';
import { UPDATE_CUSTOMER_GROUP, COPY_CUSTOMER_GROUP } from '../../../../constants/group-atrribute-customer';
import { getFindCustomerWithConditionAction } from '../../../../actions/group-attribute-customer';

interface IGroupCustomerProps extends StateProps, DispatchProps {
  setIdForListCustomer: Function;
  setStateForModal: Function;
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
  menuDropdown = (id?: string) => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={() => this.hanldeDeleteModal(id)}>
          <Icon type="delete" />
          Xóa
        </Menu.Item>
        <Menu.Item key="3" onClick={() => this.handleGroup(id, COPY_CUSTOMER_GROUP)}>
          <Icon type="copy" />
          Sao chép
        </Menu.Item>
      </Menu>
    );
  };

  // Update or copy group
  async handleGroup(id: string, type_modal?: string) {
    await this.props.setIdForListCustomer(id);
    await this.props.getSingleCustomerGroupFieldDataAction(id);
    await this.props.setStateForModal(type_modal);
    await this.getDataOfListCustomerCondition();
  }

  // Get data with action
  getDataOfListCustomerCondition = () => {
    let { logicalOperator, advancedSearches } = this.props.single_customer_field.customerAdvancedSave;
    this.props.getFindCustomerWithConditionAction({ logicalOperator, advancedSearches });
  };

  // Open delete modal
  hanldeDeleteModal = (id?: string) => {
    let { open_modal_delete, id_delete } = this.state;

    if (id) {
      id_delete = id;
    }

    this.setState({ open_modal_delete: !open_modal_delete, id_delete });
  };

  // Call list customer
  callListCustomer = (id?: string) => {
    let { textSearch } = this.state;
    this.props.setIdForListCustomer(id);
    this.props.getListCustomerWithGroupIdDataAction(textSearch, 0, 10, id);
    this.props.getSingleCustomerGroupFieldDataAction(id);
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
                  <tr className="text-center">
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
                        <tr
                          key={item.id}
                          style={{
                            background: item && id_chose === item.id ? 'gray' : '',
                            color: item && id_chose === item.id ? 'white' : ''
                          }}
                        >
                          <td onClick={() => this.callListCustomer(item.id)}>{index + 1}</td>
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
                              onClick={() => {
                                this.handleGroup(item.id, UPDATE_CUSTOMER_GROUP);
                              }}
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
                    <tr>
                      <td className="none-data" colSpan={100}>
                        Không có nhóm dữ liệu khách hàng
                      </td>
                    </tr>
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
  postRequest: groupCustomerState.postRequest,
  single_customer_field: groupCustomerState.single_customer_field
});

const mapDispatchToProps = {
  getListCustomerGroupDataAction,
  getListCustomerWithGroupIdDataAction,
  postDeleteCustomerGroupAction,
  getSingleCustomerGroupFieldDataAction,
  getFindCustomerWithConditionAction,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupCustomer);
