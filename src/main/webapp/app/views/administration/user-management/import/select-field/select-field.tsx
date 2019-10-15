import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Row, Col, Button } from 'antd';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert-react';
import './select-field.scss';
import { resetMessage } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IInfomationProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IInfomationState {}

export class Infomation extends React.Component<IInfomationProps, IInfomationState> {
  state: IInfomationState = {};

  render() {
    let { modalState, user } = this.props;
    return (
      <Fragment>
        <div id="user-info-title">
          <Button className="btn btn-primary float-right jh-create-entity" color="primary">
            <Translate contentKey="userManagement.home.edit" />
          </Button>
        </div>
        <Row>
          <Col span={12} style={{ marginTop: '1%' }}>
            <Card>aaaaaa</Card>
          </Col>
          <Col span={12} style={{ marginTop: '1%', width: '49.7%', float: 'right' }} />
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ handleModal, userManagement }: IRootState) => ({
  modalState: handleModal.data,
  user: userManagement.user
});

const mapDispatchToProps = { resetMessage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Infomation);
