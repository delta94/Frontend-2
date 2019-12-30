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
const uuidv4 = require('uuid/v4');

const GRID_SIZE = {
  width: 160,
  height: 160
};
const PORT_SIZE = {
  width: 8,
  height: 8
};

export class FlowDiagramApplication {
  protected activeModel: DiagramModel;
  protected diagramEngine: DiagramEngine;

  constructor() {
    this.activeModel = new DiagramModel();
    this.activeModel.setLocked(true);

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
    if (currentNode instanceof StartNodeModel)
      currentNode.setPosition(x - PORT_SIZE.width / 2 - StartNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - StartNodeModel.HEIGHT / 2);
    else if (currentNode instanceof ProcessNodeModel)
      currentNode.setPosition(x - PORT_SIZE.width / 2 - ProcessNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - ProcessNodeModel.HEIGHT / 2);
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
        FlowDiagramApplication.arrangeFromPort(port, FlowNodePortModel.LEFT, x, y);
      else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.RIGHT)
        FlowDiagramApplication.arrangeFromPort(port, FlowNodePortModel.RIGHT, x, y);
      else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.TOP)
        FlowDiagramApplication.arrangeFromPort(port, FlowNodePortModel.TOP, x, y);
      else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.BOTTOM)
        FlowDiagramApplication.arrangeFromPort(port, FlowNodePortModel.BOTTOM, x, y);
    }
  }

  private static arrangeFromPort(currentPort: PortModel, currentPosition: string, nextX: number, nextY: number) {
    let links = currentPort.getLinks();
    let i = 0;
    for (let key in links) {
      let link = links[key];
      if (link) {
        let nextPort = link.getSourcePort().id === currentPort.id ? link.getTargetPort() : link.getSourcePort();
        let nextNode = nextPort.getNode();
        if (nextNode) {
          if (currentPosition === FlowNodePortModel.LEFT)
            FlowDiagramApplication.arrangeFromNode(nextNode, nextPort, nextX - GRID_SIZE.width, nextY - i * GRID_SIZE.height);
          else if (currentPosition === FlowNodePortModel.RIGHT)
            FlowDiagramApplication.arrangeFromNode(nextNode, nextPort, nextX + GRID_SIZE.width, nextY + i * GRID_SIZE.height);
          else if (currentPosition === FlowNodePortModel.TOP)
            FlowDiagramApplication.arrangeFromNode(nextNode, nextPort, nextX - (i + 1) * GRID_SIZE.width, nextY - GRID_SIZE.height);
          else if (currentPosition === FlowNodePortModel.BOTTOM)
            FlowDiagramApplication.arrangeFromNode(nextNode, nextPort, nextX + (i + 1) * GRID_SIZE.width, nextY + GRID_SIZE.height);
          i++;
        }
      }
    }
  }

  public setDropZoneVisible(dropZoneVisible: boolean) {
    FlowDiagramApplication.setDropZoneVisible(this.activeModel, dropZoneVisible);
  }

  public setOnDropEventHandler(onDropEventHandler: any) {
    FlowDiagramApplication.setOnDropEventHandler(this.activeModel, onDropEventHandler);
  }

  public init(nodes: any, edges: any) {
    for (let node of nodes) {
      let nodeModel = parseNode(node);
      if (nodeModel) {
        this.activeModel.addNode(nodeModel);
      }
    }

    for (let edge of edges) {
      let sourceNode = this.activeModel.getNode(edge.source);
      let targetNode = this.activeModel.getNode(edge.target);
      if (sourceNode instanceof FlowNodeModel && targetNode instanceof FlowNodeModel) {
        let sourcePort = sourceNode.getOutPort(mapToPortPosition(edge.sourceAnchor));
        let targetPort = targetNode.getInPort(mapToPortPosition(edge.targetAnchor));
        if (sourceNode && targetPort && sourcePort.canLinkToPort(targetPort)) {
          let link = sourcePort.createLinkModel();
          link.setSourcePort(sourcePort);
          link.setTargetPort(targetPort);
          this.activeModel.addLink(link);
        }
      }
    }
  }

  public insertProcessTemplate(nextNode: NodeModel, processTemplateName: string): boolean {
    if (nextNode && nextNode instanceof FlowNodeModel) {
      let node: NodeModel = null;
      if (processTemplateName === EmailProcessNodeModel.TYPE) {
        node = createNodeModel(EmailProcessNodeModel.TYPE, uuidv4());
      } else if (processTemplateName === SmsProcessNodeModel.TYPE) {
        node = createNodeModel(SmsProcessNodeModel.TYPE, uuidv4());
      }
      if (node && node instanceof FlowNodeModel) {
        this.activeModel.addNode(node);

        let defaultInPort = node.getDefaultInPort();
        let nextDefaultInPort = nextNode.getDefaultInPort();
        let links = nextDefaultInPort.getLinks();
        for (let key in links) {
          links[key].setTargetPort(defaultInPort);
        }

        let defaultOutPort = node.getDefaultOutPort();
        let link = defaultOutPort.createLinkModel();
        link.setSourcePort(defaultOutPort);
        link.setTargetPort(nextDefaultInPort);
        this.activeModel.addLink(link);

        return true;
      }
    }

    return false;
  }

  public getActiveDiagram(): DiagramModel {
    return this.activeModel;
  }

  public getDiagramEngine(): DiagramEngine {
    return this.diagramEngine;
  }

  public autoArrange() {
    FlowDiagramApplication.arrangeFromNode(FlowDiagramApplication.getStartNode(this.activeModel), null, 100, 100);
  }
}
