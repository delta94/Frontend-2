import { Col, Row, CardTitle, Button, ModalBody, Table, Modal, ModalHeader } from 'reactstrap';
import '../select-customer/select-customer.scss';

import { Translate } from 'react-jhipster';
import Ionicon from 'react-ionicons';
import React, { Fragment, Component, useState } from 'react';
import IncorporationForm from './customer-dialog/button-dialog/button-dialog';

import ReactPaginate from 'react-paginate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface SelectCustomerProps {}

export interface SelectCustomerState {
  listUser: any[];
  modal: boolean;
  activeTab: string;
}
class SelectCustomer extends React.Component<SelectCustomerProps, SelectCustomerState> {
  state: SelectCustomerState = {
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
      </Fragment>
    );
  }
}

export default SelectCustomer;
