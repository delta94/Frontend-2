import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, CardHeader, Card, Container } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { DISPLAY_STATUS_ALL, DISPLAY_STATUS_PAUSE, DISPLAY_STATUS_ACTION, DISPLAY_STATUS_COMPLETE } from 'app/constants/common';
import './../list/campaign-management.scss';
import { getCampaignInfo, getCampaignInfoByStatus } from 'app/actions/user-campaign';
import AllCamp from './tab/allCamp/allCamp';
import ActionCamp from './tab/actionCamp/actionCamp';
import PauseCamp from './tab/pauseCamp/pauseCamp';
import CompleteCamp from './tab/completeCamp/completeCamp';

export interface ICreateCampaignProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface ICreateCampaignState {
  // display campaign info by id
  modal?: boolean;
  // display campaign list follow tab's number
  activeTab: string;
}

export class CreateCampaign extends React.Component<ICreateCampaignProps, ICreateCampaignState> {
  state: ICreateCampaignState = {
    modal: false,
    // display start with tab 1
    activeTab: '1'
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    console.log(this);
  }

  componentDidMount() {
    this.props.getCampaignInfo();
  }

  toggle(tab) {
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

  render() {
    const { match, loading, camps, totalElements } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <div id="campaign-management">
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
                            <Translate contentKey="campaign.allCamps" /> {''}
                            {totalElements}
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
                            {''}
                            {totalElements}
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
                            {''}
                            {totalElements}
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
                            {''}
                            {totalElements}
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </CardHeader>

                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <AllCamp />
                      </TabPane>
                      <TabPane tabId="2">
                        <ActionCamp />
                      </TabPane>
                      <TabPane tabId="3">
                        <PauseCamp />
                      </TabPane>
                      <TabPane tabId="4">
                        <CompleteCamp />
                      </TabPane>
                    </TabContent>
                  </Card>
                </Col>
              </Row>
            </Container>
          </ReactCSSTransitionGroup>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  camps: userCampaign.camps,
  loading: userCampaign.loading,
  totalElements: userCampaign.totalElements
});

const mapDispatchToProps = { getCampaignInfo, getCampaignInfoByStatus };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaign);
