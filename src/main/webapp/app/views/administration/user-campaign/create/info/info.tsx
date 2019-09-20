import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Input, Card, Col, Row, Label } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import './info.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment, { Moment } from 'moment';
import { DateRangePicker } from 'react-dates';
import Script from './scripts/script';
import { ULTILS_TYPES } from '../../../../../constants/ultils';
import { getNavigationFromDate, getNavigationToDate, getNavigationName, getNavigationDescription } from 'app/actions/navigation-info';
import CalendarWeek from 'react-dates/lib/components/CalendarWeek';

export interface IinfoProps extends StateProps, DispatchProps {
  onClick: Function;
}

const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

export interface IinfoPropsState {
  // value info
  valueDay: string;
  valueName?: string;
  valueDes: string;

  // handler show table
  showNameScripts: string;
  disableScreen: string;
  displayTable: string;

  // set date & time
  startDate: Moment;
  endDate: Moment;
  focusedInput: string;
}

export class Info extends React.Component<IinfoProps, IinfoPropsState> {
  state: IinfoPropsState = {
    // set style class table default
    disableScreen: ULTILS_TYPES.EMPTY,
    displayTable: ULTILS_TYPES.DISPLAY_TABLE,
    showNameScripts: ULTILS_TYPES.EMPTY,

    // set default value info
    valueName: '',
    valueDay: ULTILS_TYPES.EMPTY,
    valueDes: ULTILS_TYPES.EMPTY,

    // set default date & time
    startDate: moment(new Date()),
    endDate: moment(new Date()),
    focusedInput: null
  };

  componentWillMount() {
    CalendarWeek && CalendarWeek.propTypes && delete CalendarWeek.propTypes['children'];
  }

  onChangeName = event => {
    let { valueName } = this.state;
    valueName = event.target.value;
    this.setState({ valueName });
    this.props.getNavigationName(valueName);
  };

  onChangeField = event => {
    this.setState({
      valueDes: event.target.value
    });

    this.props.getNavigationDescription(event.target.value);
  };

  componentDidMount() {
    let { startDate, endDate } = this.state;
    this.props.getNavigationFromDate(new Date(startDate._d).toISOString());
    this.props.getNavigationToDate(new Date(endDate._d).toISOString());
  }
  // function show text scripts
  onClick = (event, id) => {
    let { valueName, valueDes, startDate, endDate } = this.state;

    if (event !== null) {
      this.setState({
        displayTable: ULTILS_TYPES.EMPTY,
        showNameScripts: event
      });

      this.props.onClick(id);
    } else {
      this.setState({
        displayTable: ULTILS_TYPES.DISPLAY_TABLE
      });
    }
  };

  onDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      this.setState({
        startDate
      });
      this.props.getNavigationFromDate(new Date(startDate._d).toISOString());
    }

    if (endDate) {
      this.setState({
        endDate
      });
      this.props.getNavigationToDate(new Date(endDate._d).toISOString());
    }
  };

  render() {
    const { loading } = this.props;
    let { showNameScripts, valueName, startDate, endDate, valueDes, focusedInput } = this.state;

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
                        type="text"
                        value={valueName}
                        placeholder={ULTILS_TYPES.PLACEHODER_NAME}
                        onChange={this.onChangeName}
                        maxLength="160"
                      />
                      <label
                        className="must-type"
                        id="bottom_show"
                        style={{
                          display: valueName && valueName.trim() !== '' ? 'none' : 'block',
                          fontSize: '12px!important'
                        }}
                      >
                        * <Translate contentKey="error.none-data.name-campaign" />
                      </label>
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
                        startDatePlaceholderText={'dd/mm/yy'}
                        displayFormat="DD/MM/YY"
                        startDate={startDate}
                        startDateId="dateStart"
                        endDate={endDate}
                        endDateId="dateEnd"
                        onDatesChange={this.onDatesChange}
                        focusedInput={focusedInput}
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                      />
                      <label
                        className="must-type"
                        style={{
                          display: startDate && endDate ? 'none' : 'block',
                          fontSize: '12px!important'
                        }}
                      >
                        * <Translate contentKey="error.none-data.time" />
                      </label>
                    </Col>
                    <div style={{ display: showNameScripts && showNameScripts !== '' ? 'block' : 'none' }}>
                      <div className="chose-campain">
                        <label className="camp-title-click"> {showNameScripts}</label>
                        <img className="image-tites" src={ULTILS_TYPES.LINK_IMAGE} />
                      </div>
                    </div>
                  </Col>
                </Col>
                <Col md={8}>
                  <div style={{ margin: '0px 15px 0px -15px', height: '100%', paddingBottom: '10px' }}>
                    <div style={{ position: 'relative' }}>
                      <Label className="name-title-des">
                        <Translate contentKey="campaign.descrition" />
                      </Label>
                      <label
                        className="must-type"
                        id="right_show"
                        style={{
                          display: valueDes && valueDes.trim() !== '' ? 'none' : 'block',
                          position: 'absolute',
                          top: '0px',
                          right: '30px',
                          fontSize: '12px!important'
                        }}
                      >
                        * <Translate contentKey="error.none-data.name-description" />
                      </label>
                    </div>

                    <Input type="textarea" name="text" id="exampleText" onChange={this.onChangeField} maxLength="640" />
                  </div>
                </Col>
              </Row>
              <div style={{ padding: '0px 15px' }}>
                <Script value={this.state} onClick={this.onClick} />
              </div>
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

const mapDispatchToProps = {
  getNavigationFromDate,
  getNavigationToDate,
  getNavigationName,
  getNavigationDescription
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
