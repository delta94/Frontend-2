import * as React from 'react';
import { createFlowNodeWidget } from '../FlowNodeFactory';

export interface TrayItemWidgetProps {
  model: any;
  onDragStart?: (event, data?: string) => void;
  onDragEnd?: (event, data?: string) => void;
  onClick?: (event, data?: string) => void;
  isDrag?: boolean;
}

export interface TrayItemWidgetState {}

export class TrayItemWidget extends React.Component<TrayItemWidgetProps, TrayItemWidgetState> {
  constructor(props: TrayItemWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { isDrag, onDragStart, onDragEnd, onClick, model } = this.props;
    return (
      <div
        draggable={isDrag}
        onClick={async event => {
          let data = JSON.stringify(model);
          if (onClick) onClick(event, data);
        }}
        onDragStart={async event => {
          let data = JSON.stringify(model);
          if (onDragStart) onDragStart(event, data);
          event.dataTransfer.setData('flow-diagram-node', data);
        }}
        onDragEnd={async event => {
          let data = JSON.stringify(model);
          if (onDragEnd) onDragEnd(event, data);
        }}
        className="tray-item"
      >
        {createFlowNodeWidget(model.type, null, false, false)}
      </div>
    );
  }
}
