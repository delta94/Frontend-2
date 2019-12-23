import { NodeModel } from 'mrblenny-storm-react-diagrams';
import { FlowNodePortModel } from './FlowNodePortModel';

// export class FlowNodeModel extends NodeModel {
// 	constructor() {
// 		super("flow");
// 		this.addPort(new FlowNodePortModel("top"));
// 		this.addPort(new FlowNodePortModel("left"));
// 		this.addPort(new FlowNodePortModel("bottom"));
// 		this.addPort(new FlowNodePortModel("right"));
// 	}
// }

export class DecisionNodeModel extends NodeModel {
  constructor() {
    super('decision');
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('bottom')); //out
    this.addPort(new FlowNodePortModel('right')); //out
  }
}

export class MergeNodeModel extends NodeModel {
  constructor() {
    super('merge');
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('bottom')); //in
    this.addPort(new FlowNodePortModel('right')); //out
  }
}

export class ForkNodeModel extends NodeModel {
  constructor() {
    super('fork');
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('top')); //out
    this.addPort(new FlowNodePortModel('bottom')); //out
  }
}

export class JoinNodeModel extends NodeModel {
  constructor() {
    super('join');
    this.addPort(new FlowNodePortModel('top')); //in
    this.addPort(new FlowNodePortModel('bottom')); //in
    this.addPort(new FlowNodePortModel('right')); //out
  }
}

export class ConditionNodeModel extends NodeModel {
  constructor() {
    super('condition');
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('right')); //out
  }
}

export class ProcessNodeModel extends NodeModel {
  constructor() {
    super('process');
    this.addPort(new FlowNodePortModel('left')); //in
    this.addPort(new FlowNodePortModel('right')); //out
  }
}

export class StartNodeModel extends NodeModel {
  constructor() {
    super('start');
    this.addPort(new FlowNodePortModel('right')); //out
  }
}

export class EndNodeModel extends NodeModel {
  constructor() {
    super('end');
    this.addPort(new FlowNodePortModel('left')); //in
  }
}
