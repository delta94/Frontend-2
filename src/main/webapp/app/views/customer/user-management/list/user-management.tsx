import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, CustomInput, Row, Label, Col, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openModal, closeModal } from 'app/actions/modal';
import './user-management.scss';
import { ITEMS_PER_PAGE, ACTIVE_PAGE } from 'app/constants/pagination';
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
  postSaveAdvancedSearchActionData,
  getListOptionFilter
} from 'app/actions/user-management';
import UserCategoryTag from './categories-tag/categories-tag';
import { IRootState } from 'app/reducers';
import { Menu, Dropdown, Icon, Checkbox, Input } from 'antd';
import ReactPaginate from 'react-paginate';
import LoaderAnim from 'react-loaders';
import SweetAlert from 'sweetalert-react';
import Loader from 'react-loader-advanced';
import CreateUser from '../create/create';
import $ from 'jquery';
import { ISearchAdvanced } from 'app/common/models/group-attribute-customer';
import FieldData from '../../group-attribute-customer/group-modal-config/field-data/field-data';
import { makeRandomId } from '../../group-attribute-customer/group-modal-config/group-modal-config';
import { OPERATOR } from 'app/constants/field-data';
import { getListFieldDataAction } from 'app/actions/group-attribute-customer';
import { getFindUserInManagerWithActionData } from 'app/actions/user-management';
import { Collapse } from 'reactstrap';
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

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> { }

