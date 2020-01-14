import * as React from 'react';
import { RightAngleLinkModel } from './RightAngleLinkModel';
import { DefaultLinkWidget } from 'storm-react-diagrams';

export class RightAngleLinkSegment extends React.Component<{
  model: RightAngleLinkModel;
  widget: DefaultLinkWidget;
  selected: boolean;
  path: string;
}> {
  path: SVGPathElement;
  circle: SVGCircleElement;
  callback: () => any;
  percent: number;
  handle: any;
  mounted: boolean;

  constructor(props) {
    super(props);
    this.percent = 0;
  }

  componentDidMount() {
    this.mounted = true;
    this.callback = () => {
      if (!this.circle || !this.path) {
        return;
      }

      this.percent += 1;
      if (this.percent > 100) {
        this.percent = 0;
      }

      let point = this.path.getPointAtLength(this.path.getTotalLength() * (this.percent / 100.0));

      this.circle.setAttribute('cx', '' + point.x);
      this.circle.setAttribute('cy', '' + point.y);

      if (this.mounted) {
        // requestAnimationFrame(this.callback);
      }
    };
    // requestAnimationFrame(this.callback);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <g>
        <>
          <path
            className={this.props.selected ? this.props.widget.bem('--path-selected') : ''}
            // ref={ref => {
            //   this.path = ref;
            // }}
            strokeWidth={this.props.model.width}
            stroke={this.props.model.color}
            d={this.props.path}
          />
          {/*<circle*/}
          {/*  ref={ref => {*/}
          {/*    this.circle = ref;*/}
          {/*  }}*/}
          {/*  r={6}*/}
          {/*  fill="orange"*/}
          {/*/>*/}
        </>
      </g>
    );
  }
}
