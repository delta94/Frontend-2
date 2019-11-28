import React, { Fragment } from 'react';
import GGEditor, { Flow } from 'gg-editor';
import { Row, Col, Card, Input, Button } from 'antd';
import CustomNode from './node/node';
import CustomEdges from './egdes/egdes';
import FlowToolbar from './FlowToolBar/flow-tool-bar';
import Save from './save/save';
import FlowItemPanel from './EditorItemPannel/FlowItemPanel';
import FlowDetailPanel from './EditorDetailPanel/FlowDetailPanel';
import EditorMinimap from './EditorMinMap/editor-mini-map';
import FlowContextMenu from './EditorContextMenu/flow-context-menu';
import { Modal } from 'antd';
import './style.scss';
import { isFirstDayOfMonth } from 'date-fns';

const { confirm } = Modal;

interface IFlowPageProps {}
interface IFlowPageState {
  visible: boolean;
  dataNode: any[];
  isUpdate: boolean;
  data: any;
  idNode: any;
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
    idNode: {}
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

    let props = JSON.parse(localStorage.getItem('nodeStore'));

    if (Object.keys(props).length > 0) {
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
    let { dataNode, visible } = this.state;
    return (
      <Fragment>
        <GGEditor
          className="editor"
          onAfterCommandExecute={command => {
            this.commandExecute(command, dataNode);
          }}
        >
          <Row>
            <Col span={4} className="titleContent">
              <Card bordered={true} className="titleContent">
                <label className="editorTitleBar">Công Cụ</label>
              </Card>
            </Col>
            <Col span={20} className="titleContent">
              <Card bordered={true} className="titleContent">
                <Row>
                  <Col span={6}>
                    <label>Phiên bản : 1</label>
                  </Col>
                  <Col span={6}>
                    <label>Trạng thái : Bản nháp</label>
                  </Col>
                  <Col span={6}>
                    <Save />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row type="flex" className="editorHd">
            <Col span={24}>
              <FlowToolbar />
            </Col>
          </Row>
          <Row type="flex" className="editorBd">
            <Col span={6} className="editorSidebar">
              <FlowItemPanel />
            </Col>
            <Col span={14} className="editorContent">
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
            </Col>
            <Col span={4} className="editorSidebar">
              <FlowDetailPanel />
              <EditorMinimap />
            </Col>
          </Row>
          <FlowContextMenu onClick={this.getVisible} />
        </GGEditor>
      </Fragment>
    );
  }
}
export default FlowPage;
