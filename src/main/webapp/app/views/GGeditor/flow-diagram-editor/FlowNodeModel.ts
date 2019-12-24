import { NodeModel, PortModel } from 'storm-react-diagrams';
import { FlowNodePortModel } from './FlowNodePortModel';
import { FlowNodeConfig } from 'app/views/GGeditor/flow-diagram-editor/FlowNodeConfig';

export class FlowNodeModel extends NodeModel {
  config: FlowNodeConfig;
  constructor(nodeType: string = 'default', id?: string) {
    super(nodeType, id);
  }

  setConfig(config: FlowNodeConfig) {
    this.config = config;
  }

  getDefaultInPort(): PortModel | null {
    return null;
  }

  getDefaultOutPort(): PortModel | null {
    return null;
  }
}

export class DecisionNodeModel extends FlowNodeModel {
  constructor(nodeType: string = 'decision', id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('bottom')); //out
    this.addPort(new FlowNodePortModel('right')); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort('left');
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort('right');
  }
}

export class MergeNodeModel extends FlowNodeModel {
  constructor(nodeType: string = 'merge', id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('bottom')); //in
    this.addPort(new FlowNodePortModel('right')); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort('left');
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort('right');
  }
}

export class ForkNodeModel extends FlowNodeModel {
  constructor(nodeType: string = 'fork', id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('top')); //out
    this.addPort(new FlowNodePortModel('bottom')); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort('left');
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort('top');
  }
}

export class JoinNodeModel extends FlowNodeModel {
  constructor(nodeType: string = 'join', id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel('top')); //in
    this.addPort(new FlowNodePortModel('bottom')); //in
    this.addPort(new FlowNodePortModel('right')); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort('top');
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort('right');
  }
}

export class ConditionNodeModel extends FlowNodeModel {
  constructor(nodeType: string = 'condition', id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('right')); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort('left');
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort('right');
  }
}

export class ProcessNodeModel extends FlowNodeModel {
  constructor(nodeType: string = 'process', id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('right')); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort('left');
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort('right');
  }
}

export class StartNodeModel extends FlowNodeModel {
  constructor(nodeType: string = 'start', id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel('right')); //out
  }

  getDefaultInPort(): PortModel | null {
    return null;
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort('right');
  }
}

export class EndNodeModel extends FlowNodeModel {
  constructor(id?: string) {
    super('end', id);
    this.addPort(new FlowNodePortModel('left')); //in
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort('left');
  }

  getDefaultOutPort(): PortModel | null {
    return null;
  }
}

export class ContactSourceStartNodeModel extends StartNodeModel {
  constructor(id?: string) {
    super('start_contact_source', id);
  }
}

export class EmailProcessNodeModel extends ProcessNodeModel {
  constructor(id?: string) {
    super('process_email', id);
  }
}

export class SmsProcessNodeModel extends ProcessNodeModel {
  constructor(id?: string) {
    super('process_sms', id);
  }
}

export class TimeWaitingDecisionNodeModel extends DecisionNodeModel {
  constructor(id?: string) {
    super('decision_time_waiting', id);
  }
}

/*
{
          "type":"node",
          "label":"Nhóm khách hàng VIP",
          "code":"SOURCE",
          "value":"",
          "id":"100",
          "emailConfig":null,
          "smsConfig":null,
          "gatewayConfig":null,
          "timerEventConfig":null,
          "x": 50,
          "y": 50,
        }
 */

const createNodeModel = (code: string, id: string): FlowNodeModel | null => {
  if (code === 'SOURCE') return new ContactSourceStartNodeModel(id);
  else if (code === 'SEND_MAIL') return new EmailProcessNodeModel(id);
  else if (code === 'SEND_SMS') return new SmsProcessNodeModel(id);
  else if (code === 'TIMER') return new TimeWaitingDecisionNodeModel(id);
  else if (code === 'DES') return new EndNodeModel(id);
  return null;
};

export function parseNode(node: any): FlowNodeModel | null {
  let nodeModel = createNodeModel(node.code, node.id);
  if (nodeModel) {
    nodeModel.setPosition(node.x ? node.x : 0, node.y ? node.y : 0);
  }
  return nodeModel;
}
