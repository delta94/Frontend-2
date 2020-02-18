import {
  saveCampaignAutoVersion,
  getDiagramCampaign,
  resetData,
  getTemplateCampaign,
  updateInfoCampaign,
  resetListCloneVersion
} from 'app/actions/campaign-managament';
import { img_node, const_shape } from 'app/common/models/campaign-managament.model';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Breadcrumb, Card, Tag, Layout, Popover, Modal } from 'antd';
import { Container, Collapse } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import CustomNode from 'app/views/ggeditor/node/node';
import CustomEdges from 'app/views/ggeditor/egdes/egdes';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FlowDiagramEditor, GroupProcess } from 'app/views/ggeditor/flow-diagram-editor';
import 'app/views/ggeditor/flow-diagram-editor/index.scss';
import { DiagramWidget, DiagramEngine } from 'storm-react-diagrams';
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
  listTemp: any[];
  collapse: boolean;
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
    contentFlow: '',
    listTemp: [],
    collapse: false
  };
  editor: FlowDiagramEditor;
  componentWillMount() {
    let { listDiagram } = this.props;
    this.editor = new FlowDiagramEditor();
    this.editor.setDiagramData({
      nodes: listDiagram.nodes,
      edges: listDiagram.edges
    });
    this.editor.setNodeInfo(
      listDiagram.nodes &&
        listDiagram.nodes.map(event => {
          return {
            id: event.id,
            isActive: true
          };
        })
    );
    this.editor.setReadOnly(true);
  }
  componentDidMount = async () => {
    const { getTemplateCampaign, list_template } = this.props;
    await getTemplateCampaign();
    await this.getList();
  };
  getList() {
    const { getTemplateCampaign, list_template } = this.props;
    let data =
      list_template &&
      list_template.map(item => {
        return {
          ...item,
          collapse: false
        };
      });
    this.setState({ listTemp: data });
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

  cloneVersion = async (item, id) => {
    let { getDiagramCampaign, listDiagram } = this.props;
    let x: number = 0;
    let clone_version = JSON.parse(item);
    let graph = clone_version.graph;

    let { listTemp, collapse } = this.state;
    (await listTemp) &&
      listTemp.map(value => {
        if (value.id === id) {
          value.collapse = !collapse;
        } else {
          value.collapse = false;
        }
      });
    if (!collapse) {
      await this.editor.setDiagramData({
        nodes: graph.nodes,
        edges: graph.edges
      });

      await getDiagramCampaign(this.editor.getDiagramData());
    }

    this.setState({ collapse: !collapse });
  };
  renderDiagramWidget = data => {
    let diagram = new FlowDiagramEditor();
    diagram.setDiagramData({
      nodes: data.nodes,
      edges: data.edges
    });
    diagram.setNodeInfo(
      data.nodes &&
        data.nodes.map(event => {
          return {
            id: event.id,
            isActive: true
          };
        })
    );
    diagram.setReadOnly(true);

    return <DiagramWidget className="srd-flow-canvas" diagramEngine={diagram.getDiagramEngine()} smartRouting={false} />;
  };

  renderContent(item, index) {
    return (
      <Col style={{ zIndex: 10 }} className="gutter-row" span={8} key={index}>
        <div
          className="gutter-box"
          onClick={async () => {
            await this.cloneVersion(item.flow, item.id);
          }}
        >
          <label className="text-title">{item.name}</label>
          <Tag className="tag-group-content" style={{ margin: '1% 5%' }} color="#E6E8E9">
            <label>#NHÓM 1</label>
          </Tag>
          <p>{item.description}</p>
          <Tag color={this.difficulty(item.difficulty).color} style={{ margin: '7% 3%' }}>
            <label style={{ lineHeight: '0' }}>{this.difficulty(item.difficulty).difficulty}</label>
          </Tag>
        </div>
      </Col>
    );
  }
  renderTemplate(item, index) {
    return (
      <Collapse isOpen={item.collapse}>
        <Row>
          <Col span={24}>
            <Card style={{ background: '#FBFBFB' }}>
              <Col span={18}>{this.renderDiagramWidget(this.editor.getDiagramData())}</Col>
              <Col span={6}>
                <label className="descrition-template">{item.description}</label>
              </Col>
              <Button
                type="primary"
                className="btn-template"
                onClick={async () => {
                  let data = {
                    name: 'Tạo chiến dịch mới',
                    tag: [''],
                    des: ''
                  };
                  await this.props.updateInfoCampaign(data);
                  let inforVersion = { ...this.state.infoVersion, type: 'template' };
                  await this.props.saveCampaignAutoVersion(inforVersion);
                  await this.props.resetListCloneVersion();
                  await window.location.assign(`#/flow`);
                }}
              >
                Chọn Template
              </Button>
            </Card>
          </Col>
        </Row>
      </Collapse>
    );
  }

  render() {
    const { list_template } = this.props;
    let { listTemp } = this.state;
    let items = [];
    let itemIndex = 0;
    let renderDiagram = (item, index) => this.renderTemplate(item, index);
    let renderContent = (item, index) => this.renderContent(item, index);
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
                  <Translate contentKey="campaign-auto.title" />
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament')} href="javascript:void(0);">
                  <Translate contentKey="campaign-auto.managament.list-campaign" />
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament/new')} href="javascript:void(0);">
                  <Translate contentKey="campaign-auto.create-campaign" />
                </a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Button
              style={{ background: '#3866DD' }}
              type="primary"
              onClick={async () => {
                let data = {
                  name: 'Tạo chiến dịch mới',
                  tag: [''],
                  des: ''
                };
                await this.props.updateInfoCampaign(data);
                await this.props.getDiagramCampaign([]);
                let inforVersion = { ...this.state.infoVersion, type: 'create' };
                await this.props.saveCampaignAutoVersion(inforVersion);
                await this.props.resetData();
                await this.props.resetListCloneVersion();
                await window.location.assign('#/flow');
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              &nbsp; <Translate contentKey="campaign-auto.list.create-campaign" />{' '}
            </Button>
          </Col>
        </Row>

        <br />
        <Container fluid>
          <Card>
            <div className="count-campaign">{list_template ? list_template.length : ''} chiến dịch mẫu </div>
            {listTemp &&
              listTemp.map((item, index, list) => {
                let countGrid: number = 0;
                countGrid = countGrid + 2;

                if (itemIndex === 3) {
                  itemIndex = 0;
                  items = [];
                }
                itemIndex = itemIndex + 1;
                items.push(item);
                return (
                  <div>
                    {renderContent(item, index)}
                    {itemIndex === 3 && items.map((gItem, gIndex, list) => renderDiagram(gItem, gIndex))}
                  </div>
                );
              })}
            <div>{itemIndex !== 3 && items.map((gItem, gIndex, list) => renderDiagram(gItem, gIndex))}</div>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ campaignManagament, cjState }: IRootState) => ({
  loading: campaignManagament.loading,
  list_template: campaignManagament.listTemplateCampaign,
  listDiagram: campaignManagament.listDiagram,
  list_clone_version: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  saveCampaignAutoVersion,
  getDiagramCampaign,
  resetData,
  getTemplateCampaign,
  updateInfoCampaign,
  resetListCloneVersion
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaign);
