import { DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget, NodeModel, PortModel } from 'storm-react-diagrams';
import * as React from 'react';
// import the custom models
import {
  ContactSourceStartNodeModel,
  DecisionNodeModel,
  EmailProcessNodeModel,
  EndNodeModel,
  FlowNodeModel,
  mapToPortPosition,
  parseNode,
  ProcessNodeModel,
  SmsProcessNodeModel,
  StartNodeModel,
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

const GRID_SIZE = {
  width: 160,
  height: 160
};
const PORT_SIZE = {
  width: 8,
  height: 8
};

function getDistributedModel(engine: DiagramEngine, model: DiagramModel) {
  const serialized = model.serializeDiagram();
  const distributedSerializedDiagram = distributeElements(serialized);

  //deserialize the model
  let deSerializedModel = new DiagramModel();
  deSerializedModel.deSerializeDiagram(distributedSerializedDiagram, engine);
  return deSerializedModel;
}

function getStartNode(model: DiagramModel): FlowNodeModel | null {
  let nodes = model.getNodes();
  for (let key in nodes) {
    let node = nodes[key];
    if (node && node instanceof StartNodeModel) return node;
  }
  return null;
}

function arrangeFromNode(fromNode: NodeModel, fromPort: PortModel, x: number, y: number) {
  if (fromNode instanceof StartNodeModel)
    fromNode.setPosition(x - PORT_SIZE.width / 2 - StartNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - StartNodeModel.HEIGHT / 2);
  else if (fromNode instanceof ProcessNodeModel)
    fromNode.setPosition(x - PORT_SIZE.width / 2 - ProcessNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - ProcessNodeModel.HEIGHT / 2);
  else if (fromNode instanceof DecisionNodeModel)
    fromNode.setPosition(x - PORT_SIZE.width / 2 - DecisionNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - DecisionNodeModel.HEIGHT / 2);
  else if (fromNode instanceof EndNodeModel)
    fromNode.setPosition(x - PORT_SIZE.width / 2 - EndNodeModel.WIDTH / 2, y - PORT_SIZE.height / 2 - EndNodeModel.HEIGHT / 2);
  else fromNode.setPosition(x, y);

  let ports = fromNode.getPorts();
  for (let key in ports) {
    let port = ports[key];
    if (port && (!fromPort || port.id !== fromPort.id) && key === FlowNodePortModel.LEFT)
      arrangeFromPort(port, FlowNodePortModel.LEFT, x, y);
    else if (port && (!fromPort || port.id !== fromPort.id) && key === FlowNodePortModel.RIGHT)
      arrangeFromPort(port, FlowNodePortModel.RIGHT, x, y);
    else if (port && (!fromPort || port.id !== fromPort.id) && key === FlowNodePortModel.TOP)
      arrangeFromPort(port, FlowNodePortModel.TOP, x, y);
    else if (port && (!fromPort || port.id !== fromPort.id) && key === FlowNodePortModel.BOTTOM)
      arrangeFromPort(port, FlowNodePortModel.BOTTOM, x, y);
  }
}

function arrangeFromPort(fromPort: PortModel, fromPosition: string, x: number, y: number) {
  let links = fromPort.getLinks();
  let i = 0;
  for (let key in links) {
    let link = links[key];
    if (link) {
      let toPort = link.getSourcePort().id === fromPort.id ? link.getTargetPort() : link.getSourcePort();
      let toNode = toPort.getNode();
      if (toNode) {
        if (fromPosition === FlowNodePortModel.LEFT) arrangeFromNode(toNode, toPort, x - GRID_SIZE.width, y - i * GRID_SIZE.height);
        else if (fromPosition === FlowNodePortModel.RIGHT) arrangeFromNode(toNode, toPort, x + GRID_SIZE.width, y + i * GRID_SIZE.height);
        else if (fromPosition === FlowNodePortModel.TOP)
          arrangeFromNode(toNode, toPort, x - (i + 1) * GRID_SIZE.width, y - GRID_SIZE.height);
        else if (fromPosition === FlowNodePortModel.BOTTOM)
          arrangeFromNode(toNode, toPort, x + (i + 1) * GRID_SIZE.width, y + GRID_SIZE.height);
        i++;
      }
    }
  }
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

  //3) create our new custom node
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

  //4) auto arrange
  arrangeFromNode(getStartNode(model), null, 100, 100);

  model.setLocked(true);
  //5) load model into engine
  engine.setDiagramModel(model);

  //6) render the diagram!
  return <DiagramWidget className="srd-flow-canvas" diagramEngine={engine} smartRouting={true} />;
};
