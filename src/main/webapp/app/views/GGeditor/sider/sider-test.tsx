import React from 'react';
import { IRootState } from 'app/reducers';
import { connect } from 'react-redux';
import { getEmailTest, testCampaign } from 'app/actions/campaign-managament';
import { Row, Col, Checkbox, Input, Button, Layout, Icon, Select } from 'antd';
const { Sider } = Layout;
const { Option } = Select;
interface ISiderTestProps extends StateProps, DispatchProps {}
interface ISiderTestState {
  collapsed: boolean;
  customer: {};
  email: string;
  phone: string;
  isCheckPhone: boolean;
  isCheckEmail: boolean;
  isCheckCustomer: boolean;
}
const constCheckBox = {
  CHECK_BOX_CUSTOMER: 'customer',
  CHECK_BOX_EMAIL: 'email',
  CHECK_BOX_PHONE: 'phone'
};
const constantEvent = {
  CUSTOMER: 'customer',
  EMAIL: 'email',
  PHONE: 'phone'
};
export class SiderTest extends React.Component<ISiderTestProps, ISiderTestState> {
  state: ISiderTestState = {
    collapsed: false,
    customer: {},
    email: '',
    phone: '',
    isCheckCustomer: false,
    isCheckEmail: false,
    isCheckPhone: false
  };

  componentDidMount() {
    this.props.getEmailTest();
  }

  handleChange(value, option) {
    let { list_customer_with_condition } = this.props;
    switch (option) {
      case constantEvent.CUSTOMER:
        let infoCustomer =
          list_customer_with_condition &&
          list_customer_with_condition
            .map(item => {
              if (value === item.id) {
                return {
                  id: item.id,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  mobile: item.mobile,
                  email: item.email
                };
              }
            })
            .filter(Boolean);
        this.setState({ customer: infoCustomer });
        break;
      case constantEvent.EMAIL:
        this.setState({ email: value });
        break;

      case constantEvent.PHONE:
        this.setState({ phone: value.target.value });
        break;
      default:
        break;
    }
  }

  handleChangeCheckBox = (value, option) => {
    switch (option) {
      case constCheckBox.CHECK_BOX_CUSTOMER:
        this.setState({ isCheckCustomer: value.target.checked });
        break;
      case constCheckBox.CHECK_BOX_EMAIL:
        this.setState({ isCheckEmail: value.target.checked });
        break;
      case constCheckBox.CHECK_BOX_PHONE:
        this.setState({ isCheckPhone: value.target.checked });
        break;
      default:
        break;
    }
  };

  getValueEdges = (sourceAnchor, source) => {
    let valueEdges: string;
    let { listDiagram } = this.props;
    listDiagram.nodes.map(event => {
      if (source === event.id) {
        if (event.code === 'TIMER_EVENT' || event.code === 'TIMER' || event.code === 'GATEWAY') {
          if (sourceAnchor === 3) {
            return (valueEdges = 'true');
          } else if (sourceAnchor === 1) {
            return (valueEdges = 'false');
          }
        } else {
          return (valueEdges = '');
        }
      }
    });
    return valueEdges;
  };

  getEmailConfig = id => {
    let { listFieldData } = this.props;
    let data = null;
    listFieldData.emailConfig &&
      listFieldData.emailConfig.map(item => {
        if (id === item.id) {
          data = {
            name: item.valueName,
            title: item.valueTitle,
            content: item.contentEmail
          };
        }
      });
    return data;
  };

  getSmsConfig = id => {
    let { listFieldData } = this.props;
    let data = null;
    listFieldData.messageConfig &&
      listFieldData.messageConfig.map(item => {
        if (id === item.id) {
          data = {
            name: item.name,
            content: item.content
          };
        }
      });
    return data;
  };

