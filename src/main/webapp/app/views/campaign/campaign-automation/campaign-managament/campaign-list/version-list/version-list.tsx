import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Row, Col, Breadcrumb, Button, Progress, Modal } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { saveCampaignAutoVersion, getListVersion } from 'app/actions/campaign-managament';
import './version-list.scss';
import { Container, Card, Table } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';

const constant_version = {
  DRAFT: 'Draft',
  FINISH: 'Finish',
  RUNNING: 'Running',
  STOP: 'Stop'
};

interface IVersionListProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}
interface IVersionListState {
  infoVersion: {
    nameVersion: string;
    idVersion: string;
    cjId: string;
  };
}
export class VersionList extends React.Component<IVersionListProps, IVersionListState> {
  state: IVersionListState = {
    infoVersion: {
      nameVersion: '',
      idVersion: '',
      cjId: ''
    }
  };

  componentDidMount() {
    const { campaign_list, getListVersion } = this.props;
    let data =
      campaign_list &&
      campaign_list
        .map(event => {
          if (event.cjVersionId === this.props.match.params.id) {
            return {
              nameVersion: event.name,
              idVersion: event.cjVersionId,
              cjId: event.id
            };
          }
        })
        .filter(Boolean);
    if (campaign_list === undefined) {
      window.location.assign('/#/app/views/campaigns/campaign-managament');
    } else {
      this.setState({ infoVersion: data[0] });
      getListVersion(data[0].cjId);
    }
  }

  createVersion = async () => {
    const { saveCampaignAutoVersion, list_version } = this.props;
    const { infoVersion } = this.state;
    let isHaveDraf = false;
    list_version.map(item => {
      if (item.status === constant_version.DRAFT) {
        isHaveDraf = true;
      }
    });
    if (isHaveDraf) {
      Modal.warning({
        title: 'THÔNG BÁO',
        content: 'Chiến dịch đã có bản nháp, không thể tạo version mới ',
        okText: 'Đồng ý'
      });
    } else {
      await saveCampaignAutoVersion(infoVersion);
      window.location.assign('/#/flow');
    }
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

  changeCheckBox = event => {
    console.log(event.target.value);
  };

  render() {
    let { infoVersion } = this.state;
    const { list_version } = this.props;
    const imgCopy = require('app/assets/utils/images/campaign-managament/copy-version.png');
    const imgDelete = require('app/assets/utils/images/campaign-managament/delete-version.png');
    const imgLine = require('app/assets/utils/images/campaign-managament/line-version.png');

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
      <div className="version">
        <Row className="header-row">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <a onClick={() => window.location.assign('/#/app/views/customers/user-management')} href="javascript:void(0);">
                <FontAwesomeIcon icon={faHome} />
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-auto')} href="javascript:void(0);">
                Chiến dịch tự động
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament')} href="javascript:void(0);">
                Danh sách chiến dịch
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament')} href="javascript:void(0);">
                {infoVersion.nameVersion}
              </a>
            </Breadcrumb.Item>

            <label className="ant-breadcrumb-link">Version</label>
          </Breadcrumb>
        </Row>
        <Container fluid className="container-version">
          <Card>
            <Row className="body-version">
              <Button type="link">
                {' '}
                <img src={imgCopy} />{' '}
              </Button>
              <Button type="link">
                <img src={imgDelete} />
              </Button>
              &nbsp; &nbsp;
              <img src={imgLine} />
              <Button onClick={this.createVersion} type="primary" style={{ background: '#3866DD', marginLeft: '2%' }}>
                Tạo version mới
              </Button>
              <Button type="primary" style={{ background: '#97A3B4', marginLeft: '1%' }}>
                Dừng version
              </Button>
            </Row>
            <br />
            <label className="count-version">{list_version.length} version</label>
            <Table responsive striped className="main-table-version">
              <thead>
                <th style={{ width: '4%' }} />
                <th style={{ width: '25%' }}>Chiến dịch</th>
                <th>Trạng thái</th>
                <th style={{ width: '25%' }}>Kết quả</th>
                <th>Chỉnh sửa gần nhất</th>
              </thead>
              <tbody>
                {list_version
                  ? list_version.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Checkbox
                              onChange={this.changeCheckBox}
                              value={event.cjVersionId}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                          </td>
                          <td className="table-content">
                            <a style={{ marginLeft: '5%' }} href="#/">
                              {event.name}
                            </a>
                            <br />
                            <label style={{ marginLeft: '5%' }}>Version {event.version}</label>
                          </td>
                          <td className="row-status">
                            <img className="img-status" src={this.iconStatus(event.status)} />
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
          </Card>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  campaign_list: campaignManagament.campaign.data,
  list_version: campaignManagament.listVersion
});

const mapDispatchToProps = {
  saveCampaignAutoVersion,
  getListVersion
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionList);
