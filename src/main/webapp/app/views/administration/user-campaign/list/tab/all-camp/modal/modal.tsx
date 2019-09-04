import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { getCampaignInfo, getCampaignInfoByStatus, getCampaignInfoById } from 'app/actions/user-campaign';

export interface IModalDisplayProps extends StateProps, DispatchProps {
  isOpen: boolean;
  onClick: Function;
}
export interface IModalDisplayState {
  // loading page
  loading: boolean;
  modal: boolean;
}
class ModalDisplay extends React.Component<IModalDisplayProps, IModalDisplayState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modal: false
    };
  }

  render() {
    const { loading, camps, camp, campDetail } = this.props;
    const { isOpen } = this.props;

    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <Loader message={spinner1} show={loading} priority={2}>
        <Modal isOpen={isOpen} fade={false}>
          <ModalHeader>
            <span>
              <Translate contentKey="campaign.modal.title" />{' '}
            </span>{' '}
            <button className="close" onClick={() => this.props.onClick(false)}>
              &times;
            </button>
            <span className="camp-status" style={{ float: 'right' }}>
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
                  <tbody>
                    {campDetail &&
                      campDetail.map((item, index) => {
                        var listCustomer;
                        listCustomer = (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.categories}</td>
                          </tr>
                        );
                        return listCustomer;
                      })}
                  </tbody>
                </Table>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Loader>
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  camps: userCampaign.camps,
  camp: userCampaign.camp,
  loading: userCampaign.loading,
  campDetail: userCampaign.campDetail
});

const mapDispatchToProps = { getCampaignInfo, getCampaignInfoByStatus, getCampaignInfoById };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDisplay);
