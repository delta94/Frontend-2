import * as React from 'react';
import { DefaultLinkWidget, DiagramEngine, LinkWidget, PointModel } from 'storm-react-diagrams';
import { RightAngleLinkFactory } from '../RightAngleLinkFactory';
import { MouseEvent } from 'react';
import { RightAngleLinkModel } from '../RightAngleLinkModel';
import { RightAngleLinkSegment } from './RightAngleLinkSegment';

export interface RightAngleLinkProps {
  color?: string;
  width?: number;
  smooth?: boolean;
  link: RightAngleLinkModel;
  widget: DefaultLinkWidget;
  diagramEngine: DiagramEngine;
  factory: RightAngleLinkFactory;
}

export interface RightAngleLinkState {
  selected: boolean;
  canDrag: boolean;
}

export class RightAngleLinkWidget extends React.Component<RightAngleLinkProps, RightAngleLinkState> {
  public static defaultProps: RightAngleLinkProps = {
    color: 'red',
    width: 3,
    link: null,
    widget: null,
    smooth: false,
    diagramEngine: null,
    factory: null
  };

  refPaths: React.RefObject<SVGPathElement>[];

  // DOM references to the label and paths (if label is given), used to calculate dynamic positioning
  refLabels: { [id: string]: HTMLElement };
  dragging_index: number;

  constructor(props: RightAngleLinkProps) {
    super(props);

    this.refPaths = [];
    this.state = {
      selected: false,
      canDrag: false
    };

    this.dragging_index = 0;
  }

  generateLink(path: string, extraProps: any, id: string | number): JSX.Element {
    const ref = React.createRef<SVGPathElement>();
    this.refPaths.push(ref);
    return <RightAngleLinkSegment key={id} model={this.props.link} widget={this.props.widget} selected={this.state.selected} path={path} />;
  }

