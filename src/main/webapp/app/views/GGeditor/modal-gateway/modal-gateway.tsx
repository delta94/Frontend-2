import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modal-gateway.scss';
import { IRootState } from 'app/reducers';
import { Input, Card, Modal } from 'antd';
// import TagModal from "../tag-modal/tag-modal";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import FieldData from '../modal-group-customer/field-data/field-data';
import { ISearchAdvanced } from 'app/common/model/group-attribute-customer';
import { validateCampaign } from 'app/actions/campaign-managament';
import LoaderAnim from 'react-loaders';
import { openModal } from 'app/actions/modal';
import { OPERATOR } from 'app/constants/field-data';

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
    error_advanced: ''
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

  componentDidMount() {
    this.handleAddNewComponent();
  }

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
    this.removeDataInModal();
  };

  remove(arr, item) {
    for (var i = arr.length; i--;) {
      if (arr[i].id === item.id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  save = () => {
    const { listFieldData, validateCampaign } = this.props;
    let { logicalOperator, advancedSearches } = this.state;
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
      advancedSearches
    };
    if (this.checkValidate(advancedSearches)) {
      localStorage.removeItem('isSave');
      data.messageConfig = this.remove(data.messageConfig, this.props.idNode);
      data.getway.push(nodeConfig);
      validateCampaign(data);
      this.props.toggle();
    }
  };

  checkValidate(listSearch: any[]): boolean {
    let result: boolean = true
    let count: number = 0
    listSearch && listSearch.map(data => {
      if (!data.fieldId || !data.value || !data.operator) {
        count++
      }
    })

    if (count > 0) {
      this.setState({ error_advanced: translate("getway.error-advanced") })
      result = false
    } else {
      this.setState({ error_advanced : ""})
    }
    return result
  }

  render() {
    let { is_show, type_modal } = this.props;
    let { list_field_data_cpn, logicalOperator, advancedSearches, categoryName } = this.state;
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
    let title_modal = translate("getway.title");

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
          <Button key="back" color="primary" onClick={() => this.save()}>
            <Translate contentKey="group-attribute-customer.save" />
          </Button>
        ]}
      >
        <div className="group-modal-config">
          {/* Chose condition */}
          <div className="group-addition">
            <Card style={{ padding: '0px' }}>
              <div className="group-addition_block-out">
                <span style={{ textTransform: 'uppercase', fontWeight: 500 }}>CHỌN ĐIỀU KIỆN</span>
              </div>
            </Card>
            <Card>
              <div className="group-addition_content">
                {list_field_render}
                <p style={{ color: "red", marginLeft : "5%" }} > {this.state.error_advanced}</p>
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
  listFieldData: campaignManagament.listFieldData
});

const mapDispatchToProps = {
  openModal,
  validateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModalGateWay);
