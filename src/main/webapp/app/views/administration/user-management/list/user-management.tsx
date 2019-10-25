import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Label, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openModal, closeModal } from 'app/actions/modal';
import './user-management.scss';
import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import {
  getUser,
  exportFile,
  getUsers,
  updateUser,
  getUserCategories,
  deleteUser,
  getDetailUser,
  getFields,
  getListSaveAdvancedSearchActionData,
  getSaveAdvancedSearchActionData,
  deleteSaveAdvancedSearchActionData,
  postSaveAdvancedSearchActionData
} from 'app/actions/user-management';
import UserCategoryTag from './categories-tag/categories-tag';
import { IRootState } from 'app/reducers';
import { Menu, Dropdown, Icon, Checkbox, Input } from 'antd';
import ReactPaginate from 'react-paginate';
import LoaderAnim from 'react-loaders';
import SweetAlert from 'sweetalert-react';
import Loader from 'react-loader-advanced';
import CreateUser from './../create/create';
import Ionicon from 'react-ionicons';
import Import from 'app/views/administration/user-management/import/import';
import $ from 'jquery';
import { IUser } from 'app/common/model/user.model';
import { ISearchAdvanced } from 'app/common/model/group-attribute-customer';
import FieldData from '../../group-attribute-customer/group-modal-config/field-data/field-data';
import { makeRandomId } from '../../group-attribute-customer/group-modal-config/group-modal-config';
import { OPERATOR } from 'app/constants/field-data';
import { getListFieldDataAction } from 'app/actions/group-attribute-customer';
import { getFindUserInManagerWithActionData } from 'app/actions/user-management';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from 'reactstrap';
import { INSERT_CUSTOMER_GROUP } from 'app/constants/group-atrribute-customer';
import { IModalData } from 'app/reducers/user-management';
import { ERROR } from 'app/constants/common';
import SearchSaveModal from './search-save-modal/search-save-modal';

interface IComponentData {
  id: string;
  name?: string;
  last_index: boolean;
  default_data?: ISearchAdvanced;
}

interface IAdvancedSearchesData {
  id?: string;
  advancedSearch?: ISearchAdvanced;
}

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IUserManagementState {
  isDelete: boolean;
  isConfirm: boolean;
  idUser: string;
  textSearch: string;
  categories: string;
  activePage: number;
  itemsPerPage: number;
  isHide: boolean;
  advancedSearches?: ISearchAdvanced[];
  advancedSearchesData?: IAdvancedSearchesData[];
  logicalOperator?: string;
  pageIndex: number;
  pageSize: number;
  list_field_data_cpn: IComponentData[];
  list_save_advanced_search: Array<{
    id?: string;
    name?: string;
    customerAdvancedSave?: any;
  }>;
  open_import?: boolean;
  open_create?: boolean;
  open_search?: boolean;
  open_new_save?: boolean;
  open_save?: boolean;
  name?: string;
  modalState?: IModalData;
  open_list_save?: boolean;
  save_advanced_search?: any;
}

export class UserManagement extends React.Component<IUserManagementProps, IUserManagementState> {
  state: IUserManagementState = {
    activePage: ACTIVE_PAGE,
    itemsPerPage: ITEMS_PER_PAGE,
    isDelete: false,
    isConfirm: false,
    idUser: '',
    textSearch: '',
    categories: '',
    isHide: false,
    advancedSearches: [],
    advancedSearchesData: [],
    logicalOperator: '',
    pageIndex: 0,
    pageSize: 10,
    list_field_data_cpn: [],
    list_save_advanced_search: [],
    open_import: false,
    open_create: false,
    open_search: false,
    open_new_save: false,
    name: '',
    modalState: {
      show: false,
      type: ERROR,
      text: '',
      title: 'Thông báo'
    },
    open_list_save: false,
    save_advanced_search: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.save_advanced_search.id !== '' && nextProps.save_advanced_search !== prevState.save_advanced_search) {
      let { customerAdvancedSave } = nextProps.save_advanced_search;
      let logicalOperator = '';
      let advancedSearchesData = [];
      let list_field_data_cpn = [];
      let advancedSearches = [];

      logicalOperator = customerAdvancedSave.logicalOperator;
      advancedSearches = customerAdvancedSave.advancedSearches;
      customerAdvancedSave.advancedSearches.forEach((item, index) => {
        let id = makeRandomId(16);
        advancedSearchesData.push({
          id: makeRandomId(8),
          advancedSearch: item
        });

        list_field_data_cpn.push({
          id,
          name: 'new',
          last_index: customerAdvancedSave.advancedSearches.length - 1 === index ? true : false,
          default_data: item
        });
      });

      advancedSearches = customerAdvancedSave.advancedSearches;

      return {
        save_advanced_search: nextProps.save_advanced_search,
        advancedSearchesData,
        list_field_data_cpn,
        logicalOperator,
        advancedSearches
      };
    }

