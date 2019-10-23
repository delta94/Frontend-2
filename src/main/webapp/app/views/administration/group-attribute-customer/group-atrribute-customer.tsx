import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import './group-attribute-customer.scss';
import { IRootState } from 'app/reducers';
import SweetAlert from 'sweetalert-react';
import { openModal, closeModal } from '../../../actions/modal';
import GroupListCustomer from './group-list-customer/group-list-customer';
import GroupCustomer from './group-customer/group-customer';
import GroupModalConfig from './group-modal-config/group-modal-config';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { INSERT_CUSTOMER_GROUP } from '../../../constants/group-atrribute-customer';
import { IOpenModal } from '../../../reducers/modal';
import {
  getFindCustomerWithConditionAction,
  getListCustomerGroupDataAction,
  getListCustomerWithGroupIdDataAction
} from '../../../actions/group-attribute-customer';

export interface IGroupAttributeCustomerProps extends StateProps, DispatchProps {}

export interface IGroupAttributeCustomerState {
  id_list_customer: string;
  is_show: boolean;
  title_modal?: string;
  type_modal: string;
  modalState?: IOpenModal;
  list_group_customer?: any;
}
class GroupAttributeCustomer extends React.Component<IGroupAttributeCustomerProps, IGroupAttributeCustomerState> {
  state: IGroupAttributeCustomerState = {
    id_list_customer: null,
    is_show: false,
    type_modal: INSERT_CUSTOMER_GROUP,
    modalState: {},
    list_group_customer: []
  };

  // Show modal config
  toggleModalConfig = () => {
    let { is_show } = this.state;
    is_show = !is_show;
    this.setState({ is_show, id_list_customer: '' });
  };

  async componentDidMount() {
    let { list_group_customer } = this.props;
    let { id_list_customer } = this.state;

    await this.props.getListCustomerGroupDataAction('');
    await this.props.getListCustomerWithGroupIdDataAction('', 0, 10, id_list_customer);
  }

  // Set title for modal
  setTitleForModalConfig = (title?: string) => {
    this.setState({ title_modal: title });
    this.toggleModalConfig();
  };

  // Chose id for list customer
  setIdForListCustomer = id_list_customer => {
    this.setState({ id_list_customer });
  };

  // Set state of modal
  setStateForModal = (type_modal: string, id?: string) => {
    let { id_list_customer } = this.state;
    if (!id) id_list_customer = '';

    if (type_modal === INSERT_CUSTOMER_GROUP) {
      id_list_customer === '';
    } else {
      id_list_customer = id;
    }
    this.setState({ type_modal, id_list_customer });
    this.toggleModalConfig();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.list_group_customer && nextProps.list_group_customer !== prevState.list_group_customer) {
      let { modalState } = prevState;
      let { list_group_customer } = nextProps;
      let id_list_customer = list_group_customer && list_group_customer.length > 0 ? list_group_customer[0].id : '';
      if (nextProps.modalState) {
        let modalState = nextProps.modalState;
      }
      return {
        id_list_customer,
        list_group_customer: nextProps.list_group_customer,
        modalState
      };
    }

    return null;
  }

  render() {
    let { is_show, title_modal, id_list_customer, type_modal } = this.state;
    let { modalState } = this.props;
    return (
      <div className="group-attribute-customer">
        <div id="user-management-title">
          <Translate contentKey="group-attribute-customer.header" />
          <Button
            color="primary"
            style={{ float: 'right' }}
            onClick={() => {
              this.setStateForModal(INSERT_CUSTOMER_GROUP);
              this.props.getFindCustomerWithConditionAction({
                logicalOperator: '',
                advancedSearches: [],
                page: 0,
                pageSize: 10
              });
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo nhóm mới
          </Button>
        </div>
        <Fragment>
          <SweetAlert
            title={modalState.title ? modalState.title : 'No title'}
            confirmButtonColor=""
            show={modalState.show ? modalState.show : false}
            text={modalState.text ? modalState.text : 'No'}
            type={modalState.type ? modalState.type : 'error'}
            onConfirm={() => this.props.closeModal()}
          />
          <Row>
            <GroupCustomer setIdForListCustomer={this.setIdForListCustomer} setStateForModal={this.setStateForModal} />
            <GroupListCustomer id_list_customer={id_list_customer} />
            <div className="content-group-modal-attribute">
              <GroupModalConfig
                is_show={is_show}
                type_modal={type_modal}
                id_list_customer={id_list_customer}
                toggle={this.toggleModalConfig}
                title_modal={title_modal}
              />
            </div>
          </Row>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({ groupCustomerState }: IRootState) => ({
  modalState: groupCustomerState.postRequest,
  list_group_customer: groupCustomerState.list_group_customer
});

const mapDispatchToProps = {
  getFindCustomerWithConditionAction,
  getListCustomerGroupDataAction,
  getListCustomerWithGroupIdDataAction,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupAttributeCustomer);
