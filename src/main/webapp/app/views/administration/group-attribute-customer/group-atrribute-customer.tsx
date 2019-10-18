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

export interface IGroupAttributeCustomerProps extends StateProps, DispatchProps {}

export interface IGroupAttributeCustomerState {
  id_list_customer: string;
  is_show: boolean;
  title_modal?: string;
  type_modal: string;
  modalState?: IOpenModal;
}
class GroupAttributeCustomer extends React.Component<IGroupAttributeCustomerProps, IGroupAttributeCustomerState> {
  state: IGroupAttributeCustomerState = {
    id_list_customer: null,
    is_show: false,
    type_modal: '',
    modalState: {}
  };

  componentDidMount() {}

  // Show modal config
  toggleModalConfig = () => {
    let { is_show } = this.state;
    is_show = !is_show;
    this.setState({ is_show });
  };

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
    if (type_modal === INSERT_CUSTOMER_GROUP) id_list_customer = '';
    this.setState({ type_modal, id_list_customer });
    this.toggleModalConfig();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalState) {
      return {
        modalState: nextProps.modalState
      };
    }
  }

  render() {
    let { is_show, title_modal, id_list_customer, type_modal } = this.state;
    let { modalState } = this.props;
    return (
      <div className="group-attribute-customer">
        <div id="user-management-title">
          <Translate contentKey="group-attribute-customer.header" />
          <Button color="primary" style={{ float: 'right' }} onClick={() => this.setStateForModal(INSERT_CUSTOMER_GROUP)}>
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
  modalState: groupCustomerState.postRequest
});

const mapDispatchToProps = {
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupAttributeCustomer);
