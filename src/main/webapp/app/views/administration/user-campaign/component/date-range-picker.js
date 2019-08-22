import React, { Fragment } from 'react'

import {
    InputGroup, InputGroupAddon, Input
} from 'reactstrap';

import {
    faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import 'react-dates/initialize';

import moment from 'moment';

class FormDateRangePicker extends React.Component {
    constructor(props) {
        super(props);
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        this.state = {
            start: start,
            end: end,
        }
    }

    render() {
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");

        return (
            <Fragment>
                 <div className="font-icon-wrapper font-icon-lg">
                                    <i className="lnr-calendar-full icon-gradient bg-arielle-smile"> </i>
                                </div>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="dateStart" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="dateEnd" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </Fragment>
        )
    }
}

export default FormDateRangePicker;