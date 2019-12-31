import * as React from 'react';

import { BodyWidget } from './components/BodyWidget';
import { FlowDiagramEditor } from './FlowDiagramEditor';

import './index.scss';
import SAMPLE_DATA from './data';
import { SendEmailGroupProcess } from 'app/views/GGeditor/flow-diagram-editor/GroupProcess';

export default () => {
  let editor = new FlowDiagramEditor();
  editor.lock();
  editor.init(SAMPLE_DATA.flow.graph.nodes, SAMPLE_DATA.flow.graph.edges);
  editor.autoArrange();
  editor.setOnDropEventHandler((port, data) => {
    console.log('setOnDropEventHandler');
    console.log(port);
    console.log(data);

    editor.insert(new SendEmailGroupProcess(data.type), port);
    //editor.autoArrange();
    // this.forceUpdate();
  });

  return <BodyWidget editor={editor} />;
};
