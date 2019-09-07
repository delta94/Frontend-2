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
import { getCampaignInfoByStatus, getCampaignInfoById, getCampaignDetailById, updateCampStatus } from 'app/actions/user-campaign';
import './../all-camp/all-camp.scss';
import ModalDisplay from './modal/modal';
import { ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { ITEMS_PER_MODAL_TABLE } from 'app/constants/common';

export interface IAllCampProps extends StateProps, DispatchProps {
  history: Object;
}
export interface IAllCampState {
  // loading page
  loading: boolean;
  modal: boolean;

  textSearch: string;
  categories: string;
  activePage: number;
  itemsPerPage: number;
  id: string;
  displayPause: string;
}
class AllCamp extends React.Component<IAllCampProps, IAllCampState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      modal: false,
      displayPause: '',
      activePage: ACTIVE_PAGE,
      itemsPerPage: ITEMS_PER_MODAL_TABLE,
      textSearch: '',
      categories: '',
      id: ''
    };
  }
  //handler close modal
  handerModal = event => {
    this.setState({
      modal: event
    });
  };
  onShow = async id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    await this.props.getCampaignInfoById(id);
    const { camp } = this.props;

    if (camp.status === 1) {
      this.setState({
        displayPause: 'ios-square'
      });
    } else if (camp.status === 0) {
      this.setState({
        displayPause: 'ios-play'
      });
    } else {
      this.setState({
        displayPause: ''
      });
    }

    console.log(this.state.displayPause);
    // this.props.getCampaignDetailById(id);
    const { activePage, itemsPerPage, textSearch } = this.state;
    this.props.getCampaignDetailById(id, activePage, itemsPerPage, textSearch);
  };

  render() {
    const { loading, camps } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div className="grid-container-total">
        <ModalDisplay
          isOpen={this.state.modal}
          id={this.state.id}
          showIcon={this.state.displayPause}
          onClick={this.handerModal}
          history={this.props.history}
        />
        <Loader message={spinner1} show={loading} priority={5}>
          <Fragment>
            <div className="grid-border">
              {/* day la trang camp*/}
              {camps &&
                camps.map((item, index) => {
                  var list;
                  list = (
                    <div>
                      <div
                        className="grid-item"
                        onClick={() => {
                          this.onShow(item.id);
                        }}
                      >
                        <div className="camp-top">
                          <div className="camp-title"> {item.name}</div>
                          <div className="camp-status">
                            {item.status && item.status === 2 ? (
                              <span style={{ color: '#02B3FF' }}>
                                {' '}
                                <FontAwesomeIcon icon={faCircle} /> <Translate contentKey="campaign.status.complete" />
                              </span>
                            ) : item.status && item.status == 1 ? (
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
                          </div>
                        </div>

                        <div className="camp-bottom">
                          <div className="camp-bottom-left">
                            <div className="quantity">
                              {' '}
                              <FontAwesomeIcon icon={faUser} /> <Translate contentKey="campaign.quantity" />
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
                              {item.fromDate} - {item.toDate}
                            </div>
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

const mapDispatchToProps = { getCampaignInfoByStatus, getCampaignInfoById, getCampaignDetailById, updateCampStatus };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCamp);
