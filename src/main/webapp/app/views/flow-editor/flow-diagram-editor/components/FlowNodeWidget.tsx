import * as React from 'react';
import { NodeModel, PortModel, PortWidget } from 'storm-react-diagrams';
import { FlowNodeModel } from '../FlowNodeModel';
import { FlowNodePortModel } from '../FlowNodePortModel';
import { toNodeData } from '../FlowDiagramUtil';

const DefaultIcon = require('../icons/default.png');
const DefaultExtraIcon = require('../icons/default_extra_icon.png');
const AddIcon = require('../icons/add.png');
const SettingIcon = require('../icons/setting.png');
const DeleteIcon = require('../icons/delete.png');

export interface FlowNodeWidgetProps {
  width: number;
  height: number;
  type: string;
  icon: string;
  inactiveIcon: string;
  iconBackground: string;
  inactiveIconBackground: string;
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
    iconBackground: DefaultIcon,
    inactiveIconBackground: DefaultIcon,
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
    if (portName === FlowNodePortModel.LEFT) return -1.5*this.props.dropZoneWidth;//-1.1 * (this.props.width + this.props.dropZoneWidth * 0.25);
    if (portName === FlowNodePortModel.RIGHT) return +1.5*this.props.dropZoneWidth;// +1.1 * (this.props.width + this.props.dropZoneWidth * 0.25);
    if (portName === FlowNodePortModel.BOTTOM) return (this.props.width - this.props.dropZoneWidth) / 2;
    return null;
  }

  getExtZoneTop(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return -0.8 * (this.props.height + this.props.dropZoneHeight * 0.25);
    if (portName === FlowNodePortModel.LEFT) return (this.props.height - this.props.dropZoneHeight) / 2 - 1;
    if (portName === FlowNodePortModel.RIGHT) return (this.props.height - this.props.dropZoneHeight) / 2 - 1;
    if (portName === FlowNodePortModel.BOTTOM) return 0.8 * (this.props.height + this.props.dropZoneHeight * 0.25);
    return null;
  }

  getExtZoneLeft(portName: string): number | null {
    if (portName === FlowNodePortModel.TOP) return (this.props.width - this.props.dropZoneWidth) * 0.5;
    if (portName === FlowNodePortModel.LEFT) return -0.8 * (this.props.width + this.props.dropZoneWidth * 0.25);
    if (portName === FlowNodePortModel.RIGHT) return +0.8 * (this.props.width + this.props.dropZoneWidth * 0.25);
    if (portName === FlowNodePortModel.BOTTOM) return (this.props.width - this.props.dropZoneWidth) * 0.5;
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
      let port = node.getInPort(portName);
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

  renderExtZone(portName: string) {
    let { dropZoneVisible, node } = this.props;
    if (dropZoneVisible && node && node instanceof FlowNodeModel) {
      let port = node.getOutPort(portName);
      if (port && port instanceof  FlowNodePortModel && port.extAllowed) {
        return (
          <div
            style={
              {
                position: 'absolute',
                zIndex: 10,
                top: this.getExtZoneTop(portName),
                left: this.getExtZoneLeft(portName),
                width: this.props.dropZoneWidth * 0.5,
                height: this.props.dropZoneHeight * 0.5
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
                  this.props.node.eventHandlers.onExtClickEventHandler
                ) {
                  this.props.node.eventHandlers.onExtClickEventHandler(this.props.node, port, toNodeData(this.props.node));
                }
              }}
              style={{
                position: 'absolute',
                zIndex: 10,
                top: this.props.dropZoneHeight * 0.25,
                left: this.props.dropZoneWidth * 0.25,
                width: this.props.dropZoneWidth * 0.5,
                height: this.props.dropZoneHeight * 0.5,
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
    let { portVisible, node, inactiveIcon, icon, inactiveIconBackground, iconBackground } = this.props;
    let isActive = portVisible ? node && node instanceof FlowNodeModel && node.isActive : true;
    let hover = portVisible;
    let customIcon = node && node instanceof FlowNodeModel ? node.icon : '';
    // let id = this.props.node ? this.props.node.getType() + '_' + this.props.node.getID() : this.props.type;
    const renderNoHover = () => {
      return (
        <div
          className="hover__no-hover"
          style={{
            zIndex: 1,
            width: this.props.width,
            height: this.props.height,
            backgroundImage: `url(${isActive ? (customIcon && customIcon !== '' ? iconBackground : icon) : (customIcon && customIcon !== '' ? inactiveIconBackground : inactiveIcon)})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          {this.renderCustomIcon()}
        </div>
      );
    };

    const renderHover = () => {
      return (
        <div
          className="hover__hover"
          style={{
            zIndex: 1,
            width: this.props.width,
            height: this.props.height,
            backgroundImage: `url(${isActive ? (customIcon && customIcon !== '' ? iconBackground : icon) : (customIcon && customIcon !== '' ? inactiveIconBackground : inactiveIcon)})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          {this.renderCustomIcon()}
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
            width: '200px',
            top: top,
            left: this.getPortLeft(FlowNodePortModel.BOTTOM) - 92
          }}
        >
          {node.label}
        </div>
      );
    }
  }

  renderSettingActionButton() {
    let { hasActionButton, canDelete, portVisible, node, height, width } = this.props;
    if (hasActionButton && portVisible && node && node instanceof FlowNodeModel && !node.readOnly) {
      const size = 32;
      return FlowNodeWidget.renderActionButton({
        width: size,
        height: size,
        top: height / 2 - size / 2,
        left: canDelete ? width / 2 - size - 1 : size / 2 + 3,
        icon: SettingIcon,
        onClick: async _ => {
          if (node instanceof FlowNodeModel && node.eventHandlers && node.eventHandlers.onConfigClickEventHandler) {
            node.eventHandlers.onConfigClickEventHandler(node, toNodeData(node));
          }
        }
      });
    }
  }

  renderDeleteActionButton() {
    let { hasActionButton, canDelete, portVisible, node, height, width } = this.props;
    if (hasActionButton && canDelete && portVisible && node && node instanceof FlowNodeModel && !node.readOnly) {
      const size = 32;

      return FlowNodeWidget.renderActionButton({
        width: size,
        height: size,
        top: height / 2 - size / 2,
        left: width / 2 + 1,
        icon: DeleteIcon,
        onClick: async _ => {
          if (node instanceof FlowNodeModel && node.eventHandlers && node.eventHandlers.onDeleteEventHandler) {
            node.eventHandlers.onDeleteEventHandler(node, toNodeData(node));
          }
        }
      });
    }
  }

  renderCustomIcon() {
    let {node, height, width } = this.props;
    if (node && node instanceof FlowNodeModel) {
      const size = 34;
      return FlowNodeWidget.renderCustomIcon({
        width: size,
        height: size,
        top: height / 2 - size / 2,
        left: width / 2 - size / 2,
        icon: node.icon,
        iconSize: size
      });
    }
  }

  renderExtraInfo() {
    let { portVisible, node, width } = this.props;
    if (portVisible && node && node instanceof FlowNodeModel && node.extraLabel) {
      const extraIconSize = 18;
      const extraHeight = extraIconSize * 2;
      const extraWidth = extraIconSize * 2.5 + node.extraLabel.length * 8;
      return FlowNodeWidget.renderExtraInfo({
        top: node.getPort(FlowNodePortModel.BOTTOM) ? -58 : -46,
        left: -extraWidth * 0.5 + width * 0.5,
        width: extraWidth,
        height: extraHeight,
        label: node.extraLabel,
        icon: node.extraIcon && node.extraIcon !== '' ? node.extraIcon : DefaultExtraIcon
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
        {this.renderExtZone(FlowNodePortModel.TOP)}
        {this.renderExtZone(FlowNodePortModel.LEFT)}
        {this.renderExtZone(FlowNodePortModel.RIGHT)}
        {this.renderExtZone(FlowNodePortModel.BOTTOM)}
        {this.renderExtraInfo()}
      </div>
    );
  }

  static renderActionButton(props: { width: number; height: number; top: number; left: number; icon: string; onClick?: (event) => void }) {
    return (
      <div
        onClick={async event => {
          event.preventDefault();
          if(props.onClick) props.onClick(event);
        }}
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

  static renderCustomIcon(props: { width: number; height: number; top: number; left: number; icon: string; iconSize: number}) {
    return (
      <i style={{
        position: 'absolute',
        zIndex: 9,
        top: props.top,
        left: props.left,
        width: props.width,
        height: props.height,
        fontSize: props.iconSize,
        fontWeight: 'normal',
        color: 'white'
      }} className={props.icon}> </i>
    );
  }

  static renderExtraInfo(props: {
    width: number;
    height: number;
    top: number;
    left: number;
    label: string;
    icon: string;
    onClick?: (event) => void;
  }) {
    let iconSize = props.height * 0.5;
    return (
      <div
        onClick={async event => {
          event.preventDefault();
          props.onClick(event);
        }}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: props.top,
          left: props.left,
          width: props.width,
          height: props.height,
          borderWidth: 1,
          borderRadius: 3,
          borderColor: '#D4E0ED',
          borderStyle: 'solid',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: iconSize * 0.5,
            left: iconSize * 0.5,
            width: iconSize,
            height: iconSize,
            backgroundImage: `url(${props.icon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          {''}
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: iconSize * 0.5,
            left: iconSize * 2,
            width: props.width - iconSize * 2.5,
            height: iconSize,
            fontSize: '12px',
            color: '#000000'
          }}
        >
          {props.label}
        </div>
      </div>
    );
  }
}
