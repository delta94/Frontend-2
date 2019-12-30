import * as React from 'react';

import { BodyWidget } from './components/BodyWidget';
import { FlowDiagramApplication } from './FlowDiagramApplication';

import './index.scss';
import SAMPLE_DATA from './data';

export default () => {
  let app = new FlowDiagramApplication();
  app.init(SAMPLE_DATA.flow.graph.nodes, SAMPLE_DATA.flow.graph.edges);
  app.autoArrange();
  app.setOnDropEventHandler((node, data) => {
    if (app.insertProcessTemplate(node, data.type)) {
      //TODO
    }
    console.log('setOnDropEventHandler');
    console.log(node);
    console.log(data);
  });

  return <BodyWidget app={app} />;
};
