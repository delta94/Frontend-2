import React from 'react';
import { Row, Col, Popover, Checkbox, Input, Button, Layout, Menu, Breadcrumb, Icon, Select, Modal as ModalAntd } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import FlowItemPanel from '../EditorItemPannel/FlowItemPanel';
const { Option } = Select;
interface ISiderTestProps {}
interface ISiderTestState {
  collapsed: boolean;
}
export class SiderTest extends React.Component<ISiderTestProps, ISiderTestState> {
  state: ISiderTestState = {
    collapsed: false
  };

  render() {
    let { collapsed } = this.state;
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
              <Checkbox className="text-sider-text">Chọn khách hàng</Checkbox>
            </Col>
            <Col span={24}>
              {' '}
              <Select defaultValue="Tên" style={{ width: '92%' }}>
                <Option value="{{Tên}}">item 1</Option>
                <Option value="{{Email}}">item 2</Option>
                <Option value="{{Số Điện Thoại}}">item 3</Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginBottom: '6%' }}>
            <Col span={24}>
              {' '}
              <Checkbox className="text-sider-text">Email rest</Checkbox>
            </Col>
            <Col span={24}>
              {' '}
              <Select defaultValue="Tên" style={{ width: '92%' }}>
                <Option value="{{Tên}}">item 1</Option>
                <Option value="{{Email}}">item 2</Option>
                <Option value="{{Số Điện Thoại}}">item 3</Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginBottom: '6%' }}>
            <Col span={24}>
              {' '}
              <Checkbox className="text-sider-text">SDT test</Checkbox>
            </Col>
            <Col span={24}>
              {' '}
              <Input />
            </Col>
          </Row>
          <Button type="primary">Test</Button>
        </div>
      </Sider>
    );
  }
}
export default SiderTest;
