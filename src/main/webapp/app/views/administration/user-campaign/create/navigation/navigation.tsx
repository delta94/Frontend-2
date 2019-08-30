import React, { Fragment, Component, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import cx from 'classnames';
import Hamburger from 'react-hamburgers';
import '../navigation/navigation.scss';
import SelectCustomer from './select-customer/select-customer';
import SelectReward from './select-reward/select-reward';
import CreateLandingPage from './create-landingpage/create-landingpage';
import CreateContent from './create-content/create-content';
import Review from './review/review';
import { TabContent, TabPane, DropdownItem, Card, Col, Row, Button } from 'reactstrap';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';

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
  modal: boolean;
  listUser: any[];
  displayVoucher: string;
  nameBtn: string;
  shareholders: any[];
  gift: Object;
  testMail: string;
  endTab: boolean;
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
      timeout: 300,
      modal: false,
      listUser: [
        {
          name: 'tuan',
          phone: '0383187960',
          email: 'trancongtuan525@gmail.com',
          group: 'giám đốc'
        },
        {
          name: 'hung',
          phone: '1234567890',
          email: 'hungdv@gmail.com',
          group: ' tổng giám đốc'
        }
      ],
      displayVoucher: 'display-voucher',
      nameBtn: '',
      shareholders: [
        {
          name: ''
        }
      ],
      gift: {},
      testMail: '',
      endTab: false
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  onClick = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  _onClickBtn = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: '' }])
    });
  };
  handlerSaveForm = () => {
    this.setState({
      modal: false
    });
  };
  onClickVoucher = () => {
    this.setState({
      displayVoucher: ''
    });
  };
  onClickNoVoucher = () => {
    this.setState({
      displayVoucher: 'display-voucher'
    });
  };

  onHandletTab = (param: number) => {
    let activeTab: string = this.state.activeTab;
    let activeTabNumber: number = parseInt(activeTab);
    activeTabNumber += param;

    console.log(activeTabNumber);
    if (activeTabNumber === 6) {
      this.setState({ activeTab: '5', endTab: true });
    } else if (activeTabNumber === 0) {
      this.setState({ activeTab: '1' });
    } else {
      this.setState({ activeTab: activeTabNumber.toString() });
    }
  };

  render() {
    const { endTab } = this.state;

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
                <DropdownItem
                  toggle={false}
                  className={classnames('mb-1', { active: this.state.activeTab === '1' })}
                  onClick={() => {
                    this.toggle('1');
                  }}
                >
                  Chọn tập khách hàng
                </DropdownItem>
                <DropdownItem
                  toggle={false}
                  className={classnames('mb-1', { active: this.state.activeTab === '2' })}
                  onClick={() => {
                    this.toggle('2');
                  }}
                >
                  Chọn quà tặng
                </DropdownItem>
                <DropdownItem
                  toggle={false}
                  className={classnames('mb-1', { active: this.state.activeTab === '3' })}
                  onClick={() => {
                    this.toggle('3');
                  }}
                >
                  Tạo landingpage
                </DropdownItem>
                <DropdownItem
                  toggle={false}
                  className={classnames('mb-1', { active: this.state.activeTab === '4' })}
                  onClick={() => {
                    this.toggle('4');
                  }}
                >
                  Tạo nội dung
                </DropdownItem>
                <DropdownItem
                  toggle={false}
                  className={classnames('mb-1', { active: this.state.activeTab === '5' })}
                  onClick={() => {
                    this.toggle('5');
                  }}
                >
                  Tổng quan
                </DropdownItem>
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
                <TabPane tabId="1">
                  <SelectCustomer />
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                {/* task 2  */}
                <TabPane tabId="2">
                  <SelectReward />
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                {/* task 3 */}
                <TabPane tabId="3">
                  <CreateLandingPage />
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                {/* task 4  */}
                <TabPane tabId="4">
                  <div className="add-content">
                    <CreateContent />
                  </div>
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                <TabPane tabId="5">
                  <Review />
                </TabPane>
              </TabContent>
            </Row>
            <Row className="b-t">
              <Col xs="8" sm="6" md="6">
                <Button
                  style={{ color: '#353ed1', backgroundColor: 'white', borderColor: '#ffffff' }}
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
                  style={{ float: 'right', backgroundColor: endTab ? 'green' : 'primary' }}
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