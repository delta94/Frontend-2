import { DiagramEngine, DiagramModel, LinkModel, NodeModel, PortModel } from 'storm-react-diagrams';
import {
  DecisionNodeModel,
  EndNodeModel,
  FlowNodeModel,
  ProcessNodeModel,
  StartNodeModel,
  TimeWaitingDecisionNodeModel
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
  protected diagramEngine: DiagramEngine;

  constructor() {
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

    this.diagramEngine.setDiagramModel(FlowDiagramEditor.createDiagramModel());
  }

  dropZoneVisible: boolean = false;

  public setDropZoneVisible(dropZoneVisible: boolean) {
    this.dropZoneVisible = dropZoneVisible;

    FlowDiagramEditor.setDropZoneVisible(this.getActiveModel(), dropZoneVisible);
  }

  handlers: FlowDiagramEditorHandlers = null;
  public setHandlers(handlers: FlowDiagramEditorHandlers) {
    this.handlers = handlers;
    FlowDiagramEditor.setHandlers(this.getActiveModel(), handlers);
  }

  public getActiveModel(): DiagramModel {
    return this.getDiagramEngine().getDiagramModel();
  }

  public getDiagramEngine(): DiagramEngine {
    return this.diagramEngine;
  }

  public getDiagramData() {
    let data = {
      nodes: [],
      edges: []
    };
    let model = this.diagramEngine.getDiagramModel();
    let nodes = model.getNodes();
    for (let key in nodes) {
      let node = nodes[key];
      if (node && node instanceof FlowNodeModel) {
        data.nodes.push(toNode(node));
      }
    }

    let links = model.getLinks();
    for (let key in links) {
      let link = links[key];
      if (link && link instanceof LinkModel) {
        data.edges.push(toEdge(link));
      }
    }

    return data;
  }

  public setDiagramData(data: any) {
    let model = FlowDiagramEditor.createDiagramModel();
    FlowDiagramEditor.loadDiagramData(model, data, this.dropZoneVisible, this.handlers);
    FlowDiagramEditor.arrange(model);
    this.diagramEngine.setDiagramModel(model);
  }

  public addGroupProcess(groupProcess: GroupProcess, position: PortModel) {
    let model = this.getActiveModel().clone();
    if (FlowDiagramEditor.addGroupProcess(model, groupProcess, position, this.dropZoneVisible, this.handlers)) {
      FlowDiagramEditor.arrange(model);
      this.diagramEngine.setDiagramModel(model);
    }
  }

  private static createDiagramModel(): DiagramModel {
    let model = new DiagramModel();
    model.setLocked(true);

    return model;
  }

  private static loadDiagramData(model: DiagramModel, data: any, dropZoneVisible: boolean, handlers: FlowDiagramEditorHandlers) {
    if (data) {
      for (let nodeData of data.nodes ? data.nodes : DEFAULT_DATA.flow.graph.nodes) {
        if (nodeData) {
          let node = parseNode(nodeData);
          if (node) {
            if (node instanceof FlowNodeModel) {
              node.dropZoneVisible = dropZoneVisible;
              if (handlers) {
                node.onClick = handlers.onClickEventHandler;
                node.onAddClick = handlers.onAddClickEventHandler;
                node.onDrop = handlers.onDropEventHandler;
              }
            }
            model.addNode(node);
          }
        }
      }

      for (let edgeData of data.edges ? data.edges : DEFAULT_DATA.flow.graph.edges) {
        let sourceNode = model.getNode(edgeData.source);
        let targetNode = model.getNode(edgeData.target);
        if (sourceNode instanceof FlowNodeModel && targetNode instanceof FlowNodeModel) {
          let sourcePort = sourceNode.getOutPortOrDefault(mapToPortPosition(edgeData.sourceAnchor));
          let targetPort = targetNode.getInPortOrDefault(mapToPortPosition(edgeData.targetAnchor));
          if (sourceNode && targetPort && sourcePort.canLinkToPort(targetPort)) {
            let link = sourcePort.createLinkModel();
            link.setSourcePort(sourcePort);
            link.setTargetPort(targetPort);
            model.addLink(link);
          }
        }
      }

      return true;
    }
    return false;
  }

  private static addGroupProcess(
    model: DiagramModel,
    groupProcess: GroupProcess,
    position: PortModel,
    dropZoneVisible: boolean,
    handlers: FlowDiagramEditorHandlers
  ): boolean {
    if (groupProcess && groupProcess.isValid() && position) {
      for (let node of groupProcess.nodes) {
        if (node) {
          if (node instanceof FlowNodeModel) {
            node.dropZoneVisible = dropZoneVisible;
            if (handlers) {
              node.onClick = handlers.onClickEventHandler;
              node.onAddClick = handlers.onAddClickEventHandler;
              node.onDrop = handlers.onDropEventHandler;
            }
          }

          model.addNode(node);
        }
      }
      //add links
      for (let link of groupProcess.links) {
        model.addLink(link);
      }

      //swap port
      let outLinks = position.getLinks();
      for (let key in outLinks) {
        let outLink = outLinks[key];
        outLink.setSourcePort(groupProcess.outPort);
      }

      //add new link
      let inLink = position.createLinkModel();
      inLink.setSourcePort(position);
      inLink.setTargetPort(groupProcess.inPort);
      model.addLink(inLink);

      return true;
    }

    return false;
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

  private static setHandlers(model: DiagramModel, handlers: FlowDiagramEditorHandlers) {
    if (handlers) {
      let nodes = model.getNodes();
      for (let key in nodes) {
        let node = nodes[key];
        if (node && node instanceof FlowNodeModel) {
          node.onClick = handlers.onClickEventHandler;
          node.onAddClick = handlers.onAddClickEventHandler;
          node.onDrop = handlers.onDropEventHandler;
        }
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

  private static arrange(model: DiagramModel) {
    FlowDiagramEditor.arrangeFromNode(FlowDiagramEditor.getStartNode(model), null, 100, 100);
  }

  private static arrangeFromNode(currentNode: NodeModel, currentPort: PortModel, x: number, y: number) {
    if (currentNode) {
      if (currentNode instanceof StartNodeModel)
        currentNode.setPosition(x - PORT_SIZE.width / 2 - StartNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - StartNodeModel.HEIGHT / 2);
      else if (currentNode instanceof TimeWaitingDecisionNodeModel)
        currentNode.setPosition(
          x - PORT_SIZE.width / 2 - DecisionNodeModel.WIDTH / 2,
          y - PORT_SIZE.height / 2 - DecisionNodeModel.HEIGHT / 2
        );
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
        else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.TOP) {
          // let leftPort = ports[FlowNodePortModel.LEFT];
          // if(leftPort) FlowDiagramEditor.shiftFromPort(leftPort, FlowNodePortModel.LEFT, true, true);
          FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.TOP, x, y);
        } else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.BOTTOM) {
          // let leftPort = ports[FlowNodePortModel.LEFT];
          // if(leftPort) FlowDiagramEditor.shiftFromPort(leftPort, FlowNodePortModel.LEFT, false, true);
          FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.BOTTOM, x, y);
        }
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

  private static shiftFromNode(currentNode: NodeModel, currentPort: PortModel, up: boolean, topLevel: boolean) {
    if (currentNode) {
      if (!topLevel) currentNode.setPosition(currentNode.x, currentNode.y + (up ? -1 : 1) * GRID_SIZE.height);
      let ports = currentNode.getPorts();
      for (let key in ports) {
        let port = ports[key];
        if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.LEFT)
          FlowDiagramEditor.shiftFromPort(port, FlowNodePortModel.LEFT, up, topLevel);
        else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.RIGHT)
          FlowDiagramEditor.shiftFromPort(port, FlowNodePortModel.RIGHT, up, topLevel);
        else if (port && (!currentPort || port.id !== currentPort.id) && key === FlowNodePortModel.TOP && ((topLevel && up) || !topLevel))
          FlowDiagramEditor.shiftFromPort(port, FlowNodePortModel.TOP, up, false);
        else if (
          port &&
          (!currentPort || port.id !== currentPort.id) &&
          key === FlowNodePortModel.BOTTOM &&
          ((topLevel && !up) || !topLevel)
        )
          FlowDiagramEditor.shiftFromPort(port, FlowNodePortModel.BOTTOM, up, false);
      }
    }
  }

  private static shiftFromPort(currentPort: PortModel, currentPosition: string, up: boolean, topLevel: boolean) {
    if (currentPort) {
      let links = currentPort.getLinks();
      for (let key in links) {
        let link = links[key];
        if (link) {
          let nextPort = link.getSourcePort().id === currentPort.id ? link.getTargetPort() : link.getSourcePort();
          let nextNode = nextPort.getNode();
          if (nextNode) {
            if (currentPosition === FlowNodePortModel.LEFT) FlowDiagramEditor.shiftFromNode(nextNode, nextPort, up, topLevel);
            else if (currentPosition === FlowNodePortModel.RIGHT) FlowDiagramEditor.shiftFromNode(nextNode, nextPort, up, topLevel);
            else if (currentPosition === FlowNodePortModel.TOP && ((topLevel && up) || !topLevel))
              FlowDiagramEditor.shiftFromNode(nextNode, nextPort, up, topLevel);
            else if (currentPosition === FlowNodePortModel.BOTTOM && ((topLevel && !up) || !topLevel))
              FlowDiagramEditor.shiftFromNode(nextNode, nextPort, up, topLevel);
          }
        }
      }
    }
  }
}

export class FlowDiagramEditorHandlers {
  private _onDropEventHandler: Function = null;
  private _onClickEventHandler: Function = null;
  private _onAddClickEventHandler: Function = null;

  get onDropEventHandler(): Function {
    return this._onDropEventHandler;
  }

  set onDropEventHandler(value: Function) {
    this._onDropEventHandler = value;
  }

  get onClickEventHandler(): Function {
    return this._onClickEventHandler;
  }

  set onClickEventHandler(value: Function) {
    this._onClickEventHandler = value;
  }

  get onAddClickEventHandler(): Function {
    return this._onAddClickEventHandler;
  }

  set onAddClickEventHandler(value: Function) {
    this._onAddClickEventHandler = value;
  }
}
