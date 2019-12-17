import React, { Fragment } from 'react';
import GGEditor, { Flow } from 'gg-editor';
import { Row, Col, Popover, Button, Layout, Breadcrumb, Icon, Modal as ModalAntd } from 'antd';
import CustomNode from './node/node';
import CustomEdges from './egdes/egdes';
import FlowToolbar from './FlowToolBar/flow-tool-bar';
import { connect } from 'react-redux';
import Save from './save/save';
import { saveCampaignAuto, getNode, getDiagramCampaign, validateCampaign } from 'app/actions/campaign-managament';
import { IRootState } from 'app/reducers';
import ConfigEmail from './config-email/config-email';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCopy, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import ModalGroupCustomer from './modal-group-customer/modal-group-customer';
import FlowContextMenu from './EditorContextMenu/flow-context-menu';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import $ from 'jquery';
import UpdateInfoCampaign from './modal-update-info/modal-update-info';
const { Header } = Layout;
import './style.scss';
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

  //handler Popup send email
  confirmEmail = async () => {
    let { idNode, titleMail } = this.state;
    let { listDiagram, getDiagramCampaign } = this.props;
    let data = listDiagram;
    await data.nodes.map(event => {
      if (event.id === idNode.id) {
        event.label = titleMail;
      }
    });

    await getDiagramCampaign(data);
    await this.setState({
      isOpenModalEmail: !this.state.isOpenModalEmail,
      isUpdateNode: true,
      data: data
    });
  };

  // handler Open modal
  getVisible = async (event, valueName, searchAdv, isSuccess) => {
    let { getDiagramCampaign, validateCampaign, listFieldData } = this.props;
    let { idNode, advancedSearches, timeStartCampaign, data, isOpenModalMessage, isOpenModalWaitForEvent, isOpenModalWait } = this.state;
    let diagram = data.nodes && data.nodes.length > 0 ? data : data.data;
    switch (idNode.param) {
      case 'DATA':
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
            fieldConfigEmail: listFieldData.emailConfig ? listFieldData.emailConfig : [],
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
      case 'EMAIL':
        this.setState({ isOpenModalEmail: event });
        break;
      case 'WAIT-UNTIL':
        this.setState({ isOpenModalWaitForEvent: !isOpenModalWaitForEvent });
        break;
      case 'WAIT':
        this.setState({ isOpenModalWait: !isOpenModalWait });
        break;
      case 'MESSAGE':
        this.setState({ isOpenModalMessage: !isOpenModalMessage });
        if (isOpenModalMessage) {
          diagram.nodes.map(item => {
            if (item.id === idNode.id && valueName) {
              item.label = valueName.name;
            }
          });
        }

        break;

      default:
        break;
    }
  };
  //get title email save in Node
  getInfoEmail = (event, value) => {
    let { titleMail } = this.state;
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
    for (var i = arr.length; i--; ) {
      if (arr[i].id === item.id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  //delete Node
  deleteModel = async id => {
    let { listDiagram, getDiagramCampaign } = this.props;
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

  //Content Popover Setting
  contentSetting() {
    return (
      <Row>
        <Row>
          <Button type="link" onClick={this.hide} className="btn-multi">
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
    let hasValidate = JSON.parse(localStorage.getItem('isSave'));
    let { isValidate, timeStartCampaign, advancedSearches } = this.state;
    let { listFieldData } = this.props;
    this.setState({ isTest: false, isValidate: !isValidate });
    if (hasValidate.length == 0) {
      this.setState({ isSave: false });
    } else {
      this.setState({ isSave: true });
    }
  };

  getValueEdges = (sourceAnchor, source) => {
    let valueEdges: string;
    let { listDiagram } = this.props;
    listDiagram.nodes.map(event => {
      if (source === event.id) {
        if (event.code === 'TIMER_EVENT' || event.code === 'TIMER') {
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
  saveCampaign = node => {
    const { idFolder, saveCampaignAuto } = this.props;
    let { timeStartCampaign, advancedSearches } = this.state;
    let graph = {
      nodes:
        node.nodes &&
        node.nodes.map(event => {
          return {
            type: event.type,
            label: event.label,
            code: event.code,
            value: event.value,
            id: event.id
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
      cj: {
        id: null,
        name: '',
        description: ''
      },
      cjTags: [
        {
          id: '',
          name: ''
        }
      ],
      flow: {
        startTime: timeStartCampaign,
        customerAdvancedSave: advancedSearches,
        graph: graph
      }
    };
    saveCampaignAuto(data);
    console.log(data);
  };

  render() {
    let { isOpenModalInfo, idNode, isTest, isOpenModalMessage, isOpenModalWaitForEvent, isOpenModalWait, data, isValidate } = this.state;
    let { infoCampaign, listDiagram } = this.props;
    const imgSetting = require('app/assets/utils/images/flow/setting.png');
    const imgAward = require('app/assets/utils/images/flow/award.png');
    const imgMove = require('app/assets/utils/images/flow/move.png');
    let hasValidate = JSON.parse(localStorage.getItem('isSave'));
    return (
      <Fragment>
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
          <Layout style={{ minHeight: '200vh' }}>
            {isTest ? <SiderTest /> : isValidate ? <SiderValidate /> : <SiderComponet />}
            <Layout>
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
                        <label className="ant-breadcrumb-link">{infoCampaign.name ? infoCampaign.name : 'Tạo chiến dịch mới'}</label>
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
                    <label>Phiên bản: 1.0</label>
                  </Col>
                  <Col span={8}>
                    <label>Trạng Thái : Bản nháp</label>
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
                      <Save
                        isSave={listDiagram.nodes && listDiagram.nodes.length > 0 ? this.state.isSave : true}
                        onClick={this.saveCampaign}
                      />
                    </ButtonGroup>
                  </Col>
                  <Col span={2}>
                    <Button
                      disabled={listDiagram.nodes && listDiagram.nodes.length > 0 ? this.state.isSave : true}
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
                  edgeDefaultShape: 'custom-edge'
                }}
                className="flow"
                data={listDiagram}
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
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  list_tree_folder: campaignManagament.tree_folder,
  idFolder: campaignManagament.listNode,
  infoCampaign: campaignManagament.listInfoCampaing,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData
});

const mapDispatchToProps = {
  saveCampaignAuto,
  getNode,
  getDiagramCampaign,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowPage);
