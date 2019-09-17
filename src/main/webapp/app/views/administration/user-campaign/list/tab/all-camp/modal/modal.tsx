import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClock, faUser, faSearch, faKaaba } from '@fortawesome/free-solid-svg-icons';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { getCampaignInfoByStatus, getCampaignInfoById, getCampaignDetailById, updateCampStatus } from 'app/actions/user-campaign';
import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { ITEMS_PER_MODAL_TABLE } from 'app/constants/common';
import { Route, RouteComponentProps, Router } from 'react-router-dom';
import Ionicon from 'react-ionicons';
import SweetAlert from 'sweetalert-react';
import { Button } from 'app/DemoPages/Components/GuidedTours/Examples/Button';

export const KEY_ENTER = 'Enter';

export interface IModalDisplayProps extends StateProps, DispatchProps {
  // properties from parent class
  isOpen: boolean;
  onClick: Function;
  id: string;
  showIcon: string;
  history: Object;
  value: any;
}
export interface IModalDisplayState {
  // loading page
  loading: boolean;
  //display modal
  modal: boolean;
  textSearch: string;
  categories: string;
  activePage: number;
  itemsPerPage: number;

  displayIcon: string;

  //handler show alert complete or error
  isUpdate: boolean;
  isConfirm: boolean;
}
class ModalDisplay extends React.Component<IModalDisplayProps, IModalDisplayState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modal: false,
      activePage: ACTIVE_PAGE,
      itemsPerPage: ITEMS_PER_MODAL_TABLE,
      textSearch: '',
      categories: '',
      displayIcon: '',
      isUpdate: false,
      isConfirm: false
    };
  }
  // search customer on modal
  search = event => {
    if (event.key === KEY_ENTER) {
      const textSearch = event.target.value;
      const { itemsPerPage } = this.state;
      this.setState({
        ...this.state,
        textSearch,
        activePage: 0
      });
      this.props.getCampaignDetailById(this.props.id, 0, itemsPerPage, textSearch);
    }
  };

  //  handle paging
  handlePagination = activePage => {
    const { itemsPerPage, textSearch } = this.state;
    this.setState({
      ...this.state,
      activePage: activePage.selected
    });
    this.props.getCampaignDetailById(this.props.id, activePage.selected, itemsPerPage, textSearch);
  };
  // Change status 1->0  0->1
  updateStatus = camp => {
    let data;
    if (camp.status === 1) {
      data = {
        id: camp.id,
        status: 0
      };
      this.setState({
        displayIcon: 'ios-play'
      });
    } else if (camp.status === 0) {
      data = {
        id: camp.id,
        status: 1
      };
      this.setState({
        displayIcon: 'ios-square'
      });
    } else {
      data = {
        id: camp.id,
        status: data.status
      };
    }

    this.props.updateCampStatus(data, this.props.value);
    if (this.props.showAlert === true) {
      this.setState({
        isConfirm: this.props.showAlert
      });
    }

    this.props.onClick(false, this.state.isConfirm);
  };

  render() {
    const { loading, camp, campDetail, isOpen, showAlert } = this.props;
    const { activePage, isConfirm } = this.state;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <Modal isOpen={isOpen} fade={false}>
        <ModalHeader>
          <span>
            <Translate contentKey="campaign.modal.title" />
          </span>

          <button className="close" onClick={() => this.props.onClick(this.state.isUpdate)}>
            &times;
          </button>
        </ModalHeader>

        <ModalBody>
          <div className="modal-grid">
            <Loader message={spinner1} show={loading} priority={2}>
              <Row className="modal-name">
                <Col md="7">
                  <span className="modal-campaign-name">{camp.name}</span>
                </Col>
                <Col md="2">
                  <span className="modal-icon" style={{ float: 'right' }}>
                    <Ionicon
                      icon={this.props.showIcon}
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          isUpdate: true
                        });
                      }}
                      color="#3866DD"
                      fontSize="2rem"
                      beat={true}
                    />
                    <SweetAlert
                      className="sweet-alert"
                      title="Cập nhật trạng thái ?"
                      cancelButtonText="Không"
                      confirmButtonText="Có"
                      confirmButtonColor=""
                      // text="Mục đã xoá sẽ không thể khôi phục !"
                      show={this.state.isUpdate}
                      showCancelButton
                      onCancel={() => {
                        this.setState({
                          isUpdate: false
                        });
                      }}
                      onConfirm={() => {
                        this.updateStatus(camp);
                        this.setState({
                          isUpdate: false,
                          isConfirm: showAlert
                        });
                      }}
                    />
                  </span>
                </Col>
                <Col md="3">
                  <span className="camp-status" style={{ float: 'left' }}>
                    {camp.status && camp.status === 2 ? (
                      <span style={{ color: '#02B3FF' }}>
                        {' '}
                        <FontAwesomeIcon icon={faCircle} /> <Translate contentKey="campaign.status.complete" />
                      </span>
                    ) : camp.status && camp.status == 1 ? (
                      <span style={{ color: '#23C00A' }}>
                        {' '}
                        <FontAwesomeIcon icon={faCircle} /> <Translate contentKey="campaign.status.action" />
                      </span>
                    ) : (
                      <span style={{ color: '#97A3B4' }}>
                        {' '}
                        <FontAwesomeIcon icon={faCircle} /> <Translate contentKey="campaign.status.pause" />
                      </span>
                    )}
                  </span>
                </Col>
              </Row>

              <div className="modal-grid-child">
                <span style={{ width: '15%' }}>
                  <Translate contentKey="campaign.description" />
                </span>
                <span style={{ width: 'auto', fontWeight: 500, marginLeft: '21px', color: 'black' }}>{camp && camp.description}</span>
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
                      <div className="modal-grid-child1-bottom2">{camp && camp.contactNumber}</div>
                      <div className="modal-grid-child1-bottom3">
                        {camp && camp.fromDate}-{camp && camp.toDate}
                      </div>
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
                      <div className="modal-grid-child1-bottom2">{camp && camp.landingPageName}</div>
                      <div className="modal-grid-child1-bottom3">{camp && camp.rewardName}</div>
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
                      <div className="modal-grid-child1-bottom2">{camp && camp.channelName}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Loader>
            <div className="modal-grid-child2">
              <div className="modal-searchBar">
                <span className=" form-control-feedback" />
                <input type="text" className="form-control" placeholder="Tìm kiếm" onKeyDown={this.search} />
              </div>
            </div>
            <Loader message={spinner1} show={loading} priority={10}>
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
                  <tbody>
                    {campDetail &&
                      campDetail.map((item, index) => {
                        var listCustomer;
                        listCustomer = (
                          <tr>
                            <td>{this.state.activePage * this.state.itemsPerPage + index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>
                              {item.categories &&
                                item.categories.split(',').map((category, index) => {
                                  return (
                                    <span className="badge badge-success" key={index}>
                                      {' '}
                                      {category}
                                    </span>
                                  );
                                })}
                            </td>
                          </tr>
                        );
                        return listCustomer;
                      })}
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
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  camps: userCampaign.camps,
  camp: userCampaign.camp,
  loading: userCampaign.loading,
  campDetail: userCampaign.campDetail,
  totalElements: userCampaign.totalElements,
  pageCount: Math.ceil(userCampaign.totalElements / ITEMS_PER_MODAL_TABLE),
  showAlert: userCampaign.showUpdateSuccessAlert
});

const mapDispatchToProps = { getCampaignInfoByStatus, getCampaignInfoById, getCampaignDetailById, updateCampStatus };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisplay);
