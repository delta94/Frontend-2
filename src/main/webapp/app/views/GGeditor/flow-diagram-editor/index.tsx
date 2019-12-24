import { DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget } from 'storm-react-diagrams';
import * as React from 'react';
// import the custom models
import {
  ConditionNodeModel,
  ContactSourceStartNodeModel,
  EmailProcessNodeModel,
  FlowNodeModel,
  parseNode,
  SmsProcessNodeModel,
  TimeWaitingDecisionNodeModel
} from './FlowNodeModel';
import {
  ContactSourceStartNodeFactory,
  EmailProcessNodeFactory,
  SmsProcessNodeFactory,
  TimeWaitingDecisionNodeFactory,
  EndNodeFactory
} from './FlowNodeFactory';
import { FlowNodePortFactory } from './FlowNodePortFactory';
import { FlowNodePortModel } from './FlowNodePortModel';
import './index.scss';
import SAMPLE_DATA from './data';

export default () => {
  //1) setup the diagram engine
  var engine = new DiagramEngine();
  engine.installDefaultFactories();

  // register some other factories as well
  engine.registerPortFactory(new FlowNodePortFactory('flow', config => new FlowNodePortModel()));
  engine.registerNodeFactory(new ContactSourceStartNodeFactory());
  engine.registerNodeFactory(new EmailProcessNodeFactory());
  engine.registerNodeFactory(new SmsProcessNodeFactory());
  engine.registerNodeFactory(new TimeWaitingDecisionNodeFactory());
  engine.registerNodeFactory(new EndNodeFactory());

  //2) setup the diagram model
  var model = new DiagramModel();

  //3-A) create a default node
  var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
  var port1 = node1.addOutPort('Out');
  node1.setPosition(100, 150);

  //3-B) create our new custom node
  var node2 = new TimeWaitingDecisionNodeModel();
  node2.setPosition(250, 108);

  for (let node of SAMPLE_DATA.flow.graph.nodes) {
    let nodeModel = parseNode(node);
    if (nodeModel) {
      model.addNode(nodeModel);
    }
  }

  for (let edge of SAMPLE_DATA.flow.graph.edges) {
    let sourceNode = model.getNode(edge.source);
    let targetNode = model.getNode(edge.target);
    if (sourceNode instanceof FlowNodeModel && targetNode instanceof FlowNodeModel) {
      let sourcePort = sourceNode.getDefaultOutPort();
      let targetPort = targetNode.getDefaultInPort();
      if (sourceNode && targetPort && sourcePort.canLinkToPort(targetPort)) {
        let link = sourcePort.createLinkModel();
        link.setSourcePort(sourcePort);
        link.setTargetPort(targetPort);
        model.addLink(link);
      }
    }
  }

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
  return <DiagramWidget className="srd-flow-canvas" diagramEngine={engine} allowLooseLinks={false} />;
};
