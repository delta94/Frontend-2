import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Col, Collapse, Row } from 'antd';
import { DecisionGroupProcess, DefaultGroupProcess, TrayItemWidget } from './flow-diagram-editor';
import { Translate, translate } from 'react-jhipster';

const { Panel } = Collapse;

interface IFlowNodeSelectionModalProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
  onClick: (event, data) => void;
}

interface IFlowNodeSelectionModalState {
}

export class FlowNodeSelectionModal extends React.Component<IFlowNodeSelectionModalProps, IFlowNodeSelectionModalState> {
  state: IFlowNodeSelectionModalState = {};

  toggle = async () => {
    let { toggleModal, isOpenModal } = this.props;
    toggleModal(!isOpenModal);
  };

  handleOnClick = async (event, data) => {
    let { onClick } = this.props;
    if (onClick) onClick(event, data);
  };

  renderTrayItemWidget(type: string) {
    return <TrayItemWidget model={{ type: type }} onClick={this.handleOnClick} isDrag={false}/>;
  }

  renderTrayItemLabelWidget(type: string) {
    return (
      <div
        style={{
          marginTop: '8px'
        }}
      >
        {translate('diagram.node.' + type)}
      </div>
    );
  }

  renderModalBody() {
    return (
      <div className="logo" style={{ display: 'block' }}>
        <Fragment>
          <Collapse bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
            <Panel header="Hành động" key="1">
              <Row className="row">
                <Col style={{ width: '64px' }}>
                  {this.renderTrayItemWidget(DefaultGroupProcess.TYPE)}
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    {this.renderTrayItemLabelWidget(DefaultGroupProcess.TYPE)}
                  </div>
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <Collapse bordered={false} defaultActiveKey={['2']} expandIconPosition="right">
            <Panel header="Điều kiện" key="2">
              <Row className="row">
                <Col style={{ width: '90px' }}>
                  {this.renderTrayItemWidget(DecisionGroupProcess.TYPE)}
                  <br/>
                  <div style={{ width: '100%', textAlign: 'center' }}>

                    {this.renderTrayItemLabelWidget(DecisionGroupProcess.TYPE)}
                  </div>

                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Fragment>
      </div>
    );
  }

  render() {
    let { isOpenModal } = this.props;
    return (
      <Modal isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}><Translate contentKey="diagram.modal.title_tools" /></ModalHeader>
        <ModalBody>{this.renderModalBody()}</ModalBody>
        <ModalFooter>
          <Button type="default" style={{ color: 'black' }} onClick={this.toggle}>
            <Translate contentKey="diagram.modal.button_nok" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({}: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlowNodeSelectionModal);