    if (nextProps.modalState !== prevState.modalState) {
      return {
        modalState: nextProps.modalState
      };
    }
    return null;
  }

  //loading page
  componentDidMount = async () => {
    const { activePage, itemsPerPage, textSearch, categories } = this.state;
    let { users, getUsers, getFields } = this.props;
    await getUsers(activePage, itemsPerPage, categories, textSearch);
    await getFields();
    await this.props.getListFieldDataAction();
    await this.props.getListSaveAdvancedSearchActionData();
  };

  handlePagination = activePage => {
    const { itemsPerPage, textSearch, categories, open_search } = this.state;
    if (open_search) {
      this.getDataListCustomer(activePage.selected);
    } else {
      this.props.getUsers(activePage.selected, itemsPerPage, categories, textSearch);
    }

    this.setState({
      activePage: activePage.selected
    });
  };

  handleCreate = name => {
    this.props.getUserCategories(name);
  };

  handleChange = category => {
    let categorieIds = category.map((event, index) => event.id);
    const { itemsPerPage, textSearch } = this.state;
    this.setState({
      ...this.state,
      categories: categorieIds.join(),
      activePage: 0
    });
    this.props.getUsers(0, itemsPerPage, categorieIds.join(), textSearch);
  };

  search = event => {
    if (event.key === 'Enter') {
      const textSearch = event.target.value;
      const { itemsPerPage, categories } = this.state;
      this.setState({
        ...this.state,
        textSearch,
        activePage: 0
      });
      this.props.getUsers(0, itemsPerPage, categories, textSearch);
    }
  };

  rowName = () => {
    let { listFields } = this.props;
    let listData = listFields.filter(el => el.title !== 'Tên' && el.title !== 'Email' && el.title !== 'Họ' && el.title !== 'Số điện thoại');
    let data = (
      <Menu>
        {listData.map((value, index) => {
          return (
            <Menu.Item key={index}>
              <Checkbox defaultChecked={true} onChange={event => this.onChangeCheckBox(event, value.code)}>
                {value.title}
              </Checkbox>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return data;
  };

  onChangeCheckBox = (e, value) => {
    let isCheck = e.target.checked;
    if (isCheck) {
      $(`th.${value}`).show();
      $(`td.${value}`).show();
    } else {
      $(`th.${value}`).hide();
      $(`td.${value}`).hide();
    }
  };

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
    return rv;
  }

  toggleImport = () => {
    let { open_import } = this.state;
    this.setState({ open_import: !open_import });
  };

  toggleCreate = () => {
    let { open_create } = this.state;
    this.setState({ open_create: !open_create });
  };

  saveSearchData = () => {
    let { open_new_save } = this.state;
    this.setState({ open_new_save: !open_new_save });
  };

  toggleSearchSaveModal = () => {
    let { open_list_save } = this.state;
    this.setState({ open_list_save: !open_list_save });
  };

  /**
   *  @SearchAdvanced
   */

  updateValueFromState = (id: string, advancedSearch: ISearchAdvanced) => {
    let { advancedSearchesData, logicalOperator } = this.state;
    let advancedSearches = [];

    advancedSearchesData.map(item => {
      advancedSearches.push(item.advancedSearch);
    });

    advancedSearchesData.forEach(item => {
      if (item.id === id) {
        item.advancedSearch = advancedSearch;
      }
    });

    if (advancedSearchesData.length > 1 && logicalOperator === '') {
      logicalOperator = OPERATOR.AND;
    }

    if (advancedSearchesData.length === 1) logicalOperator = '';
    this.setState({ advancedSearchesData, advancedSearches, logicalOperator });
  };

  // Add new component to list_field_data_cpn
  handleAddNewComponent = () => {
    let { list_field_data_cpn, advancedSearchesData } = this.state;
    let id = makeRandomId(16);
    let newCpn = { id, name: 'new', last_index: true, default_data: {} };

    // Check duplicate value
    list_field_data_cpn.forEach(item => {
      if (item.id === id) {
        id = makeRandomId(16);
      }
    });

    list_field_data_cpn.push(newCpn);

    advancedSearchesData.push({
      id,
      advancedSearch: {
        fieldId: '',
        fieldCode: '',
        fieldType: '',
        fieldTitle: '',
        value: '',
        operator: ''
      }
    });

    this.updateLastIndex(list_field_data_cpn);
  };

  // Delete component by Id
  deleteComponentById = (id: string) => {
    let { list_field_data_cpn, advancedSearchesData } = this.state;

    list_field_data_cpn.forEach((item, index) => {
      if (item.id === id) {
        list_field_data_cpn.splice(index, 1);
        advancedSearchesData.splice(index, 1);
      }
    });

    this.updateLastIndex(list_field_data_cpn);
    this.setState({ list_field_data_cpn, advancedSearchesData });
  };

  // Update last index
  updateLastIndex = (list_field_data_cpn: any) => {
    list_field_data_cpn.forEach((item, index) => {
      if (index < list_field_data_cpn.length - 1) {
        item.last_index = false;
      } else {
        item.last_index = true;
      }
    });

    this.setState({ list_field_data_cpn });
  };

  // Update logicalOperator
  updateRelationshipFromState = (logicalOperator: string) => {
    this.setState({ logicalOperator });
  };

  // Remove All value
  removeDataInModal = () => {
    let list_field_data_cpn = [];
    let advancedSearches = [];
    let advancedSearchesData = [];
    let name = '';
    this.setState({
      list_field_data_cpn,
      advancedSearchesData,
      advancedSearches,
      name
    });
  };

  openAdvancedSearch = () => {
    this.setState({ open_search: true });
  };

  // GetData customer by condition
  getDataListCustomer = (page?: any) => {
    let { advancedSearches, logicalOperator, pageSize } = this.state;
    if (advancedSearches.length <= 1) {
      logicalOperator = '';
    }

    this.props.getFindUserInManagerWithActionData({
      logicalOperator,
      advancedSearches,
      page,
      pageSize
    });
  };

  // Close Find search
  closeSearchAdvanced = () => {
    let { open_search } = this.state;
    this.setState({ open_search: !open_search });
    this.removeDataInModal();
  };

  // Save advanced search
  saveAdvancedSearch = async () => {
    let { name, advancedSearches, logicalOperator } = this.state;
    await this.props.postSaveAdvancedSearchActionData({ name: name.trim(), customerAdvancedSave: { advancedSearches, logicalOperator } });
    await this.getListAdvancedSearch();
    this.saveSearchData();
  };

  // Get list advanced search
  getListAdvancedSearch = () => {
    this.props.getListSaveAdvancedSearchActionData();
  };

  // Delete advanced search
  deleteAdvancedSearch = (id?: string) => {
    this.props.deleteSaveAdvancedSearchActionData(id);
  };
  // Get advanced search
  getAdvancedSearch = (id?: string) => {
    this.props.getSaveAdvancedSearchActionData(id);
  };

  dataTable() {
    const { users, loading, modalState, listFields } = this.props;
    const { activePage } = this.state;
    let listPropUser = listFields.filter(
      el => el.title !== 'Tên' && el.title !== 'Email' && el.title !== 'Họ' && el.title !== 'Số điện thoại'
    );
    let lengthProps = listPropUser.length;
    let dataUser = users.map(event => {
      let dataProps;
      if (event.fields.length <= lengthProps) {
        dataProps = listPropUser.map(item => {
          return {
            code: item.code,
            fieldValue: item.fieldValue,
            id: item.id,
            title: item.title,
            type: item.type,
            value:
              event.fields.length > 0 &&
              event.fields.map(value => {
                return value.value;
              })
                ? event.fields.map(value => {
                    if (String(value.id) == String(item.id)) {
                      return value.value;
                    } else {
                      return item.value;
                    }
                  })
                : item.value
          };
        });
      }
      return {
        id: event.id,
        createdDate: event.createdDate,
        email: event.email,
        fields: event.fields.length > 0 ? (lengthProps > event.fields.length ? dataProps : event.fields) : listPropUser,
        firstName: event.firstName,
        lastName: event.lastName,
        merchantId: event.merchantId,
        mobile: event.mobile,
        tag: event.tag,
        tags: event.tags
      };
    });
    return dataUser;
  }

  render() {
    const { users, loading, listFields, list_field_data, pageCount } = this.props;
    const {
      activePage,
      open_new_save,
      open_import,
      open_create,
      open_search,
      logicalOperator,
      list_field_data_cpn,
      name,
      modalState,
      open_list_save
    } = this.state;

    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;

    let dataUser = this.dataTable();
    let theader = listFields.map(event => {
      return event;
    });
    let dataHeader = theader
      .sort(function(a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      .filter(el => el.title !== 'Tên' && el.title !== 'Email' && el.title !== 'Họ' && el.title !== 'Số điện thoại');
    let list_field_render =
      list_field_data_cpn && list_field_data_cpn.length > 0
        ? list_field_data_cpn.map(item => {
            if (item.id)
              return (
                <FieldData
                  key={item.id}
                  id={item.id}
                  list_field_data={list_field_data}
                  last_index={item.last_index}
                  logicalOperator={logicalOperator}
                  default_data={item.default_data}
                  updateValueFromState={this.updateValueFromState}
                  deleteComponentById={this.deleteComponentById}
                  updateRelationshipFromState={this.updateRelationshipFromState}
                />
              );
          })
        : [];

    return (
      <Fragment>
        <SweetAlert
          title={modalState.title ? modalState.title : 'No title'}
          confirmButtonColor=""
          show={modalState.show ? modalState.show : false}
          text={modalState.text ? modalState.text : 'No'}
          type={modalState.type ? modalState.type : 'error'}
          onConfirm={() => this.props.closeModal()}
        />
        {/* Add new */}
        <Modal isOpen={open_new_save}>
          <ModalHeader>Đặt tên tìm kiếm</ModalHeader>
          <ModalBody>
            <div className="input-search_group" style={{ paddingRight: '30px' }}>
              <label className="input-search_label">
                <span>Tên</span>
              </label>
              <Input value={name} onChange={event => this.setState({ name: event.target.value })} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="none" style={{ float: 'right' }} onClick={() => this.setState({ open_new_save: false, name: '' })}>
              Hủy
            </Button>
            <Button
              color="primary"
              style={{ float: 'right' }}
              onClick={() => this.saveAdvancedSearch()}
              disabled={name && name.trim() !== '' ? false : true}
            >
              Lưu
            </Button>
          </ModalFooter>
        </Modal>
        {/* Search save modal  */}
        <SearchSaveModal
          open_list_save={open_list_save}
          toggleSearchSaveModal={this.toggleSearchSaveModal}
          openAdvancedSearch={this.openAdvancedSearch}
        />
        {/* Title */}
        <div className="user-management">
          <div id="title-common-header">
            <Translate contentKey="userManagement.home.title" /> ({this.props.totalElements})
            <Button className="btn btn-primary float-right jh-create-entity" color="primary" onClick={this.toggleCreate}>
              <FontAwesomeIcon icon="plus" />
              <Translate contentKey="userManagement.home.createLabel" />
            </Button>
            <Button
              className="btn float-right jh-create-entity"
              outline
              color="info"
              onClick={async () => {
                await this.props.exportFile(this.state.textSearch, this.state.categories);
              }}
            >
              <FontAwesomeIcon icon={faArrowDown} />
              Export
            </Button>
            <Button
              className="btn float-right jh-create-entity"
              outline
              color="primary"
              onClick={() => window.location.assign('/#/app/views/customers/user-management/new')}
            >
              <FontAwesomeIcon icon={faArrowUp} />
              <Translate contentKey="userManagement.home.import" />
            </Button>
          </div>

          {/* Panel */}
          <div className="panel">
            <CreateUser open_create={open_create} toggleCreate={this.toggleCreate} />
            <div className="search-field">
              <div className="input-search_group" style={{ paddingRight: '30px' }}>
                <label className="input-search_label">
                  <span>Thẻ/Tag</span>
                </label>
                <UserCategoryTag handleChange={this.handleChange} />
              </div>
              <div className="input-search_group" style={{ paddingRight: '30px' }}>
                <label className="input-search_label">
                  <Translate contentKey="userManagement.home.search-placer" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  onKeyDown={this.search}
                  placeholder={translate('userManagement.home.search-placer')}
                />
              </div>
            </div>
            <Dropdown overlay={this.rowName} trigger={['click']}>
              <Button style={{ float: 'right' }} color="warning">
                <Icon type="filter" />
                Lọc bảng
              </Button>
            </Dropdown>
            <div className="field-search">
              <div className="field-title">
                <p>
                  <label className="field-title_text" onClick={this.closeSearchAdvanced}>
                    <Icon type="setting" />
                    Tìm kiếm nâng cao
                    <Icon type={open_search ? 'caret-up' : 'caret-down'} />
                  </label>
                  <label
                    className="field-title_text"
                    style={{
                      float: 'right'
                    }}
                    onClick={this.toggleSearchSaveModal}
                  >
                    Các tìm kiếm đã lưu
                  </label>
                </p>
              </div>
              <Collapse isOpen={open_search} navbar>
                <div>{list_field_render}</div>
                <div style={{ marginTop: '10px' }}>
                  <Button color="primary" onClick={this.handleAddNewComponent} style={{ marginRight: '20px' }}>
                    <FontAwesomeIcon icon="plus" />
                    Thêm
                  </Button>
                  <Button color="success" onClick={this.saveSearchData}>
                    <FontAwesomeIcon icon="save" />
                    Lưu tìm kiếm
                  </Button>

                  <Button style={{ float: 'right' }} onClick={() => this.getDataListCustomer(0)}>
                    <FontAwesomeIcon icon="search" />
                    Tìm kiếm
                  </Button>
                </div>
              </Collapse>
            </div>
            <Table responsive striped>
              <thead>
                <tr className="text-center">
                  <th className="hand">#</th>
                  <th className="hand">Tên</th>
                  <th className="hand">Họ</th>
                  <th className="hand">Email</th>
                  <th className="hand">Số điện thoại</th>
                  {dataHeader
                    ? dataHeader.map((event, id) => {
                        return (
                          <th key={id} className={event.code}>
                            {event.title}
                          </th>
                        );
                      })
                    : ''}
                  <th>Ngày khởi tạo</th>
                  <th>Thẻ/Tag</th>
                  <th id="modified-date-sort" className="hand">
                    <Translate contentKey="userManagement.feature" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataUser
                  ? dataUser.map((item, index) => {
                      return (
                        <tr id={item.id} key={`user-${index}`}>
                          <td>{this.state.activePage * this.state.itemsPerPage + index + 1}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.email}</td>
                          <td>0{item.mobile}</td>
                          {item.fields
                            .sort(function(a, b) {
                              if (a.title.toLowerCase() < b.title.toLowerCase()) {
                                return -1;
                              }
                              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                                return 1;
                              }
                              return 0;
                            })
                            .map((value, index) => {
                              return (
                                <td className={value.code} key={index}>
                                  {value.value}
                                </td>
                              );
                            })}
                          <td>{item.createdDate}</td>
                          <td className="tag">
                            {item.tag &&
                              item.tag.split(',').map((category, index) => {
                                return (
                                  <span className="badge badge-success" key={index}>
                                    {' '}
                                    {category}
                                  </span>
                                );
                              })}
                          </td>
                          <td className="text-center">
                            <div className="btn-group flex-btn-group-container">
                              <Button
                                className="buttonUpdate"
                                tag={Link}
                                to={`/app/views/customers/user-management/info/${item.id}`}
                                color="primary"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Thông tin</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : ''}
              </tbody>
            </Table>
            {users.length > 0 ? '' : <p style={{ textAlign: 'center', color: 'black' }}>không có dữ liệu khách hàng</p>}
            <Row className="justify-content-center">
              {this.props.totalElements >= 10 ? (
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePagination}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  forcePage={activePage}
                />
              ) : (
                ''
              )}
            </Row>
          </div>
          <Loader message={spinner1} show={loading} priority={1} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  dowloadTemplate: storeState.userManagement.dowloadTemplate,
  modalState: storeState.userManagement.dataModal,
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
  totalElements: storeState.userManagement.totalElements,
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE),
  listFields: storeState.userManagement.listFields,
  list_field_data: storeState.groupCustomerState.list_field_data,
  list_save_advanced_search: storeState.userManagement.list_save_advanced_search,
  save_advanced_search: storeState.userManagement.save_advanced_search
});

const mapDispatchToProps = {
  exportFile,
  getUsers,
  updateUser,
  getUserCategories,
  deleteUser,
  getUser,
  getDetailUser,
  openModal,
  closeModal,
  getFields,
  getListFieldDataAction,
  getFindUserInManagerWithActionData,
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
)(UserManagement);
