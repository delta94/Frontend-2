import { LinkModel, NodeModel, PointModel, PortModel } from 'storm-react-diagrams';
import {
  DecisionNodeModel,
  ProcessNodeModel,
  EndNodeModel,
  FlowNodeModel,
} from './FlowNodeModel';
import { FlowNodePortModel } from './FlowNodePortModel';
import { createNodeModel } from './FlowDiagramUtil';
import { ConditionDecisionNodeModel } from 'app/views/ggeditor/flow-diagram-editor';

const uuidv4 = require('uuid/v4');

export class GroupProcess {
  private readonly _type: string;

  constructor(type: string = 'default') {
    this._type = type;
  }

  private _inPort: PortModel;

  get inPort(): PortModel {
    return this._inPort;
  }

  set inPort(value: PortModel) {
    this._inPort = value;
  }

  private _outPort: PortModel;

  get outPort(): PortModel {
    return this._outPort;
  }

  set outPort(value: PortModel) {
    this._outPort = value;
  }

  private _nodes: NodeModel[] = [];

  get nodes(): NodeModel[] {
    return this._nodes;
  }

  private _links: LinkModel[] = [];

  get links(): LinkModel[] {
    return this._links;
  }

  get type(): string {
    return this._type;
  }

  isValid(): boolean {
    return this.inPort && this.outPort && this.nodes && this.nodes.length > 0;
  }

  init(mainNode: FlowNodeModel) {
    this.inPort = mainNode.getDefaultInPort();
    this.outPort = mainNode.getDefaultOutPort();

    this.nodes.push(mainNode);
  }

  static createGroupProcess(type: string): GroupProcess | null {
    if (type && type === ProcessNodeModel.TYPE) return new DefaultGroupProcess(type);
    else if (type && type === DecisionNodeModel.TYPE) return new DecisionGroupProcess(type);
    return null;
  }
}

export class DefaultGroupProcess extends GroupProcess {
  constructor(type: string) {
    super(type);
    let mainNode = createNodeModel(ProcessNodeModel.TYPE, uuidv4());
    this.init(mainNode);
  }
}

export class DecisionGroupProcess extends GroupProcess {
  constructor(type: string) {
    super(type);
    let mainNode = createNodeModel(DecisionNodeModel.TYPE, uuidv4());
    this.init(mainNode);
  }

  init(mainNode: FlowNodeModel) {
    let endNode = createNodeModel(EndNodeModel.TYPE, uuidv4());

    let bottomPort = mainNode.getOutPort(FlowNodePortModel.BOTTOM);
    let bottomEndLink = bottomPort.createLinkModel();
    bottomEndLink.setSourcePort(bottomPort);
    bottomEndLink.setTargetPort(endNode.getDefaultInPort());

    this.inPort = mainNode.getDefaultInPort();
    this.outPort = mainNode.getDefaultOutPort();

    this.nodes.push(mainNode, endNode);

    this.links.push(bottomEndLink);
  }
}
