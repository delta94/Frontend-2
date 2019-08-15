import React from 'react';
import DataTableFixedHeader from './components/table-details';
//todo: bo vao thu muc rieng
import './styles/user-management.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge, Col, Label, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';

import { getUser } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IUserManagementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export class UserManagementDetail extends React.Component<IUserManagementDetailProps> {
  render() {
    const { user } = this.props;
    return (
      <Row>
        <Col md="8">
          <h5 className="d-none d-md-inline">
            <Translate contentKey="userManagement.home.detail-label" />
          </h5>
        </Col>
        <Col md="12">
          <Button tag={Link} to="./new" replace color="info">
            &nbsp;
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.continue" />
            </span>
          </Button>
        </Col>

        <div className=" table-mini">
          <Col md="4">
            <Translate contentKey="entity.action.total-table" interpolate={{ number: '150' }} />
          </Col>
          <Col md="4">
            <Translate contentKey="entity.action.table-not-error" interpolate={{ number: '150' }} />
          </Col>
          <Col md="4">
            <Translate contentKey="entity.action.table-error" interpolate={{ number: '150' }} />
          </Col>
        </div>

        <Col md="8">
          <div className="span-line" />
        </Col>

        <DataTableFixedHeader />
      </Row>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user
});

const mapDispatchToProps = { getUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementDetail);
