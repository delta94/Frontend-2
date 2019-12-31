import * as React from 'react';
import { TrayWidget } from './TrayWidget';
import { FlowDiagramEditor } from '../FlowDiagramEditor';
import { TrayItemWidget } from './TrayItemWidget';
import { DiagramWidget } from 'storm-react-diagrams';
import {
  ConditionDecisionNodeModel,
  ContactSourceStartNodeModel,
  EmailProcessNodeModel,
  EndNodeModel,
  EventSourceStartNodeModel,
  EventWaitingDecisionNodeModel,
  SmsProcessNodeModel,
  TimeWaitingDecisionNodeModel
} from '../FlowNodeModel';
import { SendEmailGroupProcess } from 'app/views/GGeditor/flow-diagram-editor/GroupProcess';

export interface BodyWidgetProps {
  editor: FlowDiagramEditor;
}

export interface BodyWidgetState {}

export class BodyWidget extends React.Component<BodyWidgetProps, BodyWidgetState> {
  constructor(props: BodyWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    const handleOnDragStart = event => {
      this.props.editor.setDropZoneVisible(true);
      this.forceUpdate();
    };

    const handleOnDragEnd = event => {
      this.props.editor.setDropZoneVisible(false);
      this.forceUpdate();
    };

    return (
      <div className="body">
        <div className="header">
          <div className="title">Chiến dịch Demo</div>
        </div>
        <div className="content">
          <TrayWidget>
            <TrayItemWidget
              model={{ type: ContactSourceStartNodeModel.TYPE }}
              onDragStart={handleOnDragStart}
              onDragEnd={handleOnDragEnd}
            />
            <TrayItemWidget model={{ type: EventSourceStartNodeModel.TYPE }} onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd} />
            <TrayItemWidget model={{ type: EmailProcessNodeModel.TYPE }} onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd} />
            <TrayItemWidget model={{ type: SmsProcessNodeModel.TYPE }} onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd} />
            <TrayItemWidget
              model={{ type: TimeWaitingDecisionNodeModel.TYPE }}
              onDragStart={handleOnDragStart}
              onDragEnd={handleOnDragEnd}
            />
            <TrayItemWidget
              model={{ type: EventWaitingDecisionNodeModel.TYPE }}
              onDragStart={handleOnDragStart}
              onDragEnd={handleOnDragEnd}
            />
            <TrayItemWidget model={{ type: ConditionDecisionNodeModel.TYPE }} onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd} />
            <TrayItemWidget model={{ type: EndNodeModel.TYPE }} onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd} />
          </TrayWidget>
          <div
            className="diagram-layer"
            onDragOver={event => {
              event.preventDefault();
            }}
          >
            <DiagramWidget className="srd-flow-canvas" diagramEngine={this.props.editor.getDiagramEngine()} smartRouting={true} />
          </div>
        </div>
      </div>
    );
  }
}
