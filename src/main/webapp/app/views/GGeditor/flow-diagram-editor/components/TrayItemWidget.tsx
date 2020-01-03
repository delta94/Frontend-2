import * as React from 'react';
import { createFlowNodeWidget } from '../FlowNodeFactory';

export interface TrayItemWidgetProps {
  model: any;
  onDragStart: any;
  onDragEnd: any;
}

export interface TrayItemWidgetState {}

export class TrayItemWidget extends React.Component<TrayItemWidgetProps, TrayItemWidgetState> {
  constructor(props: TrayItemWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        draggable={true}
        onDragStart={event => {
          if (this.props.onDragStart) this.props.onDragStart(event);
          event.dataTransfer.setData('flow-diagram-node', JSON.stringify(this.props.model));
        }}
        onDragEnd={event => {
          if (this.props.onDragEnd) this.props.onDragEnd(event);
        }}
        className="tray-item"
      >
        {createFlowNodeWidget(this.props.model.type, null, false, false)}
      </div>
    );
  }
}
