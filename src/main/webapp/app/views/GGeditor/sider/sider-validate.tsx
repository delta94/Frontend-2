import React from 'react';
import { Row, Col, Popover, Input, Button, Layout, Menu, Breadcrumb, Icon, Select, Modal as ModalAntd } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import FlowItemValidate from '../EditorItemPannel/flow-item-pannel-validate';

interface ISiderValidateProps {}
interface ISiderValidateState {
  collapsed: boolean;
}
export class SiderValidate extends React.Component<ISiderValidateProps, ISiderValidateState> {
  state: ISiderValidateState = {
    collapsed: false
  };

  render() {
    let { collapsed } = this.state;
    return (
      <Sider width={370} collapsed={collapsed}>
        <div className="header-sider">
          <label className="tool-bar" style={{ display: collapsed ? 'none' : 'contents' }}>
            KẾT QUẢ KIỂM TRA
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
          <FlowItemValidate />
        </div>
      </Sider>
    );
  }
}
export default SiderValidate;
