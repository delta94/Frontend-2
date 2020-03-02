import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Col, Collapse, Input, Row, Select } from 'antd';
import {
  DecisionNodeModel,
  ProcessNodeModel,
  TrayItemWidget
} from './flow-diagram-editor';
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
                  {this.renderTrayItemWidget(ProcessNodeModel.TYPE)}
                  {this.renderTrayItemLabelWidget(ProcessNodeModel.TYPE)}
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <Collapse bordered={false} defaultActiveKey={['2']} expandIconPosition="right">
            <Panel header="Điều kiện" key="2">
              <Row className="row">
                <Col span={8}>
                  {this.renderTrayItemWidget(DecisionNodeModel.TYPE)}
                  <br />
                  {this.renderTrayItemLabelWidget(DecisionNodeModel.TYPE)}
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
