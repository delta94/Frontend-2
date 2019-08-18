import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import './user-management.scss';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import SweetAlerts from './user-delete';
import UserManagementDeleteDialog from './user-delete-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { getUsers, updateUser, getUserSearch } from 'app/actions/user-management';
import FormMultiSelectWidget from './user-categories-tag';
import { IRootState } from 'app/reducers';
import { USER_MANAGE_ACTION_TYPES } from 'app/constants/user-management';
import ReactPaginate from 'react-paginate';

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}
export interface IUserManagementState extends IPaginationBaseState {
  loading: boolean;
}

export class UserManagement extends React.Component<IUserManagementProps, IUserManagementState> {
  state: IUserManagementState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    activePage: ACTIVE_PAGE,
    loading: false
  };

  //loading page
  componentDidMount() {
    const { activePage } = this.state;
    this.getUsers(activePage);
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
    this.setState({
      ...this.state,
      activePage: activePage.selected
    });
    this.getUsers(activePage.selected);
  };

  getUsers = activePage => {
    const { itemsPerPage, sort, order } = this.state;
    this.props.getUsers(activePage, itemsPerPage, `${sort},${order}`);
  };

  toggleActive = user => () => {
    this.props.updateUser({
      ...user,
      activated: !user.activated
    });
  };

  search = event => {
    var txtSearch = event.target.value;
    this.props.getUserSearch(0, 100, '', txtSearch);
  };

  render() {
    const { users, match, totalElements, pageCount } = this.props;
    const { activePage, itemsPerPage } = this.state;
    console.info('pageCount', pageCount);
    return (
      <div>
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
              <FormMultiSelectWidget
                users={users.map((event, index) => {
                  console.log(event.categories.split(','));
                  return event.categories;
                })}
              />
            </Col>
            <Col md="3">
              <div className="has-search">
                <span className=" form-control-feedback" />
                <input type="text" className="form-control" onChange={this.search} placeholder="Tìm kiếm" />
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
                  {/* <FontAwesomeIcon icon="sort" /> */}
                </th>
                <th className="hand" onClick={this.sort('mobile')}>
                  <Translate contentKey="userManagement.mobile" />
                  {/* <FontAwesomeIcon icon="sort" /> */}
                </th>
                <th className="hand" onClick={this.sort('email')}>
                  <Translate contentKey="userManagement.email" />
                  {/* <FontAwesomeIcon icon="sort" /> */}
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
                ? users.map((user, i) => (
                    <tr id={user.id} key={`user-${i}`}>
                      <td>1</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      {/* <td className="badge badge-success">{user.categories}</td> */}
                      <td>
                        {user.categories.split(',').map((category, index) => {
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
                          <Button className="buttonUpdate" tag={Link} to={`${match.url}/${user.id}/update`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit" />
                            </span>
                          </Button>

                          {/* <Button color="primary" size="sm" onClick={() => this.editUserManagement(user)}>
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button> */}
                          <Button tag={Link} to={`${match.url}/${user.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete" />
                            </span>
                          </Button>
                          {/* <SweetAlerts /> */}
                        </div>
                      </td>
                    </tr>
                  ))
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
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={75}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePagination}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
  totalElements: storeState.userManagement.totalElements,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
});

const mapDispatchToProps = { getUsers, updateUser, getUserSearch };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
