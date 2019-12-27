import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Row, Col, Breadcrumb, Button, Progress, Modal, Checkbox } from 'antd';
// import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { img_node, const_shape } from 'app/common/model/campaign-managament.model';
import {
  saveCampaignAutoVersion,
  getListVersion,
  cloneVersion,
  deleteVersion,
  stopVersion,
  getDiagramCampaign,
  getListCustomerVersionProcess
} from 'app/actions/campaign-managament';
import './version-list.scss';
import { Container, Card, Table } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';

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

interface IVersionListProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}
interface IVersionListState {
  infoVersion: {
    type: string;
    nameVersion: string;
    idVersion: string;
    cjId: string;
    status: string;
  };
  listCjId: any[];
  listVersion: any[];
}
export class VersionList extends React.Component<IVersionListProps, IVersionListState> {
  state: IVersionListState = {
    infoVersion: {
      type: '',
      nameVersion: '',
      idVersion: '',
      cjId: '',
      status: ''
    },
    listCjId: [],
    listVersion: []
  };

  componentDidMount = async () => {
    const { campaign_list, getListVersion } = this.props;
    let data =
      campaign_list &&
      campaign_list
        .map(event => {
          if (event.cjVersionId === this.props.match.params.id) {
            return {
              type: 'copy',
              nameVersion: event.name,
              idVersion: event.cjVersionId,
              cjId: event.id,
              status: event.status
            };
          }
        })
        .filter(Boolean);
    if (campaign_list === undefined || data[0] === undefined) {
      window.location.assign('/#/app/views/campaigns/campaign-managament');
    } else {
      this.setState({ infoVersion: data[0] });
      await getListVersion(data[0].cjId);
      this.customListVersion();
    }
  };

  // render component when props change
  componentWillReceiveProps(props) {
    let { listVersion } = this.state;
    if (listVersion != props.list_version) {
      this.setState({
        listVersion: props.list_version.map(event => {
          return {
            ...event,
            checked: false
          };
        }),
        listCjId: []
      });
    }
  }

  customListVersion = () => {
    const { list_version } = this.props;
    this.setState({
      listVersion:
        list_version &&
        list_version.map(item => {
          return {
            ...item,
            checked: false
          };
        })
    });
  };

