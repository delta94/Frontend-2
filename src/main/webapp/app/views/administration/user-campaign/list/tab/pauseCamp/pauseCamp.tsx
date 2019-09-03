import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';

import { getCampaignInfo, getCampaignInfoByStatus, getCampaignInfoById } from 'app/actions/user-campaign';
import './../../tab/pauseCamp/pauseCamp.scss';

export interface IPauseCampProps extends StateProps, DispatchProps {}
// extends StateProps, DispatchProps
export interface IPauseCampState {
  loading: boolean;
  modal: boolean;
}
class PauseCamp extends React.Component<IPauseCampProps, IPauseCampState> {
  constructor(props) {
    super(props);
    this.onShow = this.onShow.bind(this);

    this.state = {
      loading: false,
      modal: false
    };
  }
  onShow(id) {
    this.setState({
      modal: !this.state.modal
    });
    this.props.getCampaignInfoById(id);
  }

  render() {
    const { loading, camps, camp } = this.props;
    const closeBtn = (
      <button className="close" onClick={this.onShow}>
        &times;
      </button>
    );
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <div className="grid-container-total">
        <Loader message={spinner1} show={loading} priority={1}>
          <Fragment>
            <Modal isOpen={this.state.modal} fade={false}>
              <ModalHeader onClick={this.onShow} close={closeBtn}>
                <Translate contentKey="campaign.modal.title" />
                <span className="camp-status" style={{ float: 'right', color: '#97A3B4' }}>
                  {' '}
                  <FontAwesomeIcon icon={faCircle} /> <Translate contentKey="campaign.status.pause" />
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="modal-grid">
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
              <ModalFooter />
            </Modal>

            {/* Body Content */}
            <div className="grid-border">
              {/* day la trang camp*/}

              {camps &&
                camps.map((item, index) => {
                  var list;
                  list = (
                    <div
                      className="grid-item"
                      onClick={() => {
                        this.onShow(item.id);
                      }}
                    >
                      <div className="camp-top">
                        <div className="camp-title"> {item.name}</div>
                        <div className="camp-status" style={{ color: '#97A3B4' }}>
                          <FontAwesomeIcon icon={faCircle} /> <Translate contentKey="campaign.status.pause" />
                        </div>
                      </div>

                      <div className="camp-bottom">
                        <div className="camp-bottom-left">
                          <div className="quantity">
                            {' '}
                            <FontAwesomeIcon icon={faUser} /> <Translate contentKey="campaign.quantity" />{' '}
                          </div>
                          <div className="range-time">
                            <FontAwesomeIcon icon={faClock} /> <Translate contentKey="campaign.time" />
                          </div>
                        </div>
                        <div className="camp-bottom-right">
                          <div className="quantity-value">
                            {item.contactNumber} <Translate contentKey="campaign.title-contact" />{' '}
                          </div>
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
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  camps: userCampaign.camps,
  camp: userCampaign.camp,
  loading: userCampaign.loading
});

const mapDispatchToProps = { getCampaignInfo, getCampaignInfoByStatus, getCampaignInfoById };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PauseCamp);
