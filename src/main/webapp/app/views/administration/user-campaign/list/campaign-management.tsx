import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DISPLAY_STATUS_ALL, DISPLAY_STATUS_PAUSE, DISPLAY_STATUS_ACTION, DISPLAY_STATUS_COMPLETE } from 'app/constants/common';

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
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './../list/campaign-management.scss';
import { getCampaignInfo, getCampaignInfoByStatus } from 'app/actions/user-campaign';
import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import AllCampTab from './../list/tab/allCampTab';
import ActionCampTab from './../list/tab/actionCampTab';
import PauseCampTab from './../list/tab/pauseCampTab';
import CompleteCampTab from './../list/tab/completeCampTab';

import classnames from 'classnames';

import { faClock } from '@fortawesome/free-solid-svg-icons';

export interface ICreateCampaignProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface ICreateCampaignState {
  modal?: boolean;
  status: any;
  activeTab: string;
  showMore: boolean;
  transform: boolean;
  showInkBar: boolean;
  // items:{};
  selectedTabKey: 0;
  transformWidth: 400;
}

export class CreateCampaign extends React.Component<ICreateCampaignProps, ICreateCampaignState> {
  state: ICreateCampaignState = {
    modal: false,
    status: '',
    activeTab: '1',
    showMore: true,
    transform: true,
    showInkBar: true,
    // items: this.getSimpleTabs(),
    selectedTabKey: 0,
    transformWidth: 400
  };
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.getCampaignInfo();
  }

  toggle(tab) {
    console.log(typeof tab);
    if (tab === '1') {
      this.props.getCampaignInfoByStatus(DISPLAY_STATUS_ALL);
    } else if (tab === '2') {
      this.props.getCampaignInfoByStatus(DISPLAY_STATUS_ACTION);
    } else if (tab === '3') {
      this.props.getCampaignInfoByStatus(DISPLAY_STATUS_PAUSE);
    } else {
      this.props.getCampaignInfoByStatus(DISPLAY_STATUS_COMPLETE);
    }

    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  // toggle(id?) {
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }));
  //   // this.props.getCampaignInfoById(id);
  // }

  render() {
    const { match, loading, camps } = this.props;
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
          <Fragment>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              // transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <Container fluid>
                <Row>
                  <Col md="12">
                    <Card tabs="true" className="mb-3">
                      <CardHeader>
                        <Nav justified>
                          <NavItem>
                            <NavLink
                              href="javascript:void(0);"
                              className={classnames({ active: this.state.activeTab === '1' })}
                              onClick={() => {
                                this.toggle('1');
                              }}
                            >
                              <Translate contentKey="campaign.allCamps" />
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              href="javascript:void(0);"
                              className={classnames({ active: this.state.activeTab === '2' })}
                              onClick={() => {
                                this.toggle('2');
                              }}
                            >
                              <Translate contentKey="campaign.onAction" />
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              href="javascript:void(0);"
                              className={classnames({ active: this.state.activeTab === '3' })}
                              onClick={() => {
                                this.toggle('3');
                              }}
                            >
                              <Translate contentKey="campaign.onPause" />
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              href="javascript:void(0);"
                              className={classnames({ active: this.state.activeTab === '4' })}
                              onClick={() => {
                                this.toggle('4');
                              }}
                            >
                              <Translate contentKey="campaign.complete" />
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </CardHeader>

                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <AllCampTab />
                        </TabPane>
                        <TabPane tabId="2">
                          <ActionCampTab />
                        </TabPane>
                        <TabPane tabId="3">
                          <PauseCampTab />
                        </TabPane>
                        <TabPane tabId="4">
                          <CompleteCampTab />
                        </TabPane>
                      </TabContent>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </ReactCSSTransitionGroup>
          </Fragment>
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
            </Fragment>
          </div>
        </Loader>
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
)(CreateCampaign);
