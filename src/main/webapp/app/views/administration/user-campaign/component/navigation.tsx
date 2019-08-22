import React, { Fragment, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Sticky from 'react-stickynode';

import cx from 'classnames';
import Hamburger from 'react-hamburgers';

import {
  TabContent,
  TabPane,
  DropdownItem,
  CardBody,
  Collapse,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Card,
  Col,
  Row,
  CardHeader,
  CardTitle,
  Button
} from 'reactstrap';

import classnames from 'classnames';
export interface IFaqSectionProps {}

export interface IFaqSectionState {
  activeTab: string;
  active: boolean;
  collapse: boolean;
  accordion: boolean[];
  custom: boolean[];
  status: string;
  fadeIn: boolean;
  timeout: any;
}
export default class FaqSection extends Component<IFaqSectionProps, IFaqSectionState> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      active: false,
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300
    };
  }

  // toggle() {
  //     this.setState({collapse: !this.state.collapse});
  // }

  toggleAccordion = tab => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  };

  toggle = tab => {
    this.setState({ collapse: !this.state.collapse });
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
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
          <div>
            <Card className="app-inner-layout__sidebar ">
              <div className="p-3">
                <div className="dropdown-menu p-0 dropdown-menu-inline dropdown-menu-rounded dropdown-menu-hover-primary">
                  <DropdownItem
                    className={classnames('mb-1', { active: this.state.activeTab === '1' })}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    Tab Example 1
                  </DropdownItem>
                  <DropdownItem
                    className={classnames('mb-1', { active: this.state.activeTab === '2' })}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    Tab Example 2
                  </DropdownItem>
                  <DropdownItem
                    className={classnames('mb-1', { active: this.state.activeTab === '3' })}
                    onClick={() => {
                      this.toggle('3');
                    }}
                  >
                    Tab Example 3
                  </DropdownItem>
                  <DropdownItem
                    className={classnames('mb-1', { active: this.state.activeTab === '4' })}
                    onClick={() => {
                      this.toggle('4');
                    }}
                  >
                    Tab Example 3
                  </DropdownItem>
                  <DropdownItem
                    className={classnames('mb-1', { active: this.state.activeTab === '5' })}
                    onClick={() => {
                      this.toggle('5');
                    }}
                  >
                    Tab Example 3
                  </DropdownItem>
                </div>
              </div>
            </Card>
            <Card className="col-md-9 app-inner-layout__content">
              <div className="pb-5 pl-5 pr-5 pt-3">
                <div className="mobile-app-menu-btn mb-3">
                  <Hamburger active={this.state.active} type="elastic" onClick={() => this.setState({ active: !this.state.active })} />
                </div>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <CardTitle>CHỌN TIỆP KHÁCH HÀNG</CardTitle>
                    <Row>
                      <Col md="3">
                        <div className="grid-items-Click">
                          <div className="camp-top">
                            <label className="camp-title-click"> M2M kịch bản 1</label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="mt-5" />
                    <div className="clearfix">
                      <div className="text-center">
                        <Button
                          color="primary"
                          size="lg"
                          className="btn-pill btn-wide btn-shadow"
                          onClick={() => {
                            this.toggle('2');
                          }}
                        >
                          <b>Tiếp Tục</b>
                        </Button>
                      </div>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </Card>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
