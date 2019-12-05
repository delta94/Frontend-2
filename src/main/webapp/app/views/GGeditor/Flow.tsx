import React, { Fragment } from 'react';
import GGEditor, { Flow } from 'gg-editor';
import { Row, Col, Popover, Input, Button, Layout, Menu, Breadcrumb, Icon } from 'antd';
import CustomNode from './node/node';
import CustomEdges from './egdes/egdes';
import FlowToolbar from './FlowToolBar/flow-tool-bar';
import Save from './save/save';
import ConfigEmail from './config-email/config-email';
import FlowItemPanel from './EditorItemPannel/FlowItemPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCopy, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ModalGroupCustomer from './modal-group-customer/modal-group-customer';
import FlowContextMenu from './EditorContextMenu/flow-context-menu';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import './style.scss';

const ButtonGroup = Button.Group;
const { confirm } = Modal;

interface IFlowPageProps {}
interface IFlowPageState {
  visible: boolean;
  isOpen: boolean;
  data: any;
  idNode: any;
  collapsed: boolean;
  isUpdateNode: boolean;
  idEdge: any;
  isOpenModal: boolean;
}

export class FlowPage extends React.Component<IFlowPageProps, IFlowPageState> {
  state: IFlowPageState = {
    visible: false,
    isOpen: false,
    data: JSON.parse(localStorage.getItem('nodeStore')),
    idNode: {},
    collapsed: false,
    isUpdateNode: false,
    idEdge: {},
    isOpenModal: false
  };

  // show modal
  getVisible = async (event, valueName, isSuccess) => {
    let { idNode } = this.state;
    let data = JSON.parse(localStorage.getItem('nodeStore'));
    switch (idNode.type) {
      case 'DATA':
        this.setState({ visible: event });
        await data.nodes.map(event => {
          if (event.id === idNode.id) {
            event.label = String(valueName).split(',')[0];
          }
        });
        break;

      case 'EVENT':
        this.setState({ isOpenModal: event });

      default:
        break;
    }
    if (isSuccess) {
      await localStorage.setItem('nodeStore', JSON.stringify(data));
      await this.setState({ data: JSON.parse(localStorage.getItem('nodeStore')), isUpdateNode: true });
    }
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

  //delete Node
  deleteModel(id) {
    let { idNode, idEdge } = this.state;
    let data = {
      nodes: [],
      edges: []
    };
    let props = JSON.parse(localStorage.getItem('nodeStore')) ? JSON.parse(localStorage.getItem('nodeStore')) : {};

    if (props && Object.keys(props).length > 0) {
      data = JSON.parse(localStorage.getItem('nodeStore'));
    }
    switch (idNode.type ? idNode.type : idEdge.type) {
      case 'node':
        let index = data.nodes.indexOf(idNode);
        data.nodes.splice(index, 1);
        break;

      case 'edge':
        let indexEdge = data.edges.indexOf(idNode);
        data.edges.splice(indexEdge, 1);
        break;

      default:
        break;
    }
    localStorage.setItem('nodeStore', JSON.stringify(data));
  }

  //add node and save in local store
  addModel(command) {
    let type = command.type;
    let data = {
      edges: [],
      nodes: [],
      groups: []
    };

    let props = JSON.parse(localStorage.getItem('nodeStore')) ? JSON.parse(localStorage.getItem('nodeStore')) : {};

    switch (type) {
      case 'edge':
        if (props.edges && Object.keys(props).length > 0) {
          data = JSON.parse(localStorage.getItem('nodeStore'));
        }
        data.edges.push(command.addModel);
        localStorage.setItem('nodeStore', JSON.stringify(data));
        break;
      case 'node':
        if (props.nodes && Object.keys(props).length > 0) {
          data = JSON.parse(localStorage.getItem('nodeStore'));
        }
        data.nodes.push(command.addModel);
        localStorage.setItem('nodeStore', JSON.stringify(data));

        break;
      default:
        break;
    }
  }

  hide = () => {
    this.setState({
      isOpen: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ isOpen: visible });
  };

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

  render() {
    let { collapsed, data } = this.state;
    const imgSetting = require('app/assets/utils/images/flow/setting.png');
    const imgAward = require('app/assets/utils/images/flow/award.png');
    const imgMove = require('app/assets/utils/images/flow/move.png');
    return (
      <Fragment>
        <GGEditor
          className="editor"
          onAfterCommandExecute={command => {
            this.commandExecute(command);
          }}
        >
          <Layout style={{ minHeight: '200vh' }}>
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
            <Layout>
              <Header className="header-flow">
                <Row>
                  <Col span={24} className="titleContent">
                    <Row>
                      <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                          <a href="javascript:void(0);">
                            <FontAwesomeIcon icon={faHome} />
                          </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                          <a href="javascript:void(0);">Chiến dịch tự động</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                          <a href="javascript:void(0);">Danh sách chiến dịch</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                          <a href="javascript:void(0);">Tạo chiến dịch</a>
                        </Breadcrumb.Item>
                        <label className="ant-breadcrumb-link">Chiến dịch mới</label>
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
                      <Button disabled>Test</Button>
                      <Button disabled>Validate</Button>
                      <Save />
                    </ButtonGroup>
                  </Col>
                  <Col span={2}>
                    <Button type="primary" style={{ float: 'right' }}>
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
                data={data}
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
        <Modal className="modal-config-email" isOpen={this.state.isOpenModal}>
          <ModalHeader
            toggle={() => {
              this.setState({ isOpenModal: !this.state.isOpenModal });
            }}
          >
            GỬI EMAIL
          </ModalHeader>
          <ModalBody>
            <ConfigEmail />
          </ModalBody>
          <ModalFooter>
            <Button
              color="link"
              onClick={() => {
                this.setState({ isOpenModal: !this.state.isOpenModal });
              }}
            >
              Hủy
            </Button>
            <Button
              color="primary"
              onClick={() => {
                this.setState({ isOpenModal: !this.state.isOpenModal });
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
export default FlowPage;
