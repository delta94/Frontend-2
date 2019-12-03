import React from 'react';
import { IRootState } from 'app/reducers';
import { Input, Icon, Checkbox, Row, Col, Select, Radio, DatePicker, Button } from 'antd';
import './field-data.scss';
import { OPERATOR, TYPE_FIELD } from 'app/constants/field-data';
import { IListFieldData, ISearchAdvanced } from 'app/common/model/group-attribute-customer';
import { Moment } from 'moment';
import moment from 'moment';
import { INSERT_CUSTOMER_GROUP } from 'app/constants/group-atrribute-customer';
import { connect } from 'react-redux';
const { Option } = Select;

const list_condition_operator = {
  textInput: [OPERATOR.EQUAL, OPERATOR.CONTAIN],
  date: [OPERATOR.EQUAL, OPERATOR.GREATER_OR_EQUAL, OPERATOR.LESS_OR_EQUAL],
  dropdown: [OPERATOR.EQUAL],
  radiobutton: [OPERATOR.EQUAL],
  checkbox: [OPERATOR.EQUAL]
};

interface IFieldDataProps extends StateProps, DispatchProps {
  id?: string;
  last_index?: boolean;
  logicalOperator?: string;
  type_modal?: string;
  default_data?: ISearchAdvanced;
  updateValueFromState?: Function;
  deleteComponentById?: Function;
  updateRelationshipFromState?: Function;
}

interface IFieldDataState {
  type: string;
  defaultValue?: string;
  list_of_operator?: Array<string>;
  operator?: string;
  render_cpn?: any;
  options?: any;
  value_input?: string;
  value_check_box?: Array<any>;
  value_dropdown?: string;
  value_datepicker?: string;
  value_radio?: string;
  searchAdvanced: ISearchAdvanced;
  default_data: ISearchAdvanced;
  default_title?: string;
}

class FieldData extends React.Component<IFieldDataProps, IFieldDataState> {
  state: IFieldDataState = {
    type: '',
    list_of_operator: list_condition_operator.textInput,
    operator: null,
    render_cpn: null,
    value_input: '',
    value_check_box: [],
    value_dropdown: '',
    value_datepicker: '',
    value_radio: '',
    options: [],
    defaultValue: '',
    searchAdvanced: {
      fieldId: '',
      fieldType: '',
      fieldCode: '',
      value: '',
      operator: ''
    },
    default_data: {},
    default_title: ''
  };

  componentDidMount() {
    let { list_of_operator } = this.state;
    this.setSearchAdvancedData(list_of_operator[0], 'operator');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { default_data, list_field_data, type_modal } = nextProps;
    let {
      value_input,
      value_check_box,
      value_dropdown,
      value_radio,
      value_datepicker,
      operator,
      default_title,
      list_of_operator
    } = prevState;

    if (list_of_operator && !default_data.operator) {
      operator === list_of_operator[0];
    }

    if (nextProps.default_data !== prevState.default_data) {
      if (nextProps.default_data !== prevState.default_data && default_data.operator && default_data.operator !== '') {
        operator = default_data.operator;
      }

      if (type_modal !== INSERT_CUSTOMER_GROUP) {
        list_field_data.forEach(item => {
          if (item.code === default_data.fieldCode) default_title = item.title;
        });

        switch (default_data.fieldType) {
          case TYPE_FIELD.TEXT_INPUT:
            value_input = default_data.value;
            break;

          case TYPE_FIELD.DATE:
            value_datepicker = default_data.value;
            break;

          case TYPE_FIELD.DROP_DOWN:
            value_dropdown = default_data.value;
            break;

          case TYPE_FIELD.CHECK_BOX:
            value_check_box = default_data.value.split('||');

            break;

          case TYPE_FIELD.RADIO_BUTTON:
            value_radio = default_data.value;
            break;

          default:
            break;
        }

        return {
          type: default_data.fieldType,
          searchAdvanced: default_data,
          value_input,
          value_check_box,
          value_radio,
          value_dropdown,
          value_datepicker,
          operator,
          defaultValue: default_data.fieldTitle,
          default_data,
          default_title
        };
      } else {
        return null;
      }
    }

    return null;
  }

