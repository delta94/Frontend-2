import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Row } from 'antd';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openModal, closeModal } from '../../../../../actions/modal';
import SweetAlert from 'sweetalert-react';
import {
  getUser,
  getRoles,
  updateUser,
  createUser,
  reset,
  getUserCategories,
  updateCategory,
  resetMessage
} from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
export interface IBasicProps extends StateProps, DispatchProps {}

export interface IBasicState {}

export class Basic extends React.Component<IBasicProps, IBasicState> {
  state: IBasicState = {};

  render() {
    return (
      <Card title="Card title">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}

const mapStateToProps = ({ handleModal }: IRootState) => ({
  modalState: handleModal.data
});

const mapDispatchToProps = { resetMessage, openModal, closeModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basic);
