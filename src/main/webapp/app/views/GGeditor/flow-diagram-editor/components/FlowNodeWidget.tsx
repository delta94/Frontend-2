import * as React from 'react';
import { NodeModel, PortWidget } from 'storm-react-diagrams';
import * as _ from 'lodash';
import { FlowNodeModel } from 'app/views/GGeditor/flow-diagram-editor/FlowNodeModel';

const DefaultIcon = require('../icons/default.png');

export interface FlowNodeWidgetProps {
  width: number;
  height: number;
  type: string;
  icon: string;
  title: string;
  node: NodeModel;
  portVisible: boolean;
  dropZoneWidth: number;
  dropZoneHeight: number;
  dropZoneVisible: boolean;
}

export interface FlowNodeWidgetState {}

export class FlowNodeWidget extends React.Component<FlowNodeWidgetProps, FlowNodeWidgetState> {
  public static defaultProps: FlowNodeWidgetProps = {
    width: 64,
    height: 64,
    type: 'flow_node',
    icon: DefaultIcon,
    title: '',
    node: null,
    portVisible: true,
    dropZoneWidth: 64,
    dropZoneHeight: 64,
    dropZoneVisible: false
  };

  constructor(props: FlowNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  renderLeftPort() {
    if (this.props.portVisible && this.props.node && this.props.node.getPort('left')) {
      return (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: this.props.height / 2 - 8,
            left: -8
          }}
        >
          <PortWidget name="left" node={this.props.node} />
        </div>
      );
    }
  }

  renderTopPort() {
    if (this.props.portVisible && this.props.node && this.props.node.getPort('top')) {
      return (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.height / 2 - 8,
            top: -8
          }}
        >
          <PortWidget name="top" node={this.props.node} />
        </div>
      );
    }
  }

  renderRightPort() {
    if (this.props.portVisible && this.props.node && this.props.node.getPort('right')) {
      return (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.width - 8,
            top: this.props.height / 2 - 8
          }}
        >
          <PortWidget name="right" node={this.props.node} />
        </div>
      );
    }
  }

  renderBottomPort() {
    if (this.props.portVisible && this.props.node && this.props.node.getPort('bottom')) {
      return (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.width / 2 - 8,
            top: this.props.height - 8
          }}
        >
          <PortWidget name="bottom" node={this.props.node} />
        </div>
      );
    }
  }

  renderDropZone() {
    if (this.props.dropZoneVisible && (!this.props.node || (this.props.node instanceof FlowNodeModel && this.props.node.dropZoneVisible))) {
      return (
        <div
          onDrop={event => {
            if (this.props.node && this.props.node instanceof FlowNodeModel && this.props.node.onDrop) {
              let data = JSON.parse(event.dataTransfer.getData('flow-diagram-node'));
              this.props.node.onDrop(this.props.node, data);
            }
          }}
          style={{
            position: 'absolute',
            zIndex: 10,
            borderWidth: 2,
            borderRadius: 6,
            borderColor: '#D1D2DE',
            borderStyle: 'dashed',
            top: (this.props.height - this.props.dropZoneHeight) / 2,
            left: -1.1 * this.props.dropZoneWidth,
            width: this.props.dropZoneWidth,
            height: this.props.dropZoneHeight
          }}
        ></div>
      );
    }
  }

  renderIcon() {
    let alias = this.props.node ? this.props.node.getType() + '_' + this.props.node.getID() : this.props.type;
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        dangerouslySetInnerHTML={{
          __html:
            `
            <defs>
              <pattern id="` +
            alias +
            `_image" patternUnits="userSpaceOnUse" height="` +
            this.props.height +
            `" width="` +
            this.props.width +
            `">
                <image x="0" y="0" height="` +
            this.props.height +
            `" width="` +
            this.props.width +
            `" xlink:href="` +
            this.props.icon +
            `"></image>
              </pattern>
            </defs>
            <rect height="` +
            this.props.height +
            `" width="` +
            this.props.width +
            `" fill="url(#` +
            alias +
            `_image)"/>
        `
        }}
      />
    );
  }

  render() {
    return (
      <div
        className={'flow-node'}
        style={{
          position: 'relative',
          width: this.props.width,
          height: this.props.height
        }}
      >
        {this.renderIcon()}
        {this.renderLeftPort()}
        {this.renderTopPort()}
        {this.renderRightPort()}
        {this.renderBottomPort()}
        {this.renderDropZone()}
      </div>
    );
  }
}
