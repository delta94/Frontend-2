import { TabPane, Row, Col, CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../review/review.scss';

import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import React, { Fragment, Component, useState } from 'react';
import { ISaveDataCampain } from 'app/common/model/campaign-navigation.model';
import Loader from 'react-loader-advanced';
import { Loader as LoaderAnim } from 'react-loaders';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';

const spinner = <LoaderAnim color="#ffffff" type="ball-pulse" />;

export interface ReviewProps extends StateProps, DispatchProps {}

export interface ReviewState {
  testMail: string;
}

class Review extends React.PureComponent<ReviewProps, ReviewState> {
  state: ReviewState = {
    testMail: ''
  };

  render() {
    const { testMail } = this.state;
    const { navigationInfo, sumcontact, loading } = this.props;
    let listUser = JSON.parse(localStorage.getItem('listUser'));
    let duplicate = parseInt(localStorage.getItem('duplicate'));
    if (duplicate < 0) {
      duplicate = 0;
    }
    return (
      <Loader message={spinner} show={loading} priority={10}>
        <Fragment>
          <div className="preview">
            <CardTitle>
              <Translate contentKey="campaign.review" />
            </CardTitle>
            <div className="b-dashed">
              <div className="preview-title">
                <div className="info-title">
                  <span className="c-b">
                    <Translate contentKey="campaign.entity" />
                  </span>
                  <Translate contentKey="campaign.all-contract" /> <span className="c-g">{sumcontact ? sumcontact : 0}</span>
                </div>
                <div className="info-title">
                  <Translate contentKey="campaign.duplicate-contract" /> <span className="c-b">{duplicate ? duplicate : 0}</span>
                </div>
              </div>
              <Row>
                {navigationInfo.customerCampaigns &&
                  navigationInfo.customerCampaigns.length > 0 &&
                  navigationInfo.customerCampaigns.map((item, index) => {
                    return (
                      <Col md="4" key={item.name + index}>
                        <div className="title-contact">
                          <div className="camp-titles">{item.name}</div>
                          <div className="camp-titles">
                            <label>
                              {' '}
                              <Translate contentKey="campaign.sum-contact" /> {listUser[index].totalContact}
                            </label>
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
                      <span className="c-b">
                        <Translate contentKey="campaign.gift" />
                      </span>
                      {navigationInfo.reward.type === 2 ? ' E- voucher' : ' Không có'}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="content-review b-b">
                      <span className="c-b">
                        <Translate contentKey="campaign.landing-page" />
                      </span>
                      {navigationInfo.contentTemplates[0].subject ? navigationInfo.contentTemplates[0].subject : ' Không có'}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="b-r">
                    <div className="content-review ">
                      <span className="c-b">
                        <Translate contentKey="campaign.invite" />
                      </span>
                      {navigationInfo.contentTemplates[2].subject ? navigationInfo.contentTemplates[2].subject : ' Không có'}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="content-review">
                      <span className="c-b">
                        <Translate contentKey="campaign.get-reward" />
                      </span>
                      {navigationInfo.contentTemplates[1].subject ? navigationInfo.contentTemplates[1].subject : 'Không có'}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="test-commitsion">
              <label>
                <Translate contentKey="campaign.test-campaign" />
              </label>
              <input
                value={testMail}
                placeholder="Nhập email test"
                onChange={event => {
                  this.setState({ testMail: event.target.value });
                }}
              />
              <button>
                <Translate contentKey="campaign.test" />
              </button>
            </div>
          </div>
        </Fragment>
      </Loader>
    );
  }
}

const mapStateToProps = ({ navigationInfo, userCampaign, loadingState }: IRootState) => ({
  navigationInfo,
  sumcontact: userCampaign.totalContact.totalContact,
  loading: loadingState.loading
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);
