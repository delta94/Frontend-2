import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Badge, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { updateCjTagsAction, getCjTagsByCjIdAction } from 'app/actions/cj';
import CjTagInsertModal from 'app/views/campaign/campaign-automation/campaign-managament/campaign-list/cj-tag-modal/insert-cj-tag-modal/cj-tag-insert-modal';
import CjTagListModal from 'app/views/campaign/campaign-automation/campaign-managament/campaign-list/cj-tag-modal/list-cj-tag-modal/cj-tag-list-modal';
import ReactPaginate from 'react-paginate';
import {
  getListCampaignInfolderDataAction,
  cloneVersion,
  getDiagramCampaign,
  saveCampaignAutoVersion,
  getListCustomerVersionProcess
} from 'app/actions/campaign-managament';
import './campaign-list.scss';
import { Input, Icon, Row, Col, Tag, Button, Popover as PopverAnt, Progress } from 'antd';
import CampaignTag from './campaign-tag/campaign-tag';
import CjTagModal from './cj-tag-modal/cj-tag-modal';
import { STATUS_CJ } from 'app/constants/cj';
import { img_node, const_shape } from 'app/common/model/campaign-managament.model';
import CJTagPopOver from './cj-popup/cj-popover';

interface ICampaignListProps extends StateProps, DispatchProps {
  folder_id_choose?: string;
}

interface ICampaignListState {
  activePage: number;
  itemsPerPage: number;
  textSearch?: string;
  strTagId?: string;
  openModalCjTag?: boolean;
  cjEdit: {
    cjId?: string;
    cjTags?: any[];
  };
  list_camp: any[];
  visible: boolean;
  isOpenModalInsert: boolean;
  id: string;
  list_tag: any[];
  isOpenModalList: boolean;
  list_tag_default: any[];
}

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

class CampaignList extends React.Component<ICampaignListProps, ICampaignListState> {
  state: ICampaignListState = {
    activePage: 0,
    itemsPerPage: 4,
    textSearch: '',
    strTagId: '',
    openModalCjTag: false,
    cjEdit: {
      cjTags: [],
      cjId: '-1'
    },
    list_camp: [],
    visible: false,
    isOpenModalInsert: false,
    id: '',
    list_tag: [],
    isOpenModalList: false,
    list_tag_default: []
  };

  componentDidMount() {
    let { strTagId, textSearch, activePage, itemsPerPage } = this.state;
    let folderId = this.props.folder_id_choose;
    this.getListCampaignInfolderDataAction(folderId ? folderId : '-99', textSearch, strTagId, activePage, itemsPerPage);
  }

  componentWillReceiveProps(nextProps) {
    let { list_camp } = this.state;
    if (list_camp != nextProps.campaign_list) {
      list_camp = nextProps.campaign_list;
      if (list_camp && list_camp.length > 0) {
        list_camp.map(event => {
          return {
            ...event,
            check: false
          };
        });
      }
    }

    this.setState({ list_camp });
  }

  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = async (visible, id) => {
    let { list_camp } = this.state;
    if (visible) {
      await this.props.getCjTagsByCjIdAction(id);
    }
    list_camp &&
      list_camp.map(event => {
        if (event.id === id) {
          event.check = visible;
        }
      });
    this.setState({ visible, list_camp, list_tag_default: this.props.valueComboTag });
  };

  getListCampaignInfolderDataAction = (folderId, textSearch, strTagId, pageIndex, pageSize) => {
    this.props.getListCampaignInfolderDataAction(folderId ? folderId : '-99', textSearch, strTagId, pageIndex, pageSize);
  };

  onchangeTextSearch = event => {
    this.setState({
      textSearch: event.target.value
    });
  };

  setPageIndex = pageIndex => {
    let { strTagId, textSearch, itemsPerPage } = this.state;
    let folderId = this.props.folder_id_choose;
    this.setState({ activePage: parseInt(pageIndex) });
    this.getListCampaignInfolderDataAction(folderId ? folderId : '-99', textSearch, strTagId, parseInt(pageIndex), itemsPerPage);
  };

  handleChange = cjTags => {
    let cjTagIds = cjTags.map((item, index) => item.id);
    let folderId = this.props.folder_id_choose;
    const { textSearch, activePage, itemsPerPage } = this.state;
    this.setState({
      strTagId: cjTagIds.join(),
      list_tag: cjTags
    });
    this.props.getListCampaignInfolderDataAction(folderId ? folderId : '-99', textSearch, cjTagIds.join(), activePage, itemsPerPage);
  };

  getCjs = () => {
    let { activePage, itemsPerPage, id } = this.state;
    let folderId = this.props.folder_id_choose;
    this.getListCampaignInfolderDataAction(folderId, '', '', activePage, itemsPerPage);
  };

