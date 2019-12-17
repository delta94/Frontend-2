import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Row, Col, Popover, Input, Button, Layout, Menu, Breadcrumb, Icon, Select, Modal as ModalAntd } from 'antd';
import { getDiagramCampaign, validateCampaign } from 'app/actions/campaign-managament';
const { Header, Content, Footer, Sider } = Layout;
import FlowItemValidate from '../EditorItemPannel/flow-item-pannel-validate';

interface ISiderValidateProps extends StateProps, DispatchProps {}
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
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData
});

const mapDispatchToProps = {
  getDiagramCampaign,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderValidate);
