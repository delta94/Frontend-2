import * as React from 'react';
import { NodeModel, PortWidget } from 'storm-react-diagrams';
import * as _ from 'lodash';
import { FlowNodeModel } from '../FlowNodeModel';
import { FlowNodePortModel } from '../FlowNodePortModel';
import { toNodeData } from '../FlowDiagramUtil';
import { SvgIconWidget } from './SvgIconWidget';

import { Translate, translate } from 'react-jhipster';

const DefaultIcon = require('../icons/default.png');
const AddIcon = require('../icons/add.png');
const SettingIcon = require('../icons/setting.png');
const DeleteIcon = require('../icons/delete.png');

export interface FlowNodeWidgetProps {
  width: number;
  height: number;
  type: string;
  icon: string;
  inactiveIcon: string;
  title: string;
  node: NodeModel;
  portVisible: boolean;
  hasActionButton: boolean;
  dropZoneWidth: number;
  dropZoneHeight: number;
  dropZoneVisible: boolean;
}

export interface FlowNodeWidgetState {
  hover: boolean;
}

export class FlowNodeWidget extends React.Component<FlowNodeWidgetProps, FlowNodeWidgetState> {
  public static defaultProps: FlowNodeWidgetProps = {
    width: 64,
    height: 64,
    type: 'flow_node',
    icon: DefaultIcon,
    inactiveIcon: DefaultIcon,
    title: '',
    node: null,
    portVisible: true,
    hasActionButton: false,
    dropZoneWidth: 48,
    dropZoneHeight: 48,
    dropZoneVisible: false
  };

  constructor(props: FlowNodeWidgetProps) {
    super(props);
    this.state = {
      hover: false
    };
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

  getPortLabelTop(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return -8;
    if (portName === FlowNodePortModel.LEFT) return this.props.height / 2 - 8 - 28;
    if (portName === FlowNodePortModel.RIGHT) return this.props.height / 2 - 8 - 28;
    if (portName === FlowNodePortModel.BOTTOM) return this.props.height - 8;
    return null;
  }

  getPortLabelLeft(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return this.props.height / 2 - 8 + 18;
    if (portName === FlowNodePortModel.LEFT) return -8;
    if (portName === FlowNodePortModel.RIGHT) return this.props.width - 8;
    if (portName === FlowNodePortModel.BOTTOM) return this.props.width / 2 - 8 + 18;
    return null;
  }

  getDropZoneTop(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return -1.1 * this.props.height;
    if (portName === FlowNodePortModel.LEFT) return (this.props.height - this.props.dropZoneHeight) / 2 - 1;
    if (portName === FlowNodePortModel.RIGHT) return (this.props.height - this.props.dropZoneHeight) / 2 - 1;
    if (portName === FlowNodePortModel.BOTTOM) return +1.1 * this.props.height;
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

  renderPortLabel(portName: string) {
    if (this.props.portVisible) {
      let port = this.props.node ? this.props.node.getPort(portName) : null;
      if (port && port instanceof FlowNodePortModel && port.label) {
        return (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: this.getPortLabelTop(portName),
              left: this.getPortLabelLeft(portName)
            }}
          >
            {port.label}
          </div>
        );
      }
    }
  }

