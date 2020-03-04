import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Col, Collapse, Input, Row, Select } from 'antd';
import {
  DecisionGroupProcess,
  DecisionNodeModel, DefaultGroupProcess,
  ProcessNodeModel,
  TrayItemWidget
} from './flow-diagram-editor';
import { LinearIcons, LinearIconsProps, LinearIconsState } from './flow-diagram-editor/components/LinearIcons';
import { Translate, translate } from 'react-jhipster';
const { Panel } = Collapse;

interface IFlowNodeConfigData {
  name?: string;
  selectedIcon?: string;
}



interface IFlowNodeConfigModalProps{
  isOpenModal?: boolean;
  toggleModal?: Function;
  onSubmit?: (data:IFlowNodeConfigData) => void;
  data?: IFlowNodeConfigData;
}

interface IFlowNodeConfigModalState {
  data?: IFlowNodeConfigData
}

export class FlowNodeConfigModal extends React.Component<IFlowNodeConfigModalProps, IFlowNodeConfigModalState> {
  public static defaultProps: IFlowNodeConfigModalProps = {
    isOpenModal: false,
    toggleModal: null,
    onSubmit: null,
    data: {name: '', selectedIcon: ''}
  };

  _isEqual(data1: IFlowNodeConfigData, data2: IFlowNodeConfigData){
    return data1 && data2 && data1.name === data2.name && data1.selectedIcon === data2.selectedIcon;
  }

  constructor(props: IFlowNodeConfigModalProps) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  componentWillReceiveProps(nextProps:IFlowNodeConfigModalProps) {
    if(!this._isEqual(nextProps.data, this.state.data)){
      this.setState({
        data: nextProps.data
      });
    }
  }

  handleOnCancel = async () => {
    let { toggleModal, isOpenModal } = this.props;
    toggleModal(!isOpenModal);
  };

  handleOnSubmit = async () => {
    let { onSubmit } = this.props;
    let {data} = this.state;
    if (onSubmit) onSubmit(data);
    this.handleOnCancel();
  };

  handleOnTextChanged = async (source, value) => {
    let {data} = this.state;
    if(!data) data = {name: '', selectedIcon: ''};
    if (source === 'name') {
      data.name = value;
      this.setState({data: data});
    }
  };

  onIconSelectedHandler = async (selectedIcon) => {
    let {data} = this.state;
    if(!data) data = {name: '', selectedIcon: ''};
    data.selectedIcon = selectedIcon;
    this.setState({data: data});
  };

  renderModalBody() {
    let {data} = this.state;
    if(!data) data = {name: '', selectedIcon: ''};

    return (
      <div className="logo" style={{ display: 'block' }}>
        <Fragment>
          <Row align={'middle'}>
            <Col span={4}>
              <label className="input-search_label">
                <Translate contentKey="diagram.modal.label_name" />
              </label>
            </Col>
            <Col span={16}>
              <Input
                defaultValue={data.name}
                style={{ width: '100%' }}
                // placeholder={translate('group-attribute-customer.group-modal-config.name-placeholder')}
                onChange={e => this.handleOnTextChanged('name', e.target.value)}
                maxLength={160}
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <div style={{width: '100%', height: '46vh', overflowY: 'scroll'}}>
              {/*<Pe7Icons />*/}
              <LinearIcons selectedIcon={data.selectedIcon ? data.selectedIcon : ''} onSelected={(selectedIcon)=> this.onIconSelectedHandler(selectedIcon)} />
            </div>
          </Row>
        </Fragment>
      </div>
    );
  }

  render() {
    let { isOpenModal, data } = this.props;
    return (
      <Modal isOpen={isOpenModal} style={{maxWidth: '800px', minWidth: '400px', width: '60%'}}>
        <ModalHeader toggle={this.handleOnCancel}><Translate contentKey="diagram.modal.title_config" /></ModalHeader>
        <ModalBody>{this.renderModalBody()}</ModalBody>
        <ModalFooter>
          <Button type="default" style={{ color: 'black' }} onClick={this.handleOnCancel}>
            <Translate contentKey="diagram.modal.button_nok" />
          </Button>
          <Button type="primary" style={{ color: 'black' }} onClick={e => this.handleOnSubmit()}>
            <Translate contentKey="diagram.modal.button_ok" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

// const mapStateToProps = ({}: IRootState) => ({});
//
// const mapDispatchToProps = {};
//
// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;
//
// export default connect(mapStateToProps, mapDispatchToProps)(FlowNodeConfigModal);
