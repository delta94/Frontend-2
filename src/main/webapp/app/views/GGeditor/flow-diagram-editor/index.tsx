import { DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget } from 'mrblenny-storm-react-diagrams';
import * as React from 'react';
// import the custom models
import { ConditionNodeModel, DecisionNodeModel, ForkNodeModel, MergeNodeModel, ProcessNodeModel, StartNodeModel } from './FlowNodeModel';
import {
  ConditionNodeFactory,
  DecisionNodeFactory,
  EndNodeFactory,
  ForkNodeFactory,
  JoinNodeFactory,
  MergeNodeFactory,
  ProcessNodeFactory,
  StartNodeFactory
} from './FlowNodeFactory';
import { FlowNodePortFactory } from './FlowNodePortFactory';
import { FlowNodePortModel } from './FlowNodePortModel';
import './index.scss';

export default () => {
  //1) setup the diagram engine
  var engine = new DiagramEngine();
  engine.installDefaultFactories();

  // register some other factories as well
  engine.registerPortFactory(new FlowNodePortFactory('flow', config => new FlowNodePortModel()));
  engine.registerNodeFactory(new ConditionNodeFactory());
  engine.registerNodeFactory(new DecisionNodeFactory());
  engine.registerNodeFactory(new EndNodeFactory());
  engine.registerNodeFactory(new ForkNodeFactory());
  engine.registerNodeFactory(new JoinNodeFactory());
  engine.registerNodeFactory(new MergeNodeFactory());
  engine.registerNodeFactory(new ProcessNodeFactory());
  engine.registerNodeFactory(new StartNodeFactory());

  //2) setup the diagram model
  var model = new DiagramModel();

  //3-A) create a default node
  var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
  var port1 = node1.addOutPort('Out');
  node1.setPosition(100, 150);

  //3-B) create our new custom node
  var node2 = new ConditionNodeModel();
  node2.setPosition(250, 108);

  var node3 = new DefaultNodeModel('Node 3', 'red');
  var port3 = node3.addInPort('In');
  node3.setPosition(500, 150);

  //3-C) link the 2 nodes together
  var link1 = port1.link(node2.getPort('left'));
  var link2 = port3.link(node2.getPort('right'));

  //4) add the models to the root graph
  model.addAll(node1, node2, node3, link1, link2);

  //5) load model into engine
  engine.setDiagramModel(model);

  //6) render the diagram!
  return <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />;
};
