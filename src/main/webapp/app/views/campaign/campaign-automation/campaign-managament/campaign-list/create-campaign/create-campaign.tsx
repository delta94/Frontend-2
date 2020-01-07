import {
  saveCampaignAutoVersion,
  getDiagramCampaign,
  resetData,
  getTemplateCampaign,
  updateInfoCampaign
} from 'app/actions/campaign-managament';
import { img_node, const_shape } from 'app/common/model/campaign-managament.model';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Breadcrumb, Card, Tag, Layout, Popover } from 'antd';
import { Container, Collapse } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import CustomNode from 'app/views/GGeditor/node/node';
import CustomEdges from 'app/views/GGeditor/egdes/egdes';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import GGEditor, { Flow } from 'gg-editor';
import './create-campaign.scss';
const { Panel } = Collapse;
const { Header } = Layout;

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
interface ICreateCampaignProps extends StateProps, DispatchProps {}

interface ICreateCampaignState {
  infoVersion: {
    type: string;
    nameVersion: string;
    idVersion: string;
    cjId: string;
    status: string;
  };
  isViewtemp: boolean;
  contentFlow: string;
}

class CreateCampaign extends React.Component<ICreateCampaignProps, ICreateCampaignState> {
  state: ICreateCampaignState = {
    infoVersion: {
      type: 'copy',
      nameVersion: '',
      idVersion: '',
      cjId: '',
      status: ''
    },
    isViewtemp: false,
    contentFlow: ''
  };
  componentDidMount() {
    const { getTemplateCampaign } = this.props;
    getTemplateCampaign();
  }

  difficulty = option => {
    let result = {
      difficulty: '',
      color: ''
    };
    switch (option) {
      case 0:
        result.difficulty = 'ĐƠN GIẢN';
        result.color = '#42C37F';
        break;
      case 1:
        result.difficulty = 'TRUNG BÌNH';
        result.color = '#9CA9AC';
        break;
      case 2:
        result.difficulty = 'PHỨC TẠP';
        result.color = '#F46C6C';
        break;
      default:
        break;
    }
    return result;
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

  cloneVersion = async item => {
    let { getDiagramCampaign } = this.props;
    let x: number = 0;
    let clone_version = JSON.parse(item);
    let graph = clone_version.graph;
    let data = {
      nodes: graph.nodes.map(item => {
        let countDataProcess = item.countAct ? `(${item.countAct})` : '';
        return {
          type: item.type,
          size: '95*95',
          shape: this.customNode(item.code, 'shape'),
          value: item.value,
          code: item.code,
          label: item.label + countDataProcess,
          backgroud: '#23C00A',
          emailConfig: item.emailConfig,
          smsConfig: item.smsConfig,
          color: '#1890FF',
          icon: this.customNode(item.code, 'icon'),
          labelOffsetY: 60,
          countAct: item.countAct,
          x: item.x,
          y: item.y,
          id: item.id
        };
      }),
      edges: graph.edges,
      groups: []
    };
    this.setState({ isViewtemp: !this.state.isViewtemp });
    await getDiagramCampaign(data);
  };

  render() {
    const { list_template } = this.props;
    return (
      <div className="container-create">
        <Row className="row-title">
          <Col span={20}>
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
                <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament/new')} href="javascript:void(0);">
                  Tạo chiến dịch
                </a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Button
              style={{ background: '#3866DD' }}
              type="primary"
              onClick={async () => {
                await this.props.updateInfoCampaign({});
                await this.props.getDiagramCampaign([]);
                await this.props.saveCampaignAutoVersion(this.state.infoVersion);
                await this.props.resetData();
                await window.location.assign('#/flow');
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              &nbsp; Tạo chiến dịch mới{' '}
            </Button>
          </Col>
        </Row>
        <br />
        <Container fluid>
          <Card>
            <div className="count-campaign">{list_template ? list_template.length : ''} chiến dịch mẫu </div>
            {list_template &&
              list_template.map((item, index) => {
                return (
                  <Col className="gutter-row" span={8} key={index} onClick={() => this.cloneVersion(item.flow)}>
                    <Popover
                      content={
                        <GGEditor className="editor-create">
                          <Flow
                            graph={{
                              edgeDaefultShape: 'custom-edge',
                              height: 300
                            }}
                            className="flow"
                            style={{ minHeight: '300px' }}
                            data={this.props.listDiagram}
                            shortcut={{ delete: false }}
                          />
                          <label>{item.description}</label>
                          <br />
                          <Button type="primary" onClick={() => window.location.assign(`#/flow`)}>
                            Chọn
                          </Button>
                          <CustomNode />
                          <CustomEdges />
                        </GGEditor>
                      }
                      title=""
                      trigger="click"
                    >
                      <div className="gutter-box">
                        <label className="text-title">{item.name}</label>
                        <Tag className="tag-group-content" style={{ margin: '1% 5%' }} color="#E6E8E9">
                          <label>#NHÓM 1</label>
                        </Tag>
                        <p>{item.description}</p>
                        <Tag color={this.difficulty(item.difficulty).color} style={{ margin: '7% 3%' }}>
                          <label style={{ lineHeight: '0' }}>{this.difficulty(item.difficulty).difficulty}</label>
                        </Tag>
                      </div>
                    </Popover>
                  </Col>
                );
              })}
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ campaignManagament, cjState }: IRootState) => ({
  loading: campaignManagament.loading,
  list_template: campaignManagament.listTemplateCampaign,
  listDiagram: campaignManagament.listDiagram
});

const mapDispatchToProps = {
  saveCampaignAutoVersion,
  getDiagramCampaign,
  resetData,
  getTemplateCampaign,
  updateInfoCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaign);
