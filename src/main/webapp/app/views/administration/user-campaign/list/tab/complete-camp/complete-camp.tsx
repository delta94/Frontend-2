import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';

import { getCampaignInfo, getCampaignInfoByStatus, getCampaignInfoById } from 'app/actions/user-campaign';
import './../complete-camp/complete-camp.scss';
import ModalDisplay from './../modal';

export interface ICompleteCampProps extends StateProps, DispatchProps {}
// extends StateProps, DispatchProps
export interface ICompleteCampState {
  loading: boolean;
  modal: boolean;
}
class CompleteCamp extends React.Component<ICompleteCampProps, ICompleteCampState> {
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
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <div className="grid-container-total">
        <Loader message={spinner1} show={loading} priority={1}>
          <Fragment>
            <Modal isOpen={this.state.modal} fade={false}>
              <ModalDisplay onClick={this.onShow} />
            </Modal>
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
                        <div className="camp-status" style={{ color: '#02B3FF' }}>
                          <FontAwesomeIcon icon={faCircle} /> <Translate contentKey="campaign.status.complete" />
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
  loading: userCampaign.loading,
  camp: userCampaign.camp
});

const mapDispatchToProps = { getCampaignInfo, getCampaignInfoByStatus, getCampaignInfoById };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteCamp);
