import React, { Fragment } from 'react';
import { Row, Col, Popover, Button, Layout, Breadcrumb, Icon, notification, Collapse, Modal } from 'antd';
const { Sider, Header } = Layout;
const { Panel } = Collapse;
import SweetAlert from 'sweetalert-react';
import { openModal, closeModal } from 'app/actions/modal';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import {
  saveCampaignAuto,
  getNode,
  getDiagramCampaign,
  validateCampaign,
  cloneVersion,
  saveCampaignAutoVersion,
  activeProcessCampaign,
  validateGraph,
  cloneVersionById,
  resetListCloneVersion,
  copyCJCampaign,
  getListVersion
} from 'app/actions/campaign-management';
import { IRootState } from 'app/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCopy, faTrashAlt, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { code_node, img_node, const_shape } from 'app/common/models/campaign-management.model';


import './style.scss';
import './flow-diagram-editor/index.scss';
import {
  DecisionNodeModel,
  StartNodeModel,
  ProcessNodeModel,
  FlowDiagramEditor,
  GroupProcess,
  DefaultGroupProcess,
  DecisionGroupProcess,
  NewBranchGroupProcess,
  TrayItemWidget,
  toConfigData, createGroupProcessWidget, createGroupProcess
} from './flow-diagram-editor';
import { DiagramWidget } from 'storm-react-diagrams';
import { FlowNodeSelectionModal } from './flow-node-selection-modal';
import { FlowNodeConfigModal } from './flow-node-config-modal';
import { FlowNodeModel } from 'app/views/flow-editor/flow-diagram-editor/FlowNodeModel';

const ButtonGroup = Button.Group;
const { confirm } = Modal;

interface IFlowEditorProps extends StateProps, DispatchProps {}
interface IFlowEditorState {
  visible: boolean;
  isOpen: boolean;
  collapsed: boolean;
  isUpdateNode: boolean;
  isOpenModalEmail: boolean;
  isOpenModalInfo: boolean;
  isOpenFlowNodeSelectionModal: boolean;
  isOpenFlowNodeConfigModal: boolean;
  isTest: boolean;
  isValidate: boolean;
  isOpenModalWait: boolean;
  isOpenModalMessage: boolean;
  isOpenModalWaitForEvent: boolean;
  isSave: boolean;
  isOpenGateWay: boolean;
  titleMail: string;
  timeStartCampaign: string;
  data: any;
  idNode: any;
  idEdge: any;
  port: any;
  node: any;
  advancedSearches: {};
  nameGroup: string;
}

export class FlowEditor extends React.Component<IFlowEditorProps, IFlowEditorState> {
  state: IFlowEditorState = {
    visible: false,
    isOpen: false,
    collapsed: false,
    isUpdateNode: false,
    isOpenModalEmail: false,
    isOpenFlowNodeSelectionModal: false,
    isOpenFlowNodeConfigModal: false,
    isTest: false,
    isOpenModalInfo: false,
    isOpenModalWaitForEvent: false,
    isOpenModalMessage: false,
    isOpenModalWait: false,
    isValidate: false,
    isSave: true,
    isOpenGateWay: false,
    data: [],
    advancedSearches: {},
    idNode: {},
    idEdge: {},
    port: null,
    node: null,
    titleMail: '',
    timeStartCampaign: '',
    nameGroup: ''
  };
  editor: FlowDiagramEditor;

  componentWillMount() {
    let { listDiagram } = this.props;
    this.editor = new FlowDiagramEditor();

    const onDropEventHandler = async (node, port, nodeData, dataTransfer) => {
      let groupProcess = createGroupProcess(dataTransfer.type);
      if (groupProcess && port) {
        await this.editor.addGroupProcess(groupProcess, port);
        await this.props.getDiagramCampaign(this.editor.getDiagramData());
        await this.forceUpdate();
      }
    };

    const onConfigClickEventHandler = async (node, nodeData) => {
      await this.setState({ node: node });
      await this.showFlowNodeConfigModal();
    };

    const onAddClickEventHandler = async (node, port) => {
      await this.setState({ port: port });
      await this.showFlowNodeSelectionModal();
    };

    const onExtClickEventHandler = async (node, port) => {
      let groupProcess = createGroupProcess(NewBranchGroupProcess.TYPE);
      if (groupProcess) {
        await this.editor.addGroupProcess(groupProcess, port);
        await this.props.getDiagramCampaign(this.editor.getDiagramData());
        await this.forceUpdate();
      }
    };

    const onDeleteEventHandler = async (node, nodeData) => {
      await this.editor.deleteNode(node);
      await this.forceUpdate();
    };

    this.editor.setEventHandlers({
      onDropEventHandler: onDropEventHandler,
      onConfigClickEventHandler: onConfigClickEventHandler,
      onAddClickEventHandler: onAddClickEventHandler,
      onDeleteEventHandler: onDeleteEventHandler,
      onExtClickEventHandler: onExtClickEventHandler
    });

    this.editor.setDiagramData({
      nodes: listDiagram.nodes,
      edges: listDiagram.edges
    });
  }

