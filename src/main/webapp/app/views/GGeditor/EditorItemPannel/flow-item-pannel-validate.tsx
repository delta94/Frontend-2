import React, { Fragment } from 'react';
import { Card, Row, Col, Collapse } from 'antd';
import { connect } from 'react-redux';
import { validateCampaign } from 'app/actions/campaign-managament';
import { IRootState } from 'app/reducers';
import { openModal, closeModal } from 'app/actions/modal';
import './index.scss';
import { FlowDiagramEditor, TrayItemWidget, ContactSourceStartNodeModel, EventSourceStartNodeModel, SmsProcessNodeModel, EmailProcessNodeModel, TimeWaitingDecisionNodeModel, EventWaitingDecisionNodeModel, ConditionDecisionNodeModel } from '../flow-diagram-editor';
import { code_node } from 'app/common/model/campaign-managament.model';

const { Panel } = Collapse;

interface IFlowItemValidateProps extends StateProps, DispatchProps { }
interface IFlowItemValidateState {
  data: any[];
}

class FlowItemValidate extends React.Component<IFlowItemValidateProps, IFlowItemValidateState> {
  state: IFlowItemValidateState = {
    data: this.props.listDiagram.nodes
  };
  editor: FlowDiagramEditor

  componentWillMount() {
    let { listDiagram } = this.props;
    this.editor = new FlowDiagramEditor();
    this.editor.lock();
    this.editor.setDiagramData({
      nodes: listDiagram.nodes,
      edges: listDiagram.edges
    });
    this.editor.autoArrange(false);
  }

  renderTrayItemWidget(type: string) {
    return <TrayItemWidget model={{ type: type }} isDrag={false} />;
  }

  getParam(type) {
    switch (type) {
      case code_node.SOURCE:
        return ContactSourceStartNodeModel.TYPE
      case code_node.EVENT:
        return EventSourceStartNodeModel.TYPE
      case code_node.SEND_MAIL:
        return EmailProcessNodeModel.TYPE
      case code_node.SEND_SMS:
        return SmsProcessNodeModel.TYPE
      case code_node.TIMER:
        return TimeWaitingDecisionNodeModel.TYPE
      case code_node.TIMER_EVENT:
        return EventWaitingDecisionNodeModel.TYPE
      case code_node.GATEWAY:
        return ConditionDecisionNodeModel.TYPE
    }
  }

  validate = () => {
    const { list_validate } = this.props;
    let result = (
      list_validate && list_validate.map((item, index) => {
        return (
          <Row className="row" key={index}>
            <Col span={24}>
              {this.renderTrayItemWidget(this.getParam(item.nodeCode))}
              <div>
                <label>{item.label}</label>
              </div>
              {item.errors && item.errors.map(event => { return <p className="not-config">{event}</p> })}
            </Col>
          </Row>
        )
      })
    )
    return result
  }

  showComplete = () => {
    localStorage.setItem('isSave', 'true');
    return <label className="config-validate"> Cấu hình chiến dịch thành công </label>;
  };

  render() {

    return (
      <Fragment>
        <Collapse className="validate-main" bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
          <Panel header="" key="1">
            {
              this.validate().length > 0 ? this.validate() : this.showComplete()}
          </Panel>
        </Collapse>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData,
  list_clone_verion: campaignManagament.cloneInfoVersion,
  list_validate: campaignManagament.list_validate
});

const mapDispatchToProps = {
  validateCampaign,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlowItemValidate);
