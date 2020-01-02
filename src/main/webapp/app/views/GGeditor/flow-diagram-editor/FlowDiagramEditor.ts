import { DiagramEngine, DiagramModel, NodeModel, PortModel } from 'storm-react-diagrams';
import {
  createNodeModel,
  DecisionNodeModel,
  EmailProcessNodeModel,
  EndNodeModel,
  FlowNodeModel,
  mapToPortPosition,
  parseNode,
  ProcessNodeModel,
  SmsProcessNodeModel,
  StartNodeModel
} from './FlowNodeModel';
import { FlowNodePortModel } from './FlowNodePortModel';

import { FlowNodePortFactory } from './FlowNodePortFactory';
import {
  ConditionDecisionNodeFactory,
  ContactSourceStartNodeFactory,
  EmailProcessNodeFactory,
  EndNodeFactory,
  EventSourceStartNodeFactory,
  EventWaitingDecisionNodeFactory,
  SmsProcessNodeFactory,
  TimeWaitingDecisionNodeFactory
} from './FlowNodeFactory';
import { GroupProcess } from 'app/views/GGeditor/flow-diagram-editor/GroupProcess';
import DEFAULT_DATA from 'app/views/GGeditor/flow-diagram-editor/data';
const uuidv4 = require('uuid/v4');

const GRID_SIZE = {
  width: 160,
  height: 160
};
const PORT_SIZE = {
  width: 8,
  height: 8
};

export class FlowDiagramEditor {
  protected activeModel: DiagramModel;
  protected diagramEngine: DiagramEngine;

  constructor() {
    this.activeModel = new DiagramModel();

    this.diagramEngine = new DiagramEngine();
    this.diagramEngine.installDefaultFactories();

    this.diagramEngine.registerPortFactory(new FlowNodePortFactory('flow', config => new FlowNodePortModel()));
    this.diagramEngine.registerNodeFactory(new ContactSourceStartNodeFactory());
    this.diagramEngine.registerNodeFactory(new EventSourceStartNodeFactory());
    this.diagramEngine.registerNodeFactory(new EmailProcessNodeFactory());
    this.diagramEngine.registerNodeFactory(new SmsProcessNodeFactory());
    this.diagramEngine.registerNodeFactory(new TimeWaitingDecisionNodeFactory());
    this.diagramEngine.registerNodeFactory(new EventWaitingDecisionNodeFactory());
    this.diagramEngine.registerNodeFactory(new ConditionDecisionNodeFactory());
    this.diagramEngine.registerNodeFactory(new EndNodeFactory());

    this.diagramEngine.setDiagramModel(this.activeModel);
  }

  public lock() {
    this.activeModel.setLocked(true);
  }

  public unlock() {
    this.activeModel.setLocked(false);
  }

  private static setDropZoneVisible(model: DiagramModel, dropZoneVisible: boolean) {
    let nodes = model.getNodes();
    for (let key in nodes) {
      let node = nodes[key];
      if (node && node instanceof FlowNodeModel) {
        node.dropZoneVisible = dropZoneVisible;
      }
    }
  }

  private static setOnDropEventHandler(model: DiagramModel, onDropEventHandler: any) {
    let nodes = model.getNodes();
    for (let key in nodes) {
      let node = nodes[key];
      if (node && node instanceof FlowNodeModel) {
        node.onDrop = onDropEventHandler;
      }
    }
  }

  private static getStartNode(model: DiagramModel): FlowNodeModel | null {
    let nodes = model.getNodes();
    for (let key in nodes) {
      let node = nodes[key];
      if (node && node instanceof StartNodeModel) return node;
    }
    return null;
  }

