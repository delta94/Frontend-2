import React from 'react';
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
  componentDidMount() {
    const { activePage, itemsPerPage, textSearch, categories } = this.state;
    this.props.getUsers(activePage, itemsPerPage, categories, textSearch);
  }

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

  render() {
    const { users, match, loading, getDetailUser, history, modalState } = this.props;
    const { activePage } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
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
            <Translate contentKey="userManagement.home.title" />
            <CreateUser />
          </div>
          <div />
          <div className="panel">
            <Row>
              <Col md="3" className="catelogry-search">
                <Label id="catelogry-text">
                  {' '}
                  <Translate contentKey="userManagement.home.type" />{' '}
                </Label>
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
              <Col md="5" style={{ display: 'flex', padding: '0px 235px 0px 0px' }}>
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
                  <th id="tag">Tag</th>
                  <th id="modified-date-sort" className="hand">
                    <Translate contentKey="userManagement.feature" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {users
                  ? users.map((event, index) => {
                      return (
                        <tr id={event.id} key={`user-${index}`}>
                          <td>{this.state.activePage * this.state.itemsPerPage + index + 1}</td>
                          <td style={{ width: '20%', wordBreak: 'break-word' }} className="name">
                            {' '}
                            {event.firstName + ' ' + event.lastName}
                          </td>
                          <td className="mobile">{event.mobile}</td>
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
                                onClick={async () => {
                                  await getDetailUser(event.id);
                                  history.push(`/app/views/customers/user-management/${event.id}/info`);
                                }}
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
            <Row className="justify-content-center">
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
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
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
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
