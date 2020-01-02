import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Table } from 'reactstrap';
import { Row, Col, Button, Input, Popover, Icon, Modal, Checkbox, Progress } from 'antd';
import $ from 'jquery';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import {
  statusCampaign,
  getListCampaginAuto,
  cloneVersion,
  saveCampaignAutoVersion,
  getListCustomerVersionProcess,
  getDiagramCampaign
} from 'app/actions/campaign-managament';
import { img_node, const_shape } from 'app/common/model/campaign-managament.model';
import './campaign-automation.scss';

const { confirm } = Modal;

const constant_version = {
  DRAFT: 'Draft',
  FINISH: 'Finish',
  RUNNING: 'Running',
  STOP: 'Stop'
};

const code_node = {
  SOURCE: 'SOURCE',
  EVENT: 'EVENT',
  DES: 'DES',
  SEND_SMS: 'SEND_SMS',
  SEND_MAIL: 'SEND_MAIL',
  GATEWAY: 'GATEWAY',
  TIMER: 'TIMER',
  TIMER_EVENT: 'TIMER_EVENT'
};

export interface ICampaginAutoProps extends StateProps, DispatchProps {}

export interface ICampaginAutoState {
  infoVersion: {
    type: string;
    nameVersion: string;
    idVersion: string;
    cjId: string;
    status: string;
  };
  hover: boolean;
  idTree: string;
}

class CampaginAuto extends React.Component<ICampaginAutoProps, ICampaginAutoState> {
  state: ICampaginAutoState = {
    hover: false,
    idTree: '',
    infoVersion: {
      type: '',
      nameVersion: '',
      idVersion: '',
      cjId: '',
      status: ''
    }
  };

  componentDidMount = async () => {
    const { statusCampaign, getListCampaginAuto } = this.props;
    await statusCampaign();
    await getListCampaginAuto();
  };

  movePage = () => {
    location.assign('#/app/views/campaigns/campaign-managament');
  };

  iconStatus = option => {
    let img;
    const img_stop = require('app/assets/utils/images/campaign-managament/stop.png');
    const img_running = require('app/assets/utils/images/campaign-managament/running.png');
    const img_finish = require('app/assets/utils/images/campaign-managament/finish.png');
    const img_draf = require('app/assets/utils/images/campaign-managament/draf.png');
    switch (option) {
      case 'Draft':
        img = img_draf;
        break;
      case 'Finish':
        img = img_finish;
        break;
      case 'Running':
        img = img_running;
        break;
      case 'Stop':
        img = img_stop;
      default:
        break;
    }
    return img;
  };

