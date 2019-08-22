import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Input, Card, Col, Container, Row } from 'reactstrap';

import Wrapper from './component/date-range-picker';
import Responsive from './component/campaign-carousel';
import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FaqSection from './component/navigation';
import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { IRootState } from 'app/reducers';
import Sticky from 'react-stickynode';
import PageTitleAlt from '../../../layout/AppMain/PageTitleAlt';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import DatePicker from 'react-datepicker';
import Loader from 'react-loader-advanced';
import cx from 'classnames';
import PageTitle from '../../../layout/AppMain/PageTitle';
import './style/campaign.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { Button } from 'app/DemoPages/Components/GuidedTours/Examples/Button';

export interface ICampaignManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface ICampaignManagementState {
  isActive: boolean;
  isDelete: boolean;
  startDate: Date;
}

export class CampaignManagement extends React.Component<ICampaignManagementProps, ICampaignManagementState> {
  state: ICampaignManagementState = {
    isDelete: false,
    isActive: false,
    startDate: new Date()
  };
  handleChange = date =>
    this.setState({
      startDate: date
    });

  render() {
    const { match, pageCount, loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <Loader message={spinner1} show={loading} priority={1}>
        <Fragment>
          <ReactCSSTransitionGroup
            className={cx('app-inner-layout chat-layout', {
              'open-mobile-menu': this.state.isActive
            })}
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <PageTitle heading="Danh Sách Chiến Dịch > Tạo Chiến Dịch M2M" />
            <Container fluid>
              <Card className="main-card mb-4">
                <Row>
                  <Col md={4}>
                    <legend className="name-title">TÊN CHIẾN DỊCH</legend>
                    <div>
                      <Col sm={12}>
                        <Input type="email" name="email" placeholder="with a placeholder" />
                      </Col>
                    </div>
                    <legend className="name-title time">THỜI GIAN</legend>
                    <div>
                      <Col sm={12}>
                        <Wrapper />
                      </Col>
                    </div>
                  </Col>
                  <Col md={8}>
                    <legend className="name-title">MÔ TẢ</legend>
                    <div>
                      <Col sm={9}>
                        <Input type="textarea" name="text" id="exampleText" />
                      </Col>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Responsive />
                </Row>
              </Card>
              <FaqSection />
            </Container>
          </ReactCSSTransitionGroup>
        </Fragment>
      </Loader>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignManagement);
