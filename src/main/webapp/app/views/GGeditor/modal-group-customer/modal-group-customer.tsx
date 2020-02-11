import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { subDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modal-group-customer.scss';
import DatePicker from 'react-datepicker';
import { IRootState } from 'app/reducers';
import { getListTagDataAction } from 'app/actions/tag-management';
import ReactPaginate from 'react-paginate';
import { Input, Card, Modal } from 'antd';
// import TagModal from "../tag-modal/tag-modal";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import FieldData from './field-data/field-data';
import moment from 'moment';
import {
  getListFieldDataAction,
  postInsertCustomerGroupAction,
  getFindCustomerWithConditionAction,
  getListCustomerWithGroupIdDataAction,
  getListCustomerGroupDataAction,
  postUpdateCustomerGroupAction
} from 'app/actions/group-attribute-customer';
import { ISearchAdvanced } from 'app/common/model/group-attribute-customer';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal } from 'app/actions/modal';
import { UPDATE_CUSTOMER_GROUP, COPY_CUSTOMER_GROUP, INSERT_CUSTOMER_GROUP } from 'app/constants/group-atrribute-customer';
import { OPERATOR } from 'app/constants/field-data';
import { IOpenModal } from 'app/reducers/modal';
import { ERROR } from 'app/constants/common';

const { confirm } = Modal;

