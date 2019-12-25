import { DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget } from 'storm-react-diagrams';
import * as React from 'react';
// import the custom models
import {
  ContactSourceStartNodeModel,
  EmailProcessNodeModel,
  FlowNodeModel,
  mapToPortPosition,
  parseNode,
  SmsProcessNodeModel,
  TimeWaitingDecisionNodeModel
} from './FlowNodeModel';
import {
  ContactSourceStartNodeFactory,
  EmailProcessNodeFactory,
  SmsProcessNodeFactory,
  TimeWaitingDecisionNodeFactory,
  EndNodeFactory,
  EventWaitingDecisionNodeFactory,
  EventSourceStartNodeFactory,
  ConditionDecisionNodeFactory
} from './FlowNodeFactory';
import { FlowNodePortFactory } from './FlowNodePortFactory';
import { FlowNodePortModel } from './FlowNodePortModel';
import './index.scss';
import SAMPLE_DATA from './data';
import { distributeElements } from './DagreUtils';

function getDistributedModel(engine: DiagramEngine, model: DiagramModel) {
  const serialized = model.serializeDiagram();
  const distributedSerializedDiagram = distributeElements(serialized);

  //deserialize the model
  let deSerializedModel = new DiagramModel();
  deSerializedModel.deSerializeDiagram(distributedSerializedDiagram, engine);
  return deSerializedModel;
}

export default () => {
  //1) setup the diagram engine
  let engine = new DiagramEngine();
  engine.installDefaultFactories();

  // register some other factories as well
  engine.registerPortFactory(new FlowNodePortFactory('flow', config => new FlowNodePortModel()));
  engine.registerNodeFactory(new ContactSourceStartNodeFactory());
  engine.registerNodeFactory(new EventSourceStartNodeFactory());
  engine.registerNodeFactory(new EmailProcessNodeFactory());
  engine.registerNodeFactory(new SmsProcessNodeFactory());
  engine.registerNodeFactory(new TimeWaitingDecisionNodeFactory());
  engine.registerNodeFactory(new EventWaitingDecisionNodeFactory());
  engine.registerNodeFactory(new ConditionDecisionNodeFactory());
  engine.registerNodeFactory(new EndNodeFactory());

  //2) setup the diagram model
  let model = new DiagramModel();

  //3-A) create a default node
  let node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
  let port1 = node1.addOutPort('Out');
  node1.setPosition(100, 150);

  //3-B) create our new custom node
  let node2 = new TimeWaitingDecisionNodeModel();
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
      let sourcePort = sourceNode.getOutPort(mapToPortPosition(edge.sourceAnchor));
      let targetPort = targetNode.getInPort(mapToPortPosition(edge.targetAnchor));
      if (sourceNode && targetPort && sourcePort.canLinkToPort(targetPort)) {
        let link = sourcePort.createLinkModel();
        link.setSourcePort(sourcePort);
        link.setTargetPort(targetPort);
        model.addLink(link);
      }
    }
  }

  let node3 = new DefaultNodeModel('Node 3', 'red');
  let port3 = node3.addInPort('In');
  node3.setPosition(500, 150);

  //3-C) link the 2 nodes together
  let link1 = port1.link(node2.getPort('left'));
  let link2 = port3.link(node2.getPort('right'));

  //4) add the models to the root graph
  model.addAll(node1, node2, node3, link1, link2);

  //5) load model into engine

  engine.setDiagramModel(model);

  //6) render the diagram!
  return <DiagramWidget className="srd-flow-canvas" diagramEngine={engine} smartRouting={true} />;
};
