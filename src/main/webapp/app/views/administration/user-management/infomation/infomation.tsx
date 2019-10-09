import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openModal, closeModal } from '../../../../actions/modal';
import SweetAlert from 'sweetalert-react';
import Member from './member/member';
import './infomation.scss';
import HistoryActive from './history-active/history-active';
import { resetMessage } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import Basic from './basic/basic';

export interface IInfomationProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IInfomationState {}

export class Infomation extends React.Component<IInfomationProps, IInfomationState> {
  state: IInfomationState = {};

  render() {
    let { modalState } = this.props;
    return (
      <Fragment>
        <SweetAlert
          title={modalState.title ? modalState.title : 'No title'}
          confirmButtonColor=""
          show={modalState.show ? modalState.show : false}
          text={modalState.text ? modalState.text : 'No'}
          type={modalState.type ? modalState.type : 'error'}
          onConfirm={() => this.props.closeModal()}
        />
        <div id="user-management-title">
          <Translate contentKey="userManagement.home.title" />
        </div>
        <Row>
          <Col span={12} style={{ marginTop: '1%' }}>
            <Basic />
            <Member />
          </Col>
          <Col span={12} style={{ marginTop: '1%', width: '49.7%', float: 'right' }}>
            <HistoryActive />
          </Col>
        </Row>
      </Fragment>
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
)(Infomation);
