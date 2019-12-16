import React, { Fragment } from 'react';
import { Card, Row, Col, Collapse } from 'antd';
import { connect } from 'react-redux';
import { getDiagramCampaign, validateCampaign } from 'app/actions/campaign-managament';
import { IRootState } from 'app/reducers';
import { ItemPanel, Item } from 'gg-editor';
import './index.scss';

const { Panel } = Collapse;

interface IFlowItemValidateProps extends StateProps, DispatchProps {}
interface IFlowItemValidateState {}

class FlowItemValidate extends React.Component<IFlowItemValidateProps, IFlowItemValidateState> {
  state = {};

  showNodeValidate = () => {
    let { listFieldData, listDiagram } = this.props;
  };

  render() {
    return (
      <Fragment>
        <Collapse bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
          <Panel header="Nguồn dữ liệu" key="1">
            <ItemPanel className="itemPanel">
              <Row className="row">
                <Col span={24}>
                  <Item
                    type=""
                    size=""
                    shape=""
                    src="data:image/png;base64,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"
                  />
                  <div>
                    <label>Danh sách khách hàng</label>
                  </div>
                  <label>Chưa cấu hình thông tin</label>
                </Col>
              </Row>
            </ItemPanel>
          </Panel>
        </Collapse>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData
});

const mapDispatchToProps = {
  getDiagramCampaign,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowItemValidate);
