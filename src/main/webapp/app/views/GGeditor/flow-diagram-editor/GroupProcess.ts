import { LinkModel, NodeModel, PortModel } from 'storm-react-diagrams';
import { createNodeModel, EmailProcessNodeModel } from './FlowNodeModel';

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

  private _outPorts: PortModel[] = [];

  get outPorts(): PortModel[] {
    return this._outPorts;
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
    return this._inPort && this._outPorts.length > 0 && this._nodes.length > 0;
  }
}

export class SendEmailGroupProcess extends GroupProcess {
  constructor(type: string) {
    super(type);
    let mainNode = createNodeModel(EmailProcessNodeModel.TYPE, uuidv4());
    this.nodes.push(mainNode);

    this.inPort = mainNode.getDefaultInPort();
    this.outPorts.push(mainNode.getDefaultOutPort());
  }
}
