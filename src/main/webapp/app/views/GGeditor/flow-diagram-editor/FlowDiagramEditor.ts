import { DiagramEngine, DiagramModel, LinkModel, NodeModel, PortModel } from 'storm-react-diagrams';
import { DecisionNodeModel, EndNodeModel, FlowNodeModel, ProcessNodeModel, SmsProcessNodeModel, StartNodeModel } from './FlowNodeModel';
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
import { GroupProcess } from './GroupProcess';
import DEFAULT_DATA from './data';
import { mapToPortPosition, parseNode, toEdge, toNode } from './FlowDiagramUtil';

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

  private _locked: boolean = false;
  public lock() {
    this._locked = true;
    this.activeModel.setLocked(true);
  }

  public unlock() {
    this._locked = true;
    this.activeModel.setLocked(false);
  }

  get locked(): boolean {
    return this._locked;
  }

  public getDiagramData() {
    let data = {
      nodes: [],
      edges: []
    };
    let nodes = this.activeModel.getNodes();
    for (let key in nodes) {
      let node = nodes[key];
      if (node && node instanceof FlowNodeModel) {
        data.nodes.push(toNode(node));
      }
    }

    let links = this.activeModel.getLinks();
    for (let key in links) {
      let link = links[key];
      if (link && link instanceof LinkModel) {
        data.edges.push(toEdge(link));
      }
    }

    return data;
  }

  public setDiagramData(data: any) {
    this.activeModel = new DiagramModel();
    this.activeModel.setLocked(this.locked);
    this.diagramEngine.setDiagramModel(this.activeModel);

    for (let node of data.nodes ? data.nodes : DEFAULT_DATA.flow.graph.nodes) {
      let nodeModel = parseNode(node);
      if (nodeModel) {
        if (nodeModel instanceof FlowNodeModel) {
          nodeModel.onAddClick = this.onAddClickEventHandler;
          nodeModel.onClick = this.onClickEventHandler;
          nodeModel.onDrop = this.onDropEventHandler;
        }
        this.activeModel.addNode(nodeModel);
      }
    }

    for (let edge of data.edges ? data.edges : DEFAULT_DATA.flow.graph.edges) {
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

  private static setDropZoneVisible(model: DiagramModel, dropZoneVisible: boolean) {
    let nodes = model.getNodes();
    for (let key in nodes) {
      let node = nodes[key];
      if (node && node instanceof FlowNodeModel) {
        node.dropZoneVisible = dropZoneVisible;
      }
    }
  }

  private static setOnDropEventHandler(model: DiagramModel, onDropEventHandler: Function) {
    let nodes = model.getNodes();
    for (let key in nodes) {
      let node = nodes[key];
      if (node && node instanceof FlowNodeModel) {
        node.onDrop = onDropEventHandler;
      }
    }
  }

  private static setOnClickEventHandler(model: DiagramModel, onClickEventHandler: Function) {
    let nodes = model.getNodes();
    for (let key in nodes) {
      let node = nodes[key];
      if (node && node instanceof FlowNodeModel) {
        node.onClick = onClickEventHandler;
      }
    }
  }

  private static setOnAddClickEventHandler(model: DiagramModel, onAddClickEventHandler: Function) {
    let nodes = model.getNodes();
    for (let key in nodes) {
      let node = nodes[key];
      if (node && node instanceof FlowNodeModel) {
        node.onAddClick = onAddClickEventHandler;
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

  onDropEventHandler: Function = null;
  public setOnDropEventHandler(onDropEventHandler: Function) {
    this.onDropEventHandler = onDropEventHandler;
    FlowDiagramEditor.setOnDropEventHandler(this.activeModel, onDropEventHandler);
  }

  onClickEventHandler: Function = null;
  public setOnClickEventHandler(onClickEventHandler: Function) {
    this.onClickEventHandler = onClickEventHandler;
    FlowDiagramEditor.setOnClickEventHandler(this.activeModel, onClickEventHandler);
  }

  onAddClickEventHandler: Function = null;
  public setOnAddClickEventHandler(onAddClickEventHandler: Function) {
    this.onAddClickEventHandler = onAddClickEventHandler;
    FlowDiagramEditor.setOnAddClickEventHandler(this.activeModel, onAddClickEventHandler);
  }

  public add(groupProcess: GroupProcess, position: PortModel) {
    if (groupProcess && groupProcess.isValid() && position) {
      for (let node of groupProcess.nodes) {
        if (node) {
          if (node instanceof FlowNodeModel) {
            node.onAddClick = this.onAddClickEventHandler;
            node.onClick = this.onClickEventHandler;
            node.onDrop = this.onDropEventHandler;
          }
          this.activeModel.addNode(node);
        }
      }

      for (let link of groupProcess.links) {
        this.activeModel.addLink(link);
      }

      let outLinks = position.getLinks();
      for (let key in outLinks) {
        let outLink = outLinks[key];
        outLink.setSourcePort(groupProcess.outPort);
      }

      let inLink = position.createLinkModel();
      inLink.setSourcePort(position);
      inLink.setTargetPort(groupProcess.inPort);
      this.activeModel.addLink(inLink);
    }
  }

  public getActiveDiagram(): DiagramModel {
    return this.activeModel;
  }

  public getDiagramEngine(): DiagramEngine {
    return this.diagramEngine;
  }

  public autoArrange(rebuild: boolean) {
    if (rebuild) {
      this.setDiagramData(this.getDiagramData());
    }
    FlowDiagramEditor.arrangeFromNode(FlowDiagramEditor.getStartNode(this.activeModel), null, 100, 100);
  }
}
