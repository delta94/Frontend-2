import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './group-modal-config.scss';
import { IRootState } from 'app/reducers';
import { getListTagDataAction } from '../../../../actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Card, Row } from 'antd';
import { Modal } from 'reactstrap';
// import TagModal from '../tag-modal/tag-modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import FieldData from './field-data/field-data';
import {
  getListFieldDataAction,
  postInsertCustomerGroupAction,
  getFindCustomerWithConditionAction
} from '../../../../actions/group-attribute-customer';
import { ISearchAdvanced } from 'app/common/model/group-attribute-customer';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal } from '../../../../actions/modal';
import { getListCustomerGroupDataAction } from '../../../../actions/group-attribute-customer';

interface IGroupModalConfigProps extends StateProps, DispatchProps {
  is_show: boolean;
  toggle: Function;
  title_modal: string;
}

interface IAdvancedSearchesData {
  id?: string;
  advancedSearch?: ISearchAdvanced;
}

interface IGroupModalConfigState {
  list_field_data_cpn: any;
  list_customer: Array<any>;
  categoryName?: string;
  advancedSearches?: ISearchAdvanced[];
  advancedSearchesData?: IAdvancedSearchesData[];
  logicalOperator?: string;
  textSearch?: string;
  pageIndex: number;
  pageSize: number;
}

