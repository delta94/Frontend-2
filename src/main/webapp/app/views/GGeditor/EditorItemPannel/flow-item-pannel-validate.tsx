import React, { Fragment } from 'react';
import { Card, Row, Col, Collapse } from 'antd';
import { connect } from 'react-redux';
import { getDiagramCampaign, validateCampaign } from 'app/actions/campaign-managament';
import { IRootState } from 'app/reducers';
import { ItemPanel, Item } from 'gg-editor';
import './index.scss';

const { Panel } = Collapse;

interface IFlowItemValidateProps extends StateProps, DispatchProps {}
interface IFlowItemValidateState {
  data: any[];
}

class FlowItemValidate extends React.Component<IFlowItemValidateProps, IFlowItemValidateState> {
  state: IFlowItemValidateState = {
    data: this.props.listDiagram.nodes
  };

  remove(arr, item) {
    for (var i = arr.length; i--; ) {
      if (arr[i].id === item) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  checkNodeEmailConfig = () => {
    let { data } = this.state;
    let { listFieldData } = this.props;
    if (listFieldData.emailConfig && Object.keys(listFieldData.emailConfig).length > 0) {
      let idEmailConfig = listFieldData.emailConfig.map(item => {
        return item.id;
      });
      let id = idEmailConfig.join().split(',');
      if (id.length < 2) {
        data = data.filter(function(item) {
          return item.id != id;
        });
      } else {
        id.map(value => {
          data = data.filter(function(item) {
            return item.id != String(value);
          });
        });
      }
    }
    if (Object.keys(listFieldData.listCampign).length > 0) {
      let idlistCampign = listFieldData.listCampign.map(item => {
        return item.id;
      });
      let id = idlistCampign.join().split(',');
      if (id.length < 2) {
        data = data.filter(function(item) {
          return item.id != id;
        });
      } else {
        id.map(value => {
          data = data.filter(function(item) {
            return item.id != String(value);
          });
        });
      }
    }
    if (Object.keys(listFieldData.messageConfig).length > 0) {
      let idMessageConfig = listFieldData.messageConfig.map(item => {
        return item.id;
      });
      let id = idMessageConfig.join().split(',');
      if (id.length < 2) {
        data = data.filter(function(item) {
          return item.id != id;
        });
      } else {
        id.map(value => {
          data = data.filter(function(item) {
            return item.id != String(value);
          });
        });
      }
    }
    if (Object.keys(listFieldData.timer).length > 0) {
      let idTimer = listFieldData.timer.map(item => {
        return item.id;
      });
      let id = idTimer.join().split(',');
      if (id.length < 2) {
        data = data.filter(function(item) {
          return item.id != id;
        });
      } else {
        id.map(value => {
          data = data.filter(function(item) {
            return item.id != String(value);
          });
        });
      }
    }
    if (Object.keys(listFieldData.timerEvent).length > 0) {
      let idTimerEvent = listFieldData.timerEvent.map(item => {
        return item.id;
      });
      let id = idTimerEvent.join().split(',');
      if (id.length < 2) {
        data = data.filter(function(item) {
          return item.id != id;
        });
      } else {
        id.map(value => {
          data = data.filter(function(item) {
            return item.id != String(value);
          });
        });
      }
    }
    return data;
  };

  showNodeValidate = () => {
    let { listFieldData, listDiagram } = this.props;
    let data;
    if (Object.keys(listFieldData).length < 1) {
      return listDiagram.nodes.map((item, index) => {
        return (
          <Row className="row" key={index}>
            <Col span={24}>
              <Item type="" size="" shape="" src={item.icon} />
              <div>
                <label>{item.label}</label>
              </div>
              <label>Chưa cấu hình thông tin</label>
            </Col>
          </Row>
        );
      });
    } else {
      return this.checkNodeEmailConfig().map((item, index) => {
        return (
          <Row className="row" key={index}>
            <Col span={24}>
              <Item type="" size="" shape="" src={item.icon} />
              <div>
                <label>{item.label}</label>
              </div>
              <label>Chưa cấu hình thông tin</label>
            </Col>
          </Row>
        );
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Collapse bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
          <Panel header="Nguồn dữ liệu" key="1">
            <ItemPanel className="itemPanel">{this.showNodeValidate()}</ItemPanel>
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
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowItemValidate);
