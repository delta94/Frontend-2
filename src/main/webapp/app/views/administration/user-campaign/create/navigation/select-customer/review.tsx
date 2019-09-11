import { TabPane, Row, Col, CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../review/review.scss';

import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import React, { Fragment, Component, useState } from 'react';
import { ISaveDataCampain } from 'app/common/model/campaign-navigation.model';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';

export interface ReviewProps extends StateProps, DispatchProps {}

export interface ReviewState {
  activeTab: string;
  displayVoucher: string;
  gift: Object;
  testMail: string;
}
class Review extends React.Component<ReviewProps, ReviewState> {
  state: ReviewState = {
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
    const { navigationInfo } = this.props;
    return (
      <Fragment>
        <div className="preview">
          <CardTitle>Tổng quan</CardTitle>
          <div className="b-dashed">
            <div className="preview-title">
              <div className="info-title">
                <span className="c-b">Đối tượng:</span> Tổng contact: <span className="c-g">{navigationInfo.customerCampaigns.length}</span>
              </div>
              <div className="info-title">
                Contact trùng: <span className="c-b">36</span>
              </div>
            </div>
            <Row>
              {navigationInfo.customerCampaigns.length > 0 &&
                navigationInfo.customerCampaigns.map((item, index) => {
                  return (
                    <Col md="4" key={item.name + index}>
                      <div className="title-contact">
                        <div className="camp-titles">{item.name}</div>
                        <div className="camp-titles">
                          <label>Tổng contact:</label> {}
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
                    <span className="c-b">Quà tặng: </span>
                    {navigationInfo.reward.type === 2 ? 'E- voucher' : 'Không có'}
                  </div>
                </Col>
                <Col md="6">
                  <div className="content-review b-b">
                    <span className="c-b">Landingpage: </span>
                    {navigationInfo.contentTemplates[0].subject}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="b-r">
                  <div className="content-review ">
                    <span className="c-b">Giới thiệu bạn bè: </span>
                    {navigationInfo.contentTemplates[1].subject}
                  </div>
                </Col>
                <Col md="6">
                  <div className="content-review">
                    <span className="c-b">Nhận quà tặng: </span>
                    {navigationInfo.contentTemplates[2].subject}
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
      </Fragment>
    );
  }
}

const mapStateToProps = ({ navigationInfo }: IRootState) => ({
  navigationInfo
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);
