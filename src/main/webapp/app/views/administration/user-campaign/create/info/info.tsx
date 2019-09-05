import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Input, Card, Col, Row, Label } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import '../info/info.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment, { Moment } from 'moment';
import { DateRangePicker } from 'react-dates';
import Script from '../scripts/script';
import { ULTILS_TYPES } from '../../../../../constants/ultils';

export interface IinfoProps extends StateProps, DispatchProps {
  onClick: Function;
}

export interface IinfoPropsState {
  //value info
  valueDay: string;
  valueName: string;
  valueDes: string;

  //message error
  validateName: any;
  validateField: any;
  validateDay: any;

  //handler show table
  showNameScripts: string;
  disableScreen: string;
  displayTable: string;

  //set date & time
  startDate: Moment;
  endDate: Moment;
  focusedInput: string;
}

export class Info extends React.Component<IinfoProps, IinfoPropsState> {
  state: IinfoPropsState = {
    //set defaul value message error
    validateDay: ULTILS_TYPES.EMPTY,
    validateField: ULTILS_TYPES.EMPTY,
    validateName: ULTILS_TYPES.EMPTY,

    //set style class table default
    disableScreen: ULTILS_TYPES.EMPTY,
    displayTable: ULTILS_TYPES.DISPLAY_TABLE,
    showNameScripts: ULTILS_TYPES.EMPTY,

    // set default value info
    valueName: ULTILS_TYPES.EMPTY,
    valueDay: ULTILS_TYPES.EMPTY,
    valueDes: ULTILS_TYPES.EMPTY,

    //set default date & time
    startDate: moment(),
    endDate: moment(),
    focusedInput: ULTILS_TYPES.EMPTY
  };

  onChangeName = event => {
    if (event.target.value) {
      this.setState({
        validateName: ULTILS_TYPES.EMPTY,
        valueName: event.target.value
      });
    } else {
      this.setState({
        validateName: <Translate contentKey="campaign.message-error.name" />
      });
    }
  };

  onChangeField = event => {
    if (event.target.value) {
      this.setState({
        validateField: ULTILS_TYPES.EMPTY,
        valueDes: event.target.value
      });
    } else {
      this.setState({
        validateField: <Translate contentKey="campaign.message-error.des" />
      });
    }
  };
  //function show text scripts
  onClick = (event, id) => {
    if (event !== null) {
      this.setState({
        displayTable: ULTILS_TYPES.EMPTY,
        showNameScripts: event
      });
      let listInfo = {
        campaignTypeId: id,
        name: event,
        fromDate: this.state.startDate,
        toDate: this.state.endDate,
        description: this.state.valueDes
      };
      this.props.onClick(ULTILS_TYPES.EMPTY, listInfo);
    } else {
      this.setState({
        displayTable: ULTILS_TYPES.DISPLAY_TABLE
      });
    }
  };
  onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      this.setState({
        validateDay: ULTILS_TYPES.EMPTY,
        startDate,
        endDate,
        valueDay: startDate
      });
    } else {
      this.setState({
        validateDay: <Translate contentKey="campaign.message-error.day" />
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
              <Row className="row-info">
                <Col md={4}>
                  <Label className="name-title">
                    <Translate contentKey="campaign.name-campaign" />
                  </Label>
                  <div>
                    <Col sm={12}>
                      <Input
                        type="email"
                        value={this.state.valueName}
                        name="email"
                        placeholder={ULTILS_TYPES.PLACEHODER_NAME}
                        onChange={this.onChangeName}
                        maxLength="160"
                      />
                      <p>{this.state.validateName}</p>
                    </Col>
                  </div>
                  <Col>
                    <Label className="name-titles">
                      <Translate contentKey="campaign.time-create" />
                    </Label>

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

                      <p>{this.state.validateDay}</p>
                    </Col>
                    <div className={this.state.displayTable}>
                      <div className="reOpen-doc">
                        <div className="grid-items-Click">
                          <div className="camp-top">
                            <label className="camp-title-click"> {this.state.showNameScripts}</label>
                            <img className="image-tites" src={ULTILS_TYPES.LINK_IMAGE} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Col>
                <Col md={8}>
                  <Label className="name-title-des">
                    <Translate contentKey="campaign.descrition" />
                  </Label>
                  <Input type="textarea" name="text" id="exampleText" onChange={this.onChangeField} maxLength="640" />
                  <p>{this.state.validateField}</p>
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
