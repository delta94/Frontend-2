import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import CustomNode from '../node/node';
import CustomEdges from '../egdes/egdes';
import Minimap from '../EditorMinMap/editor-mini-map';
import GGEditor, { Flow } from 'gg-editor';
import { Row, Col, Popover, Button, Layout, Breadcrumb, Icon, Modal as ModalAntd } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCopy, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './details-flow.scss';

const { Header } = Layout;
interface IFlowPageProps extends StateProps, DispatchProps {}
interface IFlowPageState {}

export class FlowPage extends React.Component<IFlowPageProps, IFlowPageState> {
  state: IFlowPageState = {};

  render() {
    let { infoCampaign, listDiagram, infoVersion } = this.props;
    return (
      <Fragment>
        <GGEditor className="editor-details">
          <Layout style={{ minHeight: '200vh' }}>
            <Header className="header-flow">
              <Row>
                <Col span={24} className="titleContent">
                  <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                      <a onClick={() => window.location.assign('/#/app/views/customers/user-management')} href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome} />
                      </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-auto')} href="javascript:void(0);">
                        Chiến dịch tự động
                      </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament')} href="javascript:void(0);">
                        Danh sách chiến dịch
                      </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a
                        onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament/new')}
                        href="javascript:void(0);"
                      >
                        Tạo chiến dịch
                      </a>
                    </Breadcrumb.Item>
                    <label className="ant-breadcrumb-link" />
                  </Breadcrumb>
                </Col>
              </Row>
            </Header>
            <Row type="flex" className="editorHd">
              <Col span={24} style={{ borderBottom: '0.25px solid', padding: '1%' }}>
                <Col span={4}>
                  <label>Phiên bản: 1.0</label>
                </Col>
                <Col span={8}>
                  <label>Trạng Thái : Bản nháp</label>
                </Col>

                <Col span={2}>
                  <Button type="primary" style={{ float: 'right' }}>
                    Kích hoạt
                  </Button>
                </Col>
              </Col>
            </Row>
            <Flow
              graph={{
                edgeDefaultShape: 'custom-edge'
              }}
              className="flow"
              data={listDiagram}
              shortcut={{ delete: false }}
            />
            <CustomNode />
            <CustomEdges />
          </Layout>
        </GGEditor>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  infoCampaign: campaignManagament.listInfoCampaing,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData,
  infoVersion: campaignManagament.infoVersion
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowPage);
