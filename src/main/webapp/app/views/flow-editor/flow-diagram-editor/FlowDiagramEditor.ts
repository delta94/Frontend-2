import { DiagramEngine, DiagramModel, LinkModel, NodeModel, PortModel } from 'storm-react-diagrams';
import {
  DecisionNodeModel,
  EndNodeModel,
  FlowNodeModel,
  ProcessNodeModel,
  StartNodeModel,
} from './FlowNodeModel';
import { FlowNodePortModel } from './FlowNodePortModel';

import { FlowNodePortFactory } from './FlowNodePortFactory';
import {
  DecisionNodeFactory,
  StartNodeFactory,
  ProcessNodeFactory,
  EndNodeFactory,
} from './FlowNodeFactory';
import { GroupProcess } from './GroupProcess';
import DEFAULT_DATA from './data';
import { mapToPortPosition, parseNode, toEdgeData, toNodeData } from './FlowDiagramUtil';
import { instanceOf } from 'prop-types';
import { RightAngleLinkFactory } from './RightAngleLinkFactory';
import { FlowNodeEventHandlers } from './EventHandlers';

const GRID_SIZE = {
  width: 180,
  height: 180
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

    this.diagramEngine.registerPortFactory(new FlowNodePortFactory(FlowNodePortModel.TYPE, config => new FlowNodePortModel()));
    this.diagramEngine.registerNodeFactory(new StartNodeFactory());
    this.diagramEngine.registerNodeFactory(new ProcessNodeFactory());
    this.diagramEngine.registerNodeFactory(new DecisionNodeFactory());
    this.diagramEngine.registerNodeFactory(new EndNodeFactory());

    this.diagramEngine.setDiagramModel(FlowDiagramEditor.createDiagramModel());
  }

  dropZoneVisible: boolean = false;

  public setDropZoneVisible(dropZoneVisible: boolean) {
    this.dropZoneVisible = dropZoneVisible;

    FlowDiagramEditor.setDropZoneVisible(this.getActiveModel(), dropZoneVisible);
    this.diagramEngine.repaintCanvas();
  }

  readOnly: boolean = false;

  public setReadOnly(readOnly: boolean) {
    this.readOnly = readOnly;

    FlowDiagramEditor.setReadOnly(this.getActiveModel(), readOnly);
    this.diagramEngine.repaintCanvas();
  }

  public clearNodeStatus() {
    FlowDiagramEditor.clearNodeStatus(this.getActiveModel());
    this.diagramEngine.repaintCanvas();
  }

  public setNodeStatus(data: { id: string; isActive: boolean }[], clearStatus?: boolean) {
    if (clearStatus) FlowDiagramEditor.clearNodeStatus(this.getActiveModel());
    FlowDiagramEditor.setNodeStatus(this.getActiveModel(), data);
    this.diagramEngine.repaintCanvas();
  }

  public setNodeLabel(data: { id: string; label: string }[]) {
    FlowDiagramEditor.setNodeLabel(this.getActiveModel(), data);
    this.diagramEngine.repaintCanvas();
  }

  public setNodeInfo(data: { id: string; label?: string; isActive: boolean }[]) {
    FlowDiagramEditor.setNodeInfo(this.getActiveModel(), data);
    this.diagramEngine.repaintCanvas();
  }

  public setNodeExtraInfo(data: { id: string; extraLabel: string; extraIcon: string }[]) {
    FlowDiagramEditor.setNodeExtraInfo(this.getActiveModel(), data);
    this.diagramEngine.repaintCanvas();
  }

  eventHandlers: FlowNodeEventHandlers = null;
  public setEventHandlers(eventHandlers: FlowNodeEventHandlers) {
    this.eventHandlers = eventHandlers;
    FlowDiagramEditor.setEventHandlers(this.getActiveModel(), eventHandlers);
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

  public setDiagramData(data: { nodes: any[]; edges: any[] }) {
    let model = FlowDiagramEditor.createDiagramModel();
    FlowDiagramEditor.loadDiagramData(model, data, this.readOnly, this.dropZoneVisible, this.eventHandlers);
    FlowDiagramEditor.arrange(model);
    this.diagramEngine.setDiagramModel(model);
  }

  public addGroupProcess(groupProcess: GroupProcess, position: PortModel) {
    let model = this.getActiveModel();
    if (FlowDiagramEditor.addGroupProcess(model, groupProcess, position, this.readOnly, this.dropZoneVisible, this.eventHandlers)) {
      FlowDiagramEditor.arrange(model);
      this.diagramEngine.recalculatePortsVisually();
      this.diagramEngine.repaintCanvas();
    }
  }

  public deleteNode(node: { id: string } | NodeModel) {
    let model = this.getActiveModel();
    if (node) {
      FlowDiagramEditor.deleteFromNode(model, node instanceof NodeModel ? node : model.getNode(node.id), null, false);
      FlowDiagramEditor.arrange(model);
      this.diagramEngine.recalculatePortsVisually();
      this.diagramEngine.repaintCanvas();
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

  private static loadDiagramData(
    model: DiagramModel,
    data: { nodes: any[]; edges: any[] },
    readOnly: boolean,
    dropZoneVisible: boolean,
    eventHandlers: FlowNodeEventHandlers
  ) {
    if (data) {
      for (let nodeData of data.nodes ? data.nodes : DEFAULT_DATA.flow.graph.nodes) {
        if (nodeData) {
          let node = parseNode(nodeData);
          if (node) {
            if (node instanceof FlowNodeModel) {
              node.readOnly = readOnly;
              node.dropZoneVisible = dropZoneVisible;
              node.eventHandlers = eventHandlers;
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
    readOnly: boolean,
    dropZoneVisible: boolean,
    eventHandlers: FlowNodeEventHandlers
  ): boolean {
    console.log(groupProcess);
    if (groupProcess && groupProcess.isValid() && position) {
      for (let node of groupProcess.nodes) {
        console.log(node);
        if (node) {
          if (node instanceof FlowNodeModel) {
            node.readOnly = readOnly;
            node.dropZoneVisible = dropZoneVisible;
            node.eventHandlers = eventHandlers;
          }

          model.addNode(node);
        }
      }
      //add links
      for (let link of groupProcess.links) {
        model.addLink(link);
      }

      //swap port
      if (groupProcess.inPort && position.getLinks()) {
        for (let key in position.getLinks()) {
          let currentInLink = position.getLinks()[key];
          if (currentInLink) {
            let sourcePort = currentInLink.getSourcePort();
            if (sourcePort) {
              currentInLink.remove();
              let newInLink = sourcePort.createLinkModel();
              newInLink.setSourcePort(sourcePort);
              newInLink.setTargetPort(groupProcess.inPort);
              model.addLink(newInLink);
            }
          }
        }
      }

      if(groupProcess.outPort){
        //add new link
        let newOutLink = groupProcess.outPort.createLinkModel();
        newOutLink.setSourcePort(groupProcess.outPort);
        newOutLink.setTargetPort(position);
        model.addLink(newOutLink);
      }
      return true;
    }

    return false;
  }

  private static deleteFromNode(model: DiagramModel, fromNode: NodeModel, fromPort: PortModel, deepDelete: boolean) {
    if (fromNode) {
      if (!deepDelete && fromNode instanceof FlowNodeModel) {
        let inPort = fromNode.getDefaultInPort();
        let outPort = fromNode.getDefaultOutPort();
        if (fromNode.getPorts()) {
          for (let key in fromNode.getPorts()) {
            let port = fromNode.getPorts()[key];
            //keep main branch
            if (
              port &&
              !(fromPort && port.getID() === fromPort.getID()) &&
              !(inPort && port.getID() === inPort.getID()) &&
              !(outPort && port.getID() === outPort.getID())
            ) {
              FlowDiagramEditor.deleteFromPort(model, port, true);
            }
          }
        }

        let targetPorts: PortModel[] = [];
        if (outPort && outPort.getLinks()) {
          for (let key in outPort.getLinks()) {
            let link = outPort.getLinks()[key];
            if (link) {
              if (link.getTargetPort()) targetPorts.push(link.getTargetPort());
              model.removeLink(link);
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
                model.removeLink(link);
              }
            }
          }
        }
      } else {
        if (fromNode.getPorts()) {
          for (let key in fromNode.getPorts()) {
            let port = fromNode.getPorts()[key];
            if (port && !(fromPort && port.getID() === fromPort.getID())) {
              FlowDiagramEditor.deleteFromPort(model, port, true);
            }
          }
        }
      }
      model.removeNode(fromNode);
    }
  }

  private static deleteFromPort(model: DiagramModel, fromPort: PortModel, deepDelete: boolean) {
    for (let key in fromPort.getLinks()) {
      let link = fromPort.getLinks()[key];
      if (link) {
        if (deepDelete && link.getTargetPort()) {
          let targetPort = link.getTargetPort();
          FlowDiagramEditor.deleteFromNode(model, targetPort.getNode(), targetPort, true);
        }
        model.removeLink(link);
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

  private static setReadOnly(model: DiagramModel, readOnly: boolean) {
    if (model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof FlowNodeModel) {
          node.readOnly = readOnly;
        }
      }
    }
  }

  private static clearNodeStatus(model: DiagramModel) {
    if (model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof FlowNodeModel) {
          node.isActive = false;
        }
      }
    }
  }

  private static setNodeStatus(model: DiagramModel, data: { id: string; isActive: boolean }[]) {
    if (model && data) {
      for (let item of data) {
        let node = model.getNode(item.id);
        if (node && node instanceof FlowNodeModel) node.isActive = item.isActive;
      }
    }
  }

  private static setNodeLabel(model: DiagramModel, data: { id: string; label: string }[]) {
    if (model && data) {
      for (let item of data) {
        let node = model.getNode(item.id);
        if (node && node instanceof FlowNodeModel) node.label = item.label;
      }
    }
  }

  private static setNodeInfo(model: DiagramModel, data: { id: string; label?: string; isActive: boolean }[]) {
    if (model && data) {
      for (let item of data) {
        let node = model.getNode(item.id);
        if (node && node instanceof FlowNodeModel) {
          node.label = item.label;
          node.isActive = item.isActive;
        }
      }
    }
  }

  private static setNodeExtraInfo(model: DiagramModel, data: { id: string; extraLabel: string; extraIcon: string }[]) {
    if (model && data) {
      for (let item of data) {
        let node = model.getNode(item.id);
        if (node && node instanceof FlowNodeModel) {
          node.extraLabel = item.extraLabel;
          node.extraIcon = item.extraIcon;
        }
      }
    }
  }

  private static setEventHandlers(model: DiagramModel, eventHandlers: FlowNodeEventHandlers) {
    if (eventHandlers && model && model.getNodes()) {
      for (let key in model.getNodes()) {
        let node = model.getNodes()[key];
        if (node && node instanceof FlowNodeModel) {
          node.eventHandlers = eventHandlers;
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
