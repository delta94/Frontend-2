import { TabPane, CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../../style/campaign.scss';

import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import Ionicon from 'react-ionicons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { Fragment, Component, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import IncorporationForm from './tab-detail-1-button-modal.tsx/add-button';
import Sticky from 'react-stickynode';
import Voucher from './tab-detail-2-voucher-combobox/voucher-combobox';

import cx from 'classnames';
import Hamburger from 'react-hamburgers';
import ReactPaginate from 'react-paginate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      </Fragment>
    );
  }
}

export default TabDetail2;
