import React, { Fragment, Component, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import cx from 'classnames';
import Hamburger from 'react-hamburgers';
import '../navigation/navigation.scss';
import SelectCustomer from './select-customer/select-customer';
import SelectReward from './select-reward/select-reward';
import CreateLandingPage from './create-landingpage/create-landingpage';
import CreateContent from './create-content/create-content';
import Review from './review/review';
import { TabContent, TabPane, DropdownItem, Card, Col, Row, Button } from 'reactstrap';
import classnames from 'classnames';
import { getContentPageParams } from 'app/actions/user-campaign';

export interface INavigationProps extends StateProps, DispatchProps {
  onClick: Function;
  valueListInfo: {};
}

export interface INavigationState {
  listCustomerGroup: any[];
  activeTab: number;
  active: boolean;
  endTab: boolean;
}
export class Navigation extends Component<INavigationProps, INavigationState> {
  constructor(props) {
    super(props);
    this.state = {
      listCustomerGroup: [],
      activeTab: 0,
      active: false,
      endTab: false
    };
  }

  toggle = tab => {
    this.props.onClick(tab);
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  componentDidMount() {
    let activeTab: number = this.state.activeTab;
    if (activeTab === 5) {
      this.setState({ endTab: true });
    }
  }

  onHandletTab = (param: number) => {
    let activeTab: number = this.state.activeTab;
    let activeTabNumber: number = activeTab;
    activeTabNumber += param;

    if (activeTabNumber === 6) {
      this.setState({ activeTab: 5, endTab: true });
    } else if (activeTabNumber === 0) {
      this.setState({ activeTab: 1 });
    } else {
      this.setState({ activeTab: activeTabNumber });
    }
  };

  //function get value Customer group
  onClick = list => {
    this.setState({});
    this.state.listCustomerGroup.push(list);
  };
  //function get value Reward
  handlerValueReward = list => {};

  render() {
    const { endTab } = this.state;
    const { listStep } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          className={cx('app-inner-layout chat-layout', {
            'open-mobile-menu': this.state.active
          })}
          component="div"
          transitionName="TabsAnimation"
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Card className="col-md-3 app-inner-layout__sidebar b-r">
            <div className="p-3">
              <div className="dropdown-menu p-0 dropdown-menu-inline dropdown-menu-rounded dropdown-menu-hover-primary">
                {listStep.map(event => {
                  var elements = (
                    <DropdownItem
                      toggle={false}
                      className={classnames('mb-1', { active: this.state.activeTab === parseInt(event.step) })}
                      onClick={() => {
                        this.toggle(event.step);
                      }}
                    >
                      <div id="circle">
                        <label className="step-icon"> {event.step}</label>
                      </div>
                      <label className="descrition-item"> {event.description}</label>
                    </DropdownItem>
                  );
                  return elements;
                })}
              </div>
            </div>
          </Card>

          <Card className="col-md-9 app-inner-layout__content">
            <Row className="row-content-info">
              <div className="mobile-app-menu-btn mb-3">
                <Hamburger active={this.state.active} type="elastic" onClick={() => this.setState({ active: !this.state.active })} />
              </div>
              {/* Tab Content */}
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={1}>
                  <SelectCustomer onClick={this.onClick} />
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                {/* task 2  */}
                <TabPane tabId={2}>
                  <SelectReward onClick={this.handlerValueReward} />
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                {/* task 3 */}
                <TabPane tabId={3}>
                  <CreateLandingPage />
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                {/* task 4  */}
                <TabPane tabId={4}>
                  <div className="add-content">
                    <CreateContent />
                  </div>
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                <TabPane tabId={5}>
                  <Review />
                </TabPane>
              </TabContent>
            </Row>
            <Row className="b-t">
              <Col xs="8" sm="6" md="6">
                <Button
                  style={{ color: '#3866DD', backgroundColor: 'white', borderColor: '#ffffff' }}
                  onClick={() => {
                    this.onHandletTab(-1);
                  }}
                >
                  Quay lại
                </Button>
              </Col>
              <Col xs="8" sm="6" md="6">
                <Button
                  color="primary"
                  onClick={() => {
                    this.onHandletTab(1);
                  }}
                >
                  {endTab ? 'Tạo chiến dịch' : 'Tiếp tục'}
                </Button>
              </Col>
            </Row>
          </Card>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ userCampaign }: IRootState) => ({
  loading: userCampaign.loading,
  listStep: userCampaign.listStepCampaign,
  listContentParams: userCampaign.listCampainContentParams
});

const mapDispatchToProps = { getContentPageParams };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
