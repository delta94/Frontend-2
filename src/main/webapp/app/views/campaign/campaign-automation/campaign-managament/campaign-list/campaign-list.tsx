import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import ReactPaginate from 'react-paginate';
import { getListCampaignInfolderDataAction } from 'app/actions/campaign-managament';
import './campaign-list.scss';
import { Input, Icon, Checkbox, Menu, Popover, Tag } from 'antd';
import CampaignTag from './campaign-tag/campaign-tag';
import CjTagModal from './cj-tag-modal/cj-tag-modal';
import { getCjTagsByCjIdAction } from 'app/actions/cj';
import { STATUS_CJ } from 'app/constants/cj';

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
}

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
    visible: false
  };

  componentDidMount() {
    let { strTagId, textSearch, activePage, itemsPerPage } = this.state;
    let folderId = this.props.folder_id_choose;
    this.getListCampaignInfolderDataAction(folderId ? folderId : '-1', textSearch, strTagId, activePage, itemsPerPage);
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

  handleVisibleChange = (visible, id) => {
    let { list_camp } = this.state;

    list_camp &&
      list_camp.map(event => {
        if (event.id === id) {
          event.check = visible;
        }
      });
    this.setState({ visible, list_camp });
  };

  getListCampaignInfolderDataAction = (folderId, textSearch, strTagId, pageIndex, pageSize) => {
    this.props.getListCampaignInfolderDataAction(folderId, textSearch, strTagId, pageIndex, pageSize);
  };

  onchangeTextSearch = event => {
    this.setState({
      ...this.state,
      textSearch: event.target.value
    });
  };

  setPageIndex = pageIndex => {
    let { strTagId, textSearch, itemsPerPage } = this.state;
    let folderId = this.props.folder_id_choose;
    this.getListCampaignInfolderDataAction(folderId, textSearch, strTagId, parseInt(pageIndex), itemsPerPage);
  };

  handleChange = cjTags => {
    let cjTagIds = cjTags.map((item, index) => item.id);
    let folderId = this.props.folder_id_choose;
    const { textSearch, activePage, itemsPerPage } = this.state;
    this.setState({
      ...this.state,
      strTagId: cjTagIds.join()
    });
    this.props.getListCampaignInfolderDataAction(folderId, textSearch, cjTagIds.join(), activePage, itemsPerPage);
  };

  openModalCjTag = async id => {
    await this.props.getCjTagsByCjIdAction(id);
    this.setState({
      openModalCjTag: true,
      cjEdit: {
        cjTags: this.props.valueComboTag,
        cjId: id
      }
    });
  };

  toogleModalCjTag = () => {
    let { openModalCjTag } = this.state;
    this.setState({
      openModalCjTag: !openModalCjTag
    });
  };

  closeModalCjTag = () => {
    this.setState({
      openModalCjTag: false,
      cjEdit: {
        cjTags: []
      }
    });
  };

  getCjs = () => {
    let { activePage, itemsPerPage } = this.state;
    let folderId = this.props.folder_id_choose;
    this.getListCampaignInfolderDataAction(folderId, '', '', activePage, itemsPerPage);
  };

  render() {
    let { campaign_list, total, loading } = this.props;
    let { textSearch, strTagId, activePage, itemsPerPage, openModalCjTag, cjEdit, list_camp } = this.state;
    let folderId = this.props.folder_id_choose;
    let totalPages = Math.ceil(total / 4);
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;

    const getStatusName = (status: string) => {
      let result = '';
      switch (status) {
        case STATUS_CJ.DRAFT:
          result = 'Bản nháp';
          break;
        case STATUS_CJ.RUNNING:
          result = 'Đang thực hiện';
          break;
        case STATUS_CJ.FINISH:
          result = 'Kết thúc';
          break;
        default:
          break;
      }
      return result;
    };

    return (
      <div className="campaign-list">
        <CjTagModal
          toogleModalCjTag={this.toogleModalCjTag}
          openModalCjTag={openModalCjTag}
          dataModalTag={cjEdit}
          closeModalCjTag={this.closeModalCjTag}
          getCjs={this.getCjs}
        />
        <Loader message={spinner1} show={loading} priority={1}>
          <div>
            {/* Block out */}
            <div className="block-out">
              <Row>
                <Col span={4}>
                  <label className="total-list">{total} chiến dịch</label>
                </Col>
                <Col span={8}>
                  <Input
                    id="searchText"
                    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={textSearch}
                    placeholder="Tìm kiếm chiến dịch"
                    onChange={this.onchangeTextSearch}
                    onPressEnter={() => {
                      this.getListCampaignInfolderDataAction(folderId, textSearch, strTagId, activePage, itemsPerPage);
                    }}
                  />
                </Col>
                <Col span={8}>
                  <div className="input-search_group">
                    <label className="input-search_label-1">
                      <Translate contentKey="userManagement.card-tag" />
                    </label>
                    <CampaignTag handleChange={this.handleChange} />
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  <Button
                    color="primary"
                    onClick={() => {
                      window.location.assign('/#/app/views/campaigns/campaign-managament/new');
                    }}
                  >
                    Tạo mới chiến dịch
                  </Button>
                </Col>
              </Row>
            </div>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td" colSpan={5}>
                    STT
                  </th>
                  <th colSpan={25} id="name">
                    Chiến dịch
                  </th>
                  <th colSpan={20} id="status">
                    Trạng thái
                  </th>
                  <th colSpan={15} id="contact-number">
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
                        <td colSpan={5}>{index + 1}</td>
                        <td colSpan={25} id="name">
                          <p> {item.name}</p>
                          <p>Version {item.version}</p>
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
                        <td colSpan={15} id="contact-number">
                          <span> {item.contactNumbers}</span>
                        </td>
                        <td colSpan={15} id="modifier-date">
                          <span> {item.modifiedDate}</span>
                        </td>
                        <td colSpan={15}>
                          <Popover
                            content={<a onClick={() => this.openModalCjTag(item.id)}>Close</a>}
                            title="Title"
                            trigger="click"
                            visible={item.check}
                            onVisibleChange={event => this.handleVisibleChange(event, item.id)}
                          >
                            <Icon style={{ fontSize: '24px' }} type="tags" /> &nbsp;
                          </Popover>
                          <Icon style={{ fontSize: '24px' }} type="unordered-list" />
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
  valueComboTag: cjState.cj_tags
});

const mapDispatchToProps = { getListCampaignInfolderDataAction, getCjTagsByCjIdAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignList);
