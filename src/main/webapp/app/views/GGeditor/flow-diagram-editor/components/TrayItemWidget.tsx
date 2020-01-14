import * as React from 'react';
import { createFlowNodeWidget } from '../FlowNodeFactory';

export interface TrayItemWidgetProps {
  model: any;
  onDragStart?: any;
  onDragEnd?: any;
  isDrag?: boolean;
}

export interface TrayItemWidgetState {}

export class TrayItemWidget extends React.Component<TrayItemWidgetProps, TrayItemWidgetState> {
  constructor(props: TrayItemWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { isDrag, onDragStart, onDragEnd, model } = this.props;
    return (
      <div
        draggable={isDrag}
        onDragStart={event => {
          if (onDragStart) this.props.onDragStart(event);
          event.dataTransfer.setData('flow-diagram-node', JSON.stringify(model));
        }}
        onDragEnd={event => {
          if (onDragEnd) this.props.onDragEnd(event);
        }}
        className="tray-item"
      >
        {createFlowNodeWidget(model.type, null, false, false)}
      </div>
    );
  }
}