export function makeid(length: number): string {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

class GroupModalConfig extends React.Component<IGroupModalConfigProps, IGroupModalConfigState> {
  state: IGroupModalConfigState = {
    list_field_data_cpn: [],
    list_customer: [],
    categoryName: '',
    advancedSearches: [],
    advancedSearchesData: [],
    logicalOperator: 'AND',
    textSearch: '',
    pageIndex: 0,
    pageSize: 10
  };

  componentDidMount() {
    this.props.getListFieldDataAction();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.advancedSearchesData) {
      let advancedSearches = [];
      prevState.advancedSearchesData.map(item => {
        advancedSearches.push(item.advancedSearch);
      });

      return {
        advancedSearches
      };
    }
    return null;
  }

  // Update value from state;
  updateValueFromState = (id: string, advancedSearch: ISearchAdvanced) => {
    let { advancedSearchesData } = this.state;

    advancedSearchesData.forEach(item => {
      if (item.id === id) {
        item.advancedSearch = advancedSearch;
      }
    });

    this.setState({ advancedSearchesData });
  };

  // Add new component to list_field_data_cpn
  handleAddNewComponent = () => {
    let { list_field_data_cpn, advancedSearchesData } = this.state;
    let id = makeid(16);
    let newCpn = { id, name: 'new', last_index: true };

    // Check duplicate value
    list_field_data_cpn.forEach(item => {
      if (item.id === id) {
        id = makeid(16);
      }
    });

    list_field_data_cpn.push(newCpn);
    advancedSearchesData.push({ id, advancedSearch: { field: '', value: '', operator: '`' } });
    this.updateLastIndex(list_field_data_cpn);
  };

  // Delete component by Id
  deleteComponentById = (id: string) => {
    let { list_field_data_cpn, advancedSearchesData } = this.state;
    list_field_data_cpn.forEach((item, index) => {
      if (item.id === id) {
        list_field_data_cpn.splice(index, 1);
        advancedSearchesData.splice(index, 1);
      }
    });

    this.updateLastIndex(list_field_data_cpn);
    this.setState({ list_field_data_cpn, advancedSearchesData });
  };

  // Update last index
  updateLastIndex = (list_field_data_cpn: any) => {
    list_field_data_cpn.forEach((item, index) => {
      if (index < list_field_data_cpn.length - 1) {
        item.last_index = false;
      } else {
        item.last_index = true;
      }
    });

    this.setState({ list_field_data_cpn });
  };

  // Update logicalOperator
  updateRelationshipFromState = (logicalOperator: string) => {
    this.setState({ logicalOperator });
  };

  // Remove All value
  removeDataInModal = () => {
    let list_field_data_cpn = [];
    let advancedSearches = [];
    let advancedSearchesData = [];
    this.setState({ list_field_data_cpn, advancedSearchesData, advancedSearches });
  };

  //Create new group;
  async createNewGroup() {
    let { advancedSearches, categoryName, logicalOperator } = this.state;
    this.props.toggle();
    await this.props.postInsertCustomerGroupAction({ categoryName, customerAdvancedSave: { logicalOperator, advancedSearches } });
    await this.props.getListCustomerGroupDataAction('');
    await this.props.openModal(this.props.postRequest);
    await this.removeDataInModal();
  }

  // GetData customer by condition
  getDataListCustomer = (event: any) => {
    let { advancedSearches, logicalOperator, pageIndex, pageSize } = this.state;
    if (advancedSearches.length <= 1) {
      logicalOperator = '';
    }

    if (typeof event.selected === 'number') {
      pageIndex = event.selected;
    }

    this.props.getFindCustomerWithConditionAction({ logicalOperator, advancedSearches, page: pageIndex, pageSize });
    this.setState({ pageIndex });
  };

  render() {
    let { is_show, list_field_data, loading, list_customer_with_condition, title_modal, totalElements } = this.props;

    let { list_field_data_cpn, logicalOperator, advancedSearches, categoryName } = this.state;

    let list_field_render =
      list_field_data_cpn && list_field_data_cpn.length > 0
        ? list_field_data_cpn.map((item, index) => {
            if (item.id)
              return (
                <FieldData
                  key={item.id}
                  id={item.id}
                  list_field_data={list_field_data}
                  last_index={item.last_index}
                  logicalOperator={logicalOperator}
                  updateValueFromState={this.updateValueFromState}
                  deleteComponentById={this.deleteComponentById}
                  updateRelationshipFromState={this.updateRelationshipFromState}
                />
              );
          })
        : [];

    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;

    return (
      <Modal isOpen={is_show} toggle={() => this.props.toggle()}>
        <ModalHeader>{title_modal}</ModalHeader>
        <ModalBody>
          <div className="group-modal-config">
            <div className="input-search_group">
              <label className="input-search_label">Tên nhóm</label>
              <Input
                placeholder="Học sinh, người nổi tiếng, quần chúng .v.v"
                onChange={event => this.setState({ categoryName: event.target.value.trim() })}
              />
            </div>
            {/* Chose condition */}
            <div className="group-addition">
              <Card style={{ padding: '0px' }}>
                <div className="group-addition_block-out">
                  <span style={{ textTransform: 'uppercase', fontWeight: 500 }}>CHỌN ĐIỀU KIỆN</span>
                  <Button
                    color="primary"
                    style={{ float: 'right', margin: '3px' }}
                    onClick={this.getDataListCustomer}
                    disabled={list_field_data_cpn.length === 0 ? true : false}
                  >
                    Apply
                  </Button>
                </div>
              </Card>
              <Card>
                <div className="group-addition_content">
                  {list_field_render}
                  <div className="group-addition_footer">
                    <Button color="primary" style={{ margin: '2px 14px' }} onClick={this.handleAddNewComponent}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <label style={{ lineHeight: '30px', padding: '0px 14px', fontWeight: 400 }}>Thêm điều kiện khác</label>
                  </div>
                </div>
              </Card>
              <Loader message={spinner1} show={loading} priority={1}>
                <div className="search-table-customer">
                  <Table striped>
                    <thead>
                      <tr className="text-center">
                        <th className="checkbox-td">Stt</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Thẻ/tag</th>
                        <th>Nguồn</th>
                        <th>Ngày tạo</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {list_customer_with_condition && list_customer_with_condition.length > 0 ? (
                        list_customer_with_condition.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index}</td>
                              <td>{item.firstName + ' ' + item.lastName}</td>
                              <td>{item.mobile}</td>
                              <td>{item.email}</td>
                              <td>{item.tags}</td>
                              <td />
                              <td>{item.createdDate}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr />
                      )}
                    </tbody>
                  </Table>
                </div>
                <Row style={{ textAlign: 'center' }}>
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(totalElements / 10)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={4}
                    onPageChange={this.getDataListCustomer}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={8}
                  />
                </Row>
              </Loader>
            </div>
            <div className="bottom-div-btn">
              <Button
                style={{ float: 'right' }}
                color="primary"
                disabled={advancedSearches && categoryName && categoryName.trim() !== '' ? false : true}
                onClick={() => this.createNewGroup()}
              >
                Lưu
              </Button>
              <Button style={{ float: 'right' }} color="none" onClick={() => this.props.toggle()}>
                Hủy
              </Button>
            </div>
            {/* Table List Customer */}
          </div>
        </ModalBody>
        <ModalFooter />
      </Modal>
    );
  }
}

const mapStateToProps = ({ tagDataState, groupCustomerState }: IRootState) => ({
  loading: groupCustomerState.list_customer_with_condition_index.loading,
  totalElements: groupCustomerState.list_customer_with_condition_index.totalElements,
  list_field_data: groupCustomerState.list_field_data,
  list_customer_with_condition: groupCustomerState.list_customer_with_condition,
  postRequest: groupCustomerState.postRequest
});

const mapDispatchToProps = {
  getListTagDataAction,
  getListFieldDataAction,
  postInsertCustomerGroupAction,
  getFindCustomerWithConditionAction,
  getListCustomerGroupDataAction,
  openModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupModalConfig);
