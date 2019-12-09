import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Table, Progress } from 'reactstrap';
import { Row, Col, Button, Input, Popover, Icon, Modal, Checkbox } from 'antd';
import $ from 'jquery';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import { statusCampaign, getListCampaginAuto } from 'app/actions/campaign-managament';
import './campaign-automation.scss';

const { confirm } = Modal;

export interface ICampaginAutoProps extends StateProps, DispatchProps {}

export interface ICampaginAutoState {}

class CampaginAuto extends React.Component<ICampaginAutoProps, ICampaginAutoState> {
  state: ICampaginAutoState = {
    hover: false,
    idTree: ''
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

  render() {
    let { getStatusCampaign, list_campaign_auto } = this.props;
    const img = require('app/assets/utils/images/campaign-managament/count_campaign.png');
    const img_campaign_running = require('app/assets/utils/images/campaign-managament/campaign_running.png');
    const img_finish = require('app/assets/utils/images/campaign-managament/campaign_finish.png');
    const img_new = require('app/assets/utils/images/campaign-managament/campaign_new.png');

    return (
      <Fragment>
        <div id="campaing-auto">
          <Row id="title-campaign-auto">
            <Col span={11} style={{ paddingTop: '14px', margin: '0px 12px' }}>
              Chiến dịch tự động
            </Col>
            <Col span={12} style={{ textAlign: 'right', margin: '10px' }}>
              <Button type="primary" onClick={this.movePage}>
                Quản lý Chiến dịch
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
                <th>Kết quả</th>
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
                            <a style={{ marginLeft: '5%' }} href="#/">
                              {event.name}
                            </a>
                            <br />
                            <label style={{ marginLeft: '5%' }}>Version {event.version}</label>
                          </td>
                          <td className="row-status">
                            <img style={{ margin: '1% 2% 2% 40%' }} src={this.iconStatus(event.status)} />
                            {event.status}
                          </td>
                          <td>
                            <Progress value={event.contactNumbers} max={event.contactNumbers} />
                            {event.contactNumbers}
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
  list_campaign_auto: campaignManagament.listCampaignAuto
});

const mapDispatchToProps = { openModal, closeModal, statusCampaign, getListCampaginAuto };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaginAuto);
