import React from 'react';
import { Row, Col, Popover, Input, Button, Layout, Menu, Breadcrumb, Icon, Select, Modal as ModalAntd } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import FlowItemPanel from '../EditorItemPannel/FlowItemPanel';

interface ISiderComponetProps {}
interface ISiderComponetState {
  collapsed: boolean;
}
export class SiderComponet extends React.Component<ISiderComponetProps, ISiderComponetState> {
  state: ISiderComponetState = {
    collapsed: false
  };

  render() {
    let { collapsed } = this.state;
    return (
      <Sider width={370} collapsed={collapsed}>
        <div className="header-sider">
          <label className="tool-bar" style={{ display: collapsed ? 'none' : 'contents' }}>
            CÔNG CỤ
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
          <FlowItemPanel />
        </div>
      </Sider>
    );
  }
}
export default SiderComponet;