  componentDidMount() {
    let { listDiagram, getDiagramCampaign } = this.props;
    localStorage.removeItem('isSave');
    if (listDiagram.nodes && listDiagram.nodes.length === 0) {
      getDiagramCampaign([]);
    }
  }

  handleOnSelectionModalItemClick = async (event, data) => {
    let { port } = this.state;
    if (port && data) {
      let dataTransfer = JSON.parse(data);
      let groupProcess = createGroupProcess(dataTransfer.type);
      if (groupProcess) {
        await this.editor.addGroupProcess(groupProcess, port);
        await this.props.getDiagramCampaign(this.editor.getDiagramData());
        await this.forceUpdate();
      }
    }

    await this.setState({ isOpenFlowNodeSelectionModal: false, port: null });
  };

  handleOnConfigModalSubmitClick = async (data:{name?: string; selectedIcon?: string;}) => {
    let {node} = this.state;
    if(node && node instanceof  FlowNodeModel){
      node.label = data.name;
      node.icon = data.selectedIcon;
      this.editor.setNodeInfo([{id: node.id, label: node.label, isActive: node.isActive, icon: node.icon}]);
      this.forceUpdate();
      this.setState({node : node});
    }
  };

  handleOnDragStart = async event => {
    this.editor.setDropZoneVisible(true);
    this.forceUpdate();
  };

  handleOnDragEnd = async event => {
    this.editor.setDropZoneVisible(false);
    this.forceUpdate();
  };


  showFlowNodeSelectionModal = () => {
    let { isOpenFlowNodeSelectionModal } = this.state;
    this.setState({ isOpenFlowNodeSelectionModal: !isOpenFlowNodeSelectionModal });
  };

  showFlowNodeConfigModal = () => {
    let { isOpenFlowNodeConfigModal } = this.state;
    this.setState({ isOpenFlowNodeConfigModal: !isOpenFlowNodeConfigModal });
  };


  //close Popover Setting
  hide = () => {
    this.setState({
      isOpen: false
    });
  };

  // handler Popover Setting
  handleVisibleChange = visible => {
    this.setState({ isOpen: visible });
  };