  customNode(code, option) {
    let data: string;
    switch (option) {
      case 'shape':
        switch (code) {
          case code_node.EVENT:
          case code_node.SOURCE:
            data = const_shape.CIRCLE;
            break;

          case code_node.SEND_MAIL:
          case code_node.SEND_SMS:
            data = const_shape.FLOW;
            break;

          case code_node.TIMER:
          case code_node.TIMER_EVENT:
          case code_node.GATEWAY:
            data = const_shape.RHOMSBUS;
            break;
          case code_node.DES:
            data = const_shape.END_NODE;
            break;
          default:
            break;
        }
        break;
      case 'icon':
        switch (code) {
          case code_node.EVENT:
            data = img_node.EVENT;
            break;

          case code_node.SOURCE:
            data = img_node.SOURCE;
            break;

          case code_node.SEND_MAIL:
            data = img_node.SEND_MAIL;
            break;

          case code_node.SEND_SMS:
            data = img_node.SEND_SMS;
            break;

          case code_node.TIMER:
            data = img_node.TIMER;
            break;

          case code_node.TIMER_EVENT:
            data = img_node.TIMER_EVENT;
            break;

          case code_node.GATEWAY:
            data = img_node.GATEWAY;
            break;

          case code_node.DES:
            data = img_node.END;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    return data;
  }

  cloneVersion = async option => {
    let { list_clone_version, getDiagramCampaign } = this.props;
    let graph = list_clone_version.flowDetail.graph;
    let data = {
      nodes: graph.nodes.map(item => {
        let dataProcess = option === 'view' ? (item.countAct ? `(${item.countAct})` : '') : '';

        return {
          type: item.type,
          size: '95*95',
          shape: this.customNode(item.code, 'shape'),
          value: item.value,
          code: item.code,
          label: item.label + dataProcess,
          backgroud: '#23C00A',
          emailConfig: item.emailConfig,
          smsConfig: item.smsConfig,
          color: '#1890FF',
          icon: this.customNode(item.code, 'icon'),
          labelOffsetY: 60,
          countAct: item.countAct,
          x: item.x,
          y: item.y,
          id: item.id
        };
      }),
      edges: list_clone_version.flowDetail.graph.edges,
      groups: []
    };
    if (list_clone_version.status === 'Draft') {
      window.location.assign('#/flow');
    } else {
      window.location.assign('#/flow/details');
    }
    await getDiagramCampaign(data);
  };

  viewVersion = async id => {
    let { infoVersion } = this.state;
    const { cloneVersion, saveCampaignAutoVersion, getListCustomerVersionProcess } = this.props;
    infoVersion.idVersion = id;
    await cloneVersion(id);
    await this.cloneVersion('view');
    await saveCampaignAutoVersion(infoVersion);
    await getListCustomerVersionProcess('', id, 0);
  };

  render() {
    let { getStatusCampaign, list_campaign_auto } = this.props;
    const img = require('app/assets/utils/images/campaign-managament/count_campaign.png');
    const img_campaign_running = require('app/assets/utils/images/campaign-managament/campaign_running.png');
    const img_finish = require('app/assets/utils/images/campaign-managament/campaign_finish.png');
    const img_new = require('app/assets/utils/images/campaign-managament/campaign_new.png');

    const eventStatus = option => {
      let data;

      switch (option) {
        case constant_version.DRAFT:
          data = 'Bản nháp';
          break;
        case constant_version.FINISH:
          data = 'Kết thúc';
          break;
        case constant_version.RUNNING:
          data = 'Đang thực hiện';
          break;
        case constant_version.STOP:
          data = 'Dừng';
        default:
          break;
      }
      return data;
    };

    return (
      <Fragment>
        <div id="campaing-auto">
          <Row id="title-campaign-auto">
            <Col span={11} style={{ paddingTop: '14px', margin: '0px 12px' }}>
              Chiến dịch tự động
            </Col>
            <Col span={12} style={{ textAlign: 'right', margin: '10px' }}>
              <Button type="primary" onClick={this.movePage}>
                Quản lý chiến dịch
              </Button>
            </Col>
          </Row>
        </div>
        <div className="body-campaign-auto">
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box top">
                <label className="text">Tổng số chiến dịch</label>
              </div>
              <div className="gutter-box below">
                <img style={{ margin: '0px 32px 17px' }} src={img} />
                <label className="count-campaign">{getStatusCampaign.total}</label>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box top">
                <label className="text">Chiến dịch đang thực hiện</label>
              </div>
              <div className="gutter-box below">
                <img style={{ margin: '0px 32px 17px', width: '11%' }} src={img_campaign_running} />
                <label className="count-campaign">{getStatusCampaign.totalRunning}</label>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box top">
                <label className="text">Chiến dịch kết thúc</label>
              </div>
              <div className="gutter-box below">
                <img style={{ margin: '0px 32px 17px', width: '11%' }} src={img_finish} />
                <label className="count-campaign">{getStatusCampaign.totalFinish}</label>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box top">
                <label className="text">Chiến dịch mới</label>
              </div>
              <div className="gutter-box below">
                <img style={{ margin: '0px 32px 17px', width: '11%' }} src={img_new} />
                <label className="count-campaign">{getStatusCampaign.totalDraft}</label>
              </div>
            </Col>
          </Row>
          <br />
          <Row className="table-campaign-auto">
            <label className="total-campaign-table">{getStatusCampaign.total} chiến dịch</label>
            <Table responsive striped className="main-table">
              <thead>
                <th style={{ width: '4%' }} />
                <th style={{ width: '25%' }}>Chiến dịch</th>
                <th>Trạng thái</th>
                <th style={{ width: '25%' }}>Kết quả</th>
                <th>Chỉnh sửa gần nhất</th>
              </thead>
              <tbody>
                {list_campaign_auto
                  ? list_campaign_auto.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Checkbox />
                          </td>
                          <td className="table-content">
                            <a style={{ marginLeft: '5%' }} href="javascript:void(0);" onClick={() => this.viewVersion(event.cjVersionId)}>
                              {event.name}
                            </a>
                            <br />
                            <label style={{ marginLeft: '5%' }}>Version {event.version}</label>
                          </td>
                          <td className="row-status">
                            <img style={{ margin: '1% 2% 2% 40%' }} src={this.iconStatus(event.status)} />
                            {eventStatus(event.status)}
                          </td>
                          <td>
                            <Progress status="active" percent={10} format={percent => `${percent}/${event.contactNumbers} contact`} />
                          </td>
                          <td>{event.modifiedDate}</td>
                        </tr>
                      );
                    })
                  : ''}
              </tbody>
            </Table>
            <br />
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  getStatusCampaign: campaignManagament.statusCampaign,
  list_campaign_auto: campaignManagament.listCampaignAuto,
  list_clone_version: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  statusCampaign,
  getListCampaginAuto,
  cloneVersion,
  saveCampaignAutoVersion,
  getDiagramCampaign,
  getListCustomerVersionProcess
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaginAuto);