  // Select value
  selectValue = (event, item, id) => {
    this.handleChoseOption(item);
  };

  // Chose type of render in reuseComponent
  handleChoseOption = item_value => {
    console.log(item_value);
    let { searchAdvanced } = this.state;
    let type = item_value.type;
    let fieldId = item_value.id;
    let fieldTitle = item_value.title;
    let fieldValue = item_value.fieldValue;
    let fieldType = item_value.type;
    let fieldCode = item_value.code;
    let list_option = item_value.fieldValue && item_value.fieldValue !== '' ? item_value.fieldValue.split('||') : null;

    this.setState({ type, searchAdvanced, options: list_option });
    this.handleChoseTypeOfRenderCpn(type, list_option);
    this.setSearchAdvancedData(fieldId, 'fieldId');
    this.setSearchAdvancedData(fieldCode, 'fieldCode');
    this.setSearchAdvancedData(fieldType, 'fieldType');
    this.setSearchAdvancedData(fieldValue, 'fieldValue');
    this.setSearchAdvancedData(fieldTitle, 'fieldTitle');
  };

  // Chose Component for reuseComponent
  handleChoseTypeOfRenderCpn = (type: string, list_option: any) => {
    let { render_cpn, list_of_operator } = this.state;
    list_of_operator = [];
    let options: any = [];

    switch (type) {
      case TYPE_FIELD.TEXT_INPUT:
        list_of_operator = list_condition_operator.textInput;
        break;

      case TYPE_FIELD.DATE:
        list_of_operator = list_condition_operator.date;
        break;

      case TYPE_FIELD.DROP_DOWN:
        list_of_operator = list_condition_operator.dropdown;
        break;

      case TYPE_FIELD.CHECK_BOX:
        list_of_operator = list_condition_operator.checkbox;
        break;

      case TYPE_FIELD.RADIO_BUTTON:
        list_of_operator = list_condition_operator.radiobutton;
        break;

      default:
        break;
    }

    if (list_option && list_option.length > 0 && list_option !== '') {
      list_option.forEach(item => options.push({ label: item, value: item }));
    }

    this.setState({ render_cpn, list_of_operator, options });
  };

  // Chose operator for reuseComponent
  handleChoseOperator = event => {
    console.log(event);
    this.setState({ operator: event });
    this.setSearchAdvancedData(event, 'operator');
  };

  // Put value checkbox
  setValueCheckBox = event => {
    this.setState({ value_check_box: event });
    let newValue = '';
    event.forEach((item, index) => {
      if (index !== event.length - 1) {
        newValue += item + '||';
      } else {
        newValue += item;
      }
    });
    this.setSearchAdvancedData(newValue, 'value');
  };

  // Set default title
  setDefaultTitle = fieldCode => {
    let { list_field_data, id } = this.props;
    list_field_data &&
      list_field_data.forEach(item => {
        if (item.code === fieldCode) {
          this.props.updateValueFromState(item.title, 'fieldTitle');
        }
      });
  };

  // Set value for input
  setValueForInput = event => {
    this.setState({ value_input: event.target.value });
    this.setSearchAdvancedData(event.target.value, 'value');
  };

  // Put value of radio
  setValueForRadio = event => {
    this.setState({ value_radio: event.target.value });
    this.setSearchAdvancedData(event.target.value, 'value');
  };

  // Set value for date picker
  setValueForDatePicker = (date?: Moment) => {
    let time = moment(date).format('YYYY/MM/DD HH:mm:ss');
    this.setState({ value_datepicker: time });
    this.setSearchAdvancedData(time, 'value');
  };

  // Set value for dropdown
  setValueForDropDown = event => {
    this.setState({ value_dropdown: event });
    this.setSearchAdvancedData(event, 'value');
  };

  // Set advanced data for reuseComponent
  setSearchAdvancedData = (value?: string, type?: string) => {
    let { searchAdvanced } = this.state;
    let { id } = this.props;
    searchAdvanced[type] = value;
    this.setState({ searchAdvanced });
    this.props.updateValueFromState(id, searchAdvanced);
  };

