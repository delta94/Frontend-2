import * as React from 'react';

export interface SvgIconWidgetProps {
  id: string;
  width: number;
  height: number;
  icon: string;
  onClick?: (event) => void;
  onMouseEnter?: (event) => void;
  onMouseLeave?: (event) => void;
}

export interface SvgIconWidgetState {}

export class SvgIconWidget extends React.Component<SvgIconWidgetProps, SvgIconWidgetState> {
  constructor(props: SvgIconWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <svg
        onMouseOver={this.props.onMouseEnter}
        onMouseOut={this.props.onMouseLeave}
        onClick={this.props.onClick}
        width={this.props.width}
        height={this.props.height}
        dangerouslySetInnerHTML={{
          __html:
            `
            <defs>
              <pattern id="` +
            this.props.id +
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
            this.props.id +
            `_image)"/>
        `
        }}
      />
    );
  }
}
