import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Label, Col } from 'reactstrap';
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
  getFields
} from 'app/actions/user-management';
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
    isHide: false
  };

  //loading page
  componentDidMount = async () => {
    const { activePage, itemsPerPage, textSearch, categories } = this.state;
    let { users, getUsers, getFields } = this.props;
    await getUsers(activePage, itemsPerPage, categories, textSearch);
    getFields();
  };

  handlePagination = activePage => {
    const { itemsPerPage, textSearch, categories } = this.state;
    this.setState({
      ...this.state,
      activePage: activePage.selected
    });

    this.props.getUsers(activePage.selected, itemsPerPage, categories, textSearch);
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
              <Checkbox defaultChecked={true} onChange={event => this.onChangeCheckBox(event, value.id)}>
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
      $(`#${value}`).show();
      $(`.${value}`).show();
    } else {
      $(`#${value}`).hide();
      $(`.${value}`).hide();
    }
  };

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
    return rv;
  }

  render() {
    const { users, loading, modalState, listFields } = this.props;
    const { activePage } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    let listPropUser = listFields.filter(
      el => el.title !== 'Tên' && el.title !== 'Email' && el.title !== 'Họ' && el.title !== 'Số điện thoại'
    );
    let lengthProps = listPropUser.length;
    let dataUser = users.map(event => {
      let dataProps;
      if (event.fields.length < lengthProps) {
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
    return (
      <div>
        <SweetAlert
          title={modalState.title ? modalState.title : 'No title'}
          confirmButtonColor=""
          show={modalState.show ? modalState.show : false}
          text={modalState.text ? modalState.text : 'No'}
          type={modalState.type ? modalState.type : 'error'}
          onConfirm={() => this.props.closeModal()}
        />
        <Loader message={spinner1} show={loading} priority={1}>
          <div id="user-management-title">
            <Row id="row-header">
              <Col md="5">
                <Translate contentKey="userManagement.home.title" />
                &nbsp; ({this.props.totalElements})
              </Col>
              <Col md="5" style={{ display: 'flex', padding: '0px 0px 0px 175px' }}>
                <Col md="6">
                  <span className="d-inline-block mb-2 mr-2">
                    <Button
                      className="btn float-right jh-create-entity"
                      outline
                      color="info"
                      onClick={async () => {
                        await this.props.exportFile(this.state.textSearch, this.state.categories);
                      }}
                    >
                      <Ionicon color="#343A40" icon="md-arrow-up" /> &nbsp; Export
                    </Button>
                  </span>
                </Col>
                <Col md="6">
                  <Import />
                </Col>
              </Col>
              <Col md="2">
                <CreateUser />
              </Col>
            </Row>
          </div>
          <div className="panel">
            <Row>
              <Col md="3" className="catelogry-search">
                <Label id="catelogry-text"> Thẻ/Tag</Label>
                <UserCategoryTag handleChange={this.handleChange} />
              </Col>
              <Col md="4" className="catelogry-search">
                <div className="has-search">
                  <Label id="search-text">
                    <Translate contentKey="userManagement.home.search-placer" />
                  </Label>
                  <input
                    type="text"
                    className="form-control"
                    onKeyDown={this.search}
                    placeholder={translate('userManagement.home.search-placer')}
                  />
                </div>
              </Col>
              <Col md="5" style={{ display: 'flex', padding: '0px 235px 0px 0px' }} />
            </Row>
            <Dropdown overlay={this.rowName} trigger={['click']}>
              <Button style={{ float: 'right', margin: '0px 50px 8px' }} outline color="warning" className="ant-dropdown-link">
                <i className="pe-7s-filter icon-gradient bg-premium-dark" style={{ fontSize: '18px' }} />
                Lọc bảng
              </Button>
            </Dropdown>
            <Table responsive striped>
              <thead>
                <tr className="text-center">
                  <th className="hand">#</th>
                  {listFields.map((event, id) => {
                    return (
                      <th key={id} id={event.id}>
                        {event.title}
                      </th>
                    );
                  })}
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
                          <td>{item.mobile}</td>
                          {item.fields.map((value, index) => {
                            return (
                              <td className={value.id} key={index}>
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
            {users.length > 0 ? '' : <p style={{ textAlign: 'center' }}>không có dữ liệu khách hàng</p>}
            <Row className="justify-content-center">
              {this.props.totalElements >= 10 ? (
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={this.props.pageCount}
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
        </Loader>
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
  listFields: storeState.userManagement.listFields
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
  getFields
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
