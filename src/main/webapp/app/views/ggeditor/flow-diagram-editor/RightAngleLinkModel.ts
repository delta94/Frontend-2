import { DefaultLinkModel } from 'storm-react-diagrams';
import { RightAngleLinkFactory } from './RightAngleLinkFactory';
import { PointModel } from 'storm-react-diagrams';

export class RightAngleLinkModel extends DefaultLinkModel {
  static TYPE: string = 'right_angle';
  lastHoverIndexOfPath: number;
  private _lastPathXdirection: boolean;
  private _firstPathXdirection: boolean;

  constructor() {
    super(RightAngleLinkModel.TYPE);
    this.width = 6;

    this.lastHoverIndexOfPath = 0;
    this._lastPathXdirection = false;
    this._firstPathXdirection = false;
  }

  setFirstAndLastPathsDirection() {
    let points = this.getPoints();
    for (let i = 1; i < points.length; i += points.length - 2) {
      let dx = Math.abs(points[i].getX() - points[i - 1].getX());
      let dy = Math.abs(points[i].getY() - points[i - 1].getY());
      if (i - 1 === 0) {
        this._firstPathXdirection = dx > dy;
      } else {
        this._lastPathXdirection = dx > dy;
      }
    }
  }

  // @ts-ignore
  addPoint<P extends PointModel>(pointModel: P, index: number = 1): P {
    // @ts-ignore
    super.addPoint(pointModel, index);
    this.setFirstAndLastPathsDirection();
    return pointModel;
  }

  setManuallyFirstAndLastPathsDirection(first, last) {
    this._firstPathXdirection = first;
    this._lastPathXdirection = last;
  }

  getLastPathXdirection(): boolean {
    return this._lastPathXdirection;
  }
  getFirstPathXdirection(): boolean {
    return this._firstPathXdirection;
  }
}
