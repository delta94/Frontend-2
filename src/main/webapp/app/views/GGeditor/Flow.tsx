import React, { Fragment } from 'react';
import GGEditor, { Flow } from 'gg-editor';
import { Row, Col, Popover, Button, Layout, Breadcrumb, Icon, Modal as ModalAntd, notification } from 'antd';
import CustomNode from './node/node';
import CustomEdges from './egdes/egdes';
import SweetAlert from 'sweetalert-react';
import FlowToolbar from './FlowToolBar/flow-tool-bar';
import { openModal, closeModal } from 'app/actions/modal';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import Save from './save/save';
import {
  saveCampaignAuto,
  getNode,
  getDiagramCampaign,
  validateCampaign,
  cloneVersion,
  saveCampaignAutoVersion,
  activeProcessCampaign
} from 'app/actions/campaign-managament';
import { IRootState } from 'app/reducers';
import ConfigEmail from './config-email/config-email';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCopy, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import ModalGroupCustomer from './modal-group-customer/modal-group-customer';
import FlowContextMenu from './EditorContextMenu/flow-context-menu';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import UpdateInfoCampaign from './modal-update-info/modal-update-info';
const { Header } = Layout;
import './style.scss';
import { code_node, img_node, const_shape } from 'app/common/model/campaign-managament.model';
import SiderComponet from './sider/sider-tool';
import ConfigMessage from './modal-config-message/modal-config-message';
import SiderTest from './sider/sider-test';
import ModalWaitForEvent from './modal-wait-for-event/modal-wait-for-event';
import ModalTimeWait from './modal-wait/modal-wait';
import SiderValidate from './sider/sider-validate';

const ButtonGroup = Button.Group;

