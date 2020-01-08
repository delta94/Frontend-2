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
import { mapToPortPosition, parseNode, toEdgeData, toNodeData } from './FlowDiagramUtil';
import { instanceOf } from 'prop-types';
import { RightAngleLinkFactory } from './RightAngleLinkFactory';

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

    this.diagramEngine.registerLinkFactory(new RightAngleLinkFactory());

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
    return FlowDiagramEditor.getDiagramData(this.diagramEngine.getDiagramModel());
  }

  public setDiagramData(data: any) {
    let model = FlowDiagramEditor.createDiagramModel();
    FlowDiagramEditor.loadDiagramData(model, data, this.dropZoneVisible, this.handlers);
    FlowDiagramEditor.arrange(model);
    this.diagramEngine.setDiagramModel(model);
  }

  public addGroupProcess(groupProcess: GroupProcess, position: PortModel) {
    let model = this.getActiveModel();
    if (FlowDiagramEditor.addGroupProcess(model, groupProcess, position, this.dropZoneVisible, this.handlers)) {
      FlowDiagramEditor.arrange(model);
      this.diagramEngine.recalculatePortsVisually();
    }
  }

  public deleteNode(nodeId: string) {
    let model = this.getActiveModel();
    let node = model.getNode(nodeId);
    if (node) {
      FlowDiagramEditor.deleteFromNode(node, false);
      FlowDiagramEditor.arrange(model);
      this.diagramEngine.recalculatePortsVisually();
    }
  }

  private static createDiagramModel(): DiagramModel {
    let model = new DiagramModel();
    model.setLocked(true);

    return model;
  }

  private static getDiagramData(model: DiagramModel) {
    let data = {
      nodes: [],
      edges: []
    };

    if (model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof FlowNodeModel) {
          data.nodes.push(toNodeData(node));
        }
      }
    }

    if (model.getLinks()) {
      for (let key in model.getLinks()) {
        let link = model.getLinks()[key];
        if (link && link instanceof LinkModel) {
          data.edges.push(toEdgeData(link));
        }
      }
    }

    return data;
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
        if (sourceNode && sourceNode instanceof FlowNodeModel && targetNode && targetNode instanceof FlowNodeModel) {
          let sourcePort = sourceNode.getOutPortOrDefault(mapToPortPosition(edgeData.sourceAnchor));
          let targetPort = targetNode.getInPortOrDefault(mapToPortPosition(edgeData.targetAnchor));
          if (sourceNode && targetPort && sourcePort.canLinkToPort(targetPort)) {
            let link = sourcePort.createLinkModel();
            if (link) {
              link.setSourcePort(sourcePort);
              link.setTargetPort(targetPort);
              model.addLink(link);
            }
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
      if (position.getLinks()) {
        for (let key in position.getLinks()) {
          let outLink = position.getLinks()[key];
          if (outLink) {
            let targetPort = outLink.getTargetPort();
            if (targetPort) {
              outLink.remove();
              let newOutLink = groupProcess.outPort.createLinkModel();
              newOutLink.setSourcePort(groupProcess.outPort);
              newOutLink.setTargetPort(targetPort);
              model.addLink(newOutLink);
            }
          }
        }
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

  private static deleteFromNode(currentNode: NodeModel, deepDelete: boolean) {
    if (currentNode) {
      if (!deepDelete && currentNode instanceof FlowNodeModel) {
        let inPort = currentNode.getDefaultInPort();
        let outPort = currentNode.getDefaultOutPort();
        if (currentNode.getPorts()) {
          for (let key in currentNode.getPorts()) {
            let port = currentNode.getPorts()[key];
            //keep main branch
            if (port && !(inPort && port.getID() === inPort.getID()) && outPort && port.getID() === outPort.getID()) {
              FlowDiagramEditor.deleteFromPort(port, true);
            }
          }
        }

        let targetPorts: PortModel[] = [];
        if (outPort && outPort.getLinks()) {
          for (let key in outPort.getLinks()) {
            let link = outPort.getLinks()[key];
            if (link) {
              if (link.getTargetPort()) targetPorts.push(link.getTargetPort());
              link.remove();
            }
          }
        }
        if (inPort && inPort.getLinks()) {
          for (let key in inPort.getLinks()) {
            let link = inPort.getLinks()[key];
            if (link) {
              if (outPort) {
                for (let targetPort of targetPorts) {
                  link.setTargetPort(targetPort);
                }
              } else {
                link.remove();
              }
            }
          }
        }
      } else {
        if (currentNode.getPorts()) {
          for (let key in currentNode.getPorts()) {
            let port = currentNode.getPorts()[key];
            if (port) {
              FlowDiagramEditor.deleteFromPort(port, true);
            }
          }
        }
      }
      currentNode.remove();
    }
  }

  private static deleteFromPort(currentPort: PortModel, deepDelete: boolean) {
    let links = currentPort.getLinks();
    for (let key in links) {
      let link = links[key];
      if (link) {
        if (deepDelete && link.getTargetPort()) {
          FlowDiagramEditor.deleteFromNode(link.getTargetPort().getNode(), true);
        }
        link.remove();
      }
    }
  }

  private static shift(model: DiagramModel, fromOffsetX: number, fromOffsetY: number) {
    if (model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof FlowNodeModel) {
          node.offsetX = node.offsetX >= fromOffsetX && fromOffsetX >= 0 ? node.offsetX + 1 : node.offsetX;
          node.offsetY = node.offsetY >= fromOffsetY && fromOffsetY >= 0 ? node.offsetY + 1 : node.offsetY;
        }
      }
    }
  }

  private static clearOffset(model: DiagramModel) {
    if (model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof FlowNodeModel) {
          node.offsetX = -1;
          node.offsetY = -1;
        }
      }
    }
  }

  private static setDropZoneVisible(model: DiagramModel, dropZoneVisible: boolean) {
    if (model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof FlowNodeModel) {
          node.dropZoneVisible = dropZoneVisible;
        }
      }
    }
  }

  private static setHandlers(model: DiagramModel, handlers: FlowDiagramEditorHandlers) {
    if (handlers && model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof FlowNodeModel) {
          node.onClick = handlers.onClickEventHandler;
          node.onAddClick = handlers.onAddClickEventHandler;
          node.onDrop = handlers.onDropEventHandler;
        }
      }
    }
  }

  private static getStartNode(model: DiagramModel): FlowNodeModel | null {
    if (model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof StartNodeModel) return node;
      }
    }
    return null;
  }

  private static arrange(model: DiagramModel) {
    let shift = (fromOffsetX: number, fromOffsetY: number) => {
      FlowDiagramEditor.shift(model, fromOffsetX, fromOffsetY);
    };

    FlowDiagramEditor.clearOffset(model);
    FlowDiagramEditor.arrangeFromNode(FlowDiagramEditor.getStartNode(model), null, 0, 0, shift);
    FlowDiagramEditor.calculatePosition(model, 100, 100);
  }

  private static calculatePosition(model: DiagramModel, startX: number, startY: number) {
    if (model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof FlowNodeModel) {
          let x = node.offsetX < 0 ? 0 : startX + node.offsetX * GRID_SIZE.width;
          let y = node.offsetX < 0 ? 0 : startY + node.offsetY * GRID_SIZE.height;

          if (node instanceof StartNodeModel)
            node.setPosition(x - PORT_SIZE.width / 2 - StartNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - StartNodeModel.HEIGHT / 2);
          else if (node instanceof TimeWaitingDecisionNodeModel)
            node.setPosition(
              x - PORT_SIZE.width / 2 - DecisionNodeModel.WIDTH / 2,
              y - PORT_SIZE.height / 2 - DecisionNodeModel.HEIGHT / 2
            );
          else if (node instanceof ProcessNodeModel)
            node.setPosition(x - PORT_SIZE.width / 2 - ProcessNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - ProcessNodeModel.HEIGHT / 2);
          else if (node instanceof DecisionNodeModel)
            node.setPosition(
              x - PORT_SIZE.width / 2 - DecisionNodeModel.WIDTH / 2,
              y - PORT_SIZE.height / 2 - DecisionNodeModel.HEIGHT / 2
            );
          else if (node instanceof EndNodeModel)
            node.setPosition(x - PORT_SIZE.width / 2 - EndNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - EndNodeModel.HEIGHT / 2);
        }
      }
    }
  }

  private static arrangeFromNode(currentNode: NodeModel, currentPort: PortModel, offsetX: number, offsetY: number, shift: Function) {
    if (currentNode && currentNode instanceof FlowNodeModel) {
      currentNode.offsetX = offsetX;
      currentNode.offsetY = offsetY;

      let ports = currentNode.getPorts();
      for (let key in ports) {
        let port = ports[key];
        if (port && (!currentPort || port.id !== currentPort.id)) {
          if (key === FlowNodePortModel.BOTTOM) {
            FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.BOTTOM, offsetX, offsetY, shift);
          } else if (key === FlowNodePortModel.TOP) {
            FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.TOP, offsetX, offsetY, shift);
          } else if (key === FlowNodePortModel.LEFT) {
            FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.LEFT, offsetX, offsetY, shift);
          } else if (key === FlowNodePortModel.RIGHT) {
            FlowDiagramEditor.arrangeFromPort(port, FlowNodePortModel.RIGHT, offsetX, offsetY, shift);
          }
        }
      }
    }
  }

  private static arrangeFromPort(currentPort: PortModel, currentPosition: string, offsetX: number, offsetY: number, shift: Function) {
    if (currentPort && currentPort.getLinks()) {
      let i = 0;
      for (let key in currentPort.getLinks()) {
        let link = currentPort.getLinks()[key];
        if (link) {
          let nextPort = link.getTargetPort();
          if (nextPort && nextPort.getID() !== currentPort.getID()) {
            let nextNode = nextPort.getNode();
            if (nextNode) {
              if (currentPosition === FlowNodePortModel.BOTTOM) {
                if (shift) shift(-1, offsetY + 1);
                FlowDiagramEditor.arrangeFromNode(nextNode, nextPort, offsetX + 1, offsetY + 1, shift);
              } else if (currentPosition === FlowNodePortModel.TOP) {
                if (shift) shift(-1, offsetY);
                FlowDiagramEditor.arrangeFromNode(nextNode, nextPort, offsetX + 1, offsetY, shift);
              } else if (currentPosition === FlowNodePortModel.LEFT) {
                if (shift) shift(offsetX, -1);
                FlowDiagramEditor.arrangeFromNode(nextNode, nextPort, offsetX, offsetY, shift);
              } else if (currentPosition === FlowNodePortModel.RIGHT) {
                FlowDiagramEditor.arrangeFromNode(nextNode, nextPort, offsetX + 1, offsetY, shift);
              }
              i++;
            }
          }
        }
      }
    }
  }
}

interface FlowDiagramEditorHandlers {
  onDropEventHandler: Function;
  onClickEventHandler: Function;
  onAddClickEventHandler: Function;
}
