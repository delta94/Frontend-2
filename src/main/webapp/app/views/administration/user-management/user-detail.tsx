import React from 'react';
import DataTableFixedHeader from './table-details';
import './user-management.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge, Col, Label, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';

import { getUser } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IUserManagementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export class UserManagementDetail extends React.Component<IUserManagementDetailProps> {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  render() {
    const { user } = this.props;
    return (
      <Row>
        <Col md="8">
          <h1>
            <Translate contentKey="userManagement.home.detail-label">Deilta</Translate>
          </h1>
        </Col>
        <Col md="12">
          <Button tag={Link} to="./new" replace color="info">
            &nbsp;
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.continue">Continue Upload</Translate>
            </span>
          </Button>
        </Col>

        <Table className="mb-0" bordered style={{ background: 'antiquewhite' }}>
          <tbody>
            <tr>
              <td> Tổng số {150} bản ghi </td>
              <td> {140} bản ghi không lỗi</td>
              <td> {10} bản ghi lỗi</td>
            </tr>
          </tbody>
        </Table>

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
