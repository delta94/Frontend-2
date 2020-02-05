import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Progress } from 'reactstrap';
import { Row, Col, Breadcrumb, Button, Modal, Checkbox } from 'antd';
// import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { img_node, const_shape } from 'app/common/model/campaign-managament.model';
import Loader from 'react-loader-advanced';
import LoaderAnim from 'react-loaders';
import {
  saveCampaignAutoVersion,
  getListVersion,
  cloneVersion,
  deleteVersion,
  stopVersion,
  getDiagramCampaign,
  getListCustomerVersionProcess,
  cloneVersionById,
  copyCJCampaign,
  resetListCloneVersion
} from 'app/actions/campaign-managament';
import './version-list.scss';
import { Container, Card, Table } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { translate, Translate } from 'react-jhipster';

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
    const { campaign_list, getListVersion, resetListCloneVersion } = this.props;
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
    await resetListCloneVersion();
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
    const { saveCampaignAutoVersion, cloneVersionById, cloneVersion } = this.props;
    const { infoVersion, listVersion } = this.state;
    infoVersion.type = 'create';
    let isHaveDraf = false;
    let idDraft: string = '';
    listVersion.map(item => {
      if (item.status === constant_version.DRAFT) {
        isHaveDraf = true;
        idDraft = item.cjVersionId;
      }
    });
    let idVersionlast: string = '';
    let versionLast: number = 0;
    listVersion.map(item => {
      if (item.status != constant_version.DRAFT) {
        if (item.version > versionLast) {
          versionLast = item.version;
          idVersionlast = item.id;
        }
      }
    });

    if (isHaveDraf) {
      Modal.confirm({
        title: translate('campaign-auto.modal.title-notification'),
        content: translate('campaign-auto.modal.content-have-draft'),
        onCancel: () => {},
        onOk: async () => {
          await cloneVersion(idDraft);
          await this.cloneVersion('flow');
          await saveCampaignAutoVersion(infoVersion);
          window.location.assign('#/flow');
        },
        okText: translate('campaign-auto.modal.ok-submit-text'),
        cancelText: translate('campaign-auto.modal.cancel')
      });
    } else {
      await cloneVersionById(idVersionlast);
      await this.cloneVersion('flow');
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
        title: translate('campaign-auto.modal.title-error'),
        content: `Version ${nameVersion}` + translate('campaign-auto.modal.content-error-running'),
        okText: translate('campaign-auto.modal.ok-submit-text')
      });
    } else {
      confirm({
        title: translate('campaign-auto.modal.title-delete-version'),
        content: '',
        onOk: async () => {
          await deleteVersion(listCjId);
          this.refresh();
        },
        onCancel() {},
        okText: translate('campaign-auto.modal.ok-submit-text'),
        cancelText: translate('campaign-auto.modal.cancel')
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
            if (item.status === constant_version.RUNNING) {
              isRunning = true;
              nameVersion = item.version;
            }
          }
        });
      });
      this.handleDelete(isRunning, nameVersion, listCjId);
    } else {
      Modal.warning({
        title: translate('campaign-auto.modal.title-notification'),
        content: translate('campaign-auto.modal.content-delete-version-warning'),
        okText: translate('campaign-auto.modal.ok-submit-text')
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
          title: translate('campaign-auto.modal.title-stop-version') + ` ${nameVersion} ?`,
          content: '',
          onOk: async () => {
            await stopVersion(idVersion);
            this.refresh();
          },
          onCancel() {},
          okText: translate('campaign-auto.modal.ok-submit-text'),
          cancelText: translate('campaign-auto.modal.cancel')
        });
      } else {
        Modal.warning({
          title: translate('campaign-auto.modal.title-notification'),
          content: translate('campaign-auto.modal.content-version-running'),
          okText: translate('campaign-auto.modal.ok-submit-text')
        });
      }
    } else {
      Modal.warning({
        title: translate('campaign-auto.modal.title-notification'),
        content: translate('campaign-auto.modal.stop-one-version'),
        okText: translate('campaign-auto.modal.ok-submit-text')
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
            if (item.status === constant_version.RUNNING) {
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
        title: translate('campaign-auto.modal.title-notification'),
        content: translate('campaign-auto.modal.click-version'),
        okText: translate('campaign-auto.modal.ok-submit-text')
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

  copyVersion = () => {
    let { cloneVersionById, saveCampaignAutoVersion, copyCJCampaign } = this.props;
    let { listCjId } = this.state;
    let idVersionlast: string = '';
    let { listVersion, infoVersion } = this.state;
    listVersion.map(item => {
      if (item.cjVersionId === listCjId[0]) {
        idVersionlast = item.id;
      }
    });
    if (idVersionlast) {
      confirm({
        title: translate('campaign-auto.modal.title-copy'),
        content: '',
        onOk: async () => {
          await copyCJCampaign(idVersionlast);
          await this.cloneVersion('copy');
          await saveCampaignAutoVersion(infoVersion);
          window.location.assign(`#/flow`);
        },
        onCancel() {},
        okText: translate('campaign-auto.modal.ok-submit-text'),
        cancelText: translate('campaign-auto.modal.cancel')
      });
    } else {
      Modal.warning({
        title: translate('campaign-auto.modal.title-notification'),
        content: translate('campaign-auto.modal.cannot-copy'),
        okText: translate('campaign-auto.modal.ok-submit-text')
      });
    }
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

  countContact = (contactCompleted, allContact) => {
    let result: number = 0;
    if (allContact === 0) {
      return result;
    } else {
      result = (contactCompleted / allContact) * 100;
    }
    return result;
  };

  render() {
    let { infoVersion, listVersion, listCjId } = this.state;
    const imgCopy = require('app/assets/utils/images/campaign-managament/copy-version.png');
    const imgDelete = require('app/assets/utils/images/campaign-managament/delete-version.png');
    const imgLine = require('app/assets/utils/images/campaign-managament/line-version.png');
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    const eventStatus = option => {
      let data;

      switch (option) {
        case constant_version.DRAFT:
          data = translate('status.draft');
          break;
        case constant_version.FINISH:
          data = translate('status.finish');
          break;
        case constant_version.RUNNING:
          data = translate('status.running');
          break;
        case constant_version.STOP:
          data = translate('status.stop');
        default:
          break;
      }
      return data;
    };
    return (
      <Loader message={spinner1} show={this.props.loading} priority={1}>
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
                  <Translate contentKey="campaign-auto.title" />
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament')} href="javascript:void(0);">
                  <Translate contentKey="campaign-auto.managament.list-campaign" />
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
                <Button disabled={listCjId.length === 1 ? false : true} onClick={this.copyVersion} type="link">
                  {' '}
                  <img src={imgCopy} />{' '}
                </Button>
                <Button onClick={this.deleteVersion} type="link">
                  <img src={imgDelete} />
                </Button>
                &nbsp; &nbsp;
                <img src={imgLine} />
                <Button onClick={this.createVersion} type="primary" style={{ background: '#3866DD', marginLeft: '2%' }}>
                  <Translate contentKey="campaign-auto.version.create" />
                </Button>
                <Button
                  onClick={this.handleStopVersion}
                  type="primary"
                  style={{ background: '#97A3B4', marginLeft: '1%', borderColor: 'unset' }}
                >
                  <Translate contentKey="campaign-auto.version.stop" />
                </Button>
              </Row>
              <br />
              <label className="count-version">
                {listVersion.length} <Translate contentKey="campaign-auto.table.version" />
              </label>
              <Table responsive striped className="main-table-version">
                <thead>
                  <th style={{ width: '4%' }} />
                  <th style={{ width: '25%' }}>
                    {' '}
                    <Translate contentKey="campaign-auto.table.version" />
                  </th>
                  <th>
                    {' '}
                    <Translate contentKey="campaign-auto.table.status" />
                  </th>
                  <th style={{ width: '20%' }}>
                    {' '}
                    <Translate contentKey="campaign-auto.table.result" />
                  </th>
                  <th>
                    {' '}
                    <Translate contentKey="campaign-auto.table.last-edit" />
                  </th>
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
                              <span style={{ marginLeft: '5%' }}>
                                <Translate contentKey="campaign-auto.table.version" /> {item.version}
                              </span>
                            </td>
                            <td className="row-status">
                              <img className="img-status" src={this.iconStatus(item.status)} />
                              {eventStatus(item.status)}
                            </td>
                            <td>
                              <Progress
                                animated
                                color={this.countContact(item.contactCompleted, item.contactNumbers) < 100 ? 'warning' : 'success'}
                                value={this.countContact(item.contactCompleted, item.contactNumbers)}
                              >
                                <label className="text-process" style={{ color: ' #6C757D', marginTop: '9px' }}>
                                  {item.contactCompleted}/{item.contactNumbers} contact
                                </label>
                              </Progress>
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
      </Loader>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  campaign_list: campaignManagament.campaign.data,
  list_version: campaignManagament.listVersion,
  list_clone_version: campaignManagament.cloneInfoVersion,
  loading: campaignManagament.loading
});

const mapDispatchToProps = {
  saveCampaignAutoVersion,
  getListVersion,
  deleteVersion,
  stopVersion,
  cloneVersion,
  getDiagramCampaign,
  getListCustomerVersionProcess,
  cloneVersionById,
  copyCJCampaign,
  resetListCloneVersion
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VersionList);
