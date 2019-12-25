import * as SRD from 'storm-react-diagrams';
import {
  ConditionDecisionNodeModel,
  ContactSourceStartNodeModel,
  EmailProcessNodeModel,
  EndNodeModel,
  EventSourceStartNodeModel,
  EventWaitingDecisionNodeModel,
  SmsProcessNodeModel,
  TimeWaitingDecisionNodeModel
} from './FlowNodeModel';
import * as React from 'react';
import { FlowNodeWidget } from './FlowNodeWidget';

const DefaultIcon = require('./icons/default.png');
const ConditionDecisionNodeIcon = require('./icons/decision_condition.png');
const TimeWaitingDecisionNodeIcon = require('./icons/decision_time_waiting.png');
const EventWaitingDecisionNodeIcon = require('./icons/decision_event_waiting.png');
const ContactSourceStartNodeIcon = require('./icons/start_contact_source.png');
const EventSourceStartNodeIcon = require('./icons/start_event_source.png');
const EndNodeIcon = require('./icons/end.png');
const EmailProcessNodeIcon = require('./icons/process_email.png');
const SmsProcessNodeIcon = require('./icons/process_sms.png');

export class ContactSourceStartNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super(ContactSourceStartNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={ContactSourceStartNodeIcon} width={68} height={68} />;
  }

  getNewInstance() {
    return new ContactSourceStartNodeModel();
  }
}

export class EventSourceStartNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super(EventSourceStartNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={EventSourceStartNodeIcon} width={68} height={68} />;
  }

  getNewInstance() {
    return new EventSourceStartNodeModel();
  }
}

export class EmailProcessNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super(EmailProcessNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={EmailProcessNodeIcon} />;
  }

  getNewInstance() {
    return new EmailProcessNodeModel();
  }
}

export class SmsProcessNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super(SmsProcessNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={SmsProcessNodeIcon} />;
  }

  getNewInstance() {
    return new SmsProcessNodeModel();
  }
}

export class TimeWaitingDecisionNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super(TimeWaitingDecisionNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={TimeWaitingDecisionNodeIcon} width={90} height={90} />;
  }

  getNewInstance() {
    return new TimeWaitingDecisionNodeModel();
  }
}

export class EventWaitingDecisionNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super(EventWaitingDecisionNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={EventWaitingDecisionNodeIcon} width={90} height={90} />;
  }

  getNewInstance() {
    return new EventWaitingDecisionNodeModel();
  }
}

export class ConditionDecisionNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super(ConditionDecisionNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={ConditionDecisionNodeIcon} width={90} height={90} />;
  }

  getNewInstance() {
    return new ConditionDecisionNodeModel();
  }
}

export class EndNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super(EndNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={EndNodeIcon} width={68} height={68} />;
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
