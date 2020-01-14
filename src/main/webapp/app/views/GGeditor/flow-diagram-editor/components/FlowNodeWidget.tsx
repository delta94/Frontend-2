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
  canDelete: boolean;
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
    inactiveIcon: DefaultIcon,
    title: '',
    node: null,
    portVisible: true,
    hasActionButton: false,
    canDelete: false,
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
    if (portName === FlowNodePortModel.TOP) return -1.1 * (this.props.height + this.props.dropZoneHeight * 0.25);
    if (portName === FlowNodePortModel.LEFT) return (this.props.height - this.props.dropZoneHeight) / 2 - 1;
    if (portName === FlowNodePortModel.RIGHT) return (this.props.height - this.props.dropZoneHeight) / 2 - 1;
    if (portName === FlowNodePortModel.BOTTOM) return +1.1 * (this.props.height + this.props.dropZoneHeight * 0.25);
    return null;
  }

  getDropZoneLeft(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return (this.props.width - this.props.dropZoneWidth) / 2;
    if (portName === FlowNodePortModel.LEFT) return -1.1 * (this.props.width + this.props.dropZoneWidth * 0.25);
    if (portName === FlowNodePortModel.RIGHT) return +1.1 * (this.props.width + this.props.dropZoneWidth * 0.25);
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
    let { dropZoneVisible, node } = this.props;
    if (dropZoneVisible && node && node instanceof FlowNodeModel) {
      let port = node.getOutPort(portName);
      if (port) {
        return (
          <div
            onDrop={async event => {
              event.preventDefault();
              if (node instanceof FlowNodeModel && node.readOnly) return;

              if (node instanceof FlowNodeModel && node.eventHandlers && node.eventHandlers.onDropEventHandler) {
                let dataTransfer = JSON.parse(event.dataTransfer.getData('flow-diagram-node'));
                node.eventHandlers.onDropEventHandler(this.props.node, port, toNodeData(this.props.node), dataTransfer);
              }
            }}
            style={
              node instanceof FlowNodeModel && node.readOnly
                ? {
                    position: 'absolute',
                    zIndex: 10,
                    top: this.getDropZoneTop(portName) - this.props.dropZoneHeight * 0.25 - 1,
                    left: this.getDropZoneLeft(portName) - this.props.dropZoneWidth * 0.25,
                    width: this.props.dropZoneWidth * 1.5,
                    height: this.props.dropZoneHeight * 1.5
                  }
                : {
                    position: 'absolute',
                    zIndex: 10,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderColor: node.dropZoneVisible ? '#D1D2DE' : 'transparent',
                    borderStyle: 'dashed',
                    top: this.getDropZoneTop(portName) - this.props.dropZoneHeight * 0.25 - 1,
                    left: this.getDropZoneLeft(portName) - this.props.dropZoneWidth * 0.25,
                    width: this.props.dropZoneWidth * 1.5,
                    height: this.props.dropZoneHeight * 1.5
                  }
            }
          >
            <div
              onClick={async event => {
                event.preventDefault();
                if (node instanceof FlowNodeModel && node.readOnly) return;

                if (
                  this.props.node &&
                  this.props.node instanceof FlowNodeModel &&
                  this.props.node.eventHandlers &&
                  this.props.node.eventHandlers.onAddClickEventHandler
                ) {
                  this.props.node.eventHandlers.onAddClickEventHandler(this.props.node, port, toNodeData(this.props.node));
                }
              }}
              style={{
                position: 'absolute',
                zIndex: 10,
                top: this.props.dropZoneHeight / 4 - 2,
                left: this.props.dropZoneWidth / 4 - 2,
                width: this.props.dropZoneWidth,
                height: this.props.dropZoneHeight,
                backgroundImage: `url(${AddIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
            >
              {' '}
            </div>
          </div>
        );
      }
    }
  }

  renderIcon() {
    let { hasActionButton, portVisible, node, inactiveIcon, icon } = this.props;
    let hasConfig = portVisible ? node && node instanceof FlowNodeModel && node.hasConfig : true;
    let hover = portVisible;
    // let id = this.props.node ? this.props.node.getType() + '_' + this.props.node.getID() : this.props.type;
    const renderNoHover = () => {
      return (
        <div
          className="hover__no-hover"
          style={{
            zIndex: 1,
            width: this.props.width,
            height: this.props.height,
            backgroundImage: `url(${hasConfig ? icon : inactiveIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          {''}
        </div>
      );
    };
    const renderHover = () => {
      if (node && node instanceof FlowNodeModel && node.readOnly) return;
      return (
        <div
          className="hover__hover"
          style={{
            zIndex: 1,
            width: this.props.width,
            height: this.props.height,
            backgroundImage: `url(${hover ? inactiveIcon : icon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          {this.renderSettingActionButton()}
          {this.renderDeleteActionButton()}
        </div>
      );
    };
    return (
      <div className="hover">
        {renderNoHover()}
        {renderHover()}
      </div>
    );
  }

  renderLabel() {
    let { node, portVisible } = this.props;
    if (node && node instanceof FlowNodeModel && portVisible) {
      let top = node.getPort(FlowNodePortModel.BOTTOM)
        ? this.getPortTop(FlowNodePortModel.TOP) - 12
        : this.getPortTop(FlowNodePortModel.BOTTOM) + 12;
      return (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            verticalAlign: 'middle',
            textAlign: 'center',
            width: '160px',
            top: top,
            left: this.getPortLeft(FlowNodePortModel.BOTTOM) - 72
          }}
        >
          {node.label}
        </div>
      );
    }
  }

  renderSettingActionButton() {
    let { hasActionButton, canDelete, portVisible, node, height, width } = this.props;
    if (hasActionButton && portVisible) {
      const size = 32;
      return FlowNodeWidget.renderActionButton({
        width: size,
        height: size,
        top: height / 2 - size / 2,
        left: canDelete ? width / 2 - size - 1 : size / 2 + 3,
        icon: SettingIcon,
        onClick: async event => {
          if (node && node instanceof FlowNodeModel && node.eventHandlers && node.eventHandlers.onClickEventHandler) {
            node.eventHandlers.onClickEventHandler(node, toNodeData(node));
          }
        }
      });
    }
  }

  renderDeleteActionButton() {
    let { hasActionButton, canDelete, portVisible, node, height, width } = this.props;
    if (hasActionButton && canDelete && portVisible) {
      const size = 32;

      return FlowNodeWidget.renderActionButton({
        width: size,
        height: size,
        top: height / 2 - size / 2,
        left: width / 2 + 1,
        icon: DeleteIcon,
        onClick: async event => {
          if (node && node instanceof FlowNodeModel && node.eventHandlers && node.eventHandlers.onDeleteEventHandler) {
            node.eventHandlers.onDeleteEventHandler(node, toNodeData(node));
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
