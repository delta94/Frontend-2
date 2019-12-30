import React, { Fragment } from 'react';
import { Card, Row, Col, Collapse } from 'antd';
import { connect } from 'react-redux';
import { getDiagramCampaign, validateCampaign } from 'app/actions/campaign-managament';
import { IRootState } from 'app/reducers';
import { ItemPanel, Item } from 'gg-editor';
import { Translate, translate } from 'react-jhipster';
import { openModal, closeModal } from 'app/actions/modal';
import SiderComponet from '../sider/sider-tool';
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
      if (arr[i].code === item) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  checkNodeConfig = () => {
    localStorage.removeItem('isSave');
    let { data } = this.state;
    data = data.filter(function(item) {
      return item.code != 'DES';
    });
    let { listFieldData } = this.props;
    if (Object.keys(listFieldData.emailConfig).length > 0) {
      let idEmailConfig =
        listFieldData.emailConfig &&
        listFieldData.emailConfig.map(item => {
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
    let { data } = this.state;
    data = data.filter(function(item) {
      return item.code != 'DES';
    });
    localStorage.removeItem('isSave');
    if (Object.keys(listFieldData).length < 1) {
      return data.map((item, index) => {
        return (
          <Row className="row" key={index}>
            <Col span={24}>
              <Item type="" size="" shape="" src={item.icon} />
              <div>
                <label>{item.label}</label>
              </div>
              <label className="not-config">Chưa cấu hình thông tin</label>
            </Col>
          </Row>
        );
      });
    } else {
      return this.checkNodeConfig().map((item, index) => {
        return (
          <Row className="row" key={index}>
            <Col span={24}>
              <Item type="" size="" shape="" src={item.icon} />
              <div>
                <label>{item.label}</label>
              </div>
              <label className="not-config">Chưa cấu hình thông tin</label>
            </Col>
          </Row>
        );
      });
    }
  };

  showComplete = () => {
    localStorage.setItem('isSave', 'true');
    return <label className="config-validate"> Cấu hình chiến dịch thành công </label>;
  };

  render() {
    const { list_clone_verion } = this.props;
    return (
      <Fragment>
        <Collapse className="validate-main" bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
          <Panel header="" key="1">
            <ItemPanel className="itemPanel">
              {list_clone_verion && Object.keys(list_clone_verion).length > 0
                ? this.showComplete()
                : this.showNodeValidate() && this.showNodeValidate().length > 0
                ? this.showNodeValidate()
                : this.showComplete()}
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
  listFieldData: campaignManagament.listFieldData,
  list_clone_verion: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  validateCampaign,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowItemValidate);
