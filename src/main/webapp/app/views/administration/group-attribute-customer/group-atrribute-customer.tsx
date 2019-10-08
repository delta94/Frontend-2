import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import './group-attribute-customer.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import SweetAlert from 'sweetalert-react';
import { openModal, closeModal } from '../../../actions/modal';
import GroupListCustomer from './group-list-customer/group-list-customer';
import GroupCustomer from './group-customer/group-customer';
import GroupModalConfig from './group-modal-config/group-modal-config';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { getListFieldDataAction } from '../../../actions/group-attribute-customer';

export interface IGroupAttributeCustomerProps extends StateProps, DispatchProps {}

export interface IGroupAttributeCustomerState {
  id_group_customer: string;
  is_show: boolean;
}
class GroupAttributeCustomer extends React.Component<IGroupAttributeCustomerProps, IGroupAttributeCustomerState> {
  state = {
    id_group_customer: null,
    is_show: true
  };

  componentDidMount() {
    this.props.getListFieldDataAction();
  }

  toggle = () => {
    let { is_show } = this.state;
    is_show = !is_show;
    this.setState({ is_show });
  };

  render() {
    const { modalState } = this.props;
    let { is_show } = this.state;

    return (
      <div className="group-attribute-customer">
        <div id="user-management-title">
          <Translate contentKey="group-attribute-customer.header" />
          <Button color="primary" style={{ float: 'right' }} onClick={this.toggle}>
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
            <GroupCustomer />
            <GroupListCustomer />
            <GroupModalConfig is_show={is_show} toggle={this.toggle} />
          </Row>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState, handleModal }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags,
  modalState: handleModal.data
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  getListFieldDataAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupAttributeCustomer);
