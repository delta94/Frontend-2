import React from 'react';
import { IRootState } from 'app/reducers';
import { Input, Icon, Checkbox, Row, Col, Select, Radio, DatePicker, Button } from 'antd';
import './field-data.scss';
import { OPERATOR, TYPE_FIELD } from '../../../../../constants/field-data';
import { IListFieldData } from 'app/common/model/group-attribute-customer';
import { makeid } from '../group-modal-config';
import { ISearchAdvanced } from '../../../../../common/model/group-attribute-customer';
import { Moment } from 'moment';
import moment from 'moment';

const { Option } = Select;

const list_operator_relationship = [
  {
    label: 'And',
    name: OPERATOR.AND
  },
  {
    label: 'Or',
    name: OPERATOR.OR
  }
];

const list_operator_self = {
  Equal: {
    label: 'Equal',
    name: OPERATOR.EQUAL
  },
  GreatOrEqual: {
    label: 'Great Or Equal',
    name: OPERATOR.GREATER_OR_EQUAL
  },
  Contain: {
    label: 'Contain',
    name: OPERATOR.CONTAIN
  },
  LessOrEqual: {
    label: 'Less Or Equal',
    name: OPERATOR.LESS_OR_EQUAL
  }
};

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
  list_field_data?: IListFieldData[];
  updateValueFromState: Function;
  deleteComponentById: Function;
  updateRelationshipFromState: Function;
}

interface IFieldDataState {
  type: string;
  list_of_operator?: Array<string>;
  operator?: string;
  render_cpn?: any;
  options?: any;
  value_input?: string;
  value_check_box?: Array<any>[];
  value_dropdown?: string;
  value_datepicker?: string;
  value_radio?: string;
  searchAdvanced: ISearchAdvanced;
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
    searchAdvanced: {
      field: '',
      value: '',
      operator: ''
    }
  };

  componentDidMount() {}

  // Chose type of render in reuseComponent
  handleChoseOption = (id_field: string, item: any) => {
    let key_split = item.key;
    let { searchAdvanced } = this.state;
    let { list_field_data, id } = this.props;
    let type = '';
    let field = '';

    // Add field
    list_field_data.forEach(item => {
      if (item.id === id_field) {
        type = item.type;
        field = item.code;
      }
    });

    let list_option = key_split.split('||');
    this.setState({ type, searchAdvanced });
    this.handleChoseTypeOfRenderCpn(type, list_option);
    this.setSearchAdvancedData(field, 'field');
  };

  // Chose Component for reuseComponent
  handleChoseTypeOfRenderCpn = (type: string, list_option: String[]) => {
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

    if (list_option && list_option.length > 0) {
      list_option.forEach(item => options.push({ label: item, value: item }));
    }

    this.setState({ render_cpn, list_of_operator, options });
  };

  // Chose operator for reuseComponent
  handleChoseOperator = event => {
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
  setValueForDatePicker = (date, dateString) => {
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
    let { list_field_data, id, last_index, logicalOperator } = this.props;
    let { list_of_operator, type, options, value_radio, value_dropdown } = this.state;
    let render_cpn = null;

    switch (type) {
      case TYPE_FIELD.TEXT_INPUT:
        render_cpn = <Input key={id + 'input'} onChange={this.setValueForInput} />;
        break;
      case TYPE_FIELD.DATE:
        render_cpn = <DatePicker onChange={this.setValueForDatePicker} />;
        break;
      case TYPE_FIELD.CHECK_BOX:
        render_cpn = <Checkbox.Group options={options} onChange={this.setValueCheckBox} />;
        break;
      case TYPE_FIELD.RADIO_BUTTON:
        render_cpn = <Radio.Group key={id + 'value_radio'} value={value_radio} onChange={this.setValueForRadio} options={options} />;
        break;
      case TYPE_FIELD.DROP_DOWN:
        render_cpn = (
          <Select key={id + 'choose data'} defaultValue={'Chọn thông tin'} style={{ width: '100%' }} onChange={this.setValueForDropDown}>
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
        render_cpn = <Input key={id + 'input'} readOnly />;
        break;
    }
    return (
      <div className="field-data" key={id}>
        <Row>
          <Col span={6}>
            <div>
              <Select
                key={id}
                defaultValue={'Chọn trường thông tin'}
                style={{ width: '100%' }}
                onChange={(type, item) => this.handleChoseOption(type, item)}
              >
                {list_field_data &&
                  list_field_data.map(item => {
                    if (item.title !== TYPE_FIELD.TEXT_INPUT)
                      return (
                        <Option value={item.id} key={item.fieldValue}>
                          {item.title}
                        </Option>
                      );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={6}>
            <Select
              key={id + 'select operator'}
              defaultValue={'Chọn toán tử'}
              style={{ width: '100%' }}
              onChange={this.handleChoseOperator}
            >
              {list_of_operator &&
                list_of_operator.map((item, index) => {
                  if (item)
                    return (
                      <Option value={item} key={item}>
                        {item.toLocaleLowerCase()}
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
          <Col span={1}>
            <Icon type="close" onClick={() => this.props.deleteComponentById(id)} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default FieldData;
