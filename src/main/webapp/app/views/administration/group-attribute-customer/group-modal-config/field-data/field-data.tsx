import React from 'react';
import { IRootState } from 'app/reducers';
import { Input, Icon, Checkbox, Menu, Card, Dropdown, Row, Col, Select, Radio, DatePicker, Button } from 'antd';
import './field-data.scss';
import { OPERATOR, TYPE_FIELD } from '../../../../../constants/field-data';
import { IListFieldData } from 'app/common/model/group-attribute-customer';
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
  list_field_data?: IListFieldData[];
  setFieldDataFromFieldCpn: Function;
  deleteComponentById: Function;
}

interface IFieldDataState {
  type: string;
  list_of_operator?: Array<string>;
  relation_ship: string;
  operator?: string;
  render_cpn?: any;
  option_radio?: Array<{ label: string; value: string }>;
  value_input?: string;
  value_check_box?: Array<any>[];
  value_dropdown?: string;
  value_datepicker?: any;
  value_radio?: string;
}

class FieldData extends React.Component<IFieldDataProps, IFieldDataState> {
  state: IFieldDataState = {
    type: 'Text Input',
    list_of_operator: list_condition_operator.textInput,
    relation_ship: list_operator_relationship[0].name,
    operator: null,
    render_cpn: null,
    value_input: '',
    value_check_box: [],
    value_dropdown: '',
    value_datepicker: null,
    value_radio: '',
    option_radio: []
  };

  // Chose type of render in reuseComponent
  handleChoseOption = (type: string, item: any) => {
    console.log(type, item);
    this.setState({ type });
    this.handleChoseTypeOfRenderCpn(type);
  };

  // TODO:Chose Component for reuseComponent
  handleChoseTypeOfRenderCpn = (type: string) => {
    let { render_cpn, list_of_operator } = this.state;
    list_of_operator = [];

    switch (type) {
      case TYPE_FIELD.TEXT_INPUT:
        list_of_operator = list_condition_operator.textInput;
        break;

      case TYPE_FIELD.DATE:
        list_of_operator = list_condition_operator.date;
        break;

      case TYPE_FIELD.DROP_DOWN:
        render_cpn = null;
        list_of_operator = list_condition_operator.dropdown;
        break;

      case TYPE_FIELD.CHECK_BOX:
        list_of_operator = list_condition_operator.checkbox;
        break;

      case TYPE_FIELD.RADIO_BUTTON:
        list_of_operator = list_condition_operator.radiobutton;
        break;

      default:
        list_of_operator = list_condition_operator.textInput;
    }

    this.setState({ render_cpn, list_of_operator });
  };

  // Chose operator for reuseComponent
  handleChoseOperator = event => {
    this.setState({ operator: event });
  };

  // TODO:Chose data of component for reuseComponent

  // TODO:Chose relationship for reuseComponent
  handleChoseRelationShip = event => {
    this.setState({ relation_ship: event.target.value });
  };

  // TODO:Chose list of operator

  // TODO:Clear reuseComponent

  // TODO:Send Dada to props after change one a random value

  componentDidMount() {}

  render() {
    let { list_field_data, id, last_index } = this.props;
    let { relation_ship, list_of_operator, type } = this.state;
    let render_cpn = null;

    switch (type) {
      case TYPE_FIELD.TEXT_INPUT:
        render_cpn = <Input key={id + 'input'} />;
        break;
      case TYPE_FIELD.DATE:
        render_cpn = <DatePicker />;
        break;
      case TYPE_FIELD.CHECK_BOX:
        render_cpn = <Checkbox />;
        break;
      case TYPE_FIELD.RADIO_BUTTON:
        render_cpn = <Input />;
        break;
      case TYPE_FIELD.DROP_DOWN:
        render_cpn = <Input />;
        break;

      default:
        break;
    }
    try {
      return (
        <div className="field-data" key={id}>
          <Row>
            <Col span={7}>
              <div>
                <Select
                  key={id + 'find value'}
                  defaultValue={'Chọn trường thông tin'}
                  style={{ width: '100%' }}
                  onChange={(type, item) => this.handleChoseOption(type, item)}
                >
                  {list_field_data &&
                    list_field_data.map((item, index) => {
                      return (
                        <Option value={item.type} key={id + index + 'select value'}>
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
                  list_of_operator.map((item, index) => (
                    <Option value={item} key={id + index + 'select operator'}>
                      {item.toLocaleLowerCase()}
                    </Option>
                  ))}
              </Select>
            </Col>
            <Col span={7}>{render_cpn}</Col>
            <Col span={3}>
              <Radio.Group
                key={id + 'radio group'}
                style={{
                  display: last_index ? 'none' : 'block'
                }}
                onChange={this.handleChoseRelationShip}
                size="small"
                buttonStyle="solid"
                value={relation_ship}
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
    } catch (err) {
      throw err;
    }
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default FieldData;
