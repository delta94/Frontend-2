import React, { Fragment } from 'react';
import GGEditor, { Flow } from 'gg-editor';
import { Row, Col, Card, Input, Button, Layout, Menu, Breadcrumb, Icon } from 'antd';
import CustomNode from './node/node';
import CustomEdges from './egdes/egdes';
import FlowToolbar from './FlowToolBar/flow-tool-bar';
import Save from './save/save';
import FlowItemPanel from './EditorItemPannel/FlowItemPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'reactstrap';
import FlowContextMenu from './EditorContextMenu/flow-context-menu';
import { Modal } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import './style.scss';

const ButtonGroup = Button.Group;
const { confirm } = Modal;

interface IFlowPageProps {}
interface IFlowPageState {
  visible: boolean;
  dataNode: any[];
  isUpdate: boolean;
  data: any;
  idNode: any;
  collapsed: boolean;
}

export class FlowPage extends React.Component<IFlowPageProps, IFlowPageState> {
  state: IFlowPageState = {
    visible: false,
    dataNode: JSON.parse(localStorage.getItem('nodeStore')),
    isUpdate: false,
    data: {
      nodes: [],
      edges: []
    },
    idNode: {},
    collapsed: false
  };
  getVisible = e => {
    this.setState({ visible: e });
    if (e) {
      this.showModal();
    }
  };
  commandExecute = (command, data) => {
    let name = command.command.name;
    let model = command.command;
    let { dataNode } = this.state;
    console.log(command.command);
    switch (name) {
      case 'delete':
        break;
      case 'add':
        this.addModel(model);
        break;
      default:
        break;
    }
  };

  addModel(command) {
    let type = command.type;
    let { data } = this.state;

    let props = JSON.parse(localStorage.getItem('nodeStore')) ? JSON.parse(localStorage.getItem('nodeStore')) : {};

    if (props && Object.keys(props).length > 0) {
      data = JSON.parse(localStorage.getItem('nodeStore'));
    }
    switch (type) {
      case 'edge':
        data.edges.push(command.addModel);
        break;
      case 'node':
        data.nodes.push(command.addModel);
        break;
      default:
        break;
    }
    console.log(data);
    localStorage.setItem('nodeStore', JSON.stringify(data));
  }

  showModal() {
    let { dataNode, idNode } = this.state;
    confirm({
      title: 'Edit Node',
      content: this.contentModal(),
      onOk: () => {
        let data = JSON.parse(localStorage.getItem('nodeStore'));
        data.nodes.map(event => {
          if (event.id === idNode.id) {
            (event.label = $('#label').val()),
              (event.color = $('#color').val()),
              (event.type = $('#type').val()),
              (event.shape = $('#shape').val()),
              (event.size = $('#size').val());
          }
        });

        localStorage.setItem('nodeStore', JSON.stringify(data));
        this.setState({ visible: false });
      },
      onCancel: () => {}
    });
    this.setState({ visible: false });
  }
  contentModal() {
    let { idNode } = this.state;

    return (
      <div>
        <label>Type</label>
        <Input defaultValue={idNode.type} id="type" />
        <label>Label</label>
        <Input defaultValue={idNode.label} id="label" />
        <label>Color</label>
        <Input defaultValue={idNode.color} id="color" />
        <label>Shape</label>
        <Input defaultValue={idNode.shape} id="shape" />
        <label>Size</label>
        <Input defaultValue={idNode.size} id="size" />
      </div>
    );
  }

  render() {
    let { dataNode, collapsed } = this.state;
    const imgSetting = require('app/assets/utils/images/flow/setting.png');
    const imgAward = require('app/assets/utils/images/flow/award.png');
    const imgMove = require('app/assets/utils/images/flow/move.png');
    return (
      <Fragment>
        <GGEditor
          className="editor"
          onAfterCommandExecute={command => {
            this.commandExecute(command, dataNode);
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
                    <img src={imgSetting} /> &nbsp;
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
                  this.setState({ idNode: e.item && e.item.type === 'node' ? e.item.model : '' });
                }}
                // onMouseMove = {(e)=>{}}
                graph={{
                  edgeDefaultShape: 'custom-edge'
                }}
                className="flow"
                data={dataNode}
              />
              <CustomNode />
              <CustomEdges />
            </Layout>
          </Layout>
          <FlowContextMenu onClick={this.getVisible} />
        </GGEditor>
      </Fragment>
    );
  }
}
export default FlowPage;