interface IGroupModalConfigProps extends StateProps, DispatchProps {
  is_show: boolean;
  toggle: Function;
  title_modal: string;
  type_modal?: string;
  id_list_customer?: string;
  idNode: any;
  enableSource?: boolean;
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
  dateTime?: any;
  selectDate: any;
  error_categoryName: string;
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
    },
    dateTime: '',
    selectDate: new Date(),
    error_categoryName: ''
  };

  strToDate(dtStr) {
    let dateParts = dtStr.split("-");
    let timeParts = dateParts[2].split(" ")[1].split(":");
    dateParts[2] = dateParts[2].split(" ")[0];
    return new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2], timeParts[0], timeParts[1], timeParts[2]);

  }

  componentDidMount() {
    let { logicalOperator, advancedSearches, pageIndex, pageSize, categoryName, selectDate } = this.state;
    let { list_clone_version } = this.props;
    if (Object.keys(list_clone_version).length > 0 && list_clone_version.cjId) {
      logicalOperator =
        list_clone_version.flowDetail.customerAdvancedSave === null
          ? ''
          : list_clone_version.flowDetail.customerAdvancedSave.logicalOperator;
      (advancedSearches =
        list_clone_version.flowDetail.customerAdvancedSave === null
          ? []
          : list_clone_version.flowDetail.customerAdvancedSave.advancedSearches),
        (categoryName = list_clone_version.flowDetail.customerGroupName),
        (selectDate = this.strToDate(list_clone_version.flowDetail.startTime));
      this.getValueAdv();
    }
    this.props.getListFieldDataAction();
    this.props.getFindCustomerWithConditionAction({
      logicalOperator: logicalOperator,
      advancedSearches: advancedSearches,
      page: pageIndex,
      pageSize
    });
    this.setState({ categoryName, logicalOperator, selectDate });
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
  //clone customer
  getValueAdv = () => {
    const { list_clone_version } = this.props;
    let { list_field_data_cpn, logicalOperator, advancedSearches } = this.state;
    let data: { logicalOperator: string; advancedSearches: any[] } = list_clone_version.flowDetail.customerAdvancedSave;
    if (data != undefined) {
      data.advancedSearches.map((item, index) => {
        let dataSeacrh = {
          id: Math.random()
            .toString(36)
            .substr(2, 9),
          name: 'new',
          last_index: index + 1 === data.advancedSearches.length ? true : false,
          default_data: {
            fieldCode: item.fieldCode,
            fieldId: item.fieldId,
            fieldType: item.fieldType,
            fieldValue: item.fieldValue,
            fieldTitle: item.fieldTitle,
            operator: item.operator,
            value: item.value
          }
        };
        list_field_data_cpn.push(dataSeacrh);
      });
      logicalOperator = data.logicalOperator;
      advancedSearches = data.advancedSearches;
      this.setState({ list_field_data_cpn, advancedSearches: data.advancedSearches });
    }
  };
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
    let { list_field_data_cpn, advancedSearchesData, advancedSearches } = this.state;

    list_field_data_cpn.forEach((item, index) => {
      if (item.id === id) {
        list_field_data_cpn.splice(index, 1);
        advancedSearchesData.splice(index, 1);
        advancedSearches.splice(index, 1);
      }
    });

    this.updateLastIndex(list_field_data_cpn);
    this.setState({ list_field_data_cpn, advancedSearchesData, advancedSearches });
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
    let { advancedSearches, logicalOperator, pageIndex, pageSize, list_field_data_cpn } = this.state;
    advancedSearches =
      list_field_data_cpn &&
      list_field_data_cpn.map(item => {
        return { ...item.default_data };
      });
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
    this.props.toggle();

    this.removeDataInModal();
  };

  // Exec function request
  async execFunctionRequest() {
    let { type_modal, single_group_field } = this.props;
    let { advancedSearches, categoryName, logicalOperator, list_field_data_cpn } = this.state;

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

    // await this.props.openModal(postRequest);
    // await this.props.getListCustomerGroupDataAction('');
    let count: number = 0;
    let customerAdvancedSave = {
      logicalOperator,
      advancedSearches:
        list_field_data_cpn &&
        list_field_data_cpn.map(item => {
          return { ...item.default_data };
        })
    };
    if (categoryName) {
      this.setState({ error_categoryName: '' });
    } else {
      if (Object.keys(this.props.list_clone_version).length > 0 && this.props.list_clone_version.cjId) {
        categoryName = this.props.list_clone_version.flowDetail.customerGroupName;
      }
      count++;
      this.setState({ error_categoryName: '* Vui lòng nhập tên nhóm' });
    }

    if (count == 0) {
      if (advancedSearches && advancedSearches.length === 0 && Object.keys(this.props.list_clone_version).length < 1) {
        confirm({
          title: 'Xác nhận',
          content: 'Chiến dịch sẽ gửi tới tất cả khách hàng, bạn có chắc chắn muốn thực hiện ?',
          onOk: async () => {
            this.props.toggle(false, this.state.categoryName + ',' + this.state.dateTime, customerAdvancedSave, true);
          },
          onCancel() { },
          okText: 'Xác nhận',
          cancelText: 'Hủy'
        });
      } else {
        this.props.toggle(false, this.state.categoryName + ',' + this.state.dateTime, customerAdvancedSave, true);
      }
    }
  }
  getNameGroup = () => {
    const { listFieldData, list_clone_version } = this.props;
    let result: string = '';
    listFieldData.listCampign &&
      listFieldData.listCampign.map(item => {
        if (item.id === this.props.idNode.id) {
          result = item.name;
        }
      });
    if (Object.keys(list_clone_version).length > 0 && list_clone_version.cjId && !result) {
      result = list_clone_version.flowDetail.customerGroupName;
    }
    return result;
  };
  save = () => {
    const { totalElements } = this.props;
    if (totalElements > 0) {
      this.execFunctionRequest();
    } else {
      openModal({
        show: true,
        type: 'error',
        title: translate('modal-data.title.error'),
        text: 'Vui lòng chọn ít nhất 1 khách hàng'
      });
    }
  };

  render() {
    let {
      is_show,
      list_field_data,
      loading,
      list_customer_with_condition,
      totalElements,
      type_modal,
      info_version,
      listFieldData,
      openModal
    } = this.props;
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
    let title_modal = translate('group-attribute-customer.create-new-group');

    switch (type_modal) {
      case UPDATE_CUSTOMER_GROUP:
        title_modal = translate('group-attribute-customer.fix-info-group');
        break;
      case COPY_CUSTOMER_GROUP:
        title_modal = translate('group-attribute-customer.copy-info-group');
        break;
      case INSERT_CUSTOMER_GROUP:
        title_modal = translate('group-attribute-customer.create-new-group');
        break;
      default:
        break;
    }
    return (
      <Modal
        destroyOnClose
        maskClosable={false}
        visible={is_show}
        title={title_modal ? title_modal.toUpperCase() : ''}
        style={{ width: '700px' }}
        className="modal-config-ggeditor"
        onOk={() => {
          localStorage.removeItem('isSave');
          this.props.toggle();
        }}
        onCancel={this.closeConfigModal}
        footer={[
          <Button key="submit" color="none" onClick={() => this.props.toggle()}>
            <Translate contentKey="group-attribute-customer.cancel" />
          </Button>,
          <Button
            key="back"
            color="primary"
            onClick={() => {
              this.save();
            }}
          >
            <Translate contentKey="group-attribute-customer.save" />
          </Button>
        ]}
      >
        <div className="group-modal-config">
          <div className="input-search">
            <label className="input-search_label">
              <Translate contentKey="group-attribute-customer.group-name" />
            </label>
            <Input
              defaultValue={this.getNameGroup()}
              placeholder={translate('group-attribute-customer.group-modal-config.name-placeholder')}
              onChange={event => {
                categoryName = this.getNameGroup() ? this.getNameGroup() : categoryName;
                this.setState({ categoryName: event.target.value });
              }}
              maxLength={160}
            />
          </div>
          <p className="error" style={{ color: 'red', marginLeft: '8%' }}>
            {' '}
            {this.state.error_categoryName}
          </p>

          <div className="input-search">
            <label className="input-search_label">
              <Translate contentKey="config-customer.setting-calender" />
            </label>
            <DatePicker
              className="ant-input"
              selected={this.state.selectDate}
              timeIntervals={10}
              timeFormat="HH:mm"
              onChange={date => {
                this.setState({ dateTime: moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss'), selectDate: date });
              }}
              showTimeSelect
              minDate={subDays(new Date(), 0)}
              dateFormat="yyyy/MM/dd hh:mm:ss aa"
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
                  disabled={(info_version.type === 'copy' ? false : true) || !this.props.enableSource}
                >
                  <Translate contentKey="group-attribute-customer.apply" />
                </Button>
              </div>
            </Card>
            <Card>
              <div className="group-addition_content">
                {list_field_render}
                <div className="group-addition_footer">
                  <Button color="primary" onClick={this.handleAddNewComponent}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <label
                    style={{
                      lineHeight: '30px',
                      padding: '0px 14px',
                      fontWeight: 400
                    }}
                  >
                    <Translate contentKey="group-attribute-customer.add-more-condition" />
                  </label>
                </div>
              </div>
            </Card>
            <div className="list-title">
              <label
                style={{
                  color: '#6C757D',
                  fontWeight: 500,
                  padding: '0px 5px'
                }}
              >
                {' '}
                <Translate contentKey="config-customer.expected-list-customer" />
              </label>
            </div>
            <Loader message={spinner1} show={loading} priority={1}>
              <div className="search-table-customer">
                <Table striped>
                  <thead>
                    <tr className="text-center">
                      <th className="checkbox-td">
                        <Translate contentKey="group-attribute-customer.stt" />
                      </th>
                      <th>
                        <Translate contentKey="group-attribute-customer.first-last-name" />
                      </th>
                      <th>
                        <Translate contentKey="group-attribute-customer.phone-number" />
                      </th>
                      <th>
                        <Translate contentKey="group-attribute-customer.email" />
                      </th>
                      <th>
                        <Translate contentKey="group-attribute-customer.card-tag" />
                      </th>
                      {/* <th>Nguồn</th> */}
                      <th>
                        <Translate contentKey="group-attribute-customer.created-date" />
                      </th>
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
                          </tr>
                        );
                      })
                    ) : (
                        <tr>
                          <td className="none-data" colSpan={100}>
                            <Translate contentKey="group-attribute-customer.none-data-list-customer" />
                          </td>
                        </tr>
                      )}
                  </tbody>
                </Table>
              </div>
            </Loader>
            <div className="navigation">
              {list_customer_with_condition && Math.ceil(totalElements / 10) > 1 ? (
                <Row>
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

const mapStateToProps = ({ tagDataState, groupCustomerState, campaignManagament }: IRootState) => ({
  loading: groupCustomerState.list_customer_with_condition_index.loading,
  totalElements: groupCustomerState.list_customer_with_condition_index.totalElements,
  list_field_data: groupCustomerState.list_field_data,
  list_customer_with_condition: groupCustomerState.list_customer_with_condition,
  postRequest: groupCustomerState.postRequest,
  single_group_field: groupCustomerState.single_customer_field,
  list_group_customer: groupCustomerState.list_group_customer,
  info_version: campaignManagament.infoVersion,
  listFieldData: campaignManagament.listFieldData,
  list_clone_version: campaignManagament.cloneInfoVersion
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupModalConfig);
