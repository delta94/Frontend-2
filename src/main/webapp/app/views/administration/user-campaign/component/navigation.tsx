import React, { Fragment, Component, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Voucher from './voucher-combobox';

import IncorporationForm from './add-button';
import Sticky from 'react-stickynode';

import cx from 'classnames';
import Hamburger from 'react-hamburgers';
import Ionicon from 'react-ionicons';
import ReactPaginate from 'react-paginate';
import '../style/campaign.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const dumpData = [
  {
    id: 1,
    name: 'Test Name',
    email: 'email 1',
    mobile: 'mobile 1',
    categories: 'categories 1',
    contact: 100
  },
  {
    id: 2,
    name: 'Test Name 1',
    email: 'email 1',
    mobile: 'mobile 1',
    categories: 'categories 1',
    contact: 100
  },
  {
    id: 3,
    name: 'Test Name 2',
    email: 'email 1',
    mobile: 'mobile 1',
    categories: 'categories 1',
    contact: 100
  },
  {
    id: 4,
    name: 'Test Name 3',
    email: 'email 1',
    mobile: 'mobile 1',
    categories: 'categories 1',
    contact: 100
  },

  {
    id: 5,
    name: 'Test Name 4',
    email: 'email 1',
    mobile: 'mobile 1',
    categories: 'categories 1',
    contact: 100
  },
  {
    id: 6,
    name: 'Test Name 5',
    email: 'email 1',
    mobile: 'mobile 1',
    categories: 'categories 1',
    contact: 100
  }
];

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
  Button,
  DropdownMenu,
  ModalBody,
  Table,
  Modal,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';

