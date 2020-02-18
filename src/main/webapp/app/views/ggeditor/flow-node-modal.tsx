import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Col, Collapse, Input, Row, Select } from 'antd';
import {
  ConditionDecisionNodeModel,
  EmailProcessNodeModel,
  EventWaitingDecisionNodeModel,
  SmsProcessNodeModel,
  TimeWaitingDecisionNodeModel,
  TrayItemWidget
} from 'app/views/ggeditor/flow-diagram-editor';
import { translate } from 'react-jhipster';

const { Panel } = Collapse;

interface IFlowNodeModalProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  toggleModal: Function;
  onClick: (event, data) => void;
}

interface IFlowNodeModalState {}

export class FlowNodeModal extends React.Component<IFlowNodeModalProps, IFlowNodeModalState> {
  state: IFlowNodeModalState = {};

  toggle = async () => {
    let { toggleModal, isOpenModal } = this.props;
    toggleModal(!isOpenModal);
  };

  handleOnClick = async (event, data) => {
    let { onClick } = this.props;
    if (onClick) onClick(event, data);
  };

  renderTrayItemWidget(type: string) {
    return <TrayItemWidget model={{ type: type }} onClick={this.handleOnClick} isDrag={false} />;
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
                <Col span={8}>
                  {this.renderTrayItemWidget(SmsProcessNodeModel.TYPE)}
                  {this.renderTrayItemLabelWidget(SmsProcessNodeModel.TYPE)}
                </Col>
                <Col span={8}>
                  {this.renderTrayItemWidget(EmailProcessNodeModel.TYPE)}
                  {this.renderTrayItemLabelWidget(EmailProcessNodeModel.TYPE)}
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <Collapse bordered={false} defaultActiveKey={['2']} expandIconPosition="right">
            <Panel header="Điều kiện" key="2">
              <Row className="row">
                <Col span={8}>
                  {this.renderTrayItemWidget(ConditionDecisionNodeModel.TYPE)}
                  <br />
                  {this.renderTrayItemLabelWidget(ConditionDecisionNodeModel.TYPE)}
                </Col>

                <Col span={8}>
                  {this.renderTrayItemWidget(TimeWaitingDecisionNodeModel.TYPE)}
                  <br />
                  {this.renderTrayItemLabelWidget(TimeWaitingDecisionNodeModel.TYPE)}
                </Col>
                <Col span={8}>
                  {this.renderTrayItemWidget(EventWaitingDecisionNodeModel.TYPE)}
                  <br />
                  {this.renderTrayItemLabelWidget(EventWaitingDecisionNodeModel.TYPE)}
                </Col>
              </Row>
            </Panel>
          </Collapse>
          {/* // </Sider> */}
        </Fragment>
      </div>
    );
  }

  render() {
    let { isOpenModal } = this.props;
    return (
      <Modal isOpen={isOpenModal}>
        <ModalHeader toggle={this.toggle}>Công cụ</ModalHeader>
        <ModalBody>{this.renderModalBody()}</ModalBody>
        <ModalFooter>
          <Button type="default" style={{ color: 'black' }} onClick={this.toggle}>
            Hủy
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

export default connect(mapStateToProps, mapDispatchToProps)(FlowNodeModal);
