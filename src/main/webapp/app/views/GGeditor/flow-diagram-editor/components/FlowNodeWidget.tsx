import * as React from 'react';
import { NodeModel, PortWidget } from 'storm-react-diagrams';
import * as _ from 'lodash';
import { FlowNodeModel } from '../FlowNodeModel';
import { FlowNodePortModel } from '../FlowNodePortModel';

const DefaultIcon = require('../icons/default.png');
const AddIcon = require('../icons/add.png');

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
    dropZoneWidth: 48,
    dropZoneHeight: 48,
    dropZoneVisible: false
  };

  constructor(props: FlowNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  getPortTop(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return -8;
    if (portName === FlowNodePortModel.LEFT) return this.props.height / 2 - 8;
    if (portName === FlowNodePortModel.RIGHT) return this.props.height / 2 - 8;
    if (portName === FlowNodePortModel.BOTTOM) return this.props.height - 8;
    return null;
  }

  getPortLeft(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return this.props.height / 2 - 8;
    if (portName === FlowNodePortModel.LEFT) return -8;
    if (portName === FlowNodePortModel.RIGHT) return this.props.width - 8;
    if (portName === FlowNodePortModel.BOTTOM) return this.props.width / 2 - 8;
    return null;
  }

  getDropZoneTop(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return -1.1 * this.props.dropZoneHeight;
    if (portName === FlowNodePortModel.LEFT) return (this.props.height - this.props.dropZoneHeight) / 2 - 1;
    if (portName === FlowNodePortModel.RIGHT) return (this.props.height - this.props.dropZoneHeight) / 2 - 1;
    if (portName === FlowNodePortModel.BOTTOM) return +1.1 * this.props.dropZoneHeight;
    return null;
  }

  getDropZoneLeft(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return (this.props.width - this.props.dropZoneWidth) / 2;
    if (portName === FlowNodePortModel.LEFT) return -1.1 * this.props.width;
    if (portName === FlowNodePortModel.RIGHT) return +1.1 * this.props.width;
    if (portName === FlowNodePortModel.BOTTOM) return (this.props.width - this.props.dropZoneWidth) / 2;
    return null;
  }

  renderPort(portName: string) {
    if (this.props.portVisible && this.props.node && this.props.node.getPort(portName)) {
      return (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: this.getPortTop(portName),
            left: this.getPortLeft(portName)
          }}
        >
          <PortWidget name={portName} node={this.props.node} />
        </div>
      );
    }
  }

  renderDropZone(portName: string) {
    if (this.props.dropZoneVisible && this.props.node && this.props.node instanceof FlowNodeModel) {
      let port = this.props.node.getOutPort(portName);
      if (port) {
        return (
          <div
            onClick={event => {
              if (this.props.node && this.props.node instanceof FlowNodeModel && this.props.node.onAddClick) {
                this.props.node.onAddClick(this.props.node, port);
              }
            }}
            onDrop={event => {
              if (this.props.node && this.props.node instanceof FlowNodeModel && this.props.node.onDrop) {
                let data = JSON.parse(event.dataTransfer.getData('flow-diagram-node'));
                this.props.node.onDrop(this.props.node, port, data);
              }
            }}
            style={{
              position: 'absolute',
              zIndex: 10,
              borderWidth: 2,
              borderRadius: 6,
              borderColor: this.props.node.dropZoneVisible ? '#D1D2DE' : 'transparent',
              borderStyle: 'dashed',
              top: this.getDropZoneTop(portName),
              left: this.getDropZoneLeft(portName),
              width: this.props.dropZoneWidth,
              height: this.props.dropZoneHeight,
              backgroundImage: `url(${AddIcon})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          >
            {' '}
          </div>
        );
      }
    }
  }

  renderIcon() {
    let alias = this.props.node ? this.props.node.getType() + '_' + this.props.node.getID() : this.props.type;
    return (
      <svg
        onClick={event => {
          if (this.props.node && this.props.node instanceof FlowNodeModel && this.props.node.onClick) {
            this.props.node.onClick(this.props.node);
          }
        }}
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
        {this.renderPort(FlowNodePortModel.TOP)}
        {this.renderPort(FlowNodePortModel.LEFT)}
        {this.renderPort(FlowNodePortModel.RIGHT)}
        {this.renderPort(FlowNodePortModel.BOTTOM)}
        {this.renderDropZone(FlowNodePortModel.TOP)}
        {this.renderDropZone(FlowNodePortModel.LEFT)}
        {this.renderDropZone(FlowNodePortModel.RIGHT)}
        {this.renderDropZone(FlowNodePortModel.BOTTOM)}
      </div>
    );
  }
}
