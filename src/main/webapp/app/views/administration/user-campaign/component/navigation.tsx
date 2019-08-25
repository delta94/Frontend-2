import React, { Fragment, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Sticky from 'react-stickynode';

import cx from 'classnames';
import Hamburger from 'react-hamburgers';
import Ionicon from 'react-ionicons';
import '../style/campaign.scss';

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

  toggle(tab) {
    // this.setState({ collapse: !this.state.collapse });
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

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
            <Card className="col-md-3 app-inner-layout__sidebar ">
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
                      <Col md="4">
                        <div className="chosse-customer-class">
                          <div className="grid-items-cus">
                            <div className="camp-top">
                              <Ionicon fontSize="35px" color="blue" icon="ios-add" />
                              <label className="camp-title-click"> Chọn Tệp KH Mới</label>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="grid-items-pop">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
                          <div className="boder-create-new">
                            <div>
                              <i className="pe-7s-mail"> Email</i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              <i className="pe-7s-call"> SĐT </i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-facebook"
                                src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-512.png"
                              />{' '}
                              FB<label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-zalo"
                                src="http://brasol.logozee.com/public/ckeditor/uploads/brasol.vn-logo-zalo-vector-logo-zalo-vector.png"
                              />{' '}
                              Zalo<label className="label-icon">100</label>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="grid-items-pop">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
                          <div className="boder-create-new">
                            <div>
                              <i className="pe-7s-mail"> Email</i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              <i className="pe-7s-call"> SĐT </i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-facebook"
                                src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-512.png"
                              />{' '}
                              FB<label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-zalo"
                                src="http://brasol.logozee.com/public/ckeditor/uploads/brasol.vn-logo-zalo-vector-logo-zalo-vector.png"
                              />{' '}
                              Zalo<label className="label-icon">100</label>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col md="4">
                        <div className="grid-items-pop">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
                          <div className="boder-create-new">
                            <div>
                              <i className="pe-7s-mail"> Email</i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              <i className="pe-7s-call"> SĐT </i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-facebook"
                                src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-512.png"
                              />{' '}
                              FB<label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-zalo"
                                src="http://brasol.logozee.com/public/ckeditor/uploads/brasol.vn-logo-zalo-vector-logo-zalo-vector.png"
                              />{' '}
                              Zalo<label className="label-icon">100</label>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="grid-items-pop">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
                          <div className="boder-create-new">
                            <div>
                              <i className="pe-7s-mail"> Email</i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              <i className="pe-7s-call"> SĐT </i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-facebook"
                                src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-512.png"
                              />{' '}
                              FB<label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-zalo"
                                src="http://brasol.logozee.com/public/ckeditor/uploads/brasol.vn-logo-zalo-vector-logo-zalo-vector.png"
                              />{' '}
                              Zalo<label className="label-icon">100</label>
                            </div>
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
                  <TabPane tabId="2">
                    <CardTitle>CHỌN TIỆP KHÁCH HÀNG</CardTitle>
                    <Row>
                      <Col md="4">
                        <div className="chosse-customer-class">
                          <div className="grid-items-cus">
                            <div className="camp-top">
                              <Ionicon fontSize="35px" color="blue" icon="ios-add" />
                              <label className="camp-title-click"> Chọn Tệp KH Mới</label>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="grid-items-pop">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
                          <div className="boder-create-new">
                            <div>
                              <i className="pe-7s-mail"> Email</i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              <i className="pe-7s-call"> SĐT </i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-facebook"
                                src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-512.png"
                              />{' '}
                              FB<label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-zalo"
                                src="http://brasol.logozee.com/public/ckeditor/uploads/brasol.vn-logo-zalo-vector-logo-zalo-vector.png"
                              />{' '}
                              Zalo<label className="label-icon">100</label>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="grid-items-pop">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
                          <div className="boder-create-new">
                            <div>
                              <i className="pe-7s-mail"> Email</i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              <i className="pe-7s-call"> SĐT </i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-facebook"
                                src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-512.png"
                              />{' '}
                              FB<label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-zalo"
                                src="http://brasol.logozee.com/public/ckeditor/uploads/brasol.vn-logo-zalo-vector-logo-zalo-vector.png"
                              />{' '}
                              Zalo<label className="label-icon">100</label>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col md="4">
                        <div className="grid-items-pop">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
                          <div className="boder-create-new">
                            <div>
                              <i className="pe-7s-mail"> Email</i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              <i className="pe-7s-call"> SĐT </i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-facebook"
                                src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-512.png"
                              />{' '}
                              FB<label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-zalo"
                                src="http://brasol.logozee.com/public/ckeditor/uploads/brasol.vn-logo-zalo-vector-logo-zalo-vector.png"
                              />{' '}
                              Zalo<label className="label-icon">100</label>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="grid-items-pop">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
                          <div className="boder-create-new">
                            <div>
                              <i className="pe-7s-mail"> Email</i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              <i className="pe-7s-call"> SĐT </i>
                              <label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-facebook"
                                src="https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-03-512.png"
                              />{' '}
                              FB<label className="label-icon">100</label>
                            </div>
                            <div>
                              {' '}
                              <img
                                className="img-zalo"
                                src="http://brasol.logozee.com/public/ckeditor/uploads/brasol.vn-logo-zalo-vector-logo-zalo-vector.png"
                              />{' '}
                              Zalo<label className="label-icon">100</label>
                            </div>
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
                            this.toggle('3');
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
