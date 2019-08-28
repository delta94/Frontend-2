import { TabPane, Row, Col, CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../../style/campaign.scss';

import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import React, { Fragment, Component, useState } from 'react';

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

export interface TabDetail5Props {}

export interface TabDetail5State {
  activeTab: string;
  displayVoucher: string;
  gift: Object;
  testMail: string;
}
class TabDetail5 extends React.Component<TabDetail5Props, TabDetail5State> {
  state: TabDetail5State = {
    activeTab: '1',
    displayVoucher: 'display-voucher',
    gift: {},
    testMail: ''
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
    const { testMail } = this.state;
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default TabDetail5;
