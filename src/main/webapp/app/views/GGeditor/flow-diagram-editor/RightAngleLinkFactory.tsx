import * as React from 'react';
import { DefaultLinkFactory, DefaultLinkModel, DefaultLinkWidget } from 'storm-react-diagrams';
import { RightAngleLinkModel } from './RightAngleLinkModel';
import { RightAngleLinkSegment } from './components/RightAngleLinkSegment';
import { RightAngleLinkWidget } from './components/RightAngleLinkWidget';

export class RightAngleLinkFactory extends DefaultLinkFactory {
  constructor() {
    super();
    this.type = RightAngleLinkModel.TYPE;
  }

  getNewInstance(initialConfig?: any): RightAngleLinkModel {
    return new RightAngleLinkModel();
  }

  generateLinkSegment(model: RightAngleLinkModel, widget: DefaultLinkWidget, selected: boolean, path: string) {
    return <RightAngleLinkWidget link={model} widget={widget} />;
    // return (
    //   <g>
    //     <RightAngleLinkSegment model={model} widget={widget} selected={selected} path={path} />
    //   </g>
    // );
  }
}
