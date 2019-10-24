import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Label, Col } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openModal, closeModal } from 'app/actions/modal';
import './user-management.scss';
import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { getUser, exportFile, getUsers, updateUser, getUserCategories, deleteUser, getDetailUser } from 'app/actions/user-management';
import UserCategoryTag from './categories-tag/categories-tag';
import { IRootState } from 'app/reducers';
import { Menu, Dropdown, Icon, Checkbox } from 'antd';
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
  open_import?: boolean;
  open_create?: boolean;
  open_search?: boolean;
  name?: string;
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
    open_import: false,
    open_create: false,
    open_search: false,
    name: ''
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.id_list_customer !== '' &&
      nextProps.id_list_customer &&
      nextProps.single_group_field !== prevState.single_group_field &&
      nextProps.type_modal !== INSERT_CUSTOMER_GROUP
    ) {
      let { customerAdvancedSave, categoryName } = nextProps.single_group_field;
      let { type_modal } = nextProps;
      let logicalOperator = '';
      let advancedSearchesData = [];
      let list_field_data_cpn = [];
      let advancedSearches = [];

      if (customerAdvancedSave.logicalOperator !== '' && type_modal !== INSERT_CUSTOMER_GROUP) {
        logicalOperator = customerAdvancedSave.logicalOperator;
      }

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
        categoryName,
        single_group_field: nextProps.single_group_field,
        advancedSearchesData,
        list_field_data_cpn,
        logicalOperator,
        advancedSearches
      };
    }
    return null;
  }

  //loading page
  componentDidMount = async () => {
    const { activePage, itemsPerPage, textSearch, categories } = this.state;
    let { users, getUsers } = this.props;
    await getUsers(activePage, itemsPerPage, categories, textSearch);
    this.props.getListFieldDataAction();
  };

  handlePagination = activePage => {
    const { itemsPerPage, textSearch, categories, open_search } = this.state;
    console.log(activePage);
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
    let data = (
      <Menu>
        <Menu.Item key="0">
          <Checkbox defaultChecked={true} onChange={event => this.onChangeCheckBox(event, 'name')}>
            Họ tên
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="1">
          <Checkbox defaultChecked={true} onChange={event => this.onChangeCheckBox(event, 'mobile')}>
            Số điện thoại
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="2">
          <Checkbox defaultChecked={true} onChange={event => this.onChangeCheckBox(event, 'email')}>
            Email
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="3">
          <Checkbox defaultChecked={true} onChange={event => this.onChangeCheckBox(event, 'tag')}>
            Tag
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="4">
          <Checkbox defaultChecked={true} onChange={event => this.onChangeCheckBox(event, 'dateCreate')}>
            Ngày khởi tạo
          </Checkbox>
        </Menu.Item>
      </Menu>
    );
    return data;
  };

  onChangeCheckBox = (e, value) => {
    let isCheck = e.target.checked;
    if (isCheck) {
      $(`#${value}`).show();
      $(`.${value}`).show();
    } else {
      $(`#${value}`).hide();
      $(`.${value}`).hide();
    }
  };

  removeDuplicates = (array, key) => {
    return array.reduce((accumulator, element, currentIndex, arr) => {
      if (!accumulator.find(el => el[key] == element[key]) && arr.map(c => c.title).lastIndexOf(element.title) == currentIndex) {
        accumulator.push(element);
      }
      return accumulator;
    }, []);
  };

  toggleImport = () => {
    let { open_import } = this.state;
    this.setState({ open_import: !open_import });
  };

  toggleCreate = () => {
    let { open_create } = this.state;
    this.setState({ open_create: !open_create });
  };

  saveSearchData = () => {};

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

  render() {
    let { users, loading, modalState, list_field_data, pageCount } = this.props;
    let { activePage, list_field_data_cpn, logicalOperator, open_import, open_create, open_search } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    let data = users
      .map((event, idx) => {
        return event.fields;
      })
      .filter(function(el) {
        return el.length > 0;
      });
    let title = data.map(event => {
      return event.map(value => {
        return value.title;
      });
    });

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
      <div className="user-management">
        <Fragment>
          <SweetAlert
            title={modalState.title ? modalState.title : 'No title'}
            confirmButtonColor=""
            show={modalState.show ? modalState.show : false}
            text={modalState.text ? modalState.text : 'No'}
            type={modalState.type ? modalState.type : 'error'}
            onConfirm={() => this.props.closeModal()}
          />

          {/* Title */}
          <div id="title-common-header">
            <Translate contentKey="userManagement.home.title" />
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
            <Button className="btn float-right jh-create-entity" outline color="primary" onClick={this.toggleImport}>
              <FontAwesomeIcon icon={faArrowUp} />
              <Translate contentKey="userManagement.home.import" />
            </Button>
          </div>

          {/* Panel */}
          <div className="panel">
            <Import open_import={open_import} toggleImport={this.toggleImport} />
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
                  <th className="hand " id="name">
                    <Translate contentKey="userManagement.name" />
                  </th>
                  <th className="hand" id="mobile">
                    <Translate contentKey="userManagement.mobile" />
                  </th>
                  <th className="hand" id="email">
                    <Translate contentKey="userManagement.email" />
                  </th>
                  <th className="hand" id="dateCreate">
                    Ngày khởi tạo
                  </th>
                  <th id="tag">Thẻ/Tag</th>

                  <th id="modified-date-sort" className="hand">
                    <Translate contentKey="userManagement.feature" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0
                  ? users.map((event, index) => {
                      let valueColumn = (
                        <tr id={event.id} key={`user-${index}`}>
                          <td>{this.state.activePage * this.state.itemsPerPage + index + 1}</td>
                          <td style={{ width: '20%', wordBreak: 'break-word' }} className="name">
                            {' '}
                            {event.firstName + ' ' + event.lastName}
                          </td>
                          <td className="mobile">0{event.mobile}</td>
                          <td className="email">{event.email}</td>
                          <td className="dateCreate">{event.createdDate}</td>
                          <td className="tag">
                            {event.tag &&
                              event.tag.split(',').map((category, index) => {
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
                                to={`/app/views/customers/user-management/info/${event.id}`}
                                color="primary"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Thông tin</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                      return valueColumn;
                    })
                  : ''}
              </tbody>
            </Table>
            {users.length > 0 ? '' : <p style={{ textAlign: 'center' }}>không có dữ liệu khách hàng</p>}
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
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  dowloadTemplate: storeState.userManagement.dowloadTemplate,
  modalState: storeState.handleModal.data,
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
  totalElements: storeState.userManagement.totalElements,
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE),
  list_field_data: storeState.groupCustomerState.list_field_data
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
  getListFieldDataAction,
  getFindUserInManagerWithActionData
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