  createVersion = async () => {
    const { saveCampaignAutoVersion, getDiagramCampaign } = this.props;
    const { infoVersion, listVersion } = this.state;
    let isHaveDraf = false;
    listVersion.map(item => {
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
      await getDiagramCampaign([]);
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

  filterID = (isCheck, value) => {
    let { listCjId } = this.state;
    if (isCheck) {
      listCjId.push(value);
    } else {
      listCjId = listCjId.filter(function(item) {
        return item != value;
      });
    }
    this.setState({ listCjId });
  };

  changeCheckBox = (event, value) => {
    let isCheck: boolean = event.target.checked;
    let { listVersion } = this.state;
    listVersion &&
      listVersion.map(item => {
        if (item.cjVersionId === value) {
          item.checked = isCheck;
        }
      });
    this.setState({ listVersion });
    this.filterID(isCheck, value);
  };

  //delete version if version another version running
  handleDelete = (isRunning, nameVersion, listCjId) => {
    const { deleteVersion } = this.props;
    if (isRunning) {
      Modal.error({
        title: 'Lỗi',
        content: `Version${nameVersion} đang thực hiện không thể xóa`,
        okText: 'Đồng ý'
      });
    } else {
      confirm({
        title: 'Bạn có thực sự muốn xóa version này ?',
        content: '',
        onOk: async () => {
          await deleteVersion(listCjId);
          this.refresh();
        },
        onCancel() {},
        okText: 'Đồng ý',
        cancelText: 'Hủy bỏ'
      });
    }
  };

  deleteVersion = () => {
    let { listVersion } = this.state;
    let isRunning: boolean = false;
    let nameVersion: number;
    let { listCjId } = this.state;
    if (listCjId && listCjId.length > 0) {
      listCjId.map(event => {
        listVersion.map(item => {
          if (item.cjVersionId === event) {
            if (item.status === 'Running') {
              isRunning = true;
              nameVersion = item.version;
            }
          }
        });
      });
      this.handleDelete(isRunning, nameVersion, listCjId);
    } else {
      Modal.warning({
        title: 'Thông báo',
        content: 'Vui lòng chọn ô cần xóa',
        okText: 'Đồng ý'
      });
    }
  };

  //refresh page
  refresh = async () => {
    const { getListVersion } = this.props;
    let { infoVersion } = this.state;
    await getListVersion(infoVersion.cjId);
  };

  //handle validate for Stop version
  validateStopVersion = (isRunning, nameVersion, idVersion) => {
    const { stopVersion } = this.props;
    let { listCjId } = this.state;
    if (listCjId && listCjId.length === 1) {
      if (isRunning) {
        confirm({
          title: `Bạn có thực sự muốn dừng version ${nameVersion} này ?`,
          content: '',
          onOk: async () => {
            await stopVersion(idVersion);
            this.refresh();
          },
          onCancel() {},
          okText: 'Đồng ý',
          cancelText: 'Hủy bỏ'
        });
      } else {
        Modal.warning({
          title: 'Thông báo',
          content: 'Vui lòng chọn version có trạng thái đang thực hiện',
          okText: 'Đồng ý'
        });
      }
    } else {
      Modal.warning({
        title: 'Thông báo',
        content: 'Chỉ được phép dừng 1 version',
        okText: 'Đồng ý'
      });
    }
  };

  handleStopVersion = () => {
    let { listVersion } = this.state;
    let isRunning: boolean = false;
    let nameVersion: number;
    let idVersion: string;
    let { listCjId } = this.state;
    if (listCjId && listCjId.length > 0) {
      listCjId.map(event => {
        listVersion.map(item => {
          if (item.cjVersionId === event) {
            if (item.status === 'Running') {
              isRunning = true;
              idVersion = item.cjVersionId;
              nameVersion = item.version;
            }
          }
        });
      });
      this.validateStopVersion(isRunning, nameVersion, idVersion);
    } else {
      Modal.warning({
        title: 'Thông báo',
        content: 'Vui lòng chọn version bạn muốn dừng',
        okText: 'Đồng ý'
      });
    }
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

  copyVersion = () => {
    debugger;
    let { cloneVersion, saveCampaignAutoVersion } = this.props;
    let versionLast: number = 0;
    let idVersionlast: string = '';
    let { listVersion, infoVersion } = this.state;
    listVersion.map(item => {
      if (item.status != constant_version.DRAFT) {
        if (item.version > versionLast) {
          versionLast = item.version;
          idVersionlast = item.cjVersionId;
        }
      }
    });
    if (idVersionlast) {
      confirm({
        title: `Bạn có muốn nhân bản chiến dịch này ?`,
        content: '',
        onOk: async () => {
          await cloneVersion(idVersionlast);
          await this.cloneVersion('copy');
          await saveCampaignAutoVersion(infoVersion);
          window.location.assign(`#/flow`);
        },
        onCancel() {},
        okText: 'Đồng ý',
        cancelText: 'Hủy bỏ'
      });
    }
  };

  viewVersion = async id => {
    let { infoVersion } = this.state;
    const { cloneVersion, saveCampaignAutoVersion, getListCustomerVersionProcess, list_clone_version } = this.props;
    infoVersion.idVersion = id;
    await cloneVersion(id);
    await this.cloneVersion('view');
    await saveCampaignAutoVersion(infoVersion);
    await getListCustomerVersionProcess('', id, 0);
  };

  render() {
    let { infoVersion, listVersion } = this.state;
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
          <Card style={{ height: '650px' }}>
            <Row className="body-version">
              <Button onClick={this.copyVersion} type="link">
                {' '}
                <img src={imgCopy} />{' '}
              </Button>
              <Button onClick={this.deleteVersion} type="link">
                <img src={imgDelete} />
              </Button>
              &nbsp; &nbsp;
              <img src={imgLine} />
              <Button onClick={this.createVersion} type="primary" style={{ background: '#3866DD', marginLeft: '2%' }}>
                Tạo version mới
              </Button>
              <Button
                onClick={this.handleStopVersion}
                type="primary"
                style={{ background: '#97A3B4', marginLeft: '1%', borderColor: 'unset' }}
              >
                Dừng version
              </Button>
            </Row>
            <br />
            <label className="count-version">{listVersion.length} version</label>
            <Table responsive striped className="main-table-version">
              <thead>
                <th style={{ width: '4%' }} />
                <th style={{ width: '25%' }}>Version</th>
                <th>Trạng thái</th>
                <th style={{ width: '25%' }}>Kết quả</th>
                <th>Chỉnh sửa gần nhất</th>
              </thead>
              <tbody>
                {listVersion
                  ? listVersion.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Checkbox checked={item.checked} onChange={e => this.changeCheckBox(e, item.cjVersionId)} />
                          </td>
                          <td className="table-content" onClick={() => this.viewVersion(item.cjVersionId)}>
                            <label style={{ marginLeft: '5%' }}>Version {item.version}</label>
                          </td>
                          <td className="row-status">
                            <img className="img-status" src={this.iconStatus(item.status)} />
                            {eventStatus(item.status)}
                          </td>
                          <td>
                            <Progress status="active" percent={10} format={percent => `${percent}/${item.contactNumbers} contact`} />
                          </td>
                          <td>{item.modifiedDate}</td>
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
  list_version: campaignManagament.listVersion,
  list_clone_version: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  saveCampaignAutoVersion,
  getListVersion,
  deleteVersion,
  stopVersion,
  cloneVersion,
  getDiagramCampaign,
  getListCustomerVersionProcess
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionList);
