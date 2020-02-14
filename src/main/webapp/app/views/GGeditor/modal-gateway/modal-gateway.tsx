import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modal-gateway.scss';
import { IRootState } from 'app/reducers';
import { Input, Card, Modal, Col, InputNumber, Select } from 'antd';
// import TagModal from "../tag-modal/tag-modal";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import FieldData from '../modal-group-customer/field-data/field-data';
import { ISearchAdvanced } from 'app/common/model/group-attribute-customer';
import { validateCampaign } from 'app/actions/campaign-managament';
import LoaderAnim from 'react-loaders';
import { openModal } from 'app/actions/modal';
import { OPERATOR } from 'app/constants/field-data';
import { code_node } from 'app/common/model/campaign-managament.model';

interface IModalGateWayProps extends StateProps, DispatchProps {
  is_show: boolean;
  toggle: Function;
  type_modal?: string;
  idNode: any;
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

interface IModalGateWayState {
  list_field_data_cpn: IComponentData[];
  categoryName?: string;
  advancedSearches?: ISearchAdvanced[];
  advancedSearchesData?: IAdvancedSearchesData[];
  logicalOperator?: string;
  error_advanced: string;
  node: any;
  isUpdate: boolean;
  valueName: string;
  value_name_error: string;
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

class ModalGateWay extends React.Component<IModalGateWayProps, IModalGateWayState> {
  state: IModalGateWayState = {
    list_field_data_cpn: [],
    categoryName: '',
    advancedSearches: [],
    advancedSearchesData: [],
    logicalOperator: '',
    error_advanced: '',
    node: {},
    isUpdate: false,
    valueName: '',
    value_name_error: ''
  };

