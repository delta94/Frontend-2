import { NodeModel, PortModel } from 'storm-react-diagrams';
import { FlowNodePortModel } from './FlowNodePortModel';
import { FlowNodeConfig } from 'app/views/GGeditor/flow-diagram-editor/FlowNodeConfig';

export class FlowNodeModel extends NodeModel {
  static TYPE: string = 'default';

  config: FlowNodeConfig;
  constructor(nodeType: string = FlowNodeModel.TYPE, id?: string) {
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

  getInPort(pos?: string): PortModel | null {
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    return null;
  }
}

export class DecisionNodeModel extends FlowNodeModel {
  static TYPE: string = 'decision';

  constructor(nodeType: string = DecisionNodeModel.TYPE, id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM)); //out
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT)); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return this.getDefaultInPort();
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.RIGHT || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return this.getDefaultOutPort();
  }
}

export class MergeNodeModel extends FlowNodeModel {
  static TYPE: string = 'fork';

  constructor(nodeType: string = MergeNodeModel.TYPE, id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT)); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.LEFT || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return this.getDefaultInPort();
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return this.getDefaultOutPort();
  }
}

export class ForkNodeModel extends FlowNodeModel {
  static TYPE: string = 'fork';

  constructor(nodeType: string = ForkNodeModel.TYPE, id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.TOP)); //out
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM)); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.TOP);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return this.getDefaultInPort();
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.TOP || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return this.getDefaultOutPort();
  }
}

export class JoinNodeModel extends FlowNodeModel {
  static TYPE: string = 'join';

  constructor(nodeType: string = JoinNodeModel.TYPE, id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.TOP)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT)); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.TOP);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.TOP || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return this.getDefaultInPort();
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return this.getDefaultOutPort();
  }
}

export class ProcessNodeModel extends FlowNodeModel {
  static TYPE: string = 'process';

  constructor(nodeType: string = ProcessNodeModel.TYPE, id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT)); //out
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return this.getDefaultInPort();
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return this.getDefaultOutPort();
  }
}

export class StartNodeModel extends FlowNodeModel {
  static TYPE: string = 'start';

  constructor(nodeType: string = StartNodeModel.TYPE, id?: string) {
    super(nodeType, id);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT)); //out
  }

  getDefaultInPort(): PortModel | null {
    return null;
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return this.getDefaultOutPort();
  }
}

export class EndNodeModel extends FlowNodeModel {
  static TYPE: string = 'end';

  constructor(id?: string) {
    super(EndNodeModel.TYPE, id);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT)); //in
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return null;
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return this.getDefaultInPort();
  }

  getOutPort(pos?: string): PortModel | null {
    return null;
  }
}

export class ContactSourceStartNodeModel extends StartNodeModel {
  static TYPE: string = 'start_contact_source';

  constructor(id?: string) {
    super(ContactSourceStartNodeModel.TYPE, id);
  }
}

export class EventSourceStartNodeModel extends StartNodeModel {
  static TYPE: string = 'start_event_source';

  constructor(id?: string) {
    super(EventSourceStartNodeModel.TYPE, id);
  }
}

export class EmailProcessNodeModel extends ProcessNodeModel {
  static TYPE: string = 'process_email';

  constructor(id?: string) {
    super(EmailProcessNodeModel.TYPE, id);
  }
}

export class SmsProcessNodeModel extends ProcessNodeModel {
  static TYPE: string = 'process_sms';

  constructor(id?: string) {
    super(SmsProcessNodeModel.TYPE, id);
  }
}

export class TimeWaitingDecisionNodeModel extends DecisionNodeModel {
  static TYPE: string = 'decision_time_waiting';

  constructor(id?: string) {
    super(TimeWaitingDecisionNodeModel.TYPE, id);
  }
}

export class EventWaitingDecisionNodeModel extends DecisionNodeModel {
  static TYPE: string = 'decision_event_waiting';

  constructor(id?: string) {
    super(EventWaitingDecisionNodeModel.TYPE, id);
  }
}

export class ConditionDecisionNodeModel extends DecisionNodeModel {
  static TYPE: string = 'decision_condition';

  constructor(id?: string) {
    super(ConditionDecisionNodeModel.TYPE, id);
  }
}

const createNodeModel = (code: string, id: string): FlowNodeModel | null => {
  if (code === 'SOURCE') return new ContactSourceStartNodeModel(id);
  if (code === 'SEND_MAIL') return new EmailProcessNodeModel(id);
  if (code === 'SEND_SMS') return new SmsProcessNodeModel(id);
  if (code === 'TIMER') return new TimeWaitingDecisionNodeModel(id);
  if (code === 'TIMER_EVENT') return new EventWaitingDecisionNodeModel(id);
  if (code === 'GATEWAY') return new ConditionDecisionNodeModel(id);
  if (code === 'DES') return new EndNodeModel(id);
  return null;
};

export function parseNode(node: any): FlowNodeModel | null {
  let nodeModel = createNodeModel(node.code, node.id);
  if (nodeModel) {
    nodeModel.setPosition(node.x ? node.x : 0, node.y ? node.y : 0);
  }
  return nodeModel;
}

export function mapToPortPosition(pos: any): string | null {
  if (pos === FlowNodePortModel.TOP || pos === 0 || pos === '0') return FlowNodePortModel.TOP;
  if (pos === FlowNodePortModel.BOTTOM || pos === 1 || pos === '1') return FlowNodePortModel.BOTTOM;
  if (pos === FlowNodePortModel.LEFT || pos === 2 || pos === '2') return FlowNodePortModel.LEFT;
  if (pos === FlowNodePortModel.RIGHT || pos === 3 || pos === '3') return FlowNodePortModel.RIGHT;
  return null;
}
