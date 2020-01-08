import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { DiagramWidget } from 'storm-react-diagrams';
import { Translate, translate } from 'react-jhipster';
import Loader from 'react-loader-advanced';
import { Card, Table, CardBody } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { Row, Col, Input, Select, Button, Layout, Breadcrumb, Collapse, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {
  cloneVersion,
  getDiagramCampaign,
  getListCustomerVersionProcess,
  viewInteractive,
  stopVersion,
  cloneVersionById
} from 'app/actions/campaign-managament';
import { img_node, const_shape } from 'app/common/model/campaign-managament.model';
import LoaderAnim from 'react-loaders';
import ModalInteractive from './modal-interactive/modal-interactive';
import './details-flow.scss';
import { FlowDiagramEditor, GroupProcess } from '../flow-diagram-editor';

const { Panel } = Collapse;
const { Option } = Select;
const { Header } = Layout;
const { confirm } = Modal;
interface IFlowPageProps extends StateProps, DispatchProps { }
interface IFlowPageState {
  isOpenModal: boolean;
  active_page: number;
  itemsPerPage: number;
  idCjersion: string;
  textSearch: string;
}

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
export class FlowPage extends React.Component<IFlowPageProps, IFlowPageState> {
  state: IFlowPageState = {
    isOpenModal: false,
    active_page: 0,
    itemsPerPage: 0,
    idCjersion: '',
    textSearch: ''
  };
  editor: FlowDiagramEditor;

  componentWillMount() {
    let { listDiagram } = this.props;
    console.log('listDiagram', listDiagram);
    this.editor = new FlowDiagramEditor();
    this.editor.setDiagramData({
      nodes: listDiagram.nodes,
      edges: listDiagram.edges
    });
  }

  componentDidMount() {
    let { clone_version } = this.props;
    if (clone_version && Object.keys(clone_version).length < 1) {
      window.location.assign(`#/app/views/campaigns/campaign-managament`);
    }
  }

  selectVersion = async id => {
    const { cloneVersion, getListCustomerVersionProcess } = this.props;
    await cloneVersion(id);
    await this.cloneVersion();
    await getListCustomerVersionProcess('', id, 0);
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
            data = const_shape.CIRCLE;
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

  cloneVersion = async () => {
    let { clone_version, getDiagramCampaign } = this.props;
    let x: number = 0;
    let graph = clone_version.flowDetail.graph;
    let data = {
      nodes: graph.nodes.map(item => {
        x = x + 200;
        let countDataProcess = item.countAct ? `(${item.countAct})` : '';
        return {
          type: item.type,
          size: '95*95',
          shape: this.customNode(item.code, 'shape'),
          value: item.value,
          code: item.code,
          label: item.label + countDataProcess,
          backgroud: '#23C00A',
          emailConfig: item.emailConfig,
          smsConfig: item.smsConfig,
          color: '#1890FF',
          icon: this.customNode(item.code, 'icon'),
          labelOffsetY: 60,
          countAct: item.countAct,
          x: x,
          y: 140,
          id: item.id
        };
      }),
      edges: clone_version.flowDetail.graph.edges,
      groups: []
    };
    await getDiagramCampaign(data);
  };

  viewInteractive = async id => {
    let { isOpenModal } = this.state;
    const { viewInteractive } = this.props;
    this.setState({ isOpenModal: !isOpenModal });
    if (!isOpenModal) {
      await viewInteractive(id);
    }
  };
  handlePagination = activePage => {
    let { textSearch } = this.state;
    const { getListCustomerVersionProcess, infoVersion } = this.props;
    getListCustomerVersionProcess('', infoVersion.idVersion, activePage.selected);
  };

  search = event => {
    if (event.key === 'Enter') {
      const textSearch = event.target.value;
      const { active_page } = this.state;
      const { getListCustomerVersionProcess, infoVersion } = this.props;
      this.setState({
        ...this.state,
        textSearch,
        active_page: 0
      });
      this.props.getListCustomerVersionProcess(textSearch, infoVersion.idVersion, active_page);
    }
  };

  stopVersion = async () => {
    const { clone_version, stopVersion, cloneVersion } = this.props;
    if (clone_version.status === 'Running') {
      await stopVersion(clone_version.id);
      await cloneVersion(clone_version.id);
      await this.cloneVersion();
    } else {
      Modal.warning({
        title: 'Thông báo',
        content: 'Chỉ dừng version có trạng thái : Đang thực hiện',
        okText: 'Đồng ý'
      });
    }
  };
  createNewVersion = async () => {
    const { getDiagramCampaign, cloneVersionById, clone_version } = this.props;
    await cloneVersionById(clone_version.cjId)
    await window.location.assign(`#/flow`);
  };
  render() {
    const imgSetting = require('app/assets/utils/images/flow/setting.png');
    const img_history = require('app/assets/utils/images/flow/history.png');
    console.log(this.editor.getDiagramEngine());
    let {
      clone_version,
      listDiagram,
      list_version,
      countCustomerVersionProcess,
      infoVersion,
      loading,
      list_customer_version_process
    } = this.props;
    console.log(clone_version.name);

    let { isOpenModal } = this.state;
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
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Loader message={spinner1} show={loading} priority={1} style={{ overflow: 'auto' }}>
        <ModalInteractive onClick={this.viewInteractive} isOpenModal={isOpenModal} />
        <Layout style={{ minHeight: '200vh' }}>
          <Header className="header-flow" style={{ background: "#F9FAFB" }}>
            <Row>
              <Col span={24} className="titleContent-detail">
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

                  <label className="ant-breadcrumb-link">{clone_version.name}</label>
                </Breadcrumb>
              </Col>
            </Row>
          </Header>
          <Row className="editorHd-details">
            <Col span={24} style={{ padding: '1%' }}>
              <Col span={4}>
                <label>Phiên bản: </label>{' '}
                <Select onChange={this.selectVersion} style={{ width: '25%' }} defaultValue={clone_version.version}>
                  {list_version &&
                    list_version.map((item, index) => {
                      return (
                        <Option key={index} value={item.cjVersionId}>
                          {item.version}
                        </Option>
                      );
                    })}
                </Select>
              </Col>
              <Col span={8}>
                <label style={{ lineHeight: '2' }}>Trạng Thái : {eventStatus(clone_version.status)}</label>
              </Col>
              <Col span={7} style={{ textAlign: 'right' }}>
                <img src={imgSetting} />
              </Col>
              <Col span={4} style={{ float: 'right' }}>
                <Button
                  onClick={() => {
                    this.createNewVersion();
                  }}
                  type="primary"
                >
                  Tạo mới version
                </Button>
                <Button onClick={this.stopVersion} type="primary" style={{ background: '#97A3B4', borderColor: 'unset', float: 'right' }}>
                  Dừng version
                </Button>
              </Col>
            </Col>
          </Row>
          <Row style={{ padding: '0 1% 1% 1%' }}>
            <Card>
              <DiagramWidget className="srd-flow-canvas" diagramEngine={this.editor.getDiagramEngine()} smartRouting={false} />
            </Card>
          </Row>
          <Row style={{ padding: '0% 1% 1% 1%' }}>
            <Card className="table-process">
              <Collapse bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
                <Panel header="Lịch sử" key="1">
                  <CardBody className="card-body-details">
                    <label>{countCustomerVersionProcess} Bản ghi</label>
                    <Input
                      style={{ width: '20%', float: 'right', marginBottom: '1%' }}
                      type="text"
                      className="form-control"
                      onKeyDown={this.search}
                      placeholder={translate('userManagement.home.search-placer')}
                    />
                    <Table responsive striped className="main-table-version">
                      <thead>
                        <th />
                        <th>Tên</th>
                        <th>Họ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th />
                      </thead>
                      <tbody>
                        {list_customer_version_process &&
                          list_customer_version_process.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{item.state}</td>
                                <td>
                                  <img src={img_history} onClick={() => this.viewInteractive(item.processInstanceId)} />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                    <Row className="justify-content-center" style={{ float: 'right', marginTop: '1%' }}>
                      {countCustomerVersionProcess >= 5 ? (
                        <ReactPaginate
                          previousLabel={'<'}
                          nextLabel={'>'}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={Math.ceil(countCustomerVersionProcess / 10)}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={3}
                          onPageChange={this.handlePagination}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                          forcePage={this.state.active_page}
                        />
                      ) : (
                          ''
                        )}
                    </Row>
                  </CardBody>
                </Panel>
              </Collapse>
            </Card>
          </Row>
        </Layout>
      </Loader>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  infoCampaign: campaignManagament.listInfoCampaing,
  listDiagram: campaignManagament.listDiagram,
  listFieldData: campaignManagament.listFieldData,
  infoVersion: campaignManagament.infoVersion,
  list_version: campaignManagament.listVersion,
  clone_version: campaignManagament.cloneInfoVersion,
  list_customer_version_process: campaignManagament.listCustomerVersionProcess,
  countCustomerVersionProcess: campaignManagament.countCustomerVersionProcess
});

const mapDispatchToProps = {
  cloneVersion,
  getDiagramCampaign,
  getListCustomerVersionProcess,
  viewInteractive,
  stopVersion,
  cloneVersionById
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlowPage);
