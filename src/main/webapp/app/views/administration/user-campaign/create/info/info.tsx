import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Input, Card, Col, Row, Label } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import PageTitleAlt from '../../../../../layout/AppMain/PageTitleAlt';
import ReactPaginate from 'react-paginate';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import '../info/info.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment, { Moment } from 'moment';
import { DateRangePicker } from 'react-dates';
import Script from '../scipts/script';

export interface IinfoProps extends StateProps, DispatchProps {
  onClick: Function;
}

export interface IinfoPropsState {
  nameScripts: string;
  disableScreen: string;
  ValidateName: string;
  countError: any;
  ValidateField: string;
  ValidateDay: string;
  valueName: string;
  ValueDay: string;
  listValid: {};
  ValueDescri: string;
  displayTable: string;
  startDate: Moment;
  endDate: Moment;
  focusedInput: string;
  isDisplayInfo: boolean;
}

export class Info extends React.Component<IinfoProps, IinfoPropsState> {
  state: IinfoPropsState = {
    nameScripts: '',
    ValidateName: '',
    countError: 0,
    ValidateField: '',
    ValidateDay: '',
    valueName: '',
    ValueDay: '',
    ValueDescri: '',
    listValid: {},
    disableScreen: '',
    displayTable: 'display-complete',
    startDate: moment(),
    endDate: moment(),
    focusedInput: '',
    isDisplayInfo: false
  };

  onChangeName = event => {
    if (event.target.value === '' || event.target.value === null) {
      this.setState({
        ValidateName: 'vui lòng nhập tên chiến dịch'
      });
    } else {
      this.setState({
        ValidateName: '',
        valueName: event.target.value,
        listValid: {
          name: this.state.valueName,
          descri: this.state.ValueDescri,
          day: this.state.ValueDay
        }
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
        ValueDescri: event.target.value,
        listValid: {
          name: this.state.valueName,
          descri: this.state.ValueDescri,
          day: this.state.ValueDay
        }
      });
    }
  };
  onClick = event => {
    if (event !== null) {
      this.setState({
        displayTable: '',
        nameScripts: event
      });
      console.log(this.state.displayTable);
      this.props.onClick('');
    } else {
      this.setState({
        displayTable: 'display-complete'
      });
    }
  };
  onDatesChange = ({ startDate, endDate }) => {
    if (startDate === '' || startDate === null) {
      this.setState({
        ValidateDay: 'vui lòng nhập ngày'
      });
    } else {
      this.setState({
        ValidateDay: '',
        startDate,
        endDate,
        ValueDay: startDate,
        listValid: {
          name: this.state.valueName,
          descri: this.state.ValueDescri,
          day: this.state.ValueDay
        }
      });
    }
  };

  render() {
    const { loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <Loader message={spinner1} show={loading} priority={1}>
        <div id="userCreate">
          <div className={this.state.disableScreen}>
            <Card className="main-card mb-4">
              <Row>
                <Col md={4}>
                  <Label className="name-title">TÊN CHIẾN DỊCH</Label>
                  <div>
                    <Col sm={12}>
                      <Input
                        type="email"
                        value={this.state.valueName}
                        name="email"
                        placeholder="M2M ĐẦU TIÊN"
                        onChange={this.onChangeName}
                        maxLength="160"
                      />
                      <p>{this.state.ValidateName}</p>
                    </Col>
                  </div>
                  <Col>
                    <Label className="name-titles">THỜI GIAN</Label>

                    <Col sm={15}>
                      <DateRangePicker
                        showDefaultInputIcon
                        required={true}
                        startDatePlaceholderText={'dd/mm'}
                        displayFormat="DD/MM"
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="dateStart" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="dateEnd" // PropTypes.string.isRequired,
                        onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                      />

                      <p>{this.state.ValidateDay}</p>
                    </Col>
                    <div className={this.state.displayTable}>
                      <div className="reOpen-doc">
                        <div className="grid-items-Click">
                          <div className="camp-top">
                            <label className="camp-title-click"> {this.state.nameScripts}</label>
                            <img className="image-tites" src="https://abeon-hosting.com/images/complete-png-4.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Col>
                <Col md={8}>
                  <Label className="name-title">MÔ TẢ</Label>
                  <div>
                    <Col sm={12}>
                      <Input type="textarea" name="text" id="exampleText" onChange={this.onChangeField} maxLength="640" />
                      <p>{this.state.ValidateField}</p>
                    </Col>
                  </div>
                </Col>
              </Row>
              <Script value={this.state} onClick={this.onClick} />
            </Card>
          </div>
        </div>
      </Loader>
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  loading: userCampaign.loading
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
