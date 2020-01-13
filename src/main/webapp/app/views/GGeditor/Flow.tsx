import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Popover,
  Button,
  Layout,
  Breadcrumb,
  Icon,
  Modal as ModalAntd,
  notification,
  Collapse,
  Modal
} from 'antd';
const { Sider } = Layout;
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
} from 'app/actions/campaign-managament';
import { IRootState } from 'app/reducers';
import ConfigEmail from './config-email/config-email';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCopy, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import ModalGroupCustomer from './modal-group-customer/modal-group-customer';
import UpdateInfoCampaign from './modal-update-info/modal-update-info';
const { Header } = Layout;
import './style.scss';
import { code_node, img_node, const_shape } from 'app/common/model/campaign-managament.model';
import ConfigMessage from './modal-config-message/modal-config-message';
import SiderTest from './sider/sider-test';
import ModalWaitForEvent from './modal-wait-for-event/modal-wait-for-event';
import ModalTimeWait from './modal-wait/modal-wait';
import SiderValidate from './sider/sider-validate';
import ModalGateWay from './modal-gateway/modal-gateway';

import './flow-diagram-editor/index.scss';
import {
  ConditionDecisionNodeModel,
  ContactSourceStartNodeModel,
  EmailProcessNodeModel,
  EventSourceStartNodeModel,
  EventWaitingDecisionNodeModel,
  FlowDiagramEditor,
  GroupProcess,
  SmsProcessNodeModel,
  TimeWaitingDecisionNodeModel,
  TrayItemWidget,
  TrayWidget
} from './flow-diagram-editor';
import { DiagramWidget } from 'storm-react-diagrams';

const ButtonGroup = Button.Group;
const { confirm } = Modal;
interface IFlowPageProps extends StateProps, DispatchProps { }
interface IFlowPageState {
  visible: boolean;
  isOpen: boolean;
  collapsed: boolean;
  isUpdateNode: boolean;
  isOpenModalEmail: boolean;
  isOpenModalInfo: boolean;
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
  advancedSearches: {};
  nameGroup: string;
}

export class FlowPage extends React.Component<IFlowPageProps, IFlowPageState> {
  state: IFlowPageState = {
    visible: false,
    isOpen: false,
    collapsed: false,
    isUpdateNode: false,
    isOpenModalEmail: false,
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
    titleMail: '',
    timeStartCampaign: '',
    nameGroup: ''
  };
  editor: FlowDiagramEditor;

