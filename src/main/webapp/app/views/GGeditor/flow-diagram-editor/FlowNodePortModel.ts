import * as _ from 'lodash';
import { DefaultLinkModel, DiagramEngine, LinkModel, PortModel } from 'storm-react-diagrams';
import { RightAngleLinkModel } from './RightAngleLinkModel';

export class FlowNodePortModel extends PortModel {
  static TOP: string = 'top';
  static BOTTOM: string = 'bottom';
  static LEFT: string = 'left';
  static RIGHT: string = 'right';

  static IN: string = 'in';
  static OUT: string = 'in';

  private _position: string | 'top' | 'bottom' | 'left' | 'right';
  private _direction: string | 'in' | 'out';
  private _label: string;

  get position(): string | 'top' | 'bottom' | 'left' | 'right' {
    return this._position;
  }

  set position(value: string | 'top' | 'bottom' | 'left' | 'right') {
    this._position = value;
  }

  get direction(): string | 'in' | 'out' {
    return this._direction;
  }

  set direction(value: string | 'in' | 'out') {
    this._direction = value;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  constructor(position: string | 'top' | 'bottom' | 'left' | 'right', direction: string | 'in' | 'out', label?: string) {
    super(position, 'flow');
    this._position = position;
    this._direction = direction;
    this._label = label;
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this._position,
      direction: this._direction
    });
  }

  deSerialize(data: any, engine: DiagramEngine) {
    super.deSerialize(data, engine);
    this._position = data._position;
    this._direction = data._direction;
  }

  createLinkModel(): RightAngleLinkModel {
    return new RightAngleLinkModel();
  }

  link(port: FlowNodePortModel): RightAngleLinkModel | null {
    if (port && this.canLinkToPort(port)) {
      let link = this.createLinkModel();
      link.setSourcePort(this);
      link.setTargetPort(port);
      return link;
    }
    return null;
  }
}