interface IFlowPageProps extends StateProps, DispatchProps {}
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
  titleMail: string;
  timeStartCampaign: string;
  data: any;
  idNode: any;
  idEdge: any;
  advancedSearches: any[];
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
    data: [],
    advancedSearches: [],
    idNode: {},
    idEdge: {},
    titleMail: '',
    timeStartCampaign: ''
  };

  componentDidMount() {
    let { listDiagram, getDiagramCampaign } = this.props;
    if (listDiagram.nodes && listDiagram.nodes.length === 0) {
      getDiagramCampaign([]);
    }
  }

  //handler Popup send email
  confirmEmail = async () => {
    let { idNode, titleMail } = this.state;
    let { listDiagram, getDiagramCampaign, listFieldData, validateCampaign } = this.props;
    let data = listDiagram;
    await data.nodes.map(event => {
      if (event.id === idNode.id) {
        event.label = titleMail;
      }
    });

    await getDiagramCampaign(data);
    await this.setState({
      isOpenModalEmail: false,
      isUpdateNode: true,
      data: data
    });
  };

  // handler Open modal
  getVisible = async (event, valueName, searchAdv, isSuccess) => {
    let { getDiagramCampaign, validateCampaign, listFieldData, listDiagram } = this.props;
    let { idNode, advancedSearches, timeStartCampaign, data, isOpenModalMessage, isOpenModalWaitForEvent, isOpenModalWait } = this.state;
    let diagram = listDiagram;
    switch (idNode.code) {
      case code_node.SOURCE:
        this.setState({ visible: event });
        if (valueName) {
          diagram.nodes.map(item => {
            if (item.id === idNode.id) {
              item.label = String(valueName).split(',')[0];
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
            timer: listFieldData.timer ? listFieldData.timer : []
          };
          dataList.listCampign.push(fieldListCustomer);
          // get value node list customer
          await validateCampaign(dataList);
          // save node in flow
          await getDiagramCampaign(diagram);

          this.setState({ timeStartCampaign, advancedSearches, isUpdateNode: true, data: diagram });
        }

        break;
      case code_node.SEND_MAIL:
        this.setState({ isOpenModalEmail: event });
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
        }
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
    console.log(command.command);
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
      for (var i = arr.length; i--; ) {
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
    getDiagramCampaign(data);
    this.setState({ data });
  };

  //add node and save in local store
  addModel = async command => {
    let { listDiagram, getDiagramCampaign } = this.props;
    let type = command.type;
    let data = {
      edges: [],
      nodes: [],
      groups: []
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
    let { list_clone_version, cloneVersion, saveCampaignAutoVersion, infoVersion } = this.props;
    let dataInfoVersion = {
      type: 'action',
      nameVersion: '',
      idVersion: '',
      cjId: '',
      status: ''
    };
    await cloneVersion(list_clone_version && list_clone_version.id ? list_clone_version.id : infoVersion.idVersion);
    await this.cloneVersion('create');
    await saveCampaignAutoVersion(dataInfoVersion);
    this.hide();
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
    return (
      <Row>
        <Row>
          <Button
            disabled={this.props.list_clone_version.id ? false : this.props.infoVersion.idVersion ? false : true}
            type="link"
            onClick={this.replicateCampaign}
            className="btn-multi"
          >
            <FontAwesomeIcon icon={faCopy} /> &nbsp; <label>Nhân bản chiến dịch</label>
          </Button>
        </Row>
        <hr />
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

  //validate flow
  validateFlow = () => {
    let { isValidate, isSave } = this.state;
    this.setState({ isTest: false, isValidate: !isValidate });
    if (isValidate) {
      let hasValidate = JSON.parse(localStorage.getItem('isSave')) === true ? false : true;
      this.setState({ isSave: hasValidate });
    }
  };

  getValueEdges = (sourceAnchor, source) => {
    let valueEdges: string;
    let { listDiagram } = this.props;
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

  //event save campaign
  saveCampaign = async node => {
    const { idFolder, saveCampaignAuto, infoVersion, infoCampaign, openModal, listFieldData } = this.props;
    let { timeStartCampaign, advancedSearches } = this.state;
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
            content: value.contentEmail
          }
        })
      );

    listFieldData.messageConfig &&
      listFieldData.messageConfig.forEach(value =>
        nodeMetaData.push({
          nodeId: value.id,
          code: code_node.SEND_SMS,
          nodeConfig: {
            id: '',
            name: value.name,
            content: value.content
          }
        })
      );
    listFieldData.timerEvent &&
      listFieldData.timerEvent.forEach(value =>
        nodeMetaData.push({
          nodeId: value.id,
          code: code_node.SEND_SMS,
          nodeConfig: {
            eventType: value.email,
            emailTemplateId: value.idEmail
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
            value: event.value,
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
    let data = {
      folderId: idFolder,
      cjVersionId: this.props.id_active.cjId ? this.props.id_active.id : null,
      cj: {
        id: this.props.id_active.id ? this.props.id_active.cjId : null,
        name: infoCampaign.name ? infoCampaign.name : infoVersion.nameVersion ? infoVersion.nameVersion : 'Tạo chiến dịch mới',
        description: infoCampaign.des
      },
      cjTags: [
        {
          id: infoCampaign.tag,
          name: infoCampaign.nameTag
        }
      ],
      flow: {
        startTime: timeStartCampaign,
        customerAdvancedSave: advancedSearches,
        nodeMetaData: nodeMetaData,

        graph: graph
      }
    };
    await saveCampaignAuto(data);
    await openModal({
      show: true,
      type: 'success',
      title: translate('modal-data.title.success'),
      text: 'Lưu chiến dịch thành công'
    });
  };

  activeProcess = async () => {
    const { activeProcessCampaign, list_clone_version, infoVersion, id_active, openModal, cloneVersion } = this.props;
    let data = id_active.id ? id_active.id : '';
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

  render() {
    let { isOpenModalInfo, idNode, isTest, isOpenModalMessage, isOpenModalWaitForEvent, isOpenModalWait, data, isValidate } = this.state;
    let { infoCampaign, listDiagram, infoVersion, id_active, modalState } = this.props;
    const imgSetting = require('app/assets/utils/images/flow/setting.png');
    const imgAward = require('app/assets/utils/images/flow/award.png');
    const imgMove = require('app/assets/utils/images/flow/move.png');

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
        <UpdateInfoCampaign toggleModal={this.showModalInfoCampaign} isOpenModal={isOpenModalInfo} />
        <ConfigMessage toggleModal={this.getVisible} isOpenModal={isOpenModalMessage} idNode={idNode} />
        <ModalWaitForEvent toggleModal={this.getVisible} isOpenModal={isOpenModalWaitForEvent} idNode={idNode} />
        <ModalTimeWait toggleModal={this.getVisible} isOpenModal={isOpenModalWait} idNode={idNode} />
        <GGEditor
          className="editor"
          onAfterCommandExecute={command => {
            this.commandExecute(command);
          }}
        >
          <Layout className="layout-flow">
            {isTest ? <SiderTest /> : isValidate ? <SiderValidate /> : <SiderComponet />}
            <Layout style={{ maxWidth: '80.8%' }}>
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
                          <a
                            onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament')}
                            href="javascript:void(0);"
                          >
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
                          {infoCampaign.name ? infoCampaign.name : infoVersion.nameVersion ? infoVersion.nameVersion : 'Tạo chiến dịch mới'}
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
                    <label>Phiên bản: {this.props.list_clone_version.status ? this.props.list_clone_version.version : '1.0'}</label>
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
                      trigger="click"
                    >
                      <img src={imgSetting} /> &nbsp;
                    </Popover>
                    <img src={imgAward} />
                  </Col>
                  <Col span={6}>
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          this.setState({ isTest: !isTest, isValidate: false });
                        }}
                        disabled={listDiagram.nodes && listDiagram.nodes.length > 0 ? false : true}
                      >
                        Test
                      </Button>
                      <Button
                        onClick={() => {
                          this.validateFlow();
                        }}
                        disabled={listDiagram.nodes && listDiagram.nodes.length > 0 ? false : true}
                      >
                        Validate
                      </Button>
                      <Save isSave={this.state.isSave} onClick={this.saveCampaign} />
                    </ButtonGroup>
                  </Col>
                  <Col span={2}>
                    <Button
                      onClick={() => this.activeProcess()}
                      disabled={id_active ? false : true}
                      type="primary"
                      style={{ float: 'right' }}
                    >
                      Kích hoạt
                    </Button>
                  </Col>
                </Col>
                <Col span={24} style={{ padding: '0% 23%' }}>
                  <FlowToolbar />
                </Col>
              </Row>
              <Flow
                // onClick= {(e)=> {this.setState({isUpdate:true})}}
                onClick={e => {
                  console.log(e);
                  if (e.item && e.item.type === 'node') {
                    this.setState({ idNode: e.item && e.item.type === 'node' ? e.item.model : '' });
                  }
                  if (e.item && e.item.type === 'edge') {
                    this.setState({ idEdge: e.item && e.item.type === 'edge' ? e.item.model : '' });
                  }
                }}
                // onMouseMove = {(e)=>{}}
                graph={{
                  edgeDefaultShape: 'custom-edge',
                  height: 500
                }}
                className="flow"
                data={listDiagram.nodes && listDiagram.nodes.length > 0 ? listDiagram : []}
              />
              <CustomNode />
              <CustomEdges />
            </Layout>
          </Layout>
          <FlowContextMenu onClick={this.getVisible} />
        </GGEditor>
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
        <Modal className="modal-config-email" isOpen={this.state.isOpenModalEmail}>
          <ModalHeader
            toggle={() => {
              this.setState({ isOpenModalEmail: !this.state.isOpenModalEmail });
            }}
          >
            {' '}
            GỬI EMAIL
          </ModalHeader>
          <ModalBody>
            <ConfigEmail idNode={this.state.idNode} onClick={this.getInfoEmail} />
          </ModalBody>
          <ModalFooter>
            <Button
              type="link"
              onClick={() => {
                this.setState({ isOpenModalEmail: !this.state.isOpenModalEmail });
              }}
            >
              {' '}
              Hủy
            </Button>
            <Button
              type="primary"
              style={{ background: '#3866DD' }}
              onClick={() => {
                this.confirmEmail();
              }}
            >
              Chọn
            </Button>{' '}
          </ModalFooter>
        </Modal>
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
  modalState: handleModal.data
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
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowPage);
