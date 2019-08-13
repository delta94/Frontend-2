import React from 'react';
import DataTableFixedHeader from './table-details';
import './user-management.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge, Col, Label, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <Translate contentKey="userManagement.home.createOrEditLabel">Create</Translate>
          </h1>
        </Col>
        <Col md="12">
          <Button tag={Link} to="/admin/user-management" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />
            &nbsp;
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          <Button tag={Link} to="/admin/user-management/new" replace color="info">
            &nbsp;
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.continue">Continue Upload</Translate>
            </span>
          </Button>
        </Col>

        <Table className="mb-0" bordered>
          <thead>
            <tr>
              <td>File dữ liệu</td>
              <td>tổng 651 dòng</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" />
              <td> 641 dòng thành công</td>
              <td>10 dòng không thành công</td>
            </tr>
          </tbody>
        </Table>

        <Col md="8">
          <div className="span-line">
            <Label>
              <h4>
                <Translate contentKey="userManagement.home.line-error">Line Error</Translate>
              </h4>
            </Label>
          </div>
        </Col>
        <Col md="4">
          <a href="#/top">Tải kết quả đầy đủ</a>
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
