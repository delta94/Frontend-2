import { AbstractNodeFactory, DiagramEngine, NodeModel } from 'storm-react-diagrams';
import {
  ConditionDecisionNodeModel,
  ContactSourceStartNodeModel,
  DecisionNodeModel,
  EmailProcessNodeModel,
  EndNodeModel,
  EventSourceStartNodeModel,
  EventWaitingDecisionNodeModel,
  ProcessNodeModel,
  SmsProcessNodeModel,
  StartNodeModel,
  TimeWaitingDecisionNodeModel
} from './FlowNodeModel';
import * as React from 'react';
import { FlowNodeWidget } from './components/FlowNodeWidget';

const DefaultIcon = require('./icons/default.png');
const ConditionDecisionNodeIcon = require('./icons/decision_condition.png');
const TimeWaitingDecisionNodeIcon = require('./icons/decision_time_waiting.png');
const EventWaitingDecisionNodeIcon = require('./icons/decision_event_waiting.png');
const ContactSourceStartNodeIcon = require('./icons/start_contact_source.png');
const EventSourceStartNodeIcon = require('./icons/start_event_source.png');
const EndNodeIcon = require('./icons/end.png');
const EmailProcessNodeIcon = require('./icons/process_email.png');
const SmsProcessNodeIcon = require('./icons/process_sms.png');

export function createFlowNodeWidget(type: string, node: NodeModel, portVisible: boolean, dropZoneVisible: boolean) {
  if (type && type === ContactSourceStartNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={ContactSourceStartNodeIcon}
        title={''}
        width={StartNodeModel.WIDTH}
        height={StartNodeModel.HEIGHT}
        portVisible={portVisible}
        dropZoneVisible={dropZoneVisible}
      />
    );
  else if (type && type === EventSourceStartNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={EventSourceStartNodeIcon}
        title={''}
        width={StartNodeModel.WIDTH}
        height={StartNodeModel.HEIGHT}
        portVisible={portVisible}
        dropZoneVisible={dropZoneVisible}
      />
    );
  else if (type && type === EmailProcessNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={EmailProcessNodeIcon}
        title={''}
        width={ProcessNodeModel.WIDTH}
        height={ProcessNodeModel.HEIGHT}
        portVisible={portVisible}
        dropZoneVisible={dropZoneVisible}
      />
    );
  else if (type && type === SmsProcessNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={SmsProcessNodeIcon}
        title={''}
        width={ProcessNodeModel.WIDTH}
        height={ProcessNodeModel.HEIGHT}
        portVisible={portVisible}
        dropZoneVisible={dropZoneVisible}
      />
    );
  else if (type && type === TimeWaitingDecisionNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={TimeWaitingDecisionNodeIcon}
        title={''}
        width={DecisionNodeModel.WIDTH}
        height={DecisionNodeModel.HEIGHT}
        portVisible={portVisible}
        dropZoneVisible={dropZoneVisible}
      />
    );
  else if (type && type === EventWaitingDecisionNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={EventWaitingDecisionNodeIcon}
        title={''}
        width={DecisionNodeModel.WIDTH}
        height={DecisionNodeModel.HEIGHT}
        portVisible={portVisible}
        dropZoneVisible={dropZoneVisible}
      />
    );
  else if (type && type === ConditionDecisionNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={ConditionDecisionNodeIcon}
        title={''}
        width={DecisionNodeModel.WIDTH}
        height={DecisionNodeModel.HEIGHT}
        portVisible={portVisible}
        dropZoneVisible={dropZoneVisible}
      />
    );
  else if (type && type === EndNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={EndNodeIcon}
        title={''}
        width={EndNodeModel.WIDTH}
        height={EndNodeModel.HEIGHT}
        portVisible={portVisible}
        dropZoneVisible={dropZoneVisible}
      />
    );
}

export class ContactSourceStartNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(ContactSourceStartNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(ContactSourceStartNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new ContactSourceStartNodeModel();
  }
}

export class EventSourceStartNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(EventSourceStartNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(EventSourceStartNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new EventSourceStartNodeModel();
  }
}

export class EmailProcessNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(EmailProcessNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(EmailProcessNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new EmailProcessNodeModel();
  }
}

export class SmsProcessNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(SmsProcessNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(SmsProcessNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new SmsProcessNodeModel();
  }
}

export class TimeWaitingDecisionNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(TimeWaitingDecisionNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(TimeWaitingDecisionNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new TimeWaitingDecisionNodeModel();
  }
}

export class EventWaitingDecisionNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(EventWaitingDecisionNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(EventWaitingDecisionNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new EventWaitingDecisionNodeModel();
  }
}

export class ConditionDecisionNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(ConditionDecisionNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(ConditionDecisionNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new ConditionDecisionNodeModel();
  }
}

export class EndNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(EndNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(EndNodeModel.TYPE, node, true, false);
  }

  getNewInstance() {
    return new EndNodeModel();
  }
}

//
// export class MergeNodeFactory extends AbstractNodeFactory {
//   constructor() {
//     super('merge');
//   }
//
//   generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
//     return <FlowNodeWidget node={node} icon={DefaultIcon} />;
//   }
//
//   getNewInstance() {
//     return new MergeNodeModel();
//   }
// }
//
// export class ForkNodeFactory extends AbstractNodeFactory {
//   constructor() {
//     super('fork');
//   }
//
//   generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
//     return <FlowNodeWidget node={node} icon={DefaultIcon} />;
//   }
//
//   getNewInstance() {
//     return new ForkNodeModel();
//   }
// }
//
// export class JoinNodeFactory extends AbstractNodeFactory {
//   constructor() {
//     super('join');
//   }
//
//   generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
//     return <FlowNodeWidget node={node} icon={DefaultIcon} />;
//   }
//
//   getNewInstance() {
//     return new JoinNodeModel();
//   }
// }
//
// export class ConditionNodeFactory extends AbstractNodeFactory {
//   constructor() {
//     super('condition');
//   }
//
//   generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
//     return <FlowNodeWidget node={node} icon={DefaultIcon} />;
//   }
//
//   getNewInstance() {
//     return new ConditionNodeModel();
//   }
// }
