import * as React from 'react';
import { NodeModel, PortWidget } from 'storm-react-diagrams';
const DefaultIcon = require('./icons/default.png');

export interface FlowNodeWidgetProps {
  width: number;
  height: number;
  icon: string;
  node: NodeModel;
}

export interface FlowNodeWidgetState {}

export class FlowNodeWidget extends React.Component<FlowNodeWidgetProps, FlowNodeWidgetState> {
  public static defaultProps: FlowNodeWidgetProps = {
    width: 64,
    height: 64,
    icon: DefaultIcon,
    node: null
  };

  constructor(props: FlowNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  renderLeftPort() {
    if (this.props.node && this.props.node.getPort('left')) {
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
    if (this.props.node && this.props.node.getPort('top')) {
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
    if (this.props.node && this.props.node.getPort('right')) {
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
    if (this.props.node && this.props.node.getPort('bottom')) {
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

  renderIcon() {
    let alias = this.props.node ? this.props.node.getType() + '_' + this.props.node.getID() : '';
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
      </div>
    );
  }
}
