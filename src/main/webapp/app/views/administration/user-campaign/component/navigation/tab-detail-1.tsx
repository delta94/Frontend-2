import {
  TabPane,
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
import '../../style/campaign.scss';

import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import Ionicon from 'react-ionicons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { Fragment, Component, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IncorporationForm from './tab-detail-1-button-modal.tsx/add-button';
import Sticky from 'react-stickynode';

import cx from 'classnames';
import Hamburger from 'react-hamburgers';
import ReactPaginate from 'react-paginate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface TabDetail1Props {}

export interface TabDetail1State {
  listUser: any[];
  modal: boolean;
  activeTab: string;
}
class TabDetail1 extends React.Component<TabDetail1Props, TabDetail1State> {
  state: TabDetail1State = {
    activeTab: '1',
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
    modal: false
  };
  onClick = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  handlerSaveForm = () => {
    this.setState({
      modal: false
    });
  };

  render() {
    const { listUser } = this.state;
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default TabDetail1;
