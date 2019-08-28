import { TabPane, Row, Col, CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../../style/campaign.scss';

import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import React, { Fragment, Component, useState } from 'react';

export interface TabDetail3Props {}

export interface TabDetail3State {
  activeTab: string;
  displayVoucher: string;
}
class TabDetail3 extends React.Component<TabDetail3Props, TabDetail3State> {
  state: TabDetail3State = {
    activeTab: '1',
    displayVoucher: 'display-voucher'
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
    return (
      <Fragment>
        <TabPane tabId="3">
          <CardTitle>TẠO LANDINGPAGE</CardTitle>
          <Row>
            <Col md="4">
              <Label for="exampleSelect">Chọn landingpage</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </Col>
          </Row>
          `
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
      </Fragment>
    );
  }
}

export default TabDetail3;
