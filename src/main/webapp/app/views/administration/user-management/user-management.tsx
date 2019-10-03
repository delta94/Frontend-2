import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Label, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './user-management.scss';

import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { getUser, getUsers, updateUser, getUserCategories, deleteUser } from 'app/actions/user-management';
import UserCategoryTag from './user-categories-tags';
import { IRootState } from 'app/reducers';
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

  render() {
    const { users, match, totalElements, loading, success } = this.props;
    const { itemsPerPage, activePage, idUser, textSearch, categories, isConfirm } = this.state;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div>
        <Loader message={spinner1} show={loading} priority={1}>
          <div id="user-management-title">
            <Translate contentKey="userManagement.home.title" />
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
              <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel" />
            </Link>
          </div>
          <div />
          <div className="panel">
            <Row>
              <Col md="3">
                <Label>
                  {' '}
                  <Translate contentKey="userManagement.home.type" /> :
                </Label>
                <UserCategoryTag handleChange={this.handleChange} />
              </Col>
              <Col md="3">
                <div className="has-search">
                  <input
                    type="text"
                    className="form-control"
                    onKeyDown={this.search}
                    placeholder={translate('userManagement.home.search-placer')}
                  />
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
                  ? users.map((event, index) => {
                      return (
                        <tr id={event.id} key={`user-${index}`}>
                          <td>{this.state.activePage * this.state.itemsPerPage + index + 1}</td>
                          <td> {event.name}</td>
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
                              &nbsp;
                              <Button className="buttonUpdate" tag={Link} to={`${match.url}/${event.id}/update`} color="primary" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Thông tin</span>
                              </Button>
                              &nbsp;
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
                                  title={translate('alert.title-delete')}
                                  confirmButtonColor=""
                                  text={translate('alert.text-delete')}
                                  show={this.state.isDelete}
                                  cancelButtonText={translate('alert.canler')}
                                  confirmButtonText={translate('alert.ok')}
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
                                  show={isConfirm}
                                  title=""
                                  text={translate('alert.complete-delete')}
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
