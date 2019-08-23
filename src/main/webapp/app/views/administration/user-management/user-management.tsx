import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/user-management.scss';

import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { getUser, getUsers, updateUser, getUserCategories, deleteUser } from 'app/actions/user-management';
import UserCategoryTag from './user-categories-tags';
import { IRootState } from 'app/reducers';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IUserManagementState {
  isDelete: boolean;
  isConfirm: boolean;
  idUser: string;
  textSearch: string;
  categories: string;
  activePage: number;
  itemsPerPage: number;
}

// const contentBoxStyle = {
//   backgroundColor: 'white',
//   position: 'relative',
//   padding: 20,
//   border: '1px solid lightgrey',
//   borderRadius: '5px'
// };

export class UserManagement extends React.Component<IUserManagementProps, IUserManagementState> {
  state: IUserManagementState = {
    activePage: ACTIVE_PAGE,
    itemsPerPage: ITEMS_PER_PAGE,
    isDelete: false,
    isConfirm: false,
    idUser: '',
    textSearch: '',
    categories: ''
  };

  //loading page
  componentDidMount() {
    const { activePage, itemsPerPage, textSearch, categories } = this.state;
    this.props.getUsers(activePage, itemsPerPage, categories, textSearch);
    // this.props.getUserCategories('');
  }

  componentWillReceiveProps(nextProps) {
    // const { users } = nextProps;
    // const { activePage, itemsPerPage } = this.state;
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
      const { activePage, itemsPerPage, categories } = this.state;
      this.setState({
        ...this.state,
        textSearch,
        activePage: 0
      });
      this.props.getUsers(0, itemsPerPage, categories, textSearch);
    }
  };

  render() {
    const { users, match, totalElements, pageCount, loading, success, error } = this.props;
    const { itemsPerPage, activePage, idUser, textSearch, categories, isConfirm } = this.state;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div>
        <Loader message={spinner1} show={loading} priority={1}>
          {/* day la trang quan ly user */}
          <h3 id="user-management-page-heading">
            <Translate contentKey="userManagement.home.title" />
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
              <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel" />
            </Link>
          </h3>
          <div />
          <div className="panel">
            <Row>
              <Col md="3">
                <div className="totalItems">Tổng số {totalElements} bản ghi</div>
              </Col>
              <Col md="6">
                <UserCategoryTag handleChange={this.handleChange} />
              </Col>
              <Col md="3">
                <div className="has-search">
                  <span className=" form-control-feedback" />
                  <input type="text" className="form-control" onKeyDown={this.search} placeholder="Tìm kiếm" />
                </div>
              </Col>
            </Row>
            <hr />
            <Table responsive striped>
              <thead>
                <tr className="text-center">
                  <th className="hand">#</th>
                  <th className="hand ">
                    <Translate contentKey="userManagement.name" />
                  </th>
                  <th className="hand">
                    <Translate contentKey="userManagement.mobile" />
                  </th>
                  <th className="hand">
                    <Translate contentKey="userManagement.email" />
                  </th>
                  <th>
                    <Translate contentKey="userManagement.categories" />
                  </th>
                  <th id="modified-date-sort" className="hand">
                    <Translate contentKey="userManagement.feature" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {users
                  ? users.map((event, index, listUser?) => {
                      return (
                        <tr id={event.id} key={`user-${index}`}>
                          <td>{this.state.activePage * this.state.itemsPerPage + index + 1}</td>
                          <td>{event.name}</td>
                          <td>{event.phone}</td>
                          <td>{event.email}</td>
                          <td>
                            {event.categories &&
                              event.categories.split(',').map((category, index) => {
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
                              <Button className="buttonUpdate" tag={Link} to={`${match.url}/${event.id}/update`} color="primary" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.edit" />
                                </span>
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => {
                                  this.setState({
                                    ...this.state,
                                    isDelete: true,
                                    idUser: event.id
                                  });
                                }}
                              >
                                <SweetAlert
                                  title="Bạn muốn xoá ?"
                                  confirmButtonColor=""
                                  text="Mục đã xoá sẽ không thể khôi phục !"
                                  show={this.state.isDelete}
                                  showCancelButton
                                  onCancel={() => {
                                    this.setState({
                                      ...this.state,
                                      isDelete: false
                                    });
                                  }}
                                  onConfirm={() => {
                                    this.props.deleteUser(idUser, activePage, itemsPerPage, categories, textSearch);
                                    this.setState({
                                      ...this.state,
                                      isDelete: false,
                                      isConfirm: success
                                    });
                                  }}
                                />
                                <SweetAlert
                                  title="Deleted"
                                  confirmButtonColor=""
                                  show={isConfirm}
                                  text="Xoá thành công."
                                  type="success"
                                  onConfirm={() =>
                                    this.setState({
                                      ...this.state,
                                      isConfirm: false
                                    })
                                  }
                                />
                                <FontAwesomeIcon icon="trash" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.delete" />
                                </span>
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
  success: storeState.userManagement.showDeleteSuccessAlert,
  error: storeState.userManagement.showDeleteErrorAlert,
  user: storeState.userManagement.user,
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
  totalElements: storeState.userManagement.totalElements,
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
});

const mapDispatchToProps = { getUsers, updateUser, getUserCategories, deleteUser, getUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
