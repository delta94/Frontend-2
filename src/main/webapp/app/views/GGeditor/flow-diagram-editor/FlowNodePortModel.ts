import * as _ from 'lodash';
import { DefaultLinkModel, DiagramEngine, LinkModel, PortModel } from 'storm-react-diagrams';

export class FlowNodePortModel extends PortModel {
  static TOP: string = 'top';
  static BOTTOM: string = 'bottom';
  static LEFT: string = 'left';
  static RIGHT: string = 'right';

  position: string | 'top' | 'bottom' | 'left' | 'right';

  constructor(pos: string = FlowNodePortModel.LEFT) {
    super(pos, 'flow');
    this.position = pos;
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position
    });
  }

  deSerialize(data: any, engine: DiagramEngine) {
    super.deSerialize(data, engine);
    this.position = data.position;
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }

  link(port: FlowNodePortModel): LinkModel | null {
    if (port && this.canLinkToPort(port)) {
      let link = this.createLinkModel();
      link.setSourcePort(this);
      link.setTargetPort(port);
      return link;
    }
    return null;
  }
}
