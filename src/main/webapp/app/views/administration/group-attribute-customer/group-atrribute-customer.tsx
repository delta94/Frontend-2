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

export interface IGroupAttributeCustomerProps extends StateProps, DispatchProps {}

export interface IGroupAttributeCustomerState {}
class GroupAttributeCustomer extends React.Component<IGroupAttributeCustomerProps, IGroupAttributeCustomerState> {
  state = {};

  componentDidMount() {}

  render() {
    const { modalState } = this.props;

    return (
      <div className="group-attribute-customer">
        <div id="user-management-title">
          <Translate contentKey="group-attribute-customer.header" />
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
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupAttributeCustomer);
