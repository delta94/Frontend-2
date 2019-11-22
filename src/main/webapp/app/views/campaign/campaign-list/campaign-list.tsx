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
import { Input, Icon, Checkbox, Menu, Dropdown } from 'antd';
import CampaignTag from './campaign-tag/campaign-tag';

interface ICampaignListProps extends StateProps, DispatchProps {
  folder_id_choose?: string;
}

interface ICampaignListState {
  textSearch?: string;
  tagIds: [];
}

class CampaignList extends React.Component<ICampaignListProps, ICampaignListState> {
  state: ICampaignListState = {
    textSearch: '',
    tagIds: []
  };

  componentDidMount() {
    let { tagIds, textSearch } = this.state;
    let folderId = this.props.folder_id_choose;
    localStorage.setItem('pageIndex', '0');
    this.getListCampaignInfolderDataAction(folderId, textSearch, tagIds, 0, 4);
  }

  getListCampaignInfolderDataAction = (folderId, textSearch, tagIds, pageIndex, pageSize) => {
    this.props.getListCampaignInfolderDataAction(folderId, textSearch, tagIds, pageIndex, pageSize);
  };

  onchangeTextSearch = event => {
    this.setState({ textSearch: event.target.value });
  };

  setPageIndex = pageIndex => {
    let { tagIds, textSearch } = this.state;
    let folderId = this.props.folder_id_choose;
    this.getListCampaignInfolderDataAction(folderId, textSearch, tagIds, parseInt(pageIndex), 4);
  };

  handleChange = cjTags => {
    let cjTagIds = cjTags.map((item, index) => item.id);
    let folderId = this.props.folder_id_choose;
    const { textSearch } = this.state;
    this.props.getListCampaignInfolderDataAction(folderId, textSearch, cjTagIds.join(), 0, 4);
  };

  render() {
    let { campaign_list, total } = this.props;
    let { textSearch, tagIds } = this.state;
    let folderId = this.props.folder_id_choose;
    let totalPages = Math.ceil(total / 4);
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;

    return (
      <div className="campaign-list">
        <Loader message={spinner1} show={false} priority={1}>
          <div>
            {/* Block out */}
            <div className="block-out">
              <div className="search">
                <Input
                  id="searchText"
                  prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={textSearch}
                  placeholder="Tìm kiếm chiến dịch"
                  onChange={this.onchangeTextSearch}
                  onPressEnter={() => {
                    this.getListCampaignInfolderDataAction(folderId, textSearch, tagIds, 0, 4);
                  }}
                />
              </div>

              <div className="input-search_group" style={{ paddingRight: '30px' }}>
                <label className="input-search_label">
                  <span>
                    <Translate contentKey="userManagement.card-tag" />
                  </span>
                </label>
                <CampaignTag handleChange={this.handleChange} />
              </div>
            </div>
            <p className="total-list">{total} chiến dịch</p>
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
                  <th colSpan={30} id="description">
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
                          <p> {item.tags}</p>
                        </td>
                        <td colSpan={20}>{item.status}</td>
                        <td colSpan={30} id="">
                          <span> {item.contactNumbers}</span>
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
        <div className="navigation ">
          {totalPages && totalPages >= 2 ? (
            <Row className="justify-content-center">
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
