import * as SRD from 'mrblenny-storm-react-diagrams';
import {
  ConditionNodeModel,
  DecisionNodeModel,
  EndNodeModel,
  ForkNodeModel,
  JoinNodeModel,
  MergeNodeModel,
  ProcessNodeModel,
  StartNodeModel
} from './FlowNodeModel';
import * as React from 'react';
import { FlowNodeWidget } from './FlowNodeWidget';
const DecisionWaitingIcon = require('./icons/decision_time_waiting.png');

export class DecisionNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('decision');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={DecisionWaitingIcon} />;
  }

  getNewInstance() {
    return new DecisionNodeModel();
  }
}

export class MergeNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('merge');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={DecisionWaitingIcon} />;
  }

  getNewInstance() {
    return new MergeNodeModel();
  }
}

export class ForkNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('fork');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={DecisionWaitingIcon} />;
  }

  getNewInstance() {
    return new ForkNodeModel();
  }
}

export class JoinNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('join');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={DecisionWaitingIcon} />;
  }

  getNewInstance() {
    return new JoinNodeModel();
  }
}

export class ConditionNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('condition');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={DecisionWaitingIcon} />;
  }

  getNewInstance() {
    return new ConditionNodeModel();
  }
}

export class ProcessNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('process');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={DecisionWaitingIcon} />;
  }

  getNewInstance() {
    return new ProcessNodeModel();
  }
}

export class StartNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('start');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={DecisionWaitingIcon} />;
  }

  getNewInstance() {
    return new StartNodeModel();
  }
}

export class EndNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('end');
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <FlowNodeWidget node={node} icon={DecisionWaitingIcon} />;
  }

  getNewInstance() {
    return new EndNodeModel();
  }
}
