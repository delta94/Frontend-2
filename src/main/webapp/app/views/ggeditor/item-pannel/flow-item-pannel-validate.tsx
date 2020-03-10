import React, { Fragment } from 'react';
import { Card, Row, Col, Collapse } from 'antd';
import { connect } from 'react-redux';
import { validateCampaign } from 'app/actions/campaign-management';
import { IRootState } from 'app/reducers';
import { openModal, closeModal } from 'app/actions/modal';
import './index.scss';
import {
  FlowDiagramEditor,
  TrayItemWidget,
  ContactSourceStartNodeModel,
  EventSourceStartNodeModel,
  SmsProcessNodeModel,
  EmailProcessNodeModel,
  TimeWaitingDecisionNodeModel,
  EventWaitingDecisionNodeModel,
  ConditionDecisionNodeModel
} from '../flow-diagram-editor';
import { code_node } from 'app/common/models/campaign-management.model';

const { Panel } = Collapse;

interface IFlowItemValidateProps extends StateProps, DispatchProps {}
interface IFlowItemValidateState {
  data: any[];
}

class FlowItemValidate extends React.Component<IFlowItemValidateProps, IFlowItemValidateState> {
  state: IFlowItemValidateState = {
    data: this.props.listDiagram.nodes
  };
  editor: FlowDiagramEditor;

  componentWillMount() {
    let { listDiagram } = this.props;
    //TODO ????
    this.editor = new FlowDiagramEditor();
    this.editor.setDiagramData({
      nodes: listDiagram.nodes,
      edges: listDiagram.edges
    });
  }

  renderTrayItemWidget(type: string) {
    return <TrayItemWidget model={{ type: type }} isDrag={false} />;
  }

  getParam(type) {
    switch (type) {
      case code_node.SOURCE:
        return ContactSourceStartNodeModel.TYPE;
      case code_node.EVENT:
        return EventSourceStartNodeModel.TYPE;
      case code_node.SEND_MAIL:
        return EmailProcessNodeModel.TYPE;
      case code_node.SEND_SMS:
        return SmsProcessNodeModel.TYPE;
      case code_node.TIMER:
        return TimeWaitingDecisionNodeModel.TYPE;
      case code_node.TIMER_EVENT:
        return EventWaitingDecisionNodeModel.TYPE;
      case code_node.GATEWAY:
        return ConditionDecisionNodeModel.TYPE;
    }
  }

  validate = () => {
    const { list_validate } = this.props;
    let result =
      list_validate &&
      list_validate.map((item, index) => {
        return (
          <Row className="row" key={index} style={{marginBottom: '16px'}}>
            <Col span={24}>
              {this.renderTrayItemWidget(this.getParam(item.nodeCode))}
              {/*<div>*/}
              {/*  <label>{item.label}</label>*/}
              {/*</div>*/}
              {item.errors &&
                item.errors.map(event => {
                  return (
                    <div className="not-config" style={{marginTop: '8px'}}>
                      - {event}
                      <br />
                    </div>
                  );
                })}
            </Col>
          </Row>
        );
      });
    return result;
  };

  showComplete = () => {
    localStorage.setItem('isSave', 'true');
    return <label className="config-validate"> Cấu hình chiến dịch thành công </label>;
  };

  render() {
    return (
      <Fragment>
        <Collapse className="validate-main" bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
          <Panel header="" key="1">
            {this.validate().length > 0 ? this.validate() : this.showComplete()}
          </Panel>
        </Collapse>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ campaignManagement }: IRootState) => ({
  loading: campaignManagement.loading,
  listDiagram: campaignManagement.listDiagram,
  listFieldData: campaignManagement.listFieldData,
  list_clone_verion: campaignManagement.cloneInfoVersion,
  list_validate: campaignManagement.list_validate
});

const mapDispatchToProps = {
  validateCampaign,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlowItemValidate);