import classnames from 'classnames';
export interface IFaqSectionProps {
  onClick: Function;
}

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
      testMail: ''
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
    if (tab > 1) {
      this.props.onClick(true);
    } else {
      this.props.onClick(false);
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

  render() {
    const { testMail, activeTab, listUser } = this.state;

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
            <div className="pb-5 pl-5 pr-5 pt-3">
              <div className="mobile-app-menu-btn mb-3">
                <Hamburger active={this.state.active} type="elastic" onClick={() => this.setState({ active: !this.state.active })} />
              </div>
              {/* Tab Content */}
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <CardTitle>CHỌN TIỆP KHÁCH HÀNG</CardTitle>
                  <Row className="row-nav">
                    <Col md="4">
                      <div className="chosse-customer-class" onClick={this.onClick}>
                        <div className="grid-items-cus">
                          <div className="camp-top">
                            <Ionicon fontSize="35px" color="blue" icon="ios-add" />
                            <label className="camp-title-click"> Chọn Tệp KH Mới</label>
                          </div>
                        </div>
                      </div>
                    </Col>

                    {listUser &&
                      listUser.map((item, index) => {
                        return (
                          <Col md="4" key={item.id + index}>
                            <div className="grid-items-pop">
                              <div className="title-contract">
                                <div className="camp-titles"> Giám Đốc </div>
                                <div className="camp-top">
                                  <label className="camp-title-click">Tổng Contract :100</label>
                                </div>
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
                        );
                      })}
                  </Row>
                  <Row className="row-nav">
                    <Col md="4">
                      <div className="grid-items-pop">
                        <div className="title-contract">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
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
                        <div className="title-contract">
                          <div className="camp-titles"> Giám Đốc </div>
                          <div className="camp-top">
                            <label className="camp-title-click">Tổng Contract :100</label>
                          </div>
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
                  <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
                    <ModalHeader
                      toggle={() => {
                        this.setState({
                          modal: false
                        });
                      }}
                    >
                      <span>CHỌN TỆP </span>
                    </ModalHeader>

                    <ModalBody>
                      <Row>
                        <Col md="3">
                          <legend>Tổng số contact : {100}</legend>
                        </Col>
                        <Col md="4">
                          <input type="text" className="form-control" placeholder="Tìm kiếm" />
                        </Col>
                        <Col md="5">
                          <Button color="primary" type="submit" className="save-right" onClick={this.handlerSaveForm}>
                            <FontAwesomeIcon icon="save" />
                            &nbsp;
                            <Translate contentKey="entity.action.save" />
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="3" className="import-cus">
                          {/* <Button className="btn-icon" onClick={this._onClickBtn}>
                              <Ionicon fontSize="35px" color="#333" icon="ios-add" />
                            </Button> */}
                          <IncorporationForm />
                        </Col>
                        <Col md="9">
                          <div className="modal-table">
                            <Table responsive striped className="modal-tables">
                              <thead>
                                <tr className="text-center">
                                  <th className="hand ">Họ và tên</th>
                                  <th className="hand">Số điện thoại</th>
                                  <th className="hand">Email</th>
                                  <th>Nhóm</th>
                                </tr>

                                {listUser
                                  ? listUser.map((event, index) => {
                                      var elements;
                                      elements = (
                                        <tr key={index + 1}>
                                          <td>{event.name}</td>
                                          <td>{event.phone}</td>
                                          <td>{event.email}</td>
                                          <td>{event.group}</td>
                                        </tr>
                                      );
                                      return elements;
                                    })
                                  : ''}
                              </thead>
                            </Table>
                            <div className="paginator-nav">
                              <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={2}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={1}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </ModalBody>
                  </Modal>
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
                {/* task 2  */}
                <TabPane tabId="2">
                  <CardTitle>CHỌN QUÀ TẶNG</CardTitle>
                  <Card className="main-card mb-3">
                    <CardBody>
                      <FormGroup tag="fieldset">
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" onClick={this.onClickNoVoucher} /> Thông báo (Không có quà)
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" onClick={this.onClickVoucher} /> E-voucher
                          </Label>
                        </FormGroup>
                      </FormGroup>
                      <div className={this.state.displayVoucher}>
                        <Voucher />
                      </div>
                    </CardBody>
                  </Card>
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

                <TabPane tabId="3">
                  <CardTitle>TẠO LANDINGPAGE</CardTitle>

                  <div className="mt-5" />
                  <div className="clearfix">
                    <div className="text-center">
                      <Button
                        color="primary"
                        size="lg"
                        className="btn-pill btn-wide btn-shadow"
                        onClick={() => {
                          this.toggle('4');
                        }}
                      >
                        <b>Tiếp Tục</b>
                      </Button>
                    </div>
                  </div>
                </TabPane>

                <TabPane tabId="5">
                  <div className="preview">
                    <CardTitle>Tổng quan</CardTitle>
                    <div className="b-dashed">
                      <div className="preview-title">
                        <div className="info-title">
                          <span className="c-b">Đối tượng:</span> Tổng contact: <span className="c-g">{dumpData.length}</span>
                        </div>
                        <div className="info-title">
                          Contact trùng: <span className="c-b">36</span>
                        </div>
                      </div>
                      <Row>
                        {dumpData.map((item, index) => {
                          return (
                            <Col md="4" key={item.name + index}>
                              <div className="title-contact">
                                <div className="camp-titles">{item.name}</div>
                                <div className="camp-titles">
                                  <label>Tổng contact:</label> {item.contact}
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                      <div className="b-b b-t all-content-review">
                        <Row>
                          <Col md="6" className="b-r">
                            <div className="content-review b-b">
                              <span className="c-b">Quà tặng: </span>E - voucher
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="content-review b-b">
                              <span className="c-b">Landingpage: </span>Landingpage M2M
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6" className="b-r">
                            <div className="content-review ">
                              <span className="c-b">Giới thiệu bạn bè: </span>Email template 5
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="content-review">
                              <span className="c-b">Nhận quà tặng: </span>Email template 2
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className="test-commitsion">
                      <label>Test chiến dịch</label>
                      <input
                        value={testMail}
                        placeholder="Nhập email test"
                        onChange={event => {
                          this.setState({ testMail: event.target.value });
                        }}
                      />
                      <button>Test</button>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </Card>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