  getValueEdges = (sourceAnchor, source) => {
    let valueEdges: string;
    let { listDiagram } = this.props;
    listDiagram = this.editor.getDiagramData();
    listDiagram.nodes &&
      listDiagram.nodes.map(event => {
        if (source === event.id) {
          if (event.code === code_node.TIMER_EVENT || event.code === code_node.TIMER || event.code === code_node.GATEWAY) {
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


  //event save campaign
  saveCampaign = async () => {
    const { openModal } = this.props;
    await openModal({
      show: true,
      type: 'success',
      title: translate('modal-data.title.success'),
      text: 'Lưu chiến dịch thành công'
    });
  };

  renderTrayItemWidget(type: string) {
    let className =
      type === DecisionGroupProcess.TYPE || type === NewBranchGroupProcess.TYPE
        ? 'tray-item-large'
        : null;
    return (
      <TrayItemWidget
        model={{ type: type }}
        className={className}
        onDragStart={this.handleOnDragStart}
        onDragEnd={this.handleOnDragEnd}
        isDrag={true}
      />
    );
  }

  renderTrayItemLabelWidget(type: string) {
    return (
      <div
        style={{
          marginTop: '8px'
        }}
      >
        {translate('diagram.node.' + type)}
      </div>
    );
  }

  renderTrayWidget() {
    let { collapsed } = this.state;
    return (
      <Sider width={130} collapsed={collapsed}>
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
          <Fragment>
            <Collapse bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
              <Panel header="Hành động" key="1">
                <Row className="row">
                  <Col style={{width: '64px'}}>
                    {this.renderTrayItemWidget(DefaultGroupProcess.TYPE)}
                    <div style={{width: '100%', textAlign: 'center'}}>
                      {this.renderTrayItemLabelWidget(DefaultGroupProcess.TYPE)}
                    </div>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Collapse bordered={false} defaultActiveKey={['2']} expandIconPosition="right">
              <Panel header="Điều kiện" key="2">
                <Row className="row">
                  <Col style={{width: '90px'}}>
                    {this.renderTrayItemWidget(DecisionGroupProcess.TYPE)}
                    <div style={{width: '100%', textAlign: 'center'}}>
                      {this.renderTrayItemLabelWidget(DecisionGroupProcess.TYPE)}
                    </div>

                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Fragment>
        </div>
      </Sider>
    );
  }

  renderFlowDiagram() {
    let { infoCampaign } = this.props;

    return (
      <div className="editor">
        <Layout className="layout-flow">
          {this.renderTrayWidget()}
          <Layout style={{ maxWidth: '100%', height: '100%' }}>
            <Header className="header-flow">
              <Row>
                <Col span={24} className="titleContent">
                  <Row>
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>
                        <a onClick={() => window.location.assign('/#/app/views/customers/user-management')} href="javascript:void(0);">
                          <FontAwesomeIcon icon={faHome} />
                        </a>
                      </Breadcrumb.Item>
                      <label className="ant-breadcrumb-link">
                        {infoCampaign.name ? infoCampaign.name : translate("diagram.common.label_new_diagram")}
                      </label>



                      <Button onClick={() => {}} type="primary" style={{ float: 'right', marginLeft: '16px' }}>
                        <Translate contentKey="diagram.common.button_save" />
                      </Button>

                      <Button onClick={() => {
                        this.editor.increaseZoomLevel(5);
                        this.forceUpdate();
                      }} type="ghost" style={{ float: 'right', marginLeft: '8px'  }}>
                        +
                      </Button>

                      <Button onClick={() => {
                        this.editor.decreaseZoomLevel(5);
                        this.forceUpdate();
                      }} type="ghost" style={{ float: 'right', marginLeft: '8px'  }}>
                        -
                      </Button>
                    </Breadcrumb>
                  </Row>
                </Col>
              </Row>
            </Header>
            <div
              className="diagram-layer"
              onDragOver={event => {
                event.preventDefault();
              }}
            >
              <DiagramWidget className="srd-flow-canvas" allowCanvasZoom={false} diagramEngine={this.editor.getDiagramEngine()} smartRouting={false} />
            </div>
          </Layout>
        </Layout>
      </div>
    );
  }

  render() {
    let {
      isOpenFlowNodeSelectionModal,
      isOpenFlowNodeConfigModal,
      node,
    } = this.state;
    let { modalState } = this.props;
    let configData = node && node instanceof  FlowNodeModel ? {name: node.label, selectedIcon: node.icon} : {name: '', selectedIcon: ''};

    return (
      <Fragment>
        <SweetAlert
          title={modalState.title ? modalState.title : 'No title'}
          confirmButtonColor=""
          show={modalState.show ? modalState.show : false}
          text={modalState.text ? modalState.text : 'No'}
          type={modalState.type ? modalState.type : 'error'}
          onConfirm={() => this.props.closeModal()}
        />
        <FlowNodeSelectionModal toggleModal={this.showFlowNodeSelectionModal} isOpenModal={isOpenFlowNodeSelectionModal} onClick={this.handleOnSelectionModalItemClick} />
        <FlowNodeConfigModal toggleModal={this.showFlowNodeConfigModal} isOpenModal={isOpenFlowNodeConfigModal} onSubmit={this.handleOnConfigModalSubmitClick} data={configData} />
        {this.renderFlowDiagram()}
      </Fragment>
    );
  }
}
const mapStateToProps = ({ campaignManagement, handleModal }: IRootState) => ({
  loading: campaignManagement.loading,
  list_tree_folder: campaignManagement.tree_folder,
  idFolder: campaignManagement.listNode,
  infoCampaign: campaignManagement.listInfoCampaing,
  listDiagram: campaignManagement.listDiagram,
  listFieldData: campaignManagement.listFieldData,
  infoVersion: campaignManagement.infoVersion,
  list_clone_version: campaignManagement.cloneInfoVersion,
  id_active: campaignManagement.idActive,
  modalState: handleModal.data,
  list_validate: campaignManagement.list_validate,
  list_version: campaignManagement.listVersion,
  is_validate: campaignManagement.isCheckValidate
});

const mapDispatchToProps = {
  saveCampaignAuto,
  getNode,
  getDiagramCampaign,
  validateCampaign,
  cloneVersion,
  saveCampaignAutoVersion,
  activeProcessCampaign,
  openModal,
  closeModal,
  validateGraph,
  cloneVersionById,
  resetListCloneVersion,
  copyCJCampaign,
  getListVersion
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlowEditor);
