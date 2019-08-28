import { TabPane, CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../../style/campaign.scss';

import { Translate } from 'react-jhipster';
import React, { Fragment, Component, useState } from 'react';
import Voucher from './tab-detail-2-voucher-combobox/voucher-combobox';

export interface TabDetail2Props {}

export interface TabDetail2State {
  activeTab: string;
  displayVoucher: string;
}
class TabDetail2 extends React.Component<TabDetail2Props, TabDetail2State> {
  state: TabDetail2State = {
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
      </Fragment>
    );
  }
}

export default TabDetail2;