  componentWillMount() {
    let { listDiagram } = this.props;
    this.editor = new FlowDiagramEditor();

    const onDropEventHandler = async (node, port, nodeData, dataTransfer) => {
      // console.log('setOnDropEventHandler');
      // console.log(node);
      // console.log(port);
      // console.log(data);
      let groupProcess = GroupProcess.createGroupProcess(dataTransfer.type);
      if (groupProcess && port) {
        await this.editor.addGroupProcess(groupProcess, port);
        await localStorage.removeItem('isSave');
        await this.props.getDiagramCampaign(this.editor.getDiagramData());
        await this.forceUpdate();
      }
    };

    const onClickEventHandler = async (node, nodeData) => {
      await this.setState({ idNode: nodeData });
      await this.getVisible(true, '', '', true);
    };

    const onAddClickEventHandler = async (node, port) => {
      console.log('setOnAddClickEventHandler');
      console.log(node);
      console.log(port);
    };

    const onDeleteEventHandler = async (node, nodeData) => {
      await this.editor.deleteNode(node);
      await this.forceUpdate();
    };

    this.editor.setEventHandlers({
      onDropEventHandler: onDropEventHandler,
      onClickEventHandler: onClickEventHandler,
      onAddClickEventHandler: onAddClickEventHandler,
      onDeleteEventHandler: onDeleteEventHandler
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

  handleOnDragStart = async event => {
    this.editor.setDropZoneVisible(true);
    this.forceUpdate();
  };

  handleOnDragEnd = async event => {
    this.editor.setDropZoneVisible(false);
    this.forceUpdate();
  };

  // handler Open modal
  getVisible = async (event, valueName, searchAdv, isSuccess) => {
    let { getDiagramCampaign, validateCampaign, listFieldData, listDiagram } = this.props;
    let {
      idNode,
      advancedSearches,
      timeStartCampaign,
      data,
      isOpenModalMessage,
      isOpenModalWaitForEvent,
      isOpenModalWait,
      nameGroup,
      isOpenModalEmail
    } = this.state;
    let diagram = listDiagram;
    switch (idNode.code) {
      case code_node.SOURCE:
        this.setState({ visible: event });
        if (valueName) {
          diagram.nodes && diagram.nodes.map(item => {
            if (item.id === idNode.id) {
              item.label = String(valueName).split(',')[0];
              nameGroup = String(valueName).split(',')[0];
            }
          });

          timeStartCampaign = String(valueName).split(',')[1];
          advancedSearches = searchAdv;
          let fieldListCustomer = {
            id: idNode.id,
            name: valueName ? String(valueName).split(',')[0] : '',
            timeStartCampaign: timeStartCampaign,
            advancedSearches: advancedSearches
          };
          let dataList = {
            messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
            emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
            listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
            timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
            timer: listFieldData.timer ? listFieldData.timer : [],
            getway: listFieldData.getway ? listFieldData.getway : []
          };
          dataList.listCampign.push(fieldListCustomer);
          // get value node list customer
          localStorage.removeItem('isSave');
          await validateCampaign(dataList);
          // save node in flow
          await getDiagramCampaign(diagram);
          await this.editor.setNodeLabel(listDiagram.nodes)
          this.setState({ timeStartCampaign, advancedSearches, isUpdateNode: true, data: diagram, nameGroup });
        }

        break;
      case code_node.SEND_MAIL:
        this.setState({ isOpenModalEmail: event });
        if (isOpenModalEmail && valueName) {
          diagram.nodes.map(item => {
            if (item.id === idNode.id) {
              item.label = valueName;
            }
          });
          await getDiagramCampaign(diagram);
          await this.editor.setNodeLabel(listDiagram.nodes)
        }
        break;
      case code_node.TIMER_EVENT:
        this.setState({ isOpenModalWaitForEvent: !isOpenModalWaitForEvent });
        break;
      case code_node.TIMER:
        this.setState({ isOpenModalWait: !isOpenModalWait });
        break;
      case code_node.SEND_SMS:
        this.setState({ isOpenModalMessage: !isOpenModalMessage });
        if (isOpenModalMessage && valueName) {
          diagram.nodes.map(item => {
            if (item.id === idNode.id) {
              item.label = valueName.name;
            }
          });
          await getDiagramCampaign(diagram);
          await this.editor.setNodeLabel(listDiagram.nodes)
        }
        break;
      case code_node.GATEWAY:
        this.setState({ isOpenGateWay: !this.state.isOpenGateWay });
        break;
      default:
        break;
    }
  };
  //get title email save in Node
  getInfoEmail = (event, value) => {
    let { titleMail } = this.state;
    const { validateCampaign, listFieldData } = this.props;
    titleMail = event;
    this.setState({ titleMail });
  };

  //excute command
  commandExecute = command => {
    let name = command.command.name;
    let model = command.command;
    switch (name) {
      case 'delete':
        this.deleteModel(command.command.itemIds[0]);
        break;
      case 'add':
        this.addModel(model);
        break;
      default:
        break;
    }
  };

  // remove item in array
  remove(arr, item) {
    if (arr && arr.length > 0) {
      for (var i = arr.length; i--;) {
        if (arr[i].id === item.id) {
          arr.splice(i, 1);
        }
      }
      return arr;
    }
    return [];
  }

  //delete Node
  deleteModel = async id => {
    let { listDiagram, getDiagramCampaign, listFieldData, validateCampaign } = this.props;
    let { idNode, idEdge } = this.state;
    let data = {
      nodes: [],
      edges: []
    };

    if (listDiagram && Object.keys(listDiagram).length > 0) {
      data = listDiagram;
    }
    switch (idNode.type ? idNode.type : idEdge.type) {
      case 'node':
        data.nodes = this.remove(data.nodes, idNode);
        data.edges = this.remove(data.edges, idNode);
        if (idNode.code === 'SEND_MAIL') {
          let data = this.remove(listFieldData.emailConfig, idNode);
          listFieldData.emailConfig = data;
          validateCampaign(listFieldData);
        }
        break;

      case 'edge':
        data.edges = this.remove(data.edges, idNode);

        break;

      default:
        break;
    }
    localStorage.removeItem('isSave');
    getDiagramCampaign(data);
    this.setState({ data });
  };

  //add node and save in local store
  addModel = async command => {
    let { listDiagram, getDiagramCampaign } = this.props;
    let type = command.type;
    let data = {
      edges: [],
      nodes: []
      // groups: []
    };

    switch (type) {
      case 'edge':
        if (listDiagram.edges && Object.keys(listDiagram).length > 0) {
          data = listDiagram;
        }
        data.edges.push(command.addModel);
        break;
      case 'node':
        if (listDiagram.nodes && Object.keys(listDiagram).length > 0) {
          data = listDiagram;
        }
        data.nodes.push(command.addModel);
        this.setState({ isSave: true });
        break;
      default:
        break;
    }
    localStorage.removeItem('isSave');
    await getDiagramCampaign(data);
    this.setState({ data });
  };

  //@@
  //modal edit info campaign
  showModalInfoCampaign = () => {
    let { infoCampaign } = this.props;
    let { isOpenModalInfo } = this.state;
    this.setState({ isOpenModalInfo: !isOpenModalInfo });
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

  replicateCampaign = async () => {
    let { list_clone_version, cloneVersionById, saveCampaignAutoVersion, infoVersion, id_active, openModal, resetListCloneVersion } = this.props;
    let idCj = id_active.cjId && id_active.cjId ? id_active.cjId : list_clone_version && list_clone_version.cjId ? list_clone_version.cjId : infoVersion.idVersion
    let dataInfoVersion = {
      type: 'copy',
      nameVersion: '',
      idVersion: '',
      cjId: '',
      status: ''
    };
    confirm({
      title: `Bạn có muốn nhân bản chiến dịch này ?`,
      content: '',
      zIndex: 1000000,
      onOk: async () => {
        await resetListCloneVersion()
        await this.props.copyCJCampaign(idCj);
        await this.cloneVersion('create');
        await saveCampaignAutoVersion(dataInfoVersion);
        this.getDataDiagram().cjVersionId = null,
          this.getDataDiagram().cj.id = null
        console.log(this.getDataDiagram())
        await openModal({
          show: true,
          type: 'success',
          title: translate('modal-data.title.success'),
          text: 'Nhân bản chiến dịch thành công'
        });
        this.hide();
      },
      onCancel() { },
      okText: 'Đồng ý',
      cancelText: 'Hủy bỏ'
    });
  };

  cloneVersion = async option => {
    let { list_clone_version, getDiagramCampaign } = this.props;
    let x: number = 0;
    let graph = list_clone_version.flowDetail.graph;
    let data = {
      nodes: graph.nodes.map(item => {
        // if user chosse view process version
        let dataProcess = option === 'view' ? (item.countAct ? `(${item.countAct})` : '') : '';

        x = x + 200;
        return {
          type: item.type,
          size: '95*95',
          shape: this.customNode(item.code, 'shape'),
          value: item.value,
          code: item.code,
          label: item.label + dataProcess,
          backgroud: '#23C00A',
          emailConfig: item.emailConfig,
          smsConfig: item.smsConfig,
          color: '#1890FF',
          icon: this.customNode(item.code, 'icon'),
          labelOffsetY: 60,
          countAct: item.countAct,
          x: x,
          y: 140,
          id: item.id
        };
      }),
      edges: list_clone_version.flowDetail.graph.edges,
      groups: []
    };
    await getDiagramCampaign(data);
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

  //Content Popover Setting
  contentSetting() {
    let { id_active, list_clone_version } = this.props;
    return (
      <Row>
        <Row>
          <Button
            disabled={id_active.id && id_active.id.length > 0 ? false : Object.keys(list_clone_version).length > 0 ? false : true}
            type="link"
            onClick={this.replicateCampaign}
            className="btn-multi"
          >
            <FontAwesomeIcon icon={faCopy} /> &nbsp; <label>Nhân bản chiến dịch</label>
          </Button>
        </Row>
        <Row>
          <Button type="link" onClick={this.hide} className="btn-multi">
            <FontAwesomeIcon icon={faTrashAlt} color="red" /> &nbsp; <label style={{ color: 'red' }}>Xóa version này</label>
          </Button>
        </Row>
        <Row>
          <Button type="link" onClick={this.hide} className="btn-multi">
            <Icon type="notification" style={{ color: 'red' }} /> &nbsp; <label style={{ color: 'red' }}>Xóa chiến dịch này</label>
          </Button>
        </Row>
      </Row>
    );
  }

  //test flow
  isCloseSiderTest = (isOpen: boolean) => {
    this.setState({ isTest: isOpen, isValidate: false })
  }


  //validate flow
  validateFlow = (isOpen: boolean) => {
    let { id_active } = this.props
    this.setState({ isTest: false, isValidate: isOpen });
    let hasValidate = JSON.parse(localStorage.getItem('isSave')) === true ? false : true;
    if (Object.keys(id_active).length > 0) {
      this.props.validateGraph(this.getDataDiagram());
    }
    this.setState({ isSave: hasValidate });
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

  getValueNodes = (id): string => {
    let { listDiagram } = this.props;
    let result: string = ''
    listDiagram.nodes &&
      listDiagram.nodes.map(item => {
        if (id === item.id) {
          if (item.code === code_node.TIMER_EVENT || item.code === code_node.TIMER || item.code === code_node.GATEWAY) {
            result = item.value
          }
        }
      });

    return result
  }

  //event save campaign
  saveCampaign = async () => {
    const { saveCampaignAuto, openModal } = this.props;
    console.log(this.getDataDiagram())
    await saveCampaignAuto(this.getDataDiagram());
    await openModal({
      show: true,
      type: 'success',
      title: translate('modal-data.title.success'),
      text: 'Lưu chiến dịch thành công'
    });
  };

  //get Data diagram
  getDataDiagram = () => {
    let node = this.editor.getDiagramData();
    const { idFolder, infoCampaign, listFieldData, list_clone_version } = this.props;
    let { timeStartCampaign, advancedSearches, nameGroup } = this.state;
    let nodeMetaData: any[] = [];
    listFieldData.emailConfig &&
      listFieldData.emailConfig.forEach(value =>
        nodeMetaData.push({
          nodeId: value.id,
          code: code_node.SEND_MAIL,
          nodeConfig: {
            id: value.idEmail,
            name: value.valueName,
            titlle: value.valueTitle,
            content: null
          }
        })
      );

    listFieldData.messageConfig &&
      listFieldData.messageConfig.forEach(value =>
        nodeMetaData.push({
          nodeId: value.id,
          code: code_node.SEND_SMS,
          nodeConfig: {
            id: value.id,
            name: value.name,
            content: value.content
          }
        })
      );
    listFieldData.timerEvent &&
      listFieldData.timerEvent.forEach(value =>
        nodeMetaData.push({
          nodeId: value.id,
          code: code_node.TIMER_EVENT,
          nodeConfig: {
            eventType: value.event,
            emailTemplateId: null
          }
        })
      );
    listFieldData.getway &&
      listFieldData.getway.forEach(value =>
        nodeMetaData.push({
          nodeId: value.id,
          code: code_node.GATEWAY,
          nodeConfig: {
            logicalOperator: value.logicalOperator,
            advancedSearches: value.advancedSearches
          }
        })
      );
    let graph = {
      nodes:
        node.nodes &&
        node.nodes.map(event => {
          return {
            type: event.type,
            label: event.label,
            code: event.code,
            value: /*event.value*/ this.getValueNodes(event.id),
            id: event.id,
            x: event.x,
            y: event.y
          };
        }),
      edges:
        node.edges &&
        node.edges.map(value => {
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
    let date = new Date();

    let cjTags =
      infoCampaign.tag && infoCampaign.tag.length > 0
        ? infoCampaign.tag
        : list_clone_version.cjTags && list_clone_version.cjTags.length > 0
          ? list_clone_version.cjTags
          : [];
    let startTime = timeStartCampaign
      ? timeStartCampaign
      : Object.keys(list_clone_version).length > 0
        ? list_clone_version.flowDetail.startTime
        : `${date.toISOString().substr(0, 10)} ${date.toLocaleTimeString()}`;
    //set data
    let data = {
      folderId: idFolder ? idFolder : '-99',
      cjVersionId:
        this.props.id_active.cjId
          ? this.props.id_active.id :
          Object.keys(list_clone_version).length > 0
            ? list_clone_version.id
              ? list_clone_version.id
              : this.props.id_active.cjId
                ? this.props.id_active.id
                : null

            : null,
      cj: {
        id:
          this.props.id_active.id
            ? this.props.id_active.cjId :
            Object.keys(list_clone_version).length > 0
              ? list_clone_version.cjId
                ? list_clone_version.cjId
                : this.props.id_active.id
                  ? this.props.id_active.cjId
                  : null

              : null,
        name: infoCampaign.name ? infoCampaign.name : list_clone_version.name ? list_clone_version.name : 'Tạo chiến dịch mới',
        description: infoCampaign.des
          ? infoCampaign.des
          : list_clone_version.description
            ? list_clone_version.description
            : infoCampaign.des
      },
      cjTags: cjTags && cjTags.length > 0 ? (cjTags[0] === '' ? [] : cjTags) : cjTags,
      flow: {
        customerGroupName: nameGroup
          ? nameGroup
          : Object.keys(list_clone_version).length > 0
            ? list_clone_version.flowDetail.customerGroupName
            : '',
        startTime: startTime,
        customerAdvancedSave:
          Object.keys(advancedSearches).length > 0
            ? advancedSearches
            : Object.keys(list_clone_version).length > 0
              ? list_clone_version.flowDetail.customerAdvancedSave
              : null,
        nodeMetaData:
          nodeMetaData && nodeMetaData.length > 0
            ? nodeMetaData
            : Object.keys(list_clone_version).length > 0
              ? list_clone_version.flowDetail.nodeMetaData
              : [],
        graph: Object.keys(graph).length > 0 ? graph : Object.keys(list_clone_version).length > 0 ? list_clone_version.flowDetail.graph : []
      }
    };
    return data;
  };

  activeProcess = async () => {
    const { activeProcessCampaign, list_clone_version, infoVersion, id_active, openModal, cloneVersion } = this.props;
    let data = id_active.id ? id_active.id : list_clone_version.id ? list_clone_version.id : '';
    if (data) {
      await activeProcessCampaign(data);
      await cloneVersion(data);
      await window.location.assign(`/#/app/views/campaigns/campaign-managament`);
      notification['success']({
        message: 'thành công',
        description: 'Bạn vừa kích hoạt chiến dịch thành công.'
      });
    }
  };

  renderTrayItemWidget(type: string) {
    return <TrayItemWidget model={{ type: type }} onDragStart={this.handleOnDragStart} onDragEnd={this.handleOnDragEnd} isDrag={true} />;
  }

  renderTrayWidget() {
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
          <Fragment>
            <Collapse bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
              <Panel header="Nguồn dữ liệu" key="1">
                <Row className="row">
                  <Col span={8}>
                    {this.renderTrayItemWidget(ContactSourceStartNodeModel.TYPE)}
                    <br />
                  </Col>
                  <Col span={8}>
                    {this.renderTrayItemWidget(EventSourceStartNodeModel.TYPE)}
                    <br />
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Collapse bordered={false} defaultActiveKey={['2']} expandIconPosition="right">
              <Panel header="Messages" key="2">
                <Row className="row">
                  <Col span={8}>
                    {this.renderTrayItemWidget(SmsProcessNodeModel.TYPE)}
                    <br />
                  </Col>
                  <Col span={8}>
                    {this.renderTrayItemWidget(EmailProcessNodeModel.TYPE)}
                    <br />
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Collapse bordered={false} defaultActiveKey={['3']} expandIconPosition="right">
              <Panel header="Điều kiện" key="3">
                <Row className="row">
                  <Col span={8}>
                    {this.renderTrayItemWidget(ConditionDecisionNodeModel.TYPE)}
                    <br />
                    <br />
                  </Col>

                  <Col span={8}>
                    {this.renderTrayItemWidget(TimeWaitingDecisionNodeModel.TYPE)}
                    <br />
                    <br />
                  </Col>
                  <Col span={8}>
                    {this.renderTrayItemWidget(EventWaitingDecisionNodeModel.TYPE)}
                    <br />
                    <br />
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            {/* // </Sider> */}
          </Fragment>
        </div>
      </Sider>
    );
  }

  renderFlowDiagram() {
    let { isOpenModalInfo, idNode, isTest, isOpenModalMessage, isOpenModalWaitForEvent, isOpenModalWait, data, isValidate } = this.state;
    let { infoCampaign, listDiagram, list_validate, id_active, list_clone_version } = this.props;
    let dataNode = this.editor.getDiagramData();
    const imgSetting = require('app/assets/utils/images/flow/setting.png');
    const imgAward = require('app/assets/utils/images/flow/award.png');
    const imgMove = require('app/assets/utils/images/flow/move.png');
    console.log(list_clone_version)
    return (
      <div className="editor">
        <Layout className="layout-flow">
          {isTest ? <SiderTest isCloseSider={isValidate} toogle={this.validateFlow} /> : isValidate ? <SiderValidate isCloseSider={isValidate} toogle={this.validateFlow} /> : this.renderTrayWidget()}
          <Layout style={{ maxWidth: '80.8%', height: '100%' }}>
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
                      <label className="ant-breadcrumb-link">
                        {infoCampaign.name ? infoCampaign.name : list_clone_version.name ? list_clone_version.name : 'Tạo chiến dịch mới'}
                      </label>
                      <Button type="link" id="config-name" onClick={this.showModalInfoCampaign}>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Button>
                    </Breadcrumb>
                  </Row>
                </Col>
              </Row>
            </Header>
            <Row type="flex" className="editorHd">
              <Col span={24} style={{ borderBottom: '0.25px solid', padding: '1%' }}>
                <Col span={4}>
                  <label>Phiên bản: {'1.0'}</label>
                </Col>
                <Col span={8}>
                  <label>Trạng Thái : {this.props.list_clone_version.status ? this.props.list_clone_version.status : 'Bản nháp'}</label>
                </Col>
                <Col span={4}>
                  <img src={imgMove} /> &nbsp;
                  <Popover
                    content={this.contentSetting()}
                    visible={this.state.isOpen}
                    placement="bottom"
                    onVisibleChange={this.handleVisibleChange}
                    title=""
                    trigger="hover"
                  >
                    <img src={imgSetting} /> &nbsp;
                  </Popover>
                  <img src={imgAward} />
                </Col>
                <Col span={6}>
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        this.isCloseSiderTest(true)
                      }}
                      disabled={JSON.parse(localStorage.getItem('isSave')) ? false : true}
                    >
                      Test
                    </Button>
                    <Button
                      onClick={async () => {
                        this.validateFlow(true);
                      }}
                      disabled={id_active.id && id_active.id.length > 0 ? false : true}
                    >
                      Validate
                    </Button>
                    <Button onClick={this.saveCampaign}>Save</Button>
                  </ButtonGroup>
                </Col>
                <Col span={2}>
                  <Button
                    onClick={() => this.activeProcess()}
                    disabled={JSON.parse(localStorage.getItem('isSave')) ? false : true}
                    type="primary"
                    style={{ float: 'right' }}
                  >
                    Kích hoạt
                  </Button>
                </Col>
              </Col>
            </Row>
            <div
              className="diagram-layer"
              onDragOver={event => {
                event.preventDefault();
              }}
            >
              <DiagramWidget className="srd-flow-canvas" diagramEngine={this.editor.getDiagramEngine()} smartRouting={false} />
            </div>
          </Layout>
        </Layout>
      </div>
    );
  }

  render() {
    let {
      isOpenModalInfo,
      idNode,
      isTest,
      isOpenModalMessage,
      isOpenModalWaitForEvent,
      isOpenModalWait,
      data,
      isOpenModalEmail
    } = this.state;
    let { modalState } = this.props;
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
        <ModalGateWay is_show={this.state.isOpenGateWay} toggle={this.getVisible} type_modal={'empty'} idNode={this.state.idNode} />
        <UpdateInfoCampaign toggleModal={this.showModalInfoCampaign} isOpenModal={isOpenModalInfo} />
        <ConfigMessage toggleModal={this.getVisible} isOpenModal={isOpenModalMessage} idNode={idNode} />
        <ModalWaitForEvent toggleModal={this.getVisible} isOpenModal={isOpenModalWaitForEvent} idNode={idNode} />
        <ModalTimeWait toggleModal={this.getVisible} isOpenModal={isOpenModalWait} idNode={idNode} />
        <ConfigEmail toggleModal={this.getVisible} isOpenModal={isOpenModalEmail} idNode={idNode} />
        {this.renderFlowDiagram()}
        <div className="content-group-modal-attribute">
          <ModalGroupCustomer
            is_show={this.state.visible}
            type_modal={'empty'}
            id_list_customer={''}
            toggle={this.getVisible}
            title_modal={'CHỌN NHÓM'}
            idNode={this.state.idNode}
          />
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ campaignManagament, handleModal }: IRootState) => ({
  loading: campaignManagament.loading,
  list_tree_folder: campaignManagament.tree_folder,
  idFolder: campaignManagament.listNode,
  infoCampaign: campaignManagament.listInfoCampaing,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData,
  infoVersion: campaignManagament.infoVersion,
  list_clone_version: campaignManagament.cloneInfoVersion,
  id_active: campaignManagament.idActive,
  modalState: handleModal.data,
  list_validate: campaignManagament.list_validate
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
  copyCJCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlowPage);
