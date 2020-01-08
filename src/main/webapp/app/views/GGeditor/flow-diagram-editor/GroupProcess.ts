import { LinkModel, NodeModel, PortModel } from 'storm-react-diagrams';
import {
  ConditionDecisionNodeModel,
  EmailProcessNodeModel,
  EndNodeModel,
  EventWaitingDecisionNodeModel,
  FlowNodeModel,
  SmsProcessNodeModel,
  TimeWaitingDecisionNodeModel
} from './FlowNodeModel';
import { FlowNodePortModel } from './FlowNodePortModel';
import { createNodeModel } from './FlowDiagramUtil';

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
    return this.inPort && this.outPort && this.nodes.length > 0;
  }

  init(mainNode: FlowNodeModel) {
    this.inPort = mainNode.getDefaultInPort();
    this.outPort = mainNode.getDefaultOutPort();

    this.nodes.push(mainNode);
  }

  static createGroupProcess(type: string): GroupProcess | null {
    if (type && type === EmailProcessNodeModel.TYPE) return new SendEmailGroupProcess(type);
    else if (type && type === SmsProcessNodeModel.TYPE) return new SendSmsGroupProcess(type);
    else if (type && type === ConditionDecisionNodeModel.TYPE) return new ConditionDecisionGroupProcess(type);
    else if (type && type === TimeWaitingDecisionNodeModel.TYPE) return new TimeWaitingDecisionGroupProcess(type);
    else if (type && type === EventWaitingDecisionNodeModel.TYPE) return new EventWaitingDecisionGroupProcess(type);
    return null;
  }
}

export class SendEmailGroupProcess extends GroupProcess {
  constructor(type: string) {
    super(type);
    let mainNode = createNodeModel(EmailProcessNodeModel.TYPE, uuidv4());
    this.init(mainNode);
  }
}

export class SendSmsGroupProcess extends GroupProcess {
  constructor(type: string) {
    super(type);
    let mainNode = createNodeModel(SmsProcessNodeModel.TYPE, uuidv4());
    this.init(mainNode);
  }
}

export class TimeWaitingDecisionGroupProcess extends GroupProcess {
  constructor(type: string) {
    super(type);
    let mainNode = createNodeModel(TimeWaitingDecisionNodeModel.TYPE, uuidv4());
    this.init(mainNode);
  }
}

export class DecisionGroupProcess extends GroupProcess {
  constructor(type: string) {
    super(type);
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

export class ConditionDecisionGroupProcess extends DecisionGroupProcess {
  constructor(type: string) {
    super(type);
    let mainNode = createNodeModel(ConditionDecisionNodeModel.TYPE, uuidv4());
    this.init(mainNode);
  }
}

export class EventWaitingDecisionGroupProcess extends DecisionGroupProcess {
  constructor(type: string) {
    super(type);
    let mainNode = createNodeModel(EventWaitingDecisionNodeModel.TYPE, uuidv4());
    this.init(mainNode);
  }
}
