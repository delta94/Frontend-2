import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Table } from 'reactstrap';
import { Row, Col, Button, Input, Popover, Icon, Modal } from 'antd';
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

  render() {
    let { getStatusCampaign, list_campaign_auto } = this.props;
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
            <Col className="gutter-row" span={6} style={{ textAlign: 'center' }}>
              <div className="gutter-box">Tổng số chiến dịch</div>
              <div className="gutter-box">{getStatusCampaign.total}</div>
            </Col>
            <Col className="gutter-row" span={6} style={{ textAlign: 'center' }}>
              <div className="gutter-box">Chiến dịch đang thực hiện</div>
              <div className="gutter-box">{getStatusCampaign.totalRunning}</div>
            </Col>
            <Col className="gutter-row" span={6} style={{ textAlign: 'center' }}>
              <div className="gutter-box">Chiến dịch kết thúc</div>
              <div className="gutter-box">{getStatusCampaign.totalFinish}</div>
            </Col>
            <Col className="gutter-row" span={6} style={{ textAlign: 'center' }}>
              <div className="gutter-box">Chiến dịch mới</div>
              <div className="gutter-box">{getStatusCampaign.totalDraft}</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Table responsive striped>
              <thead>
                <th>Số thứ tự</th>
                <th>Chiến dịch</th>
                <th>Trạng thái</th>
                <th>Kết quả</th>
                <th>Chỉnh sửa gần nhất</th>
              </thead>
              <tbody>
                {list_campaign_auto
                  ? list_campaign_auto.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>
                            <a href="#/">{event.name}</a>
                            <p>Version {event.version}</p>
                          </td>
                          <td>{event.status}</td>
                          <td>{event.contactNumbers}</td>
                          <td>{event.modifiedDate}</td>
                        </tr>
                      );
                    })
                  : ''}
              </tbody>
            </Table>
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