  getCjsCallBack = folderId => {
    let { activePage, itemsPerPage } = this.state;
    this.getListCampaignInfolderDataAction(folderId ? folderId : '-99', '', '', activePage, itemsPerPage);
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
    let infoVersion = {
      type: '',
      nameVersion: '',
      idVersion: '',
      cjId: '',
      status: ''
    };
    const { cloneVersion, saveCampaignAutoVersion, getListCustomerVersionProcess } = this.props;
    infoVersion.idVersion = id;
    await cloneVersion(id);
    await this.cloneVersion('view');
    await saveCampaignAutoVersion(infoVersion);
    await getListCustomerVersionProcess('', id, 0);
  };

  toogleModalCjTagInsert = id => {
    this.setState({ isOpenModalInsert: true, id });
  };

  closeModalCjTagInsert = () => {
    let { textSearch, strTagId, activePage, itemsPerPage, id } = this.state;
    this.setState({ isOpenModalInsert: false });
    this.getListCampaignInfolderDataAction(
      this.props.folder_id_choose ? this.props.folder_id_choose : '-99',
      textSearch,
      strTagId,
      activePage,
      itemsPerPage
    );
  };
  closeModalCjTagList = () => {
    this.setState({ isOpenModalList: false });
  };

  handleSubmitTag = async id => {
    let cjEdit = {
      id,
      cjTags: this.state.list_tag
    };
    await this.props.updateCjTagsAction(cjEdit);
    this.handleVisibleChange(false, id);
    await this.getCjs();
  };
  handleChangeTagCj = cjTags => {
    this.setState({
      list_tag: cjTags,
      list_tag_default: this.props.valueComboTag
    });
  };

  toogleModalCjTagList = id => {
    this.setState({ isOpenModalList: true, id });
  };

  contentTag = item => {
    const img_tag = require('app/assets/utils/images/campaign-managament/tag-list.png');
    let result = (
      <div id="cj-tag-popover-body">
        <div className="combobox-cj-tag">
          <CampaignTag handleChange={this.handleChangeTagCj} defaultValue={this.state.list_tag_default} />
        </div>
        <div className="link">
          <Button type="link" onClick={() => this.toogleModalCjTagInsert(item.id)}>
            <img src={img_tag} />
            <span>Thêm mới tag</span>
          </Button>
          <Button type="link" onClick={() => this.toogleModalCjTagList(item.id)} style={{ float: 'right', textDecoration: 'underline' }}>
            <Icon type="menu" />
            <span>Danh sách tag</span>
          </Button>
        </div>
        <br />
        <div className="cj-tag-popup-footer" style={{ textAlign: 'right' }}>
          <Button onClick={() => this.handleVisibleChange(false, item.id)} className="btn-cancel">
            Hủy
          </Button>
          <Button onClick={() => this.handleSubmitTag(item.id)} type="primary">
            Chọn
          </Button>
        </div>
      </div>
    );
    return result;
  };

