import { TabPane, Row, Col, CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../../style/campaign.scss';
import '../navigation/tab-detail.scss';

import { Translate } from 'react-jhipster';
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
        <div className="tab-detail-3">
          <CardTitle>TẠO LANDINGPAGE</CardTitle>
          <Row>
            <Col md="5">
              <Label className="label-landingpage">Chọn landingpage</Label>

              <Input type="select" name="select" className="select-landingpage">
                <option>1</option>
                <option>2</option>
              </Input>
            </Col>
            <Col md="7">
              <a href="#/top" className="preview">
                <i className="lnr-eye" /> Preview
              </a>
              <Input type="textarea" name="text" id="exampleText" maxLength="640" />
            </Col>
          </Row>
          `
        </div>
      </Fragment>
    );
  }
}

export default TabDetail3;
