import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Table } from 'reactstrap';
import { Row, Col, Button, Input, Popover, Icon, Modal, Checkbox } from 'antd';
import { Progress } from 'reactstrap';
import $ from 'jquery';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import ReactPaginate from 'react-paginate';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import {
  statusCampaign,
  getListCampaginAuto,
  cloneVersion,
  saveCampaignAutoVersion,
  getListCustomerVersionProcess,
  getDiagramCampaign,
  validateCampaign
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

export interface ICampaginAutoProps extends StateProps, DispatchProps { }

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
  activePage: number;
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
    },
    activePage: 0
  };

  componentDidMount = async () => {
    const { statusCampaign, getListCampaginAuto } = this.props;
    await statusCampaign();
    await getListCampaginAuto('', 0, 5);
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
      case constant_version.DRAFT:
        img = img_draf;
        break;
      case constant_version.FINISH:
        img = img_finish;
        break;
      case constant_version.RUNNING:
        img = img_running;
        break;
      case constant_version.STOP:
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

        return {
          type: item.type,
          size: '95*95',
          shape: this.customNode(item.code, 'shape'),
          value: item.value,
          code: item.code,
          label: item.label,
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
    infoVersion.type = 'copy'
    await cloneVersion(id);
    await validateCampaign([])
    await this.cloneVersion('view');
    await saveCampaignAutoVersion(infoVersion);
    await getListCustomerVersionProcess('', id, 0);
  };

  countContact = (contactCompleted, allContact) => {
    let result: number = 0;
    if (allContact === 0) {
      return result;
    } else {
      result = (contactCompleted / allContact) * 100;
    }
    return result;
  };

  setPageIndex = pageIndex => {
    const { getListCampaginAuto } = this.props;
    this.setState({ activePage: parseInt(pageIndex) });
    getListCampaginAuto('', parseInt(pageIndex), 5);
  };

  render() {
    let { getStatusCampaign, list_campaign_auto, loading } = this.props;
    const img = require('app/assets/utils/images/campaign-managament/count_campaign.png');
    const img_campaign_running = require('app/assets/utils/images/campaign-managament/campaign_running.png');
    const img_campaign_stop = require('app/assets/utils/images/campaign-managament/campaign_stop.png');
    const img_finish = require('app/assets/utils/images/campaign-managament/campaign_finish.png');
    const img_new = require('app/assets/utils/images/campaign-managament/campaign_new.png');
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    const eventStatus = option => {
      let data;

      switch (option) {
        case constant_version.DRAFT:
          data = translate('status.draft');
          break;
        case constant_version.FINISH:
          data = translate("status.finish");
          break;
        case constant_version.RUNNING:
          data = translate("status.running");
          break;
        case constant_version.STOP:
          data = translate("status.stop");
        default:
          break;
      }
      return data;
    };

    return (
      <Loader message={spinner1} show={loading} priority={1}>
        <Fragment>
          <div id="campaing-auto">
            <Row id="title-campaign-auto">
              <Col span={11} style={{ paddingTop: '14px', margin: '0px 12px' }}>
                <Translate contentKey="campaign-auto.title" />
              </Col>
              <Col span={12} style={{ textAlign: 'right', margin: '10px' }}>
                <Button type="primary" onClick={this.movePage}>
                  <Translate contentKey="campaign-auto.btn-campaign" />
                </Button>
              </Col>
            </Row>
          </div>
          <div className="body-campaign-auto">
            <Row gutter={16}>
              <Col className="gutter-row" span={4} style={{width:'20%'}}>
                <div className="gutter-box top">
                  <label className="text"><Translate contentKey="campaign-auto.total-campaign" /></label>
                </div>
                <div className="gutter-box below">
                  <img style={{ margin: '0px 32px 17px' }} src={img} />
                  <label className="count-campaign">{getStatusCampaign.total}</label>
                </div>
              </Col>
              <Col className="gutter-row" span={4} style={{width:'20%'}}>
                <div className="gutter-box top">
                  <label className="text"><Translate contentKey="campaign-auto.campaign-running" /></label>
                </div>
                <div className="gutter-box below">
                  <img style={{ margin: '0px 32px 17px', width: '11%' }} src={img_campaign_running} />
                  <label className="count-campaign">{getStatusCampaign.totalRunning}</label>
                </div>
              </Col>
              <Col className="gutter-row" span={4} style={{width:'20%'}}>
                <div className="gutter-box top">
                  <label className="text"><Translate contentKey="campaign-auto.campaign-stop" /></label>
                </div>
                <div className="gutter-box below">
                  <img style={{ margin: '0px 32px 17px', width: '11%' }} src={img_campaign_stop} />
                  <label className="count-campaign">{getStatusCampaign.totalStop}</label>
                </div>
              </Col>
              <Col className="gutter-row" span={4} style={{width:'20%'}}>
                <div className="gutter-box top">
                  <label className="text"><Translate contentKey="campaign-auto.campaign-finish" /></label>
                </div>
                <div className="gutter-box below">
                  <img style={{ margin: '0px 32px 17px', width: '11%' }} src={img_finish} />
                  <label className="count-campaign">{getStatusCampaign.totalFinish}</label>
                </div>
              </Col>
              <Col className="gutter-row" span={4} style={{width:'20%'}}>
                <div className="gutter-box top">
                  <label className="text"><Translate contentKey="campaign-auto.campaign-new" /></label>
                </div>
                <div className="gutter-box below">
                  <img style={{ margin: '0px 32px 17px', width: '11%' }} src={img_new} />
                  <label className="count-campaign">{getStatusCampaign.totalDraft}</label>
                </div>
              </Col>
            </Row>
            <br />
            <Row className="table-campaign-auto">
              <label className="total-campaign-table"> <Translate contentKey="campaign-auto.count-campaign" interpolate={{ element: getStatusCampaign.total }} /></label>
              <Table responsive striped className="main-table">
                <thead>
                  <th style={{ width: '4%' }}><Translate contentKey="campaign-auto.table.index" /></th>
                  <th style={{ width: '25%' }}><Translate contentKey="campaign-auto.table.campaign" /></th>
                  <th><Translate contentKey="campaign-auto.table.status" /></th>
                  <th style={{ width: '20%' }}><Translate contentKey="campaign-auto.table.result" /></th>
                  <th><Translate contentKey="campaign-auto.table.last-edit" /></th>
                </thead>
                <tbody>
                  {list_campaign_auto && list_campaign_auto.length > 0
                    ? list_campaign_auto.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td>{this.state.activePage * 5 + index + 1}</td>
                          <td className="table-content">
                            <a
                              style={{ marginLeft: '5%' }}
                              href="javascript:void(0);"
                              onClick={() => this.viewVersion(event.cjVersionId)}
                            >
                              {event.name}
                            </a>
                            <br />
                            <label style={{ marginLeft: '5%' }}><Translate contentKey="campaign-auto.table.version" /> {event.version}</label>
                          </td>
                          <td className="row-status">
                            <img style={{ margin: '1% 2% 2% 40%' }} src={this.iconStatus(event.status)} />
                            {eventStatus(event.status)}
                          </td>
                          <td>
                            <Progress
                              animated
                              color={this.countContact(event.contactCompleted, event.contactNumbers) < 100 ? "warning" : "success"}
                              value={this.countContact(event.contactCompleted, event.contactNumbers)}
                            ><label className = "text-process" style ={{color :" #6C757D", marginTop : "9px"}}> {event.contactCompleted}/{event.contactNumbers} contact </label></Progress>
                          </td>
                          <td>{event.modifiedDate}</td>
                        </tr>
                      );
                    })
                    : ''}
                </tbody>
              </Table>
              <br />
              <div className="navigation1">
                {getStatusCampaign.total && parseInt(getStatusCampaign.total) >= 4 ? (
                  <Row className="justify-content-center" style={{ float: 'right', marginRight: '1%' }}>
                    <ReactPaginate
                      previousLabel={'<'}
                      nextLabel={'>'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(parseInt(getStatusCampaign.total) / 5)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={event => this.setPageIndex(event.selected)}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                    />
                  </Row>
                ) : (
                    ''
                  )}
              </div>
              <br />
            </Row>
          </div>
        </Fragment>
      </Loader>
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
  getListCustomerVersionProcess,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CampaginAuto);