  render() {
    let { campaign_list, total, loading } = this.props;
    let { textSearch, strTagId, activePage, itemsPerPage, openModalCjTag, cjEdit, list_camp } = this.state;
    let folderId = this.props.folder_id_choose;
    let totalPages = Math.ceil(total / 4);
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    const img_tag = require('app/assets/utils/images/campaign-managament/tag-list.png');
    const getStatusName = (status: string) => {
      const img_stop = require('app/assets/utils/images/campaign-managament/stop.png');
      const img_running = require('app/assets/utils/images/campaign-managament/running.png');
      const img_finish = require('app/assets/utils/images/campaign-managament/finish.png');
      const img_draf = require('app/assets/utils/images/campaign-managament/draf.png');
      let result;
      switch (status) {
        case STATUS_CJ.DRAFT:
          result = (
            <Fragment>
              <img style={{ margin: '0px 6px 2px' }} src={img_draf} />
              <label className="count-campaign">Bản nháp</label>
            </Fragment>
          );
          break;
        case STATUS_CJ.RUNNING:
          result = (
            <Fragment>
              <img style={{ margin: '0px 6px 2px' }} src={img_running} />
              <label className="count-campaign">Đang thực hiện</label>
            </Fragment>
          );
          break;
        case STATUS_CJ.FINISH:
          result = (
            <Fragment>
              <img style={{ margin: '0px 6px 2px' }} src={img_finish} />
              <label className="count-campaign">Kết thúc</label>
            </Fragment>
          );
          break;
        case 'Stop':
          result = (
            <Fragment>
              <img style={{ margin: '0px 6px 2px' }} src={img_stop} />
              <label className="count-campaign">Dừng</label>
            </Fragment>
          );
          break;
        default:
          break;
      }
      return result;
    };

    return (
      <div className="campaign-list">
        <CjTagInsertModal
          toogleModalCjTagInsert={this.toogleModalCjTagInsert}
          isOpenModalCjTagInsert={this.state.isOpenModalInsert}
          closeModalCjTagInsert={this.closeModalCjTagInsert}
          dataModalTag={this.state.id}
          refreshListCjTag={this.getCjs}
        />
        <CjTagListModal
          toogleModalCjTagList={this.toogleModalCjTagList}
          isOpenModalCjTag={this.state.isOpenModalList}
          closeModalCjTag={this.closeModalCjTagList}
          refreshListCjTag={this.getCjs}
        />
        <Loader message={spinner1} show={loading} priority={1}>
          <div className="block-out">
            {/* Block out */}
            <Row>
              <Col span={4} />
              <Col span={11}>
                <label className="label-search">Tìm kiếm chiến dịch</label> &nbsp;
                <Input
                  style={{ float: 'right' }}
                  id="searchText"
                  prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={textSearch}
                  placeholder="Nhập từ khóa"
                  onChange={this.onchangeTextSearch}
                  onPressEnter={() => {
                    this.getListCampaignInfolderDataAction(folderId ? folderId : '-99', textSearch, strTagId, activePage, itemsPerPage);
                  }}
                />
              </Col>
              <Col span={8} className="col-search-tag">
                <Col span={14} style={{ display: 'flex', marginLeft: '16%' }}>
                  <label className="input-search_label-1">
                    <Translate contentKey="userManagement.card-tag" />
                    &nbsp; &nbsp;
                  </label>
                  <CampaignTag handleChange={this.handleChange} />
                </Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      window.location.assign('/#/app/views/campaigns/campaign-managament/new');
                    }}
                  >
                    Tạo mới chiến dịch
                  </Button>
                </Col>
              </Col>
            </Row>
            <label>{total} Chiến dịch</label>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td" colSpan={5}>
                    STT
                  </th>
                  <th colSpan={25}>Chiến dịch</th>
                  <th colSpan={20} id="status">
                    Trạng thái
                  </th>
                  <th colSpan={15} style={{ width: '25%' }}>
                    Kết quả
                  </th>
                  <th colSpan={20} id="contact-number">
                    Chỉnh sửa gần nhất
                  </th>
                  <th colSpan={15}> Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {list_camp && list_camp.length > 0 ? (
                  list_camp.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td colSpan={5}>{this.state.activePage * this.state.itemsPerPage + index + 1}</td>
                        <td colSpan={25} id="name">
                          {' '}
                          <a onClick={() => this.viewVersion(item.cjVersionId)}>{item.name}</a> <br />
                          <span>Version {item.version}</span>
                          <br />
                          {item.tags
                            ? item.tags.split(',').map((value, index) => {
                                return (
                                  <Tag color="blue" key={index}>
                                    {value}
                                  </Tag>
                                );
                              })
                            : null}
                        </td>
                        <td colSpan={20} id="status">
                          {getStatusName(item.status)}
                        </td>
                        <td colSpan={15}>
                          <Progress status="active" percent={10} format={percent => `${percent}/${item.contactNumbers} contact`} />
                        </td>
                        <td colSpan={15} id="modifier-date">
                          <span> {item.modifiedDate}</span>
                        </td>
                        <td colSpan={15}>
                          {/* <CJTagPopOver key={item.cjVersionId} dataPopup={item} getCjs={this.getCjsCallBack} /> */}
                          {/* <Icon onClick={() => this.openModalCjTag(item.id)} style={{ fontSize: '24px' }} type="tags" />  */}
                          <PopverAnt
                            overlayClassName="pop-tag"
                            content={this.contentTag(item)}
                            title="Chọn tag"
                            trigger="click"
                            placement="bottomRight"
                            visible={item.check}
                            onVisibleChange={visible => this.handleVisibleChange(visible, item.id)}
                          >
                            <img src={img_tag} />
                          </PopverAnt>
                          &nbsp;
                          <PopverAnt
                            overlayClassName="pop-version"
                            content={
                              <div>
                                <Icon type="snippets" />
                                <Button
                                  onClick={() => {
                                    window.location.assign(`/#/app/views/campaigns/campaign-managament/version/${item.cjVersionId}`);
                                  }}
                                  type="link"
                                >
                                  Xem danh sách version
                                </Button>
                              </div>
                            }
                            title=""
                            trigger="click"
                          >
                            {/* <Icon style={{ fontSize: '24px' }} type="unordered-list" /> */}
                            <FontAwesomeIcon style={{ fontSize: '24px', verticalAlign: 'inherit', color: '#3866DD' }} icon={faEllipsisH} />
                          </PopverAnt>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="none-data" colSpan={100}>
                      Không có dữ liệu khách hàng
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="navigation1">
              {totalPages && totalPages >= 2 ? (
                <Row className="justify-content-center" style={{ float: 'right' }}>
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
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
            {/* Blockout */}
          </div>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = ({ campaignManagament, cjState }: IRootState) => ({
  loading: campaignManagament.loading,
  campaign_list: campaignManagament.campaign.data,
  total: campaignManagament.campaign.total,
  valueComboTag: cjState.cj_tags,
  list_clone_version: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  getListCampaignInfolderDataAction,
  getCjTagsByCjIdAction,
  cloneVersion,
  getDiagramCampaign,
  saveCampaignAutoVersion,
  getListCustomerVersionProcess,
  updateCjTagsAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignList);