  testProcess = () => {
    let { isCheckCustomer, isCheckEmail, isCheckPhone, customer, email, phone } = this.state;
    let { listDiagram, testCampaign } = this.props;
    let graph = {
      nodes:
        listDiagram.nodes &&
        listDiagram.nodes.map(event => {
          return {
            type: event.type,
            label: event.label,
            code: event.code,
            value: event.code === 'TIMER_EVENT' || event.code === 'TIMER' ? ' PT3S' : event.value,
            id: event.id,
            emailConfig: this.getEmailConfig(event.id),
            smsConfig: this.getSmsConfig(event.id),
            gatewayConfig: null,
            timerEventConfig: null
          };
        }),
      edges:
        listDiagram.edges &&
        listDiagram.edges.map(value => {
          return {
            source: value.source,
            target: value.target,
            sourceAnchor: value.sourceAnchor,
            targetAnchor: value.targetAnchor,
            id: value.id,
            value: this.getValueEdges(value.sourceAnchor, value.source)
          };
        })
    };
    let data = {
      emailTest: isCheckEmail ? email : '',
      mobileTest: isCheckPhone ? phone : '',
      customer: isCheckCustomer ? customer[0] : '',
      graph
    };
    testCampaign(data);
    console.log(data);
  };

  render() {
    let { collapsed } = this.state;
    const { list_customer_with_condition, listEmailTest } = this.props;

    return (
      <Sider width={370} collapsed={collapsed}>
        <div className="header-sider">
          <label className="tool-bar" style={{ display: collapsed ? 'none' : 'contents' }}>
            TEST CHIẾN DỊCH
          </label>
          {collapsed ? (
            <Icon
              type="double-right"
              onClick={() => {
                this.setState({ collapsed: !collapsed });
              }}
            />
          ) : (
            <Icon
              type="double-left"
              onClick={() => {
                this.setState({ collapsed: !collapsed });
              }}
              className="icon-collapse"
            />
          )}
        </div>
        <hr />
        <div className="logo" style={{ display: collapsed ? 'none' : 'block' }}>
          <Row style={{ marginBottom: '6%' }}>
            <label className="title-sider-test">Dữ liệu test</label>
          </Row>
          <Row style={{ marginBottom: '6%' }}>
            <Col span={24}>
              {' '}
              <Checkbox className="text-sider-text" onChange={event => this.handleChangeCheckBox(event, constCheckBox.CHECK_BOX_CUSTOMER)}>
                Chọn khách hàng
              </Checkbox>
            </Col>
            <Col span={24} style={{ textAlign: 'center' }}>
              {' '}
              <Select style={{ width: '92%' }} onChange={event => this.handleChange(event, constantEvent.CUSTOMER)}>
                {list_customer_with_condition &&
                  list_customer_with_condition.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.firstName + item.lastName}{' '}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginBottom: '6%' }}>
            <Col span={24}>
              {' '}
              <Checkbox className="text-sider-text" onChange={event => this.handleChangeCheckBox(event, constCheckBox.CHECK_BOX_EMAIL)}>
                Email test
              </Checkbox>
            </Col>
            <Col span={24} style={{ textAlign: 'center' }}>
              {' '}
              <Select style={{ width: '92%' }} onChange={event => this.handleChange(event, constantEvent.EMAIL)}>
                {listEmailTest &&
                  listEmailTest.map((item, index) => {
                    return (
                      <Option key={index} value={item.email}>
                        {item.email}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginBottom: '6%' }}>
            <Col span={24}>
              {' '}
              <Checkbox className="text-sider-text" onChange={event => this.handleChangeCheckBox(event, constCheckBox.CHECK_BOX_PHONE)}>
                SDT test
              </Checkbox>
            </Col>
            <Col span={24} style={{ textAlign: 'center' }}>
              {' '}
              <Input style={{ width: '92%' }} onChange={event => this.handleChange(event, constantEvent.PHONE)} />
            </Col>
          </Row>
          <Button onClick={this.testProcess} className="btn-test" type="primary">
            Test
          </Button>
        </div>
      </Sider>
    );
  }
}
const mapStateToProps = ({ campaignManagament, groupCustomerState }: IRootState) => ({
  loading: groupCustomerState.list_customer_with_condition_index.loading,
  list_customer_with_condition: groupCustomerState.list_customer_with_condition,
  listEmailTest: campaignManagament.listEmailTest,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData
});

const mapDispatchToProps = {
  getEmailTest,
  testCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderTest);
