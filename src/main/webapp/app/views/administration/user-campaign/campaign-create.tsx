import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Input, Card, Col, Container, Row } from 'reactstrap';

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
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

export interface ICampaignManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface ICampaignManagementState {
  isActive: boolean;
  ValidateName: string;
  countError: any;
  ValidateField: string;
  ValidateDay: string;
  valueName: string;
  ValueDay: string;
  listValid: {};
  ValueDescri: string;
}

export class CampaignManagement extends React.Component<ICampaignManagementProps, ICampaignManagementState> {
  state: ICampaignManagementState = {
    isActive: false,
    ValidateName: '',
    countError: 0,
    ValidateField: '',
    ValidateDay: '',
    valueName: '',
    ValueDay: '',
    ValueDescri: '',
    listValid: {}
  };
  onChangeName = event => {
    if (event.target.value === '' || event.target.value === null) {
      this.setState({
        ValidateName: 'vui lòng nhập tên chiến dịch'
      });
    } else {
      this.setState({
        ValidateName: '',
        valueName: event.target.value
      });
    }
  };

  onChangeField = event => {
    if (event.target.value === '' || event.target.value === null) {
      this.setState({
        ValidateField: 'vui lòng nhập Mô tả'
      });
    } else {
      this.setState({
        ValidateField: '',
        ValueDescri: event.target.value
      });
    }
  };

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
                        <Input
                          type="email"
                          value={this.state.valueName}
                          name="email"
                          placeholder="M2M ĐẦU TIÊN"
                          onChange={this.onChangeName}
                        />
                        <p>{this.state.ValidateName}</p>
                      </Col>
                    </div>
                    <legend className="name-title time">THỜI GIAN</legend>
                    <div>
                      <Col sm={12}>
                        <div className="font-icon-wrapper font-icon-lg">
                          <i className="lnr-calendar-full icon-gradient bg-arielle-smile"> </i>
                        </div>
                        <DateRangePicker
                          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                          startDateId="dateStart" // PropTypes.string.isRequired,
                          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                          endDateId="dateEnd" // PropTypes.string.isRequired,
                          onDatesChange={({ startDate, endDate }) => {
                            if (startDate === '' || startDate === null) {
                              this.setState({
                                ValidateDay: 'vui lòng nhập ngày'
                              });
                            } else {
                              this.setState({
                                ValidateDay: '',
                                startDate,
                                endDate,
                                ValueDay: startDate
                              });
                            }
                          }} // PropTypes.func.isRequired,
                          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        />
                        <p>{this.state.ValidateDay}</p>
                      </Col>
                    </div>
                  </Col>
                  <Col md={8}>
                    <legend className="name-title">MÔ TẢ</legend>
                    <div>
                      <Col sm={9}>
                        <Input type="textarea" name="text" id="exampleText" onChange={this.onChangeField} />
                        <p>{this.state.ValidateField}</p>
                      </Col>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Responsive
                    value={this.setState({
                      listValid: {
                        name: this.state.valueName,
                        descri: this.state.ValueDescri,
                        day: this.state.ValueDay
                      }
                    })}
                  />
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