  calculatePositions(points: PointModel[], event: MouseEvent, index: number, coordinate: string) {
    // If path is first or last add another point to keep node port on its position
    if (index === 0) {
      let point = new PointModel(this.props.link, { x: points[index].getX(), y: points[index].getY() });
      this.props.link.addPoint(point, index);
      this.dragging_index++;
      return;
    } else if (index === points.length - 2) {
      let point = new PointModel(this.props.link, { x: points[index + 1].getX(), y: points[index + 1].getY() });
      this.props.link.addPoint(point, index + 1);
      return;
    }

    // Merge two points if it is not close to node port and close to each other
    if (index - 2 > 0) {
      let _points = {
        [index - 2]: { x: points[index - 2].getX(), y: points[index - 2].getY() },
        [index + 1]: { x: points[index + 1].getX(), y: points[index + 1].getY() },
        [index - 1]: { x: points[index - 1].getX(), y: points[index - 1].getY() }
      };
      if (Math.abs(_points[index - 1][coordinate] - _points[index + 1][coordinate]) < 5) {
        _points[index - 2][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
        _points[index + 1][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
        points[index - 2].x = _points[index - 2].x;
        points[index - 2].y = _points[index - 2].y;
        points[index + 1].x = _points[index + 1].x;
        points[index + 1].y = _points[index + 1].y;
        points[index - 1].remove();
        points[index - 1].remove();
        this.dragging_index--;
        this.dragging_index--;
        return;
      }
    }

    // Merge two points if it is not close to node port
    if (index + 2 < points.length - 2) {
      let _points = {
        [index + 3]: { x: points[index + 3].getX(), y: points[index + 3].getY() },
        [index + 2]: { x: points[index + 2].getX(), y: points[index + 2].getY() },
        [index + 1]: { x: points[index + 1].getX(), y: points[index + 1].getY() },
        [index]: { x: points[index].getX(), y: points[index].getY() }
      };
      if (Math.abs(_points[index + 1][coordinate] - _points[index + 2][coordinate]) < 5) {
        _points[index][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
        _points[index + 3][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
        points[index].x = _points[index].x;
        points[index].y = _points[index].y;
        points[index + 3].x = _points[index + 3].x;
        points[index + 3].y = _points[index + 3].y;
        points[index + 1].remove();
        points[index + 1].remove();
        return;
      }
    }

    // If no condition above handled then just update path points position
    let _points = {
      [index]: { x: points[index].getX(), y: points[index].getY() },
      [index + 1]: { x: points[index + 1].getX(), y: points[index + 1].getY() }
    };
    _points[index][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
    _points[index + 1][coordinate] = this.props.diagramEngine.getRelativeMousePoint(event)[coordinate];
    points[index].x = _points[index].x;
    points[index].y = _points[index].y;
    points[index + 1].x = _points[index + 1].x;
    points[index + 1].y = _points[index + 1].y;
  }

  draggingEvent(event: MouseEvent, index: number) {
    let points = this.props.link.getPoints();
    // get moving difference. Index + 1 will work because links indexes has
    // length = points.lenght - 1
    let dx = Math.abs(points[index].getX() - points[index + 1].getX());
    let dy = Math.abs(points[index].getY() - points[index + 1].getY());

    // moving with y direction
    if (dx === 0) {
      this.calculatePositions(points, event, index, 'x');
    } else if (dy === 0) {
      this.calculatePositions(points, event, index, 'y');
    }
    this.props.link.setFirstAndLastPathsDirection();
  }

  handleMove = function(event: MouseEvent) {
    this.draggingEvent(event, this.dragging_index);
  }.bind(this);

  handleUp = function(event: MouseEvent) {
    // Unregister handlers to avoid multiple event handlers for other links
    this.setState({ canDrag: false, selected: false });
    window.removeEventListener('mousemove', this.handleMove);
    window.removeEventListener('mouseup', this.handleUp);
  }.bind(this);

  render() {
    //ensure id is present for all points on the path
    let points = this.props.link.getPoints();
    let paths = [];

    // Get points based on link orientation
    let pointLeft = points[0];
    let pointRight = points[points.length - 1];
    let hadToSwitch = false;
    if (pointLeft.getX() > pointRight.getX()) {
      pointLeft = points[points.length - 1];
      pointRight = points[0];
      hadToSwitch = true;
    }
    let dy = Math.abs(points[0].getY() - points[points.length - 1].getY());

    // When new link add one middle point to get everywhere 90° angle
    if (this.props.link.getTargetPort() === null && points.length === 2) {
      [...Array(2)].forEach(item => {
        this.props.link.addPoint(new PointModel(this.props.link, { x: pointLeft.getX(), y: pointRight.getY() }), 1);
      });
      this.props.link.setManuallyFirstAndLastPathsDirection(true, true);
    }
    // When new link is moving and not connected to target port move with middle point
    // TODO: @DanielLazarLDAPPS This will be better to update in DragNewLinkState
    //  in function fireMouseMoved to avoid calling this unexpectedly e.g. after Deserialize
    else if (this.props.link.getTargetPort() === null && this.props.link.getSourcePort() !== null) {
      points[1].x = pointRight.getX() + (pointLeft.getX() - pointRight.getX()) / 2;
      points[1].y = !hadToSwitch ? pointLeft.getY() : pointRight.getY();
      points[2].x = pointRight.getX() + (pointLeft.getX() - pointRight.getX()) / 2;
      points[2].y = !hadToSwitch ? pointRight.getY() : pointLeft.getY();
    }
    // Render was called but link is not moved but user.
    // Node is moved and in this case fix coordinates to get 90° angle.
    // For loop just for first and last path
    else if (!this.state.canDrag && points.length > 2) {
      // Those points and its position only will be moved
      for (let i = 1; i < points.length; i += points.length - 2) {
        if (i - 1 === 0) {
          if (this.props.link.getFirstPathXdirection()) {
            points[i].x = points[i].getX();
            points[i].y = points[i - 1].getY();
          } else {
            points[i].x = points[i - 1].getX();
            points[i].y = points[i].getY();
          }
        } else {
          if (this.props.link.getLastPathXdirection()) {
            points[i - 1].x = points[i - 1].getX();
            points[i - 1].y = points[i].getY();
          } else {
            points[i - 1].x = points[i].getX();
            points[i - 1].y = points[i - 1].getY();
          }
        }
      }
    }

    // If there is existing link which has two points add one
    // NOTE: It doesn't matter if check is for dy or dx
    if (points.length === 2 && dy !== 0 && !this.state.canDrag) {
      this.props.link.addPoint(new PointModel(this.props.link, { x: pointLeft.getX(), y: pointRight.getY() }));
    }

    for (let j = 0; j < points.length - 1; j++) {
      paths.push(
        this.generateLink(
          RightAngleLinkWidget.generateLinePath(points[j], points[j + 1]),
          {
            'data-linkid': this.props.link.getID(),
            'data-point': j,
            onMouseDown: (event: MouseEvent) => {
              if (event.button === 0) {
                this.setState({ canDrag: true });
                this.dragging_index = j;
                // Register mouse move event to track mouse position
                // On mouse up these events are unregistered check "this.handleUp"
                window.addEventListener('mousemove', this.handleMove);
                window.addEventListener('mouseup', this.handleUp);
              }
            },
            onMouseEnter: (event: MouseEvent) => {
              this.setState({ selected: true });
              this.props.link.lastHoverIndexOfPath = j;
            }
          },
          this.props.link.getID() + '_' + j
        )
      );
    }

    this.refPaths = [];
    return <g>{paths}</g>;
  }

  public static generateLinePath(firstPoint: PointModel, lastPoint: PointModel): string {
    return `M${firstPoint.getX()},${firstPoint.getY()} L ${lastPoint.getX()},${lastPoint.getY()}`;
  }
}