export interface IUserManagementState {
  isDelete: boolean;
  isConfirm: boolean;
  idUser: string;
  textSearch: string;
  categories: string;
  tagIds: [];
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
  listValueSort: any[];
  listDataUser: any[];
  conditionSort: string;
  count: number;
  is_normal_find: boolean;
  isCheckDateCreate: boolean;
  listCheckedCustomer: string[];
  checkedAllCustomer: boolean;
  modalRemoveCus: boolean;
  acceptRemoveCus: boolean;
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
    tagIds: [],
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
    save_advanced_search: {},
    listValueSort: [],
    listDataUser: [],
    conditionSort: '',
    count: 0,
    is_normal_find: true,
    isCheckDateCreate: false,
    listCheckedCustomer: [],
    checkedAllCustomer: false,
    modalRemoveCus: false,
    acceptRemoveCus: true
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
    const { itemsPerPage, textSearch, categories, open_search, is_normal_find } = this.state;
    if (open_search && !is_normal_find) {
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
      activePage: 0,
      tagIds: categorieIds
    });
    this.props.getUsers(0, itemsPerPage, categorieIds.join(), textSearch);
  };

  search = event => {
    if (event.key === 'Enter') {
      const textSearch = event.target.value;
      const { itemsPerPage, categories, is_normal_find } = this.state;
      this.setState({
        ...this.state,
        textSearch,
        activePage: 0,
        is_normal_find: true
      });
      this.props.getUsers(0, itemsPerPage, categories, textSearch);
    }
  };

  rowName = () => {
    let { listFields, list_option } = this.props;
    let listData = listFields
      .filter(el => el.title !== 'Tên' && el.title !== 'Email' && el.title !== 'Họ' && el.title !== 'Số điện thoại')
      .map(event => {
        let check = false;
        list_option.map(item => {
          if (String(item) === String(event.code)) {
            check = true;
          }
        });
        return { ...event, check: check };
      });
    let data = (
      <Menu>
        {listData.map((value, index) => {
          return (
            <Menu.Item key={index}>
              <Checkbox defaultChecked={value.check} onChange={event => this.onChangeCheckBox(event, value.code)}>
                {value.title}
              </Checkbox>
            </Menu.Item>
          );
        })}
        <Menu.Item>
          <Checkbox onChange={event => this.onChangeCheckBox(event, 'createdDate')}>
            <Translate contentKey="userManagement.created-date" />
          </Checkbox>
        </Menu.Item>
      </Menu>
    );

    return data;
  };

  onChangeCheckBox = (e, code) => {
    let { listDataUser, isCheckDateCreate } = this.state;
    let { list_option } = this.props;
    let isCheck = e.target.checked;
    let existValue;
    if (listDataUser.length === 0) {
      if (this.props.list_option.length > 0) {
        listDataUser = this.props.list_option;
      }
    }
    if (listDataUser.length > 0) {
      listDataUser.forEach((item, index) => {
        if (item === code) {
          existValue = code;
          listDataUser = listDataUser.filter(function (value) {
            return value != code;
          });
        } else {
          if (!existValue) {
            listDataUser.push(code);
            listDataUser = [...new Set(listDataUser)];
          }
        }
      });
    } else {
      listDataUser.push(code);
    }

    if (code === 'createdDate') {
      isCheckDateCreate = isCheck;
    }

    this.setState({ listDataUser, isCheckDateCreate });
    if (isCheck) {
      $(`th.${code}`).show();
    }
    this.props.getListOptionFilter(listDataUser);
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

  toggleCreate = async () => {
    let { open_create } = this.state;
    this.setState({ open_create: !open_create });
    await this.props.getUsers(0, 10, '', '');
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
    let { list_field_data_cpn, advancedSearchesData, advancedSearches } = this.state;

    list_field_data_cpn.forEach((item, index) => {
      if (item.id === id) {
        list_field_data_cpn.splice(index, 1);
        advancedSearchesData.splice(index, 1);
        advancedSearches.splice(index, 1);
      }
    });

    this.updateLastIndex(list_field_data_cpn);
    this.setState({ list_field_data_cpn, advancedSearchesData, advancedSearches });
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
    let { advancedSearches, logicalOperator, pageSize, is_normal_find } = this.state;
    is_normal_find = false;
    if (advancedSearches.length <= 1) {
      logicalOperator = '';
    }

    this.props.getFindUserInManagerWithActionData({
      logicalOperator,
      advancedSearches,
      page,
      pageSize
    });

    this.setState({ is_normal_find });
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

  dataFilter() {
    let { listDataUser, listValueSort } = this.state;
    const { list_option } = this.props;
    let dataUser = this.dataTable().map(event => {
      return {
        id: event.id,
        createdDate: event.createdDate,
        email: event.email,
        fields: event.fields.map((item, idx) => {
          return {
            code: item.code,
            fieldValue: item.fieldValue,
            id: item.id,
            title: item.title,
            type: item.type,
            check:
              list_option
                .map(event => {
                  if (String(event) === String(item.code)) return event;
                })
                .filter(Boolean).length > 0
                ? true
                : false,
            value: item.value
          };
        }),

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

  dataTable() {
    const { users, loading, modalState, listFields } = this.props;
    const { activePage } = this.state;
    let listPropUser = listFields.filter(
      el => el.title !== 'Tên' && el.title !== 'Email' && el.title !== 'Họ' && el.title !== 'Số điện thoại'
    );
    let lengthProps = listPropUser.length;
    let listPropsUser = listPropUser.map(event => {
      return {
        code: event.code,
        fieldValue: event.fieldValue,
        id: event.id,
        title: event.title,
        type: event.type,
        check: false,
        value: event.value
      };
    });
    let dataUser = users.map(event => {
      let dataProps;
      if (event.fields.length <= lengthProps) {
        dataProps = listPropsUser.map(item => {
          return {
            code: item.code,
            fieldValue: item.fieldValue,
            id: item.id,
            title: item.title,
            type: item.type,
            check: false,
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
        fields:
          event.fields.length > 0
            ? lengthProps > event.fields.length
              ? dataProps
              : event.fields.map(item => {
                return {
                  code: item.code,
                  fieldValue: item.fieldValue,
                  id: item.id,
                  title: item.title,
                  type: item.type,
                  check: false,
                  value: item.value
                };
              })
            : listPropsUser,
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

  sortData(arr, key) {
    let { count } = this.state;
    let sortData = arr.sort(function (a, b) {
      if (count % 2 === 0) {
        if (String(a[key]).toLowerCase() < String(b[key]).toLowerCase()) {
          return -1;
        }
        if (String(a[key]).toLowerCase() > String(b[key]).toLowerCase()) {
          return 1;
        }
        return 0;
      } else {
        if (String(a[key]).toLowerCase() < String(b[key]).toLowerCase()) {
          return 1;
        }
        if (String(a[key]).toLowerCase() > String(b[key]).toLowerCase()) {
          return -1;
        }
        return 0;
      }
    });
    return sortData;
  }
  handleCheckedAllCustomer = (checkedAll: boolean, dataUser: any[]) => {
    let listChecked = [];
    if (checkedAll === true) {
      dataUser.forEach((user) => {
        listChecked.push(user.id);
      })
    }
    this.setState({
      checkedAllCustomer: checkedAll,
      listCheckedCustomer: listChecked
    });

  }
  handleCheckedCustomer = (checkedId: string) => {
    const { listCheckedCustomer } = this.state;
    let listChecked = [];
    if (listCheckedCustomer.filter((customerId) => (customerId === checkedId)).length > 0) {
      listChecked = listCheckedCustomer.filter((customerId) => (customerId !== checkedId));
      this.setState({
        checkedAllCustomer: false
      })
    } else {
      listChecked = JSON.parse(JSON.stringify(listCheckedCustomer));
      listChecked.push(checkedId);
    }
    this.setState({
      listCheckedCustomer: listChecked
    });
  }
  openModalRemoveCustomer = () => {
    this.setState({
      modalRemoveCus: !this.state.modalRemoveCus
    });
  }
  handleRemoveCustomer = () => {
    // call api remove customers
    const { listCheckedCustomer } = this.state;
    console.log(listCheckedCustomer);
  }
  validateRemoveCustomer = (event) => {
    if (+(event.target.value) === this.state.listCheckedCustomer.length) {
      this.setState({
        acceptRemoveCus: false
      })
    } else {
      this.setState({
        acceptRemoveCus: true
      })
    }
  }

  render() {
    const importImage = require('app/assets/utils/images/user-mangament/import.png');
    const exportImage = require('app/assets/utils/images/user-mangament/export.png');
    const filterImage = require('app/assets/utils/images/user-mangament/filter.png');
    const { users, loading, listFields, modalStateFilter, pageCount, list_option } = this.props;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    const {
      activePage,
      open_new_save,
      open_create,
      open_search,
      logicalOperator,
      list_field_data_cpn,
      name,
      modalState,
      conditionSort,
      count,
      open_list_save,
      listCheckedCustomer,
      checkedAllCustomer,
      modalRemoveCus,
      acceptRemoveCus
    } = this.state;
    let dataUser;
    dataUser = this.dataFilter();
    let theader = listFields.map(event => {
      return { ...event, showValue: this.props.list_option };
    });

    let dataHeader = theader
      .sort(function (a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      .filter(el => el.title !== 'Tên' && el.title !== 'Email' && el.title !== 'Họ' && el.title !== 'Số điện thoại')
      .map(event => {
        let check = false;
        list_option.map(item => {
          if (String(item) === String(event.code)) {
            check = true;
          }
        });
        return { ...event, check: check };
      });
    if (this.props.list_option.length > 0) {
      this.props.list_option.map(event => {
        $(`th.${event}`).hide();
      });
    }
    if (count > 0) {
      dataUser = this.sortData(dataUser, conditionSort);
    }
    let list_field_render =
      list_field_data_cpn && list_field_data_cpn.length > 0
        ? list_field_data_cpn.map(item => {
          if (item.id)
            return (
              <FieldData
                key={item.id}
                id={item.id}
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
      <Loader message={spinner1} show={loading} priority={1}>
        <Fragment>
          <SweetAlert
            title={modalState.title ? modalState.title : 'No title'}
            confirmButtonColor=""
            show={modalState.show ? modalState.show : false}
            text={modalState.text ? modalState.text : 'No'}
            type={modalState.type ? modalState.type : 'error'}
            onConfirm={() => this.props.closeModal()}
          />
          <SweetAlert
            title={modalStateFilter.title ? modalStateFilter.title : 'No title'}
            confirmButtonColor=""
            show={modalStateFilter.show ? modalStateFilter.show : false}
            text={modalStateFilter.text ? modalStateFilter.text : 'No'}
            type={modalStateFilter.type ? modalStateFilter.type : 'error'}
            onConfirm={() => this.props.closeModal()}
          />
          {/* Add new */}
          <Modal isOpen={open_new_save}>
            <ModalHeader>
              <Translate contentKey="userManagement.create-find-name" />
            </ModalHeader>
            <ModalBody>
              <div className="input-search_group" style={{ paddingRight: '30px' }}>
                <label className="input-search_label">
                  <span>
                    <Translate contentKey="userManagement.name-find" />
                  </span>
                </label>
                <Input value={name} onChange={event => this.setState({ name: event.target.value })} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="none" style={{ float: 'right' }} onClick={() => this.setState({ open_new_save: false, name: '' })}>
                <Translate contentKey="userManagement.cancel" />
              </Button>
              <Button
                color="primary"
                style={{ float: 'right' }}
                onClick={() => this.saveAdvancedSearch()}
                disabled={name && name.trim() !== '' ? false : true}
              >
                <Translate contentKey="userManagement.save" />
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
          <div className="userManagement">
            <div id="title-common-header">
              <span id="text-title">
                {' '}
                <Translate contentKey="userManagement.home.title" />
              </span>
              <Button
                className="btn float-right jh-create-entity"
                outline
                color="info"
                onClick={async () => {
                  let { advancedSearches, logicalOperator, textSearch, tagIds } = this.state;
                  if (advancedSearches.length <= 1) {
                    logicalOperator = '';
                  }
                  let data = {
                    quickSearch: {
                      textSearch: textSearch,
                      tagIds: tagIds
                    },
                    isAdvanced: this.state.open_search ? 1 : 0,
                    advancedSearch: {
                      logicalOperator: logicalOperator,
                      advancedSearches: advancedSearches
                    }
                  };
                  await this.props.exportFile(data);
                }}
              >
                <img src={exportImage} style={{ margin: ' 0px 5px 2px' }} />
                <Translate contentKey="userManagement.home.export" />
              </Button>
              <Button
                className="btn float-right jh-create-entity"
                outline
                color="info"
                onClick={() => window.location.assign('/#/app/views/customers/user-management/new')}
              >
                <span>
                  <img src={importImage} style={{ margin: ' 0px 5px 2px' }} />
                </span>
                <Translate contentKey="userManagement.home.import" />
              </Button>
              <span id="column-span">|</span>
              <Button className=" float-right" color="primary" style={{ backGround: '#3866DD' }} onClick={this.toggleCreate}>
                <FontAwesomeIcon icon="plus" />
                <span id="btn-create">
                  {' '}
                  <Translate contentKey="userManagement.home.createLabel" />
                </span>
              </Button>
            </div>

            {/* Panel */}
            <div className="panel">
              <CreateUser open_create={open_create} toggleCreate={this.toggleCreate} />
              <Collapse isOpen={!open_search} navbar>
                <div className="search-field">
                  <div className="input-search_group" style={{ paddingRight: '30px' }}>
                    <label className="input-search_label">
                      <span>
                        <Translate contentKey="userManagement.card-tag" />
                      </span>
                    </label>
                    <UserCategoryTag handleChange={this.handleChange} />
                  </div>
                  <div className="input-search_group" style={{ paddingRight: '30px' }}>
                    <label className="input-search_label">
                      <Translate contentKey="userManagement.home.search-placer" />
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      onKeyDown={this.search}
                      placeholder={translate('userManagement.home.search-placer')}
                    />
                  </div>
                </div>
              </Collapse>
              <div className="field-search">
                <div className="field-title">
                  <p>
                    <label className="field-title_text" onClick={this.closeSearchAdvanced}>
                      <Icon type="setting" />
                      <Translate contentKey="userManagement.advanced-search" />
                      <Icon type={open_search ? 'caret-up' : 'caret-down'} />
                    </label>
                    <label
                      className="field-title_text"
                      style={{
                        float: 'right'
                      }}
                      onClick={this.toggleSearchSaveModal}
                    >
                      <Translate contentKey="userManagement.saved-advanced-search" />
                    </label>
                  </p>
                </div>
                <Collapse isOpen={open_search} navbar>
                  <div className="search-anvanced_customer">
                    {list_field_render}

                    <Button color="primary" onClick={this.handleAddNewComponent} style={{ marginRight: '20px' }}>
                      <FontAwesomeIcon icon="plus" />
                    </Button>
                    <label className="title-advanced-search">
                      <Translate contentKey="userManagement.add-more-condition-search" />
                    </label>
                  </div>
                  <div className="search-anvanced_footer">
                    <Button
                      color="ghost"
                      style={{
                        marginLeft: '20px',
                        float: 'right',
                        backgroundColor: '#E5ECF4',
                        border: '1px solid #CED4DA'
                      }}
                      onClick={this.saveSearchData}
                    >
                      <Translate contentKey="userManagement.save-search" />
                    </Button>

                    <Button color="primary" style={{ float: 'right' }} onClick={() => this.getDataListCustomer(0)}>
                      <Translate contentKey="userManagement.find" />
                    </Button>
                  </div>
                </Collapse>
              </div>
              <hr style={{ borderTop: 'dotted 1px' }} />
              <Translate contentKey="userManagement.home.total-element" interpolate={{ element: this.props.totalElements }} />
              <Dropdown overlay={this.rowName} trigger={['click']}>
                <Button color="link" style={{ float: 'right' }}>
                  <img src={filterImage} style={{ margin: ' 0px 5px 10px' }} />
                </Button>
              </Dropdown>
              <Button
                className="btn float-right jh-create-entity"
                outline
                onClick={this.openModalRemoveCustomer}
                disabled={listCheckedCustomer.length > 0 ? false : true}
              >
                <Translate contentKey="userManagement.home.remove-customer" />
              </Button>
              {/*modal confirm accept remove customers*/}
              <div>
                <Modal isOpen={modalRemoveCus} toggle={this.openModalRemoveCustomer} >
                  <ModalBody>
                    Bạn đang xóa {listCheckedCustomer.length} khách hàng. Vui lòng điền số lượng khách hàng muốn xóa.
                    Bạn có 90 ngày để hồi phục khách hàng đã xóa.
                    <br />
                    <div className="wrraper-input">
                      {acceptRemoveCus &&
                        <div className="number-cus">{listCheckedCustomer.length}</div>
                      }
                      <Input className="input-confirm-remove" onChange={this.validateRemoveCustomer} />
                    </div>
                  </ModalBody>
                  <ModalFooter className="footer-modal-cus">
                    <Button outline onClick={this.openModalRemoveCustomer}>Thoát </Button>
                    <Button outline onClick={this.handleRemoveCustomer} disabled={acceptRemoveCus} >Xóa</Button>
                  </ModalFooter>
                </Modal>
              </div>
              {(listCheckedCustomer && checkedAllCustomer) &&
                <div className="title-remove-all-customers" >
                  <Translate contentKey="userManagement.home.choosed-customers" interpolate={{ element: listCheckedCustomer.length }} />
                  <span className="title-select-all">
                    <Translate contentKey="userManagement.home.choose-all-customers"
                      interpolate={{ element: this.props.totalElements }} />
                  </span>
                </div >}
              <Row />
              <div className="table-user">
                <Table responsive striped id="table-reponse">
                  <thead>
                    <tr className="text-center">
                      <th style={{ width: '50px' }} className="hand">
                        <CustomInput
                          checked={checkedAllCustomer}
                          onClick={() => this.handleCheckedAllCustomer(!checkedAllCustomer, dataUser)}
                          type="checkbox" id="check-all-customers"
                        />
                      </th>
                      <th style={{ width: '50px' }} className="hand">
                        STT
                      </th>
                      <th
                        style={{ width: '150px' }}
                        className="hand"
                        onClick={() => {
                          this.setState({ conditionSort: 'firstName', count: count + 1 });
                        }}
                      >
                        <Translate contentKey="userManagement.first-name" />{' '}
                        {conditionSort === 'firstName' ? '' : <Icon type="caret-down" />}
                        {conditionSort === 'firstName' ? (
                          count % 2 === 0 ? (
                            <Icon type="sort-ascending" />
                          ) : (
                              <Icon type="sort-descending" />
                            )
                        ) : (
                            ''
                          )}
                      </th>
                      <th
                        style={{ width: '150px' }}
                        className="hand"
                        onClick={() => {
                          this.setState({ conditionSort: 'lastName', count: count + 1 });
                        }}
                      >
                        <Translate contentKey="userManagement.last-name" /> {conditionSort === 'lastName' ? '' : <Icon type="caret-down" />}
                        {conditionSort === 'lastName' ? (
                          count % 2 === 0 ? (
                            <Icon type="sort-ascending" />
                          ) : (
                              <Icon type="sort-descending" />
                            )
                        ) : (
                            ''
                          )}
                      </th>
                      <th
                        style={{ width: '200px' }}
                        className="hand"
                        onClick={() => {
                          this.setState({ conditionSort: 'email', count: count + 1 });
                        }}
                      >
                        <Translate contentKey="userManagement.email" /> {conditionSort === 'email' ? '' : <Icon type="caret-down" />}
                        {conditionSort === 'email' ? (
                          count % 2 === 0 ? (
                            <Icon type="sort-ascending" />
                          ) : (
                              <Icon type="sort-descending" />
                            )
                        ) : (
                            ''
                          )}
                      </th>
                      <th
                        style={{ width: '200px' }}
                        className="hand"
                        onClick={() => {
                          this.setState({ conditionSort: 'mobile', count: count + 1 });
                        }}
                      >
                        <Translate contentKey="userManagement.phone-number" />{' '}
                        {conditionSort === 'mobile' ? '' : <Icon type="caret-down" />}
                        {conditionSort === 'mobile' ? (
                          count % 2 === 0 ? (
                            <Icon type="sort-ascending" />
                          ) : (
                              <Icon type="sort-descending" />
                            )
                        ) : (
                            ''
                          )}
                      </th>
                      {dataHeader
                        ? dataHeader.map((event, id) => {
                          return (
                            <th
                              style={{ width: '100px' }}
                              key={id}
                              className={event.check === true ? '' : 'display-colum'}
                              id={event.code}
                            >
                              {event.title}
                            </th>
                          );
                        })
                        : ''}
                      <th
                        className={this.state.isCheckDateCreate === true ? '' : 'display-colum'}
                        style={{ width: '200px' }}
                        onClick={() => {
                          this.setState({ conditionSort: 'createdDate', count: count + 1 });
                        }}
                      >
                        <Translate contentKey="userManagement.created-date" />{' '}
                        {conditionSort === 'createdDate' ? (
                          count % 2 === 0 ? (
                            <Icon type="sort-ascending" />
                          ) : (
                              <Icon type="sort-descending" />
                            )
                        ) : (
                            ''
                          )}
                      </th>
                      <th style={{ width: '200px' }}>
                        <Translate contentKey="userManagement.card-tag" />
                      </th>
                      <th style={{ width: '150px' }} id="modified-date-sort" className="hand">
                        <Translate contentKey="userManagement.feature" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUser
                      ? dataUser.map((item, index) => {
                        return (
                          <tr id={item.id} key={`user-${index}`}>
                            <td>
                              <CustomInput
                                checked={listCheckedCustomer.filter((customerId) => (customerId === item.id)).length > 0}
                                onClick={() => this.handleCheckedCustomer(item.id)}
                                type="checkbox" id={"check-customers" + (this.state.activePage * this.state.itemsPerPage + index + 1)}
                              />
                            </td>
                            <td>{this.state.activePage * this.state.itemsPerPage + index + 1}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            {item.fields
                              .sort(function (a, b) {
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
                                  <td className={value.check === true ? '' : 'display-colum'} key={index}>
                                    {value.value}
                                  </td>
                                );
                              })}
                            <td className={this.state.isCheckDateCreate === true ? '' : 'display-colum'}>{item.createdDate}</td>
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
                    {users.length > 0 ? (
                      ''
                    ) : (
                        <tr>
                          <td colSpan={99}>
                            <Translate contentKey="properties-management.no-record" />
                          </td>{' '}
                        </tr>
                      )}
                  </tbody>
                </Table>
              </div>
              <Row className="justify-content-center" style={{ float: 'right', marginTop: '1%' }}>
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
              <br />
            </div>
          </div>
        </Fragment>
      </Loader>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  dowloadTemplate: storeState.userManagement.dowloadTemplate,
  modalState: storeState.handleModal.data,
  modalStateFilter: storeState.userManagement.dataModal,
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
  isCreate: storeState.userManagement.isCreate,
  totalElements: storeState.userManagement.totalElements,
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE),
  listFields: storeState.userManagement.listFields,
  list_field_data: storeState.groupCustomerState.list_field_data,
  list_save_advanced_search: storeState.userManagement.list_save_advanced_search,
  save_advanced_search: storeState.userManagement.save_advanced_search,
  isMerge: storeState.userManagement.isMerge,
  isDelete: storeState.userManagement.isDelete,
  list_option: storeState.userManagement.list_option
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
  postSaveAdvancedSearchActionData,
  getListOptionFilter
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
