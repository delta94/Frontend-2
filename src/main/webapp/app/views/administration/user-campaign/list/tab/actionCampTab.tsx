import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  CardHeader,
  CardFooter,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Badge
} from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { getCampaignInfo, getCampaignInfoByStatus } from 'app/actions/user-campaign';

import { DISPLAY_STATUS_ALL, DISPLAY_STATUS_PAUSE, DISPLAY_STATUS_ACTION, DISPLAY_STATUS_COMPLETE } from 'app/constants/common';

export interface IActionCampTabProps extends StateProps, DispatchProps {}
// extends StateProps, DispatchProps
export interface IActionCampTabState {
  //   listUser: any[];
  loading: boolean;
  modal: boolean;
  activeTab: string;
  showMore: boolean;
  transform: boolean;
  showInkBar: boolean;
  // items:{};
  selectedTabKey: 0;
  transformWidth: 400;
}
class ActionCampTab extends React.Component<IActionCampTabProps, IActionCampTabState> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      loading: false,
      modal: false,
      activeTab: '1',
      showMore: true,
      transform: true,
      showInkBar: true,
      // items: this.getSimpleTabs(),
      selectedTabKey: 0,
      transformWidth: 400
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { loading, camps } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <div className="grid-container-total">
        <Fragment>
          <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              <span> </span> <span className="camp-modal-status">{}</span>
            </ModalHeader>
            <ModalBody>
              <div className="modal-grid">
                <div className="modal-grid-child">
                  <span style={{ width: '15%' }}>
                    <Translate contentKey="campaign.description" />
                  </span>
                  <span style={{ width: 'auto', fontWeight: 500, marginLeft: '21px', color: 'black' }} />
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
                        <div className="modal-grid-child1-bottom2" />
                        <div className="modal-grid-child1-bottom3" />
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
                        <div className="modal-grid-child1-bottom2" />
                        <div className="modal-grid-child1-bottom3" />
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
                        <div className="modal-grid-child1-bottom2" />
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
          <div className="grid-border">
            {/* <Loader message={spinner1} show={loading} priority={1}>
            {' '}
          </Loader> */}
            {/* day la trang camp*/}

            {camps &&
              camps.map((item, index) => {
                var list;
                list = (
                  <div
                    className="grid-item"
                    onClick={() => {
                      this.toggle(item.id);
                    }}
                  >
                    <div className="camp-top">
                      <div className="camp-title"> {item.name}</div>
                      <div className="camp-status">
                        {item.status && item.status == 0 ? (
                          <Translate contentKey="campaign.status.pause" />
                        ) : item.status && item.status == 1 ? (
                          <Translate contentKey="campaign.status.action" />
                        ) : (
                          <Translate contentKey="campaign.status.complete" />
                        )}
                      </div>
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
                        <div className="quantity-value">{item.contactNumber} contacts </div>
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
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  camps: userCampaign.camps,
  loading: userCampaign.loading
});

const mapDispatchToProps = { getCampaignInfo, getCampaignInfoByStatus };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionCampTab);
