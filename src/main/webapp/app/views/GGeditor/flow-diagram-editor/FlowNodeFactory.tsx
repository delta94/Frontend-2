import * as SRD from 'storm-react-diagrams';
import {
  ContactSourceStartNodeModel,
  EmailProcessNodeModel,
  EndNodeModel,
  SmsProcessNodeModel,
  TimeWaitingDecisionNodeModel
} from './FlowNodeModel';
import * as React from 'react';
import { FlowNodeWidget } from './FlowNodeWidget';

const DefaultIcon = require('./icons/default.png');
const DecisionNodeTimeWaitingIcon = require('./icons/decision_time_waiting.png');
const StartNodeContactSourceIcon = require('./icons/start_contact_source.png');
const EndNodeIcon = require('./icons/end.png');
const ProcessNodeEmailIcon = require('./icons/process_email.png');
const ProcessNodeSmsIcon = require('./icons/process_sms.png');

export class ContactSourceStartNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('start_contact_source');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={StartNodeContactSourceIcon} />;
  }

  getNewInstance() {
    return new ContactSourceStartNodeModel();
  }
}

export class EmailProcessNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('process_email');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={ProcessNodeEmailIcon} />;
  }

  getNewInstance() {
    return new EmailProcessNodeModel();
  }
}

export class SmsProcessNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('process_sms');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={ProcessNodeSmsIcon} />;
  }

  getNewInstance() {
    return new SmsProcessNodeModel();
  }
}

export class TimeWaitingDecisionNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('decision_time_waiting');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={DecisionNodeTimeWaitingIcon} />;
  }

  getNewInstance() {
    return new TimeWaitingDecisionNodeModel();
  }
}

export class EndNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('end');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={EndNodeIcon} />;
  }

  getNewInstance() {
    return new EndNodeModel();
  }
}

//
// export class MergeNodeFactory extends SRD.AbstractNodeFactory {
//   constructor() {
//     super('merge');
//   }
//
//   generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
//     return <FlowNodeWidget node={node} icon={DefaultIcon} />;
//   }
//
//   getNewInstance() {
//     return new MergeNodeModel();
//   }
// }
//
// export class ForkNodeFactory extends SRD.AbstractNodeFactory {
//   constructor() {
//     super('fork');
//   }
//
//   generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
//     return <FlowNodeWidget node={node} icon={DefaultIcon} />;
//   }
//
//   getNewInstance() {
//     return new ForkNodeModel();
//   }
// }
//
// export class JoinNodeFactory extends SRD.AbstractNodeFactory {
//   constructor() {
//     super('join');
//   }
//
//   generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
//     return <FlowNodeWidget node={node} icon={DefaultIcon} />;
//   }
//
//   getNewInstance() {
//     return new JoinNodeModel();
//   }
// }
//
// export class ConditionNodeFactory extends SRD.AbstractNodeFactory {
//   constructor() {
//     super('condition');
//   }
//
//   generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
//     return <FlowNodeWidget node={node} icon={DefaultIcon} />;
//   }
//
//   getNewInstance() {
//     return new ConditionNodeModel();
//   }
// }
