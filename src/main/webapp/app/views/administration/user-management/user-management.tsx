import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col } from 'reactstrap';
import './styles/user-management.scss';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typeahead } from 'react-bootstrap-typeahead';
import './user-management.scss';
import loading from './../../../common/Loading/loading';

import SweetAlerts from './user-delete';
import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { getUser, getUsers, updateUser, getUserCategories, deleteUser, getUserSearch } from 'app/actions/user-management';
// import { getUsers, updateUser, getUserSearch } from 'app/actions/user-management';
// >>>>>>> user-manager-pagination
import FormMultiSelectWidget from './user-categories-tag';
import FormMultiSelectWidgets from './user-categories-tags';
import { IRootState } from 'app/reducers';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}
export interface IUserManagementState extends IPaginationBaseState {
  loading: boolean;
  isDelete: boolean;
  isConfirm: boolean;
  idUser: string;
  textSearch: string;
  categories: string;
}
const contentBoxStyle = {
  backgroundColor: 'white',
  position: 'relative',
  padding: 20,
  border: '1px solid lightgrey',
  borderRadius: '5px'
};

export class UserManagement extends React.Component<IUserManagementProps, IUserManagementState> {
  state: IUserManagementState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    activePage: ACTIVE_PAGE,
    loading: false,
    isDelete: false,
    isConfirm: false,
    idUser: '',
    textSearch: '',
    categories: ''
  };

  //loading page
  componentDidMount() {
    const { activePage } = this.state;
    this.getUsers(activePage);
    this.props.getUserCategories('');
    this.setState({
      ...this.state,
      loading: true
    });
  }

  componentWillReceiveProps(nextProps) {
    const { users } = nextProps;
    const { activePage, itemsPerPage } = this.state;
    if (users.length > 0) {
      console.log(users);
      this.setState({
        loading: false
      });
    } else {
      // setTimeout(() => {
      //   this.setState({
      //     loading: false
      //   });
      // }, 3000);
    }
  }

  sort = prop => () => {
    this.setState(
      {
        order:
          this.state.order === USER_MANAGE_ACTION_TYPES.SORT_ASC ? USER_MANAGE_ACTION_TYPES.SORT_DESC : USER_MANAGE_ACTION_TYPES.SORT_ASC,
        sort: prop
      },
      () => this.sortUsers()
    );
  };

  sortUsers() {
    const { activePage } = this.state;
    this.getUsers(activePage);
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=
    ${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => {
    console.log(activePage);
    this.state.activePage = activePage.selected;
    this.setState({
      ...this.state
    });
    this.props.getUserSearch(this.state.activePage, this.state.itemsPerPage, this.state.categories, this.state.textSearch);
  };

  getUsers = (activePage, category?) => {
    const { itemsPerPage, sort, order } = this.state;
    // <<<<<<< HEAD

    //     this.props.getUsers(activePage - 1, itemsPerPage, `${sort},${order}`, category);
    // =======
    this.props.getUsers(activePage, itemsPerPage, `${sort},${order}`, category);
  };

  toggleActive = user => () => {
    this.props.updateUser(user.id);
  };

  handleCreate = name => {
    this.props.getUserCategories(name);
  };

  handleChange = category => {
    console.log('==================');
    console.log(category);
    this.state.categories = '';

    category.map((event, index) => {
      this.state.categories = this.state.categories + event.id + ',';
    });
    this.props.getUserSearch(this.state.activePage, this.state.itemsPerPage, this.state.categories, this.state.textSearch);
  };

  search = event => {
    if (event.key === 'Enter') {
      var txtSearch = event.target.value;
      this.state.textSearch = txtSearch;
      this.props.getUserSearch(this.state.activePage, this.state.itemsPerPage, this.state.categories, this.state.textSearch);
    }
  };

  render() {
    const { users, match, totalElements, pageCount, loading } = this.props;
    const { activePage, itemsPerPage } = this.state;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    console.info('pageCount', pageCount);

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
                <FormMultiSelectWidgets handleChange={this.handleChange} />
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
                  <th className="hand " onClick={this.sort('name')}>
                    <Translate contentKey="userManagement.name" />
                  </th>
                  <th className="hand" onClick={this.sort('mobile')}>
                    <Translate contentKey="userManagement.mobile" />
                  </th>
                  <th className="hand" onClick={this.sort('email')}>
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
                  ? users.map((event, index, listUser) => {
                      return (
                        <tr id={event.id} key={`user-${index}`}>
                          <td>{this.state.activePage * this.state.itemsPerPage + index + 1}</td>
                          <td>{event.name}</td>
                          <td>{event.phone}</td>
                          <td>{event.email}</td>
                          <td>
                            {event.categories.split(',').map((category, index) => {
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
                                    isDelete: true
                                  });
                                  this.setState({
                                    idUser: event.id
                                  });
                                }}
                              >
                                <SweetAlert
                                  title="Are you sure?"
                                  confirmButtonColor=""
                                  text="You will not be able to recover this imaginary file!"
                                  show={this.state.isDelete}
                                  showCancelButton
                                  onConfirm={() => {
                                    this.setState({
                                      isDelete: false,
                                      isConfirm: true
                                    });
                                    this.props.deleteUser(this.state.idUser);
                                  }}
                                  onCancel={() => {
                                    this.setState({ isDelete: false });

                                    console.log(itemsPerPage.toString);
                                  }}
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
              {/* <JhiPagination
              items={getPaginationItemsNumber(totalItems, itemsPerPage)}
              activePage={activePage}
              onSelect={this.handlePagination}
              maxButtons={MAX_BUTTON_COUNT}
            /> */}
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
              />
            </Row>
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
  totalElements: storeState.userManagement.totalElements,
  loading: storeState.userManagement.loading,
  // <<<<<<< HEAD
  listCategory: storeState.userManagement.listCategory,
  // =======
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
});

const mapDispatchToProps = { getUsers, updateUser, getUserCategories, deleteUser, getUser, getUserSearch };
// const mapDispatchToProps = { getUsers, updateUser, getUserSearch };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