  private static arrangeFromNode(currentNode: NodeModel, currentPort: PortModel, x: number, y: number) {
    if (currentNode) {
      if (currentNode instanceof StartNodeModel)
        currentNode.setPosition(x - PORT_SIZE.width / 2 - StartNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - StartNodeModel.HEIGHT / 2);
      else if (currentNode instanceof ProcessNodeModel)
        currentNode.setPosition(
          x - PORT_SIZE.width / 2 - ProcessNodeModel.WIDTH / 2,
          y - PORT_SIZE.height / 2 - ProcessNodeModel.HEIGHT / 2
        );
      else if (currentNode instanceof DecisionNodeModel)
        currentNode.setPosition(
          x - PORT_SIZE.width / 2 - DecisionNodeModel.WIDTH / 2,
          y - PORT_SIZE.height / 2 - DecisionNodeModel.HEIGHT / 2
        );
      else if (currentNode instanceof EndNodeModel)
        currentNode.setPosition(x - PORT_SIZE.width / 2 - EndNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - EndNodeModel.HEIGHT / 2);
      else currentNode.setPosition(x, y);

      let ports = currentNode.getPorts();
      for (let key in ports) {
        let port = ports[key];
        if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.LEFT)
          FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.LEFT, x, y);
        else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.RIGHT)
          FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.RIGHT, x, y);
        else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.TOP)
          FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.TOP, x, y);
        else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.BOTTOM)
          FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.BOTTOM, x, y);
      }
    }
  }

  private static arrangeFromPort(currentPort: PortModel, currentPosition: string, nextX: number, nextY: number) {
    if (currentPort) {
      let links = currentPort.getLinks();
      let i = 0;
      for (let key in links) {
        let link = links[key];
        if (link) {
          let nextPort = link.getSourcePort().id === currentPort.id ? link.getTargetPort() : link.getSourcePort();
          let nextNode = nextPort.getNode();
          if (nextNode) {
            if (currentPosition === FlowNodePortModel.LEFT)
              FlowDiagramEditor.arrangeFromNode(nextNode, nextPort, nextX - GRID_SIZE.width, nextY - i * GRID_SIZE.height);
            else if (currentPosition === FlowNodePortModel.RIGHT)
              FlowDiagramEditor.arrangeFromNode(nextNode, nextPort, nextX + GRID_SIZE.width, nextY + i * GRID_SIZE.height);
            else if (currentPosition === FlowNodePortModel.TOP)
              FlowDiagramEditor.arrangeFromNode(nextNode, nextPort, nextX - (i + 1) * GRID_SIZE.width, nextY - GRID_SIZE.height);
            else if (currentPosition === FlowNodePortModel.BOTTOM)
              FlowDiagramEditor.arrangeFromNode(nextNode, nextPort, nextX + (i + 1) * GRID_SIZE.width, nextY + GRID_SIZE.height);
            i++;
          }
        }
      }
    }
  }

  public setDropZoneVisible(dropZoneVisible: boolean) {
    FlowDiagramEditor.setDropZoneVisible(this.activeModel, dropZoneVisible);
  }

  public setOnDropEventHandler(onDropEventHandler: any) {
    FlowDiagramEditor.setOnDropEventHandler(this.activeModel, onDropEventHandler);
  }

  public init(nodes: any, edges: any) {
    for (let node of nodes ? nodes : DEFAULT_DATA.flow.graph.nodes) {
      let nodeModel = parseNode(node);
      if (nodeModel) {
        this.activeModel.addNode(nodeModel);
      }
    }

    for (let edge of edges ? edges : DEFAULT_DATA.flow.graph.edges) {
      let sourceNode = this.activeModel.getNode(edge.source);
      let targetNode = this.activeModel.getNode(edge.target);
      if (sourceNode instanceof FlowNodeModel && targetNode instanceof FlowNodeModel) {
        let sourcePort = sourceNode.getOutPortOrDefault(mapToPortPosition(edge.sourceAnchor));
        let targetPort = targetNode.getInPortOrDefault(mapToPortPosition(edge.targetAnchor));
        if (sourceNode && targetPort && sourcePort.canLinkToPort(targetPort)) {
          let link = sourcePort.createLinkModel();
          link.setSourcePort(sourcePort);
          link.setTargetPort(targetPort);
          this.activeModel.addLink(link);
        }
      }
    }
  }

  public insert(groupProcess: GroupProcess, position: PortModel) {
    if (groupProcess && groupProcess.isValid() && position) {
      for (let node of groupProcess.nodes) {
        this.activeModel.addNode(node);
      }

      for (let link of groupProcess.links) {
        this.activeModel.addLink(link);
      }

      // //swap input
      // let inLinks = connectedPort.getLinks();
      // for (let key in inLinks) {
      //   let inLink = inLinks[key];
      //   let sourcePort = inLink.getSourcePort();
      //   let newInLink = sourcePort.createLinkModel();
      //   newInLink.setSourcePort(sourcePort);
      //   newInLink.setTargetPort(inPort);
      //
      //   this.activeModel.removeLink(inLink);
      //   this.activeModel.addLink(newInLink);
      // }
      // // swap output
      //
      // for (let outPort of outPorts) {
      //   console.log(outPort);
      //   let outLink = outPort.createLinkModel();
      //   outLink.setSourcePort(outPort);
      //   outLink.setTargetPort(connectedPort);
      //   this.activeModel.addLink(outLink);
      // }
    }
  }

  public getActiveDiagram(): DiagramModel {
    return this.activeModel;
  }

  public getDiagramEngine(): DiagramEngine {
    return this.diagramEngine;
  }

  public autoArrange() {
    FlowDiagramEditor.arrangeFromNode(FlowDiagramEditor.getStartNode(this.activeModel), null, 100, 100);
  }
}
