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

const DecisionNodeIcon = require('./icons/decision.svg');
const ProcessNodeIcon = require('./icons/process.svg');

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
}

export function createGroupProcess(type: string): GroupProcess | null {
  if (type && type === DefaultGroupProcess.TYPE) return new DefaultGroupProcess();
  else if (type && type === DecisionGroupProcess.TYPE) return new DecisionGroupProcess();
  else if (type && type === NewBranchGroupProcess.TYPE) return new NewBranchGroupProcess();
  return null;
}
