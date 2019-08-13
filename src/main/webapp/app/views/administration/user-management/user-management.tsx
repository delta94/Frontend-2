import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import Loading from './../../../common/Loading/loading';
// import UserManagementUpdate from './user-management-update';
import './user-management.scss';
import {
  Translate,
  ICrudGetAllAction,
  ICrudPutAction,
  TextFormat,
  JhiPagination,
  getPaginationItemsNumber,
  getSortState,
  IPaginationBaseState
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/common/util/pagination.constants';
import { getUsers, updateUser } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export class UserManagement extends React.Component<IUserManagementProps, IPaginationBaseState> {
  state: IPaginationBaseState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    console.log('didmount');
    this.getUsers();
    this.setState({
      loading: true
    });
  }
  componentWillReceiveProps(nextProps) {
    // console.log('receive[prop')
    //   setTimeout(() => {
    //     this.setState({
    //       loading: false
    //     });
    //   }, 3000);
    const { users } = nextProps;
    if (users.length > 0) {
      console.log(users.length);
      this.setState({
        loading: false
      });
    } else {
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 3000);
    }
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortUsers()
    );
  };

  sortUsers() {
    this.getUsers();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortUsers());

  getUsers = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getUsers(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  toggleActive = user => () => {
    this.props.updateUser({
      ...user,
      activated: !user.activated
    });
  };
  loading = e => {
    console.log('aaa' + e);
  };

  editUserManagement = user => {
    console.log(user);
  };

  render() {
    const { users, account, match, totalItems } = this.props;
    console.log(users);
    return (
      <div>
        {/* day la trang quan ly user */}
        <h2 id="user-management-page-heading">
          <Translate contentKey="userManagement.home.title">Users</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel">Create a new user</Translate>
          </Link>
        </h2>
        <div />

        <Table responsive striped>
          <thead>
            <tr className="text-center">
              <th className="hand " onClick={this.sort('fullName')}>
                <Translate contentKey="userManagement.fullName">FullName</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={this.sort('phone')}>
                <Translate contentKey="userManagement.phone">Phone</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={this.sort('email')}>
                <Translate contentKey="userManagement.email">Email</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>

              <th>
                <Translate contentKey="userManagement.profiles">Profiles</Translate>
              </th>

              <th id="modified-date-sort" className="hand">
                <Translate contentKey="userManagement.feature">Feature</Translate>
              </th>
            </tr>
          </thead>

          <tbody>
            {users
              ? users.map((user, i) => (
                  <tr id={user.id} key={`user-${i}`}>
                    <td>{user.fullName}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.profiles}</td>

                    <td className="text-center">
                      <div className="btn-group flex-btn-group-container">
                        {/* <Button tag={Link} to={`${match.url}/${user.fullName}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>  */}
                        <Button color="primary" size="sm" onClick={() => this.editUserManagement(user)}>
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`${match.url}/${user.id}/delete`}
                          color="danger"
                          size="sm"
                          disabled={account.fullName === user.fullName}
                        >
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              : ''}
          </tbody>
        </Table>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account
});

const mapDispatchToProps = { getUsers, updateUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