  async componentWillReceiveProps(nextProps) {
    let { node, list_field_data_cpn } = this.state;
    let { list_clone_version } = this.props;
    if (Object.keys(list_clone_version).length > 0 && list_clone_version.cjId) {
      if (this.getConditionGetWay(nextProps.idNode.id) !== undefined) {
        if (node.id !== nextProps.idNode.id) {
          node = nextProps.idNode;
          list_field_data_cpn = await this.getValueAdv(nextProps.idNode.id, nextProps.is_show);
        }
      } else {
        list_field_data_cpn = [];
        node = nextProps.idNode;
      }
    }
    this.setState({ node, list_field_data_cpn });
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

  // Close modal
  closeConfigModal = () => {
    this.props.toggle();
    // this.removeDataInModal();
  };

  remove(arr, item) {
    for (var i = arr.length; i--; ) {
      if (arr[i].id === item.id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  save = () => {
    const { listFieldData, validateCampaign } = this.props;
    let { logicalOperator, advancedSearches, valueName } = this.state;
    let data = {
      messageConfig: listFieldData.messageConfig ? listFieldData.messageConfig : [],
      emailConfig: listFieldData.emailConfig ? listFieldData.emailConfig : [],
      listCampign: listFieldData.listCampign ? listFieldData.listCampign : [],
      timerEvent: listFieldData.timerEvent ? listFieldData.timerEvent : [],
      timer: listFieldData.timer ? listFieldData.timer : [],
      getway: listFieldData.getway ? listFieldData.getway : []
    };
    let nodeConfig = {
      id: this.props.idNode.id,
      logicalOperator,
      advancedSearches,
      name: valueName,
      label: valueName
    };
    if (this.checkValidate(advancedSearches)) {
      localStorage.removeItem('isSave');
      data.getway = data.getway.filter((item, index) => {
        return data.getway.indexOf(item) === index;
      });
      data.getway.push(nodeConfig);
      validateCampaign(data);
      this.setState({});

      this.props.toggle();
    }
  };

  getValueText = async event => {
    let { valueName } = this.state;
    valueName = event.target.value;
    this.setState({ valueName });
  };

  checkValidate(listSearch: any[]): boolean {
    let { valueName, value_name_error, error_advanced } = this.state;
    let result: boolean = true;
    let count: number = 0;
    listSearch &&
      listSearch.map(data => {
        if (!data.fieldId || !data.value || !data.operator) {
          count++;
        }
      });

    if (count > 0) {
      error_advanced = translate('gateway.error-advanced');
      result = false;
    } else {
      error_advanced = '';
    }

    if (valueName) {
      value_name_error = '';
    } else {
      count++;
      value_name_error = translate('gateway.please-input');
      result = false;
    }

    this.setState({ error_advanced: error_advanced, value_name_error: value_name_error });

    return result;
  }

  getConditionGetWay = node => {
    const { list_clone_version, idNode } = this.props;

    let data: { logicalOperator: string; advancedSearches: any[] };
    list_clone_version.flowDetail &&
      list_clone_version.flowDetail.nodeMetaData.map(event => {
        if (event.nodeId === node && event.code === code_node.GATEWAY) {
          data = event.nodeConfig;
        }
      });
    return data;
  };

  getValueAdv = async (node, is_show) => {
    let { list_field_data_cpn, logicalOperator, advancedSearches, advancedSearchesData } = this.state;
    (list_field_data_cpn = []), (advancedSearches = []), (advancedSearchesData = []);
    let data: { logicalOperator: string; advancedSearches: any[] };
    data = this.getConditionGetWay(node);
    let id = makeRandomId(16);
    if (data != undefined && is_show) {
      (await data.advancedSearches.length) > 0 &&
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
          advancedSearchesData.push({
            id,
            advancedSearch: dataSeacrh.default_data
          });
          logicalOperator = data.logicalOperator;
          advancedSearches = data.advancedSearches;
        });
    }
    this.setState({ list_field_data_cpn, advancedSearches, advancedSearchesData });
    console.log('a', advancedSearches);
    return list_field_data_cpn;
  };

  getNameValue = () => {
    const { listFieldData, idNode } = this.props;
    let data: string;
    listFieldData.getway &&
      listFieldData.getway.map(item => {
        if (item.id === idNode.id) {
          data = item.name;
        }
      });
    return data;
  };

  render() {
    let { is_show, type_modal, list_clone_version } = this.props;
    let { list_field_data_cpn, logicalOperator, advancedSearches, categoryName } = this.state;
    let nameValue = this.getNameValue();
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

    // if (Object.keys(list_clone_version).length > 0 && list_clone_version.cjId) {
    //   this.getValueAdv()
    // }
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    let title_modal = translate('gateway.title');

    return (
      <Modal
        destroyOnClose={true}
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
          <Button key="back" color="primary" onClick={() => this.save()}>
            <Translate contentKey="group-attribute-customer.save" />
          </Button>
        ]}
      >
        <div className="group-modal-config">
          {/* Chose condition */}
          <div className="group-addition">
            <Row>
              <Col span={3}>
                <label className="input-search_label">{translate('gateway.name')}</label>
              </Col>
              <Col span={17}>
                <Input
                  defaultValue={nameValue}
                  style={{ width: '80%' }}
                  // placeholder={translate('group-attribute-customer.group-modal-config.name-placeholder')}
                  onChange={event => this.getValueText(event)}
                  maxLength={160}
                />
              </Col>
            </Row>
            <p style={{ color: 'red', marginLeft: '13%' }}>{this.state.value_name_error}</p>

            <br />
            <Card style={{ padding: '0px' }}>
              <div className="group-addition_block-out">
                <span style={{ textTransform: 'uppercase', fontWeight: 500 }}>CHỌN ĐIỀU KIỆN</span>
              </div>
            </Card>
            <Card>
              <div className="group-addition_content">
                {list_field_render}
                <p style={{ color: 'red', marginLeft: '5%' }}> {this.state.error_advanced}</p>
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
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ tagDataState, groupCustomerState, campaignManagament }: IRootState) => ({
  loading: groupCustomerState.list_customer_with_condition_index.loading,
  info_version: campaignManagament.infoVersion,
  listFieldData: campaignManagament.listFieldData,
  list_clone_version: campaignManagament.cloneInfoVersion
});

const mapDispatchToProps = {
  openModal,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModalGateWay);
