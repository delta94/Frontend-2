import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import CustomNode from '../node/node';
import Loader from 'react-loader-advanced';
import { Card } from 'reactstrap';
import CustomEdges from '../egdes/egdes';
import GGEditor, { Flow } from 'gg-editor';
import { Row, Col, Select, Button, Layout, Breadcrumb, Icon, Modal as ModalAntd } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { cloneVersion, getDiagramCampaign } from 'app/actions/campaign-managament';
import { img_node, const_shape } from 'app/common/model/campaign-managament.model';
import LoaderAnim from 'react-loaders';
import './details-flow.scss';
import { listUserService } from 'app/services/user-management';

const { Option } = Select;
const { Header } = Layout;
interface IFlowPageProps extends StateProps, DispatchProps {}
interface IFlowPageState {}

const constant_version = {
  DRAFT: 'Draft',
  FINISH: 'Finish',
  RUNNING: 'Running',
  STOP: 'Stop'
};
const code_node = {
  SOURCE: 'SOURCE',
  EVENT: 'EVENT',
  DES: 'DES',
  SEND_SMS: 'SEND_SMS',
  SEND_MAIL: 'SEND_MAIL',
  GATEWAY: 'GATEWAY',
  TIMER: 'TIMER',
  TIMER_EVENT: 'TIMER_EVENT'
};
export class FlowPage extends React.Component<IFlowPageProps, IFlowPageState> {
  state: IFlowPageState = {};

  componentDidMount() {
    let { clone_version } = this.props;
    if (clone_version && Object.keys(clone_version).length < 1) {
      window.location.assign(`#/app/views/campaigns/campaign-managament`);
    }
  }

  selectVersion = async id => {
    const { cloneVersion } = this.props;
    await cloneVersion(id);
    await this.cloneVersion();
  };

  customNode(code, option) {
    let data: string;
    switch (option) {
      case 'shape':
        switch (code) {
          case code_node.EVENT:
          case code_node.SOURCE:
            data = const_shape.CIRCLE;
            break;

          case code_node.SEND_MAIL:
          case code_node.SEND_SMS:
            data = const_shape.FLOW;
            break;

          case code_node.TIMER:
          case code_node.TIMER_EVENT:
          case code_node.GATEWAY:
            data = const_shape.RHOMSBUS;
            break;
          case code_node.DES:
            data = const_shape.CIRCLE;
            break;
          default:
            break;
        }
        break;
      case 'icon':
        switch (code) {
          case code_node.EVENT:
            data = img_node.EVENT;
            break;

          case code_node.SOURCE:
            data = img_node.SOURCE;
            break;

          case code_node.SEND_MAIL:
            data = img_node.SEND_MAIL;
            break;

          case code_node.SEND_SMS:
            data = img_node.SEND_SMS;
            break;

          case code_node.TIMER:
            data = img_node.TIMER;
            break;

          case code_node.TIMER_EVENT:
            data = img_node.TIMER_EVENT;
            break;

          case code_node.GATEWAY:
            data = img_node.GATEWAY;
            break;

          case code_node.DES:
            data = img_node.END;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    return data;
  }

  cloneVersion = async () => {
    let { clone_version, getDiagramCampaign } = this.props;
    let x: number = 0;
    let graph = clone_version.flowDetail.graph;
    let data = {
      nodes: graph.nodes.map(item => {
        x = x + 200;
        return {
          type: item.type,
          size: '95*95',
          shape: this.customNode(item.code, 'shape'),
          value: item.value,
          code: item.code,
          label: item.label,
          backgroud: '#23C00A',
          emailConfig: item.emailConfig,
          smsConfig: item.smsConfig,
          color: '#1890FF',
          icon: this.customNode(item.code, 'icon'),
          labelOffsetY: 60,
          x: x,
          y: 140,
          id: item.id
        };
      }),
      edges: clone_version.flowDetail.graph.edges,
      groups: []
    };
    await getDiagramCampaign(data);
  };
  render() {
    const imgSetting = require('app/assets/utils/images/flow/setting.png');
    let { clone_version, listDiagram, list_version, infoVersion, loading } = this.props;
    const eventStatus = option => {
      let data;

      switch (option) {
        case constant_version.DRAFT:
          data = 'Bản nháp';
          break;
        case constant_version.FINISH:
          data = 'Kết thúc';
          break;
        case constant_version.RUNNING:
          data = 'Đang thực hiện';
          break;
        case constant_version.STOP:
          data = 'Dừng';
        default:
          break;
      }
      return data;
    };
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Loader message={spinner1} show={loading} priority={1}>
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

                    <label className="ant-breadcrumb-link">{infoVersion.nameVersion}</label>
                  </Breadcrumb>
                </Col>
              </Row>
            </Header>
            <Row className="editorHd-details">
              <Col span={24} style={{ padding: '1%' }}>
                <Col span={4}>
                  <label>Phiên bản: </label>{' '}
                  <Select onChange={this.selectVersion} style={{ width: '20%' }} defaultValue={clone_version.version}>
                    {list_version &&
                      list_version.map((item, index) => {
                        return (
                          <Option key={index} value={item.cjVersionId}>
                            {item.version}
                          </Option>
                        );
                      })}
                  </Select>
                </Col>
                <Col span={8}>
                  <label style={{ lineHeight: '2' }}>Trạng Thái : {eventStatus(clone_version.status)}</label>
                </Col>
                <Col span={7} style={{ textAlign: 'right' }}>
                  <img src={imgSetting} />
                </Col>
                <Col span={4} style={{ float: 'right' }}>
                  <Button type="primary">Tạo mới version</Button>
                  <Button type="primary" style={{ background: '#97A3B4', borderColor: 'unset', float: 'right' }}>
                    Dừng version
                  </Button>
                </Col>
              </Col>
            </Row>
            <Row style={{ padding: '0 1% 1% 1%' }}>
              <Card>
                <Flow
                  graph={{
                    edgeDefaultShape: 'custom-edge',
                    height: 400
                  }}
                  className="flow"
                  data={listDiagram}
                  shortcut={{ delete: false }}
                />
              </Card>
            </Row>
            <CustomNode />
            <CustomEdges />
          </Layout>
        </GGEditor>
      </Loader>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  infoCampaign: campaignManagament.listInfoCampaing,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData,
  infoVersion: campaignManagament.infoVersion,
  list_version: campaignManagament.listVersion,
  clone_version: campaignManagament.cloneInfoVersion,
  getDiagramCampaign
});

const mapDispatchToProps = {
  cloneVersion
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowPage);
