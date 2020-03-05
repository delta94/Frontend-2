import { NodeModel, PortModel } from 'storm-react-diagrams';
import { FlowNodePortModel } from './FlowNodePortModel';
import { FlowNodeConfig } from './FlowNodeConfig';
import { FlowNodeEventHandlers } from './EventHandlers';
import { Translate, translate } from 'react-jhipster';

export class FlowNodeModel extends NodeModel {
  static TYPE: string = 'default';

  constructor(nodeType: string = FlowNodeModel.TYPE, id?: string, label?: string) {
    super(nodeType, id);
    this._label = label;
  }

  private _offsetX: number = -1;
  private _offsetY: number = -1;

  get offsetX(): number {
    return this._offsetX;
  }

  set offsetX(value: number) {
    this._offsetX = value;
  }

  get offsetY(): number {
    return this._offsetY;
  }

  set offsetY(value: number) {
    this._offsetY = value;
  }

  private _config: FlowNodeConfig;

  get config(): FlowNodeConfig {
    return this._config;
  }

  set config(value: FlowNodeConfig) {
    this._config = value;
  }

  private _isActive: boolean = false;

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  private _dropZoneVisible: boolean = false;

  get dropZoneVisible(): boolean {
    return this._dropZoneVisible;
  }

  set dropZoneVisible(value: boolean) {
    this._dropZoneVisible = value;
  }

  private _readOnly: boolean = false;

  get readOnly(): boolean {
    return this._readOnly;
  }

  set readOnly(value: boolean) {
    this._readOnly = value;
  }

  private _eventHandlers: FlowNodeEventHandlers = null;

  get eventHandlers(): FlowNodeEventHandlers {
    return this._eventHandlers;
  }

  set eventHandlers(value: FlowNodeEventHandlers) {
    this._eventHandlers = value;
  }

  private _label: string;

  get label(): string {
    if (this._label && this._label !== '') return this._label;
    else return this.getDefaultLabel();
  }

  set label(value: string) {
    this._label = value;
  }

  private _icon: string;

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  private _extraLabel: string;

  get extraLabel(): string {
    return this._extraLabel;
  }

  set extraLabel(value: string) {
    this._extraLabel = value;
  }

  private _extraIcon: string;

  get extraIcon(): string {
    return this._extraIcon;
  }

  set extraIcon(value: string) {
    this._extraIcon = value;
  }

  getDefaultLabel(): string {
    return '';
  }

  getDefaultInPort(): PortModel | null {
    return null;
  }

  getDefaultOutPort(): PortModel | null {
    return null;
  }

  getInPort(pos?: string): PortModel | null {
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    return null;
  }

  getInPortOrDefault(pos?: string): PortModel | null {
    let port = this.getInPort(pos);
    if (port) return port;
    return this.getDefaultInPort();
  }

  getOutPortOrDefault(pos?: string): PortModel | null {
    let port = this.getOutPort(pos);
    if (port) return port;
    return this.getDefaultOutPort();
  }

  getInPorts(): { [s: string]: PortModel } {
    return null;
  }

  getOutPorts(): { [s: string]: PortModel } {
    return null;
  }
}

export class DecisionNodeModel extends FlowNodeModel {
  static TYPE: string = 'decision';
  static WIDTH: number = 90;
  static HEIGHT: number = 90;
  constructor(id?: string, label?: string) {
    super(DecisionNodeModel.TYPE, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM, FlowNodePortModel.OUT, translate('diagram.condition_result.nok'), true)); //out
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT, translate('diagram.condition_result.ok'))); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.decision');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.RIGHT || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);
    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.BOTTOM] = this.getPort(FlowNodePortModel.BOTTOM);
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class MergeNodeModel extends FlowNodeModel {
  static TYPE: string = 'merge';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(id?: string, label?: string) {
    super(MergeNodeModel.TYPE, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.merge');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.LEFT || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);
    ports[FlowNodePortModel.BOTTOM] = this.getPort(FlowNodePortModel.BOTTOM);
    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class ForkNodeModel extends FlowNodeModel {
  static TYPE: string = 'fork';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(id?: string, label?: string) {
    super(ForkNodeModel.TYPE, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.TOP, FlowNodePortModel.OUT)); //out
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.fork');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.TOP);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.TOP || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);

    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.TOP] = this.getPort(FlowNodePortModel.TOP);
    ports[FlowNodePortModel.BOTTOM] = this.getPort(FlowNodePortModel.BOTTOM);
    return ports;
  }
}

export class JoinNodeModel extends FlowNodeModel {
  static TYPE: string = 'join';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(id?: string, label?: string) {
    super(JoinNodeModel.TYPE, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.TOP, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.BOTTOM, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.join');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.TOP);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && (pos === FlowNodePortModel.TOP || pos === FlowNodePortModel.BOTTOM)) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.TOP] = this.getPort(FlowNodePortModel.TOP);
    ports[FlowNodePortModel.BOTTOM] = this.getPort(FlowNodePortModel.BOTTOM);

    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class ProcessNodeModel extends FlowNodeModel {
  static TYPE: string = 'process';
  static WIDTH: number = 64;
  static HEIGHT: number = 64;

  constructor(id?: string, label?: string) {
    super(ProcessNodeModel.TYPE, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.process');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);

    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class StartNodeModel extends FlowNodeModel {
  static TYPE: string = 'start';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(id?: string, label?: string) {
    super(StartNodeModel.TYPE, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.RIGHT, FlowNodePortModel.OUT)); //out
  }

  getDefaultLabel(): string {
    return translate('diagram.node.start');
  }

  getDefaultInPort(): PortModel | null {
    return null;
  }

  getDefaultOutPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.RIGHT);
  }

  getInPort(pos?: string): PortModel | null {
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.RIGHT) return this.getPort(pos);
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    return {};
  }

  getOutPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.RIGHT] = this.getPort(FlowNodePortModel.RIGHT);
    return ports;
  }
}

export class EndNodeModel extends FlowNodeModel {
  static TYPE: string = 'end';
  static WIDTH: number = 68;
  static HEIGHT: number = 68;

  constructor(id?: string, label?: string) {
    super(EndNodeModel.TYPE, id, label);
    this.addPort(new FlowNodePortModel(FlowNodePortModel.LEFT, FlowNodePortModel.IN)); //in
  }

  getDefaultLabel(): string {
    return translate('diagram.node.end');
  }

  getDefaultInPort(): PortModel | null {
    return this.getPort(FlowNodePortModel.LEFT);
  }

  getDefaultOutPort(): PortModel | null {
    return null;
  }

  getInPort(pos?: string): PortModel | null {
    if (pos && pos === FlowNodePortModel.LEFT) return this.getPort(pos);
    return null;
  }

  getOutPort(pos?: string): PortModel | null {
    return null;
  }

  getInPorts(): { [s: string]: PortModel } {
    let ports = {};
    ports[FlowNodePortModel.LEFT] = this.getPort(FlowNodePortModel.LEFT);
    return ports;
  }

  getOutPorts(): { [s: string]: PortModel } {
    return {};
  }
}
