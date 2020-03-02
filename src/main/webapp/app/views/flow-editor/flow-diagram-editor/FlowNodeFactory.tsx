import { AbstractNodeFactory, DiagramEngine, NodeModel } from 'storm-react-diagrams';
import {
  DecisionNodeModel,
  EndNodeModel,
  ProcessNodeModel,
  StartNodeModel,
} from './FlowNodeModel';
import * as React from 'react';
import { FlowNodeWidget } from './components/FlowNodeWidget';

const DefaultIcon = require('./icons/default.png');

const DecisionNodeIcon = require('./icons/decision.png');
const InactiveDecisionNodeIcon = require('./icons/decision_disable.png');
const StartNodeIcon = require('./icons/start.png');
const InactiveStartNodeIcon = require('./icons/start_disable.png');

const ProcessNodeIcon = require('./icons/process.png');
const InactiveProcessNodeIcon = require('./icons/process_disable.png');
const EndNodeIcon = require('./icons/end.png');

export function createFlowNodeWidget(type: string, node: NodeModel, portVisible: boolean, dropZoneVisible: boolean) {
  if (type && type === StartNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={StartNodeIcon}
        inactiveIcon={StartNodeIcon}
        title={''}
        width={StartNodeModel.WIDTH}
        height={StartNodeModel.HEIGHT}
        portVisible={portVisible}
        hasActionButton={true}
        canDelete={false}
        dropZoneVisible={dropZoneVisible}
      />
    );

  else if (type && type === ProcessNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={ProcessNodeIcon}
        inactiveIcon={ProcessNodeIcon}
        title={''}
        width={ProcessNodeModel.WIDTH}
        height={ProcessNodeModel.HEIGHT}
        portVisible={portVisible}
        hasActionButton={true}
        canDelete={true}
        dropZoneVisible={dropZoneVisible}
      />
    );
  else if (type && type === DecisionNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={DecisionNodeIcon}
        inactiveIcon={DecisionNodeIcon}
        title={''}
        width={DecisionNodeModel.WIDTH}
        height={DecisionNodeModel.HEIGHT}
        portVisible={portVisible}
        hasActionButton={true}
        canDelete={true}
        dropZoneVisible={dropZoneVisible}
      />
    );
  else if (type && type === EndNodeModel.TYPE)
    return (
      <FlowNodeWidget
        node={node}
        type={type}
        icon={EndNodeIcon}
        inactiveIcon={EndNodeIcon}
        title={''}
        width={EndNodeModel.WIDTH}
        height={EndNodeModel.HEIGHT}
        portVisible={portVisible}
        hasActionButton={false}
        canDelete={false}
        dropZoneVisible={dropZoneVisible}
      />
    );
}

export class StartNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(StartNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(StartNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new StartNodeModel();
  }
}

export class ProcessNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(ProcessNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(ProcessNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new ProcessNodeModel();
  }
}

export class DecisionNodeFactory extends AbstractNodeFactory {
  constructor() {
    super(DecisionNodeModel.TYPE);
  }

  generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): JSX.Element {
    return createFlowNodeWidget(DecisionNodeModel.TYPE, node, true, true);
  }

  getNewInstance() {
    return new DecisionNodeModel();
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
