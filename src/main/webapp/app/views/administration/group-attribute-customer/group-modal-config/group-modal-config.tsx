import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './group-modal-config.scss';
import { IRootState } from 'app/reducers';
import { getListTagDataAction } from '../../../../actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Card, Modal } from 'antd';
// import TagModal from "../tag-modal/tag-modal";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import FieldData from './field-data/field-data';
import {
  getListFieldDataAction,
  postInsertCustomerGroupAction,
  getFindCustomerWithConditionAction,
  getListCustomerWithGroupIdDataAction
} from '../../../../actions/group-attribute-customer';
import { ISearchAdvanced } from 'app/common/model/group-attribute-customer';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal } from '../../../../actions/modal';
import { getListCustomerGroupDataAction, postUpdateCustomerGroupAction } from '../../../../actions/group-attribute-customer';
import { UPDATE_CUSTOMER_GROUP, COPY_CUSTOMER_GROUP, INSERT_CUSTOMER_GROUP } from '../../../../constants/group-atrribute-customer';
import { OPERATOR } from '../../../../constants/field-data';
import { IOpenModal } from '../../../../reducers/modal';
import { ERROR } from '../../../../constants/common';

interface IGroupModalConfigProps extends StateProps, DispatchProps {
  is_show: boolean;
  toggle: Function;
  title_modal: string;
  type_modal?: string;
  id_list_customer?: string;
}

interface IAdvancedSearchesData {
  id?: string;
  advancedSearch?: ISearchAdvanced;
}

interface IComponentData {
  id: string;
  name?: string;
  last_index: boolean;
  default_data?: ISearchAdvanced;
}

interface IGroupModalConfigState {
  list_field_data_cpn: IComponentData[];
  list_customer: Array<any>;
  categoryName?: string;
  advancedSearches?: ISearchAdvanced[];
  advancedSearchesData?: IAdvancedSearchesData[];
  logicalOperator?: string;
  textSearch?: string;
  pageIndex: number;
  pageSize: number;
  defualtFieldTitle?: string;
  single_group_field?: {
    categoryId?: string;
    categoryName?: string;
    customerAdvancedSave?: any;
  };
}

