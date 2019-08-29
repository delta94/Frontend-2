import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './../user-campaign/style/campaign.scss';
import { getCampaignInfo } from 'app/actions/user-management';
import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { IRootState } from 'app/reducers';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export interface ICreateCampaignProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface ICreateCampaignState {
  modal?: boolean;
}

export class CreateCampaign extends React.Component<ICreateCampaignProps, ICreateCampaignState> {
  state: ICreateCampaignState = {
    modal: false
  };
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.setState({
      modal: false
    });
    this.props.getCampaignInfo();
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { match, pageCount, loading, camps } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div>
        <Loader message={spinner1} show={loading} priority={1}>
          {/* day la trang quan ly user */}
          <h3 id="user-management-page-heading">
            <Translate contentKey="campaign.title" />
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
              <FontAwesomeIcon icon="plus" /> <Translate contentKey="campaign.createCamp" />
            </Link>
          </h3>
          <div />
          <div className="search-nav">
            <Row>
              <Col md="3">
                <a className="totalCamp">
                  <Translate contentKey="campaign.allCamps" />
                </a>
              </Col>
              <Col md="3">
                <a className="totalCamp">
                  <Translate contentKey="campaign.onAction" />
                </a>
              </Col>
              <Col md="3">
                <a className="totalCamp">
                  <Translate contentKey="campaign.onPause" />
                </a>
              </Col>
              <Col md="3">
                <a className="totalCamp">
                  <Translate contentKey="campaign.complete" />
                </a>
              </Col>
            </Row>
          </div>
          <div className="grid-container-total">
            <Fragment>
              <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                  <span>Chiến dịch M2M thứ {1} </span> <span className="camp-modal-status">{}</span>
                </ModalHeader>
                <ModalBody>
                  <div className="modal-grid">
                    <div className="modal-grid-child">
                      <span style={{ width: '15%' }}>
                        <Translate contentKey="campaign.description" />
                      </span>
                      <span style={{ width: 'auto', fontWeight: 500, marginLeft: '21px', color: 'black' }}>
                        Chiến dịch dành cho khách hàng chưa đăng ký dịch vụ
                      </span>
                    </div>
                    <div className="modal-info">
                      <div className="left-info">
                        <div className="modal-grid-child1">
                          <div className="modal-grid-child1-middle">
                            <div>
                              <Translate contentKey="campaign.contact" />
                            </div>
                            <div>
                              <Translate contentKey="campaign.time" />
                            </div>
                          </div>
                          <div className="modal-grid-child1-bottom">
                            <div className="modal-grid-child1-bottom2">{}</div>
                            <div className="modal-grid-child1-bottom3">{}</div>
                          </div>
                        </div>
                      </div>
                      <div className="middle-info">
                        <div className="modal-grid-child1">
                          <div className="modal-grid-child1-middle">
                            <div>
                              <Translate contentKey="campaign.ladi" />{' '}
                            </div>
                            <div>
                              <Translate contentKey="campaign.gift" />
                            </div>
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
                            <div>
                              <Translate contentKey="campaign.content" />{' '}
                            </div>
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

              {/* Body Content */}
              <div className="grid-border" onClick={this.toggle}>
                {/* <Loader message={spinner1} show={loading} priority={1}>
            {' '}
          </Loader> */}
                {/* day la trang camp*/}

                {camps &&
                  camps.map((item, index) => {
                    var list;

                    list = (
                      <div className="grid-item">
                        <div className="camp-top">
                          <div className="camp-title"> {item.name}</div>
                          <div className="camp-status">{item.status}</div>
                        </div>

                        <div className="camp-bottom">
                          <div className="camp-bottom-left">
                            <div className="quantity">
                              {' '}
                              <Translate contentKey="campaign.quantity" />{' '}
                            </div>
                            <div className="range-time">
                              <Translate contentKey="campaign.time" />{' '}
                            </div>
                          </div>
                          <div className="camp-bottom-right">
                            <div className="quantity-value">{item.contactNumber} </div>
                            <div className="time-value">
                              {' '}
                              {item.fromDate}/{item.toDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                    return list;
                  })}
                <div />
              </div>
            </Fragment>
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  camps: storeState.userManagement.camps,
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
});

const mapDispatchToProps = { getCampaignInfo };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaign);
