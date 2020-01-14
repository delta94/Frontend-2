import { LinkModel, NodeModel } from 'storm-react-diagrams';
import { FlowNodePortModel } from './FlowNodePortModel';
import {
  ConditionDecisionNodeModel,
  ContactSourceStartNodeModel,
  EmailProcessNodeModel,
  EndNodeModel,
  EventWaitingDecisionNodeModel,
  FlowNodeModel,
  SmsProcessNodeModel,
  TimeWaitingDecisionNodeModel
} from './FlowNodeModel';

const uuidv4 = require('uuid/v4');
export function createNodeModel(code: string, id: string, label?: string): FlowNodeModel | null {
  let uuid = id && id !== '' ? id : uuidv4();
  if (code === 'SOURCE' || code === ContactSourceStartNodeModel.TYPE) return new ContactSourceStartNodeModel(uuid, label);
  if (code === 'SEND_MAIL' || code === EmailProcessNodeModel.TYPE) return new EmailProcessNodeModel(uuid, label);
  if (code === 'SEND_SMS' || code === SmsProcessNodeModel.TYPE) return new SmsProcessNodeModel(uuid, label);
  if (code === 'TIMER' || code === TimeWaitingDecisionNodeModel.TYPE) return new TimeWaitingDecisionNodeModel(uuid, label);
  if (code === 'TIMER_EVENT' || code === EventWaitingDecisionNodeModel.TYPE) return new EventWaitingDecisionNodeModel(uuid, label);
  if (code === 'GATEWAY' || code === ConditionDecisionNodeModel.TYPE) return new ConditionDecisionNodeModel(uuid, label);
  if (code === 'DES' || code === EndNodeModel.TYPE) return new EndNodeModel(uuid, label);
  return null;
}

export function parseNode(node: any): FlowNodeModel | null {
  let nodeModel = createNodeModel(node.code, node.id, node.label);
  if (nodeModel) {
    // nodeModel.x = node.x ? node.x : 0;
    // nodeModel.y = node.y ? node.y : 0;
    nodeModel.setPosition(node.x ? node.x : 0, node.y ? node.y : 0);
  }
  return nodeModel;
}

function getNodeCode(type: string) {
  switch (type) {
    case ContactSourceStartNodeModel.TYPE:
      return 'SOURCE';
    case EmailProcessNodeModel.TYPE:
      return 'SEND_MAIL';
    case SmsProcessNodeModel.TYPE:
      return 'SEND_SMS';
    case TimeWaitingDecisionNodeModel.TYPE:
      return 'TIMER';
    case EventWaitingDecisionNodeModel.TYPE:
      return 'TIMER_EVENT';
    case ConditionDecisionNodeModel.TYPE:
      return 'GATEWAY';
    case EndNodeModel.TYPE:
      return 'DES';
    default:
      return '';
  }
}

function getEdgeAnchor(position: string) {
  switch (position) {
    case FlowNodePortModel.TOP:
      return 0;
    case FlowNodePortModel.BOTTOM:
      return 1;
    case FlowNodePortModel.LEFT:
      return 2;
    case FlowNodePortModel.RIGHT:
      return 3;
    default:
      return null;
  }
}

export function toNodeData(node: NodeModel): any | null {
  if (node) {
    return {
      type: 'node',
      label: node instanceof FlowNodeModel ? node.label : '',
      code: getNodeCode(node.getType()),
      params: node.getType(),
      value: '',
      id: node.getID(),
      x: node.x,
      y: node.y
    };
  }
  return {};
}

export function toEdgeData(linkModel: LinkModel): any | null {
  if (linkModel) {
    let sourcePort = linkModel.getSourcePort();
    let targetPort = linkModel.getTargetPort();
    return {
      source: sourcePort ? sourcePort.getParent().getID() : '',
      target: targetPort ? targetPort.getParent().getID() : '',
      sourceAnchor: sourcePort ? getEdgeAnchor(sourcePort.getName()) : null,
      targetAnchor: targetPort ? getEdgeAnchor(targetPort.getName()) : null,
      id: linkModel.getID(),
      value: ''
    };
  }
  return null;
}

export function mapToPortPosition(pos: any): string | null {
  if (pos === FlowNodePortModel.TOP || pos === 0 || pos === '0') return FlowNodePortModel.TOP;
  if (pos === FlowNodePortModel.BOTTOM || pos === 1 || pos === '1') return FlowNodePortModel.BOTTOM;
  if (pos === FlowNodePortModel.LEFT || pos === 2 || pos === '2') return FlowNodePortModel.LEFT;
  if (pos === FlowNodePortModel.RIGHT || pos === 3 || pos === '3') return FlowNodePortModel.RIGHT;
  return null;
}

export function toConfigData(listFieldData: {
  listCampign: any[];
  emailConfig: any[];
  messageConfig: any[];
  timerEvent: any[];
  timer: any[];
  getway: any[];
}) {
  let configData: { id: string; hasConfig: boolean }[] = [];
  let parse = items => {
    if (items) {
      for (let item of items) {
        configData.push({ id: item.id, hasConfig: true });
      }
    }
  };

  parse(listFieldData.listCampign);
  parse(listFieldData.emailConfig);
  parse(listFieldData.messageConfig);
  parse(listFieldData.timerEvent);
  parse(listFieldData.timer);
  parse(listFieldData.getway);

  return configData;
}
