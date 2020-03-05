import {
  DecisionNodeModel,
  EndNodeModel,
  ProcessNodeModel,
  StartNodeModel,
} from './FlowNodeModel';
import * as React from 'react';
import { FlowNodeWidget } from './components/FlowNodeWidget';
import {
  DecisionGroupProcess,
  DefaultGroupProcess,
  GroupProcess, NewBranchGroupProcess
} from './GroupProcess';

const DefaultIcon = require('./icons/default.png');

const DecisionNodeIcon = require('./icons/decision.png');
const InactiveDecisionNodeIcon = require('./icons/decision_disable.png');
const StartNodeIcon = require('./icons/start.png');
const InactiveStartNodeIcon = require('./icons/start_disable.png');

const ProcessNodeIcon = require('./icons/process.png');
const InactiveProcessNodeIcon = require('./icons/process_disable.png');
const EndNodeIcon = require('./icons/end.png');

const NewBranchNodeIcon = require('./icons/new_branch.png');

export function createGroupProcessWidget(type: string) {
  if (type && type === DefaultGroupProcess.TYPE)
    return (
      <FlowNodeWidget
        node={null}
        type={type}
        icon={ProcessNodeIcon}
        inactiveIcon={ProcessNodeIcon}
        title={''}
        width={ProcessNodeModel.WIDTH}
        height={ProcessNodeModel.HEIGHT}
        portVisible={false}
        hasActionButton={true}
        canDelete={true}
        dropZoneVisible={false}
      />
    );
  else if (type && type === DecisionGroupProcess.TYPE)
    return (
      <FlowNodeWidget
        node={null}
        type={type}
        icon={DecisionNodeIcon}
        inactiveIcon={DecisionNodeIcon}
        title={''}
        width={DecisionNodeModel.WIDTH}
        height={DecisionNodeModel.HEIGHT}
        portVisible={false}
        hasActionButton={true}
        canDelete={true}
        dropZoneVisible={false}
      />
    );
  else if (type && type === NewBranchGroupProcess.TYPE)
    return (
      <FlowNodeWidget
        node={null}
        type={type}
        icon={NewBranchNodeIcon}
        inactiveIcon={NewBranchNodeIcon}
        title={''}
        width={DecisionNodeModel.WIDTH}
        height={DecisionNodeModel.HEIGHT}
        portVisible={false}
        hasActionButton={false}
        canDelete={false}
        dropZoneVisible={false}
      />
    );
}

export function createGroupProcess(type: string): GroupProcess | null {
  if (type && type === DefaultGroupProcess.TYPE) return new DefaultGroupProcess();
  else if (type && type === DecisionGroupProcess.TYPE) return new DecisionGroupProcess();
  else if (type && type === NewBranchGroupProcess.TYPE) return new NewBranchGroupProcess();
  return null;
}