  render() {
    let { list_field_data, id, last_index, logicalOperator, default_data } = this.props;
    let {
      list_of_operator,
      type,
      options,
      value_radio,
      value_dropdown,
      value_input,
      value_datepicker,
      value_check_box,
      default_title
    } = this.state;
    let render_cpn = null;

    switch (type) {
      case TYPE_FIELD.TEXT_INPUT:
        render_cpn = <Input key={id + 'input'} value={value_input} onChange={this.setValueForInput} />;
        break;
      case TYPE_FIELD.DATE:
        render_cpn = (
          <DatePicker onChange={this.setValueForDatePicker} value={value_datepicker ? moment(value_datepicker) : moment(new Date())} />
        );
        break;
      case TYPE_FIELD.CHECK_BOX:
        render_cpn = (
          <Checkbox.Group
            options={
              default_data.fieldValue && default_data.fieldValue !== '' && default_data.fieldValue.split('||')
                ? default_data.fieldValue.split('||')
                : options
            }
            value={value_check_box}
            onChange={this.setValueCheckBox}
          />
        );
        break;
      case TYPE_FIELD.RADIO_BUTTON:
        render_cpn = (
          <Radio.Group
            key={id + 'value_radio'}
            value={value_radio}
            onChange={this.setValueForRadio}
            options={options}
            defaultValue={default_data.value}
          />
        );
        break;
      case TYPE_FIELD.DROP_DOWN:
        render_cpn = (
          <Select
            key={id + 'choose data'}
            defaultValue={default_data.fieldValue ? default_data.fieldValue : 'Chọn thông tin'}
            style={{ width: '100%' }}
            value={value_dropdown}
            onChange={this.setValueForDropDown}
          >
            {options &&
              options.map((item, index) => {
                return (
                  <Option key={index} value={item.label}>
                    {item.label}
                  </Option>
                );
              })}
          </Select>
        );
        break;
      default:
        render_cpn = <Input key={id + 'input'} />;
        break;
    }

    return (
      <div className="field-data" key={id}>
        <Row>
          <Col span={1}>
            <Icon type="close" onClick={() => this.props.deleteComponentById(id)} />
          </Col>
          <Col span={6}>
            {/* Defualt select */}
            <div>
              <Select
                key={id}
                defaultValue={
                  default_data.fieldTitle && default_data.fieldTitle !== ''
                    ? default_data.fieldTitle
                    : default_title
                    ? default_title
                    : 'Chọn trường thông tin'
                }
                style={{ width: '100%' }}
                onChange={event => this.setDefaultTitle(event)}
              >
                {list_field_data &&
                  list_field_data.map(item => {
                    if (item.title !== TYPE_FIELD.TEXT_INPUT)
                      return (
                        <Option value={item.id} key={item.fieldValue}>
                          <label className="label-option" onClick={event => this.selectValue(event, item, id)}>
                            {item.title}
                          </label>
                        </Option>
                      );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={6}>
            <Select
              key={id + 'select operator'}
              defaultValue={
                default_data.operator && default_data.operator
                  ? default_data.operator
                  : list_of_operator[0]
                  ? list_of_operator[0]
                  : 'Chọn toán tử'
              }
              style={{ width: '100%' }}
              onChange={event => this.handleChoseOperator(event)}
            >
              {list_of_operator &&
                list_of_operator.map((item, index) => {
                  if (item)
                    return (
                      <Option value={item} key={item}>
                        <label className="label-option" onClick={() => this.handleChoseOperator(item)}>
                          {item.toLocaleLowerCase()}
                        </label>
                      </Option>
                    );
                })}
            </Select>
          </Col>
          <Col span={8}>{render_cpn}</Col>
          <Col span={3}>
            <Radio.Group
              key={id + 'radio group'}
              style={{
                display: last_index ? 'none' : 'block'
              }}
              onChange={event => this.props.updateRelationshipFromState(event.target.value)}
              size="small"
              buttonStyle="solid"
              value={logicalOperator}
            >
              <Radio.Button value={OPERATOR.AND} key={id + 'and'}>
                AND
              </Radio.Button>
              <Radio.Button value={OPERATOR.OR} key={id + 'or'}>
                OR
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ groupCustomerState }: IRootState) => ({
  list_field_data: groupCustomerState.list_field_data
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldData);