  renderDropZone(portName: string) {
    if (this.props.dropZoneVisible && this.props.node && this.props.node instanceof FlowNodeModel) {
      let port = this.props.node.getOutPort(portName);
      if (port) {
        return (
          <div
            onClick={async event => {
              if (
                this.props.node &&
                this.props.node instanceof FlowNodeModel &&
                this.props.node.eventHandlers &&
                this.props.node.eventHandlers.onAddClickEventHandler
              ) {
                this.props.node.eventHandlers.onAddClickEventHandler(this.props.node, port, toNodeData(this.props.node));
              }
            }}
            onDrop={async event => {
              if (
                this.props.node &&
                this.props.node instanceof FlowNodeModel &&
                this.props.node.eventHandlers &&
                this.props.node.eventHandlers.onDropEventHandler
              ) {
                let dataTransfer = JSON.parse(event.dataTransfer.getData('flow-diagram-node'));
                this.props.node.eventHandlers.onDropEventHandler(this.props.node, port, toNodeData(this.props.node), dataTransfer);
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
    let id = this.props.node ? this.props.node.getType() + '_' + this.props.node.getID() : this.props.type;
    return (
      <SvgIconWidget
        id={id}
        width={this.props.width}
        height={this.props.height}
        icon={this.state.hover ? this.props.inactiveIcon : this.props.icon}
        onMouseEnter={async event => {
          if (this.props.hasActionButton && this.props.portVisible) this.setState({ hover: true });
        }}
        onMouseLeave={async event => {
          if (this.props.hasActionButton && this.props.portVisible) this.setState({ hover: false });
        }}
        onClick={async event => {
          if (
            this.props.portVisible &&
            this.props.node &&
            this.props.node instanceof FlowNodeModel &&
            this.props.node.eventHandlers &&
            this.props.node.eventHandlers.onClickEventHandler
          ) {
            this.props.node.eventHandlers.onClickEventHandler(this.props.node, toNodeData(this.props.node));
          }
        }}
      />
    );
  }

  renderLabel() {
    let { node } = this.props;
    let label = node && node instanceof FlowNodeModel && node.label ? node.label : translate('diagram.node.' + this.props.type);
    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          verticalAlign: 'middle',
          textAlign: 'center',
          width: '160px',
          top: this.getPortTop(FlowNodePortModel.BOTTOM) + 12,
          left: this.getPortLeft(FlowNodePortModel.BOTTOM) - 72
        }}
      >
        {label}
      </div>
    );
  }

  renderSettingActionButton() {
    if (this.props.hasActionButton && this.props.portVisible && this.state.hover) {
      const size = 32;
      return FlowNodeWidget.renderActionButton({
        width: size,
        height: size,
        top: this.props.height / 2 - size / 2,
        left: this.props.width / 2 - size - 1,
        icon: SettingIcon,
        onClick: async event => {
          if (
            this.props.node &&
            this.props.node instanceof FlowNodeModel &&
            this.props.node.eventHandlers &&
            this.props.node.eventHandlers.onClickEventHandler
          ) {
            this.props.node.eventHandlers.onClickEventHandler(this.props.node, toNodeData(this.props.node));
          }
        }
      });
    }
  }

  renderDeleteActionButton() {
    if (this.props.hasActionButton && this.props.portVisible && this.state.hover) {
      const size = 32;

      return FlowNodeWidget.renderActionButton({
        width: size,
        height: size,
        top: this.props.height / 2 - size / 2,
        left: this.props.width / 2 + 1,
        icon: DeleteIcon,
        onClick: async event => {
          if (
            this.props.node &&
            this.props.node instanceof FlowNodeModel &&
            this.props.node.eventHandlers &&
            this.props.node.eventHandlers.onDeleteEventHandler
          ) {
            this.props.node.eventHandlers.onDeleteEventHandler(this.props.node, toNodeData(this.props.node));
          }
        }
      });
    }
  }

  render() {
    return (
      <div
        className={'flow-node'}
        style={{
          position: 'relative',
          width: this.props.width,
          height: this.props.height,
          cursor: 'pointer'
        }}
      >
        {this.renderIcon()}
        {this.renderLabel()}
        {this.renderSettingActionButton()}
        {this.renderDeleteActionButton()}
        {this.renderPort(FlowNodePortModel.TOP)}
        {this.renderPortLabel(FlowNodePortModel.TOP)}
        {this.renderPort(FlowNodePortModel.LEFT)}
        {this.renderPortLabel(FlowNodePortModel.LEFT)}
        {this.renderPort(FlowNodePortModel.RIGHT)}
        {this.renderPortLabel(FlowNodePortModel.RIGHT)}
        {this.renderPort(FlowNodePortModel.BOTTOM)}
        {this.renderPortLabel(FlowNodePortModel.BOTTOM)}
        {this.renderDropZone(FlowNodePortModel.TOP)}
        {this.renderDropZone(FlowNodePortModel.LEFT)}
        {this.renderDropZone(FlowNodePortModel.RIGHT)}
        {this.renderDropZone(FlowNodePortModel.BOTTOM)}
      </div>
    );
  }

  static renderActionButton(props: { width: number; height: number; top: number; left: number; icon: any; onClick?: any }) {
    return (
      <div
        onClick={props.onClick}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: props.top,
          left: props.left,
          width: props.width,
          height: props.height,
          backgroundImage: `url(${props.icon})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        {''}
      </div>
    );
  }
}
