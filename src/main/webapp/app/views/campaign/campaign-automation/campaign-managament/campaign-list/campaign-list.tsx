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
import { Input, Icon, Checkbox, Menu, Dropdown, Tag } from 'antd';
import CampaignTag from './campaign-tag/campaign-tag';

interface ICampaignListProps extends StateProps, DispatchProps {
  folder_id_choose?: string;
}

interface ICampaignListState {
  activePage: number;
  itemsPerPage: number;
  textSearch?: string;
  strTagId?: string;
}

class CampaignList extends React.Component<ICampaignListProps, ICampaignListState> {
  state: ICampaignListState = {
    activePage: 0,
    itemsPerPage: 4,
    textSearch: '',
    strTagId: ''
  };

  componentDidMount() {
    let { strTagId, textSearch, activePage, itemsPerPage } = this.state;
    let folderId = this.props.folder_id_choose;
    this.getListCampaignInfolderDataAction(folderId ? folderId : 1, textSearch, strTagId, activePage, itemsPerPage);
  }

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
    this.getListCampaignInfolderDataAction(folderId ? folderId : 1, textSearch, strTagId, parseInt(pageIndex), itemsPerPage);
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

  render() {
    let { campaign_list, total } = this.props;
    let { textSearch, strTagId } = this.state;
    let folderId = this.props.folder_id_choose;
    let totalPages = Math.ceil(total / 4);
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;

    return (
      <div className="campaign-list">
        <Loader message={spinner1} show={false} priority={1}>
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
                      this.getListCampaignInfolderDataAction(folderId, textSearch, strTagId, 0, 4);
                    }}
                  />
                </Col>
                <Col span={8}>
                  <div className="input-search_group">
                    <label className="input-search_label">
                      <Translate contentKey="userManagement.card-tag" />
                    </label>
                    <CampaignTag handleChange={this.handleChange} />
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  <Button color="primary">Tạo mới chiến dịch</Button>
                </Col>
              </Row>
            </div>
            {/* Table? */}
            <Table striped>
              <thead>
                <tr className="text-center">
                  <th className="checkbox-td" colSpan={5}>
                    <Checkbox id="check-all" />
                  </th>
                  <th colSpan={30} id="name">
                    Chiến dịch
                  </th>
                  <th colSpan={20} id="status">
                    Trạng thái
                  </th>
                  <th colSpan={30} id="contact-number">
                    Kết quả
                  </th>
                  <th colSpan={15} />
                </tr>
              </thead>
              <tbody>
                {campaign_list && campaign_list.length > 0 ? (
                  campaign_list.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td colSpan={5}>
                          <Checkbox id={item.id} />
                        </td>
                        <td colSpan={30} id="name">
                          <p> {item.name}</p>
                          {item.tags.split(',').map((value, index) => {
                            return (
                              <Tag color="blue" key={index}>
                                {value}
                              </Tag>
                            );
                          })}
                        </td>
                        <td colSpan={20} id="status">
                          {item.status}
                        </td>
                        <td colSpan={30} id="contact-number">
                          <span> {item.contactNumbers}</span>
                        </td>
                        <td colSpan={15}>
                          <Icon style={{ fontSize: '24px' }} type="tags" /> &nbsp;
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
            {/* Blockout */}
          </div>
        </Loader>
        <br />
        <div className="navigation ">
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
      </div>
    );
  }
}

const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  campaign_list: campaignManagament.campaign.data,
  total: campaignManagament.campaign.total
});

const mapDispatchToProps = { getListCampaignInfolderDataAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignList);
