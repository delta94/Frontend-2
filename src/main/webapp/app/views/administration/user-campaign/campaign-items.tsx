import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './../user-campaign/style/campaign.scss';

import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { IRootState } from 'app/reducers';
import { any } from 'prop-types';

export interface ICampaignItemProps extends StateProps, DispatchProps {}

export interface ICampaignItemState {
  isDelete?: boolean;
  modal?: boolean;
  status: string;
  time: string;
  total: string;
  listCamp: any[];

  listUser: any[];
}

export class CampaignItem extends React.Component<ICampaignItemProps, ICampaignItemState> {
  state: ICampaignItemState = {
    isDelete: false,
    modal: false,
    status: '',
    time: '',
    total: '',
    listCamp: [
      {
        status: '',
        time: '',
        total: ''
      }
    ],
    listUser: [
      {
        name: 'hùng',
        phone: '0983374398',
        email: 'hungdv@gmail.com',
        profiles: 'sinh viên'
      },
      {
        name: 'tuấn',
        phone: '1234567890',
        email: 'tuancave@gmail.com',
        profiles: 'học sinh'
      }
    ]
  };
  componentDidMount() {
    this.setState({
      modal: false,
      listCamp: [
        {
          time: '23/8/2019 - 24/8/2019',
          status: 'đang hoạt động',
          total: 200
        }
      ]
    });
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { listUser } = this.state;
    const { loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div className="grid-border" onClick={this.toggle}>
        <Loader message={spinner1} show={loading} priority={1}>
          {' '}
        </Loader>
        {/* day la trang camp*/}

        <div />
        {this.state.listCamp
          ? this.state.listCamp.map((event, index) => {
              var list;
              list = (
                <div className="grid-item">
                  <div className="camp-top">
                    <div className="camp-title"> Chiến dịch M2M thứ {index + 1}</div>
                    <div className="camp-status">{event.status}</div>
                  </div>

                  <div className="camp-bottom">
                    <div className="camp-bottom-left">
                      <div className="quantity">Số lượng : </div>
                      <div className="range-time">Thời gian : </div>
                    </div>
                    <div className="camp-bottom-right">
                      <div className="quantity-value">{event.total} </div>
                      <div className="time-value"> {event.time}</div>
                    </div>
                  </div>

                  <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                      <span>Chiến dịch M2M thứ {index + 1} </span> <span className="camp-modal-status">{event.status}</span>
                    </ModalHeader>
                    <ModalBody>
                      <div className="modal-grid">
                        <div className="modal-grid-child">
                          <span style={{ width: '15%' }}>Mô tả chiến dịch : </span>
                          <span style={{ width: 'auto', fontWeight: 500, marginLeft: '21px', color: 'black' }}>
                            Chiến dịch dành cho khách hàng chưa đăng ký dịch vụ
                          </span>
                        </div>
                        <div className="modal-info">
                          <div className="left-info">
                            <div className="modal-grid-child1">
                              <div className="modal-grid-child1-middle">
                                <div>Số lượng contact : </div>
                                <div>Thời gian : </div>
                              </div>
                              <div className="modal-grid-child1-bottom">
                                <div className="modal-grid-child1-bottom2">{event.total}</div>
                                <div className="modal-grid-child1-bottom3">{event.time}</div>
                              </div>
                            </div>
                          </div>
                          <div className="middle-info">
                            <div className="modal-grid-child1">
                              <div className="modal-grid-child1-middle">
                                <div>Landing Page : </div>
                                <div>Quà tặng : </div>
                              </div>
                              <div className="modal-grid-child1-bottom">
                                <div className="modal-grid-child1-bottom2">Landing Page 1</div>
                                <div className="modal-grid-child1-bottom3">E-voucher 1</div>
                              </div>
                            </div>
                          </div>
                          <div className="right-info">
                            <div className="modal-grid-child1">
                              <div className="modal-grid-child1-middle">
                                <div>Nội dung : </div>
                              </div>
                              <div className="modal-grid-child1-bottom">
                                <div className="modal-grid-child1-bottom2">Tương tác Email</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-grid-child2">
                          <div className="modal-searchBar">
                            <span className=" form-control-feedback" />
                            <input type="text" className="form-control" placeholder="Tìm kiếm" />
                          </div>
                        </div>

                        <div className="modal-table">
                          <Table responsive striped className="modal-tables">
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
                              </tr>
                            </thead>
                            {listUser
                              ? listUser.map((event, index) => {
                                  var users;
                                  users = (
                                    <tr key={index + 1}>
                                      <td>{index + 1}</td>
                                      <td>{event.name}</td>
                                      <td>{event.phone}</td>
                                      <td>{event.email}</td>
                                      <td>{event.profiles}</td>
                                    </tr>
                                  );
                                  return users;
                                })
                              : ''}
                            {/* <tbody>
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
              </tbody> */}
                          </Table>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>
                        Do Something
                      </Button>{' '}
                      <Button color="secondary" onClick={this.toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              );
              return list;
            })
          : ''}
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignItem);