export function makeRandomId(length: number): string {
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
    logicalOperator: '',
    textSearch: '',
    pageIndex: 0,
    pageSize: 10,
    defualtFieldTitle: '',
    single_group_field: {
      categoryId: '',
      categoryName: '',
      customerAdvancedSave: {}
    }
  };

  componentDidMount() {
    let { logicalOperator, advancedSearches, pageIndex, pageSize } = this.state;
    this.props.getListFieldDataAction();
    this.props.getFindCustomerWithConditionAction({
      logicalOperator,
      advancedSearches,
      page: pageIndex,
      pageSize
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.single_group_field.categoryId !== '' &&
      nextProps.id_list_customer !== '' &&
      nextProps.id_list_customer &&
      nextProps.single_group_field !== prevState.single_group_field &&
      nextProps.type_modal !== INSERT_CUSTOMER_GROUP
    ) {
      let { customerAdvancedSave, categoryName } = nextProps.single_group_field;
      let { type_modal } = nextProps;
      let logicalOperator = '';
      let advancedSearchesData = [];
      let list_field_data_cpn = [];
      let advancedSearches = [];

      if (customerAdvancedSave.logicalOperator !== '' && type_modal !== INSERT_CUSTOMER_GROUP) {
        logicalOperator = customerAdvancedSave.logicalOperator;
      }

      advancedSearches = customerAdvancedSave.advancedSearches;
      customerAdvancedSave.advancedSearches.forEach((item, index) => {
        let id = makeRandomId(16);
        advancedSearchesData.push({
          id: makeRandomId(8),
          advancedSearch: item
        });

        list_field_data_cpn.push({
          id,
          name: 'new',
          last_index: customerAdvancedSave.advancedSearches.length - 1 === index ? true : false,
          default_data: item
        });
      });

      advancedSearches = customerAdvancedSave.advancedSearches;

      return {
        categoryName,
        single_group_field: nextProps.single_group_field,
        advancedSearchesData,
        list_field_data_cpn,
        logicalOperator,
        advancedSearches
      };
    }
    return null;
  }

  // Update value from state;
  updateValueFromState = (id: string, advancedSearch: ISearchAdvanced) => {
    let { advancedSearchesData, logicalOperator } = this.state;
    let advancedSearches = [];

    advancedSearchesData.map(item => {
      advancedSearches.push(item.advancedSearch);
    });

    advancedSearchesData.forEach(item => {
      if (item.id === id) {
        item.advancedSearch = advancedSearch;
      }
    });

    if (advancedSearchesData.length > 1 && logicalOperator === '') {
      logicalOperator = OPERATOR.AND;
    }

    if (advancedSearchesData.length === 1) logicalOperator = '';
    this.setState({ advancedSearchesData, advancedSearches, logicalOperator });
  };

  // Add new component to list_field_data_cpn
  handleAddNewComponent = () => {
    let { list_field_data_cpn, advancedSearchesData } = this.state;
    let id = makeRandomId(16);
    let newCpn = { id, name: 'new', last_index: true, default_data: {} };

    // Check duplicate value
    list_field_data_cpn.forEach(item => {
      if (item.id === id) {
        id = makeRandomId(16);
      }
    });

    list_field_data_cpn.push(newCpn);

    advancedSearchesData.push({
      id,
      advancedSearch: {
        fieldId: '',
        fieldCode: '',
        fieldType: '',
        fieldTitle: '',
        value: '',
        operator: ''
      }
    });

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
    let categoryName = '';
    this.setState({
      list_field_data_cpn,
      advancedSearchesData,
      advancedSearches,
      categoryName
    });
  };

  // GetData customer by condition
  getDataListCustomer = (event: any) => {
    let { advancedSearches, logicalOperator, pageIndex, pageSize } = this.state;
    if (advancedSearches.length <= 1) {
      logicalOperator = '';
    }

    if (typeof event.selected === 'number') {
      pageIndex = event.selected;
    }

    this.props.getFindCustomerWithConditionAction({
      logicalOperator,
      advancedSearches,
      page: pageIndex,
      pageSize
    });

    this.setState({ pageIndex });
  };

  // Close modal
  closeConfigModal = () => {
    this.removeDataInModal();
    this.props.toggle();
  };

  // Exec function request
  async execFunctionRequest() {
    let { type_modal, single_group_field } = this.props;
    let { advancedSearches, categoryName, logicalOperator } = this.state;
    let postRequest: IOpenModal = {
      show: true,
      type: ERROR,
      title: 'Thông báo',
      text: ''
    };

    categoryName = categoryName.trim();
    switch (type_modal) {
      case UPDATE_CUSTOMER_GROUP:
        await this.props.postUpdateCustomerGroupAction(single_group_field.categoryId, {
          categoryId: single_group_field.categoryId,
          categoryName,
          customerAdvancedSave: {
            logicalOperator,
            advancedSearches
          }
        });

        await this.props.getListCustomerWithGroupIdDataAction('', 0, 10, single_group_field.categoryId);
        break;

      case COPY_CUSTOMER_GROUP:
        await this.props.postInsertCustomerGroupAction({
          categoryName,
          customerAdvancedSave: {
            logicalOperator,
            advancedSearches
          }
        });
        break;

      case INSERT_CUSTOMER_GROUP:
        await this.props.postInsertCustomerGroupAction({
          categoryName,
          customerAdvancedSave: {
            logicalOperator,
            advancedSearches
          }
        });
        break;
      default:
        break;
    }

    await this.props.openModal(postRequest);
    await this.props.getListCustomerGroupDataAction('');
    this.closeConfigModal();
  }

  render() {
    let { is_show, list_field_data, loading, list_customer_with_condition, totalElements, type_modal } = this.props;
    let { list_field_data_cpn, logicalOperator, advancedSearches, categoryName, pageIndex } = this.state;
    let list_field_render =
      list_field_data_cpn && list_field_data_cpn.length > 0
        ? list_field_data_cpn.map(item => {
            if (item.id)
              return (
                <FieldData
                  type_modal={type_modal}
                  key={item.id}
                  id={item.id}
                  list_field_data={list_field_data}
                  last_index={item.last_index}
                  logicalOperator={logicalOperator}
                  default_data={item.default_data}
                  updateValueFromState={this.updateValueFromState}
                  deleteComponentById={this.deleteComponentById}
                  updateRelationshipFromState={this.updateRelationshipFromState}
                />
              );
          })
        : [];

    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    let title_modal = 'THÊM MỚI NHÓM';

    switch (type_modal) {
      case UPDATE_CUSTOMER_GROUP:
        title_modal = 'CHỈNH SỬA THÔNG TIN NHÓM';
        break;
      case COPY_CUSTOMER_GROUP:
        title_modal = 'SAO CHÉP THÔNG TIN NHÓM';
        break;
      case INSERT_CUSTOMER_GROUP:
        title_modal = 'THÊM MỚI NHÓM';
        break;
      default:
        break;
    }

    return (
      <Modal
        visible={is_show}
        title={title_modal ? title_modal.toUpperCase() : ''}
        style={{ width: '700px' }}
        onOk={() => this.props.toggle()}
        onCancel={this.closeConfigModal}
        footer={[
          <Button key="submit" color="none" onClick={() => this.props.toggle()}>
            Hủy
          </Button>,
          <Button
            key="back"
            color="primary"
            disabled={advancedSearches && categoryName && categoryName.trim() !== '' ? false : true}
            onClick={() => this.execFunctionRequest()}
          >
            Lưu
          </Button>
        ]}
      >
        <div className="group-modal-config">
          <div className="input-search_group">
            <label className="input-search_label">Tên nhóm</label>
            <Input
              placeholder="Học sinh, người nổi tiếng, quần chúng .v.v"
              value={categoryName}
              onChange={event => this.setState({ categoryName: event.target.value })}
              maxLength={160}
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
                      <th>Họ tên</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Thẻ/tag</th>
                      {/* <th>Nguồn</th> */}
                      <th>Ngày khởi tạo</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {list_customer_with_condition && list_customer_with_condition.length > 0 ? (
                      list_customer_with_condition.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1 + 10 * pageIndex}</td>
                            <td>{item.firstName + ' ' + item.lastName}</td>
                            <td>{item.mobile}</td>
                            <td>{item.email}</td>
                            <td>{item.tag}</td>
                            {/* <td /> */}
                            <td>{item.createdDate}</td>
                            <td />
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="none-data" colSpan={100}>
                          Không có dữ liệu nhóm khách hàng
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Loader>
            <div className="navigation">
              {list_customer_with_condition && Math.ceil(totalElements / 10) > 1 ? (
                <Row className="justify-content-center">
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(totalElements / 10)}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange={this.getDataListCustomer}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={3}
                  />
                </Row>
              ) : null}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ tagDataState, groupCustomerState }: IRootState) => ({
  loading: groupCustomerState.list_customer_with_condition_index.loading,
  totalElements: groupCustomerState.list_customer_with_condition_index.totalElements,
  list_field_data: groupCustomerState.list_field_data,
  list_customer_with_condition: groupCustomerState.list_customer_with_condition,
  postRequest: groupCustomerState.postRequest,
  single_group_field: groupCustomerState.single_customer_field,
  list_group_customer: groupCustomerState.list_group_customer
});

const mapDispatchToProps = {
  getListTagDataAction,
  getListFieldDataAction,
  postInsertCustomerGroupAction,
  getFindCustomerWithConditionAction,
  getListCustomerGroupDataAction,
  postUpdateCustomerGroupAction,
  getListCustomerWithGroupIdDataAction,
  openModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupModalConfig);
