import React from 'react';
//todo: bo vao thu muc rieng
import './styles/user-management.scss';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table, Container, CardTitle, Card, CardBody } from 'reactstrap';
import { Translate } from 'react-jhipster';
import Loader from 'react-loader-advanced';
import { Loader as LoaderAnim } from 'react-loaders';
import { getUser } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IUserManagementDetailProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{
      login: string;
    }> {}

export class UserManagementDetail extends React.Component<IUserManagementDetailProps> {
  render() {
    const { listFile, loading } = this.props;
    var hiddenLink = 'link-result';
    var noRecord, numberError;
    if (listFile.error === 0) {
      hiddenLink = 'classHiden';
      noRecord = (
        <p className="noRecord">
          <Translate contentKey="userManagement.home.no-record" />
        </p>
      );
    }
    if (listFile.error <= 10) {
      numberError = listFile.error;
    } else if (listFile.error > 10) {
      numberError = 10;
    } else {
      numberError = '';
      noRecord = (
        <p className="noRecord">
          <Translate contentKey="userManagement.home.no-record" />
        </p>
      );
      hiddenLink = 'classHiden';
    }

    const url = ' http://171.244.40.91:8088/v1/customer/import-result?fileName=' + listFile.fileName;
    const spinner = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    return (
      <Container fluid>
        <Loader message={spinner} show={loading} priority={10}>
          <Card className="main-card mb-3">
            <CardBody>
              <Row>
                <Col md="6">
                  <CardTitle>
                    <Translate contentKey="userManagement.home.import-result-detail" />
                  </CardTitle>
                </Col>
                <Col md="6">
                  <Button tag={Link} to="./new" replace color="info">
                    &nbsp;
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.continue" />
                    </span>
                  </Button>
                </Col>
              </Row>
              <Row className="no-gutters ">
                <Col md="6" xl="4">
                  <div className="widget-content">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-right ml-0 mr-3">
                        <div className="widget-heading text-warning">{listFile.total}</div>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          <Translate contentKey="entity.action.total-table" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md="6" xl="4">
                  <div className="widget-content">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-right ml-0 mr-3">
                        <div className="widget-heading text-success">{listFile.success}</div>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          <Translate contentKey="entity.action.table-not-error" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md="6" xl="4">
                  <div className="widget-content">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-right ml-0 mr-3">
                        <div className="widget-heading text-danger">{listFile.error}</div>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          <Translate contentKey="entity.action.table-error" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="span-line" />

              <Col>
                <Translate contentKey="userManagement.home.line-error" interpolate={{ number: numberError }} />

                <a className={hiddenLink} href={url}>
                  {/* them cac translate vao cac hard code*/}
                  <Translate contentKey="userManagement.home.download-result" />
                </a>
              </Col>

              <Table striped className="mb-0">
                <thead>
                  <tr>
                    <th className="center">
                      <Translate contentKey="userManagement.home.customer-name" />
                    </th>
                    <th>
                      <Translate contentKey="userManagement.home.email" />
                    </th>
                    <th>
                      <Translate contentKey="userManagement.home.phone-number" />
                    </th>
                    <th>
                      <Translate contentKey="userManagement.home.type" />
                    </th>
                    <th>
                      <Translate contentKey="userManagement.home.reason-error" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listFile.listErrorImport
                    ? listFile.listErrorImport.map((event, index, listUser) => {
                        var ramdomIdName =
                          Math.random()
                            .toString(36)
                            .substring(2, 15) +
                          Math.random()
                            .toString(36)
                            .substring(2, 15);
                        var ramdomIdEmail =
                          Math.random()
                            .toString(36)
                            .substring(2, 15) +
                          Math.random()
                            .toString(36)
                            .substring(2, 15);
                        var ramdomIdPhone =
                          Math.random()
                            .toString(36)
                            .substring(2, 15) +
                          Math.random()
                            .toString(36)
                            .substring(2, 15);
                        var ramdomIdType =
                          Math.random()
                            .toString(36)
                            .substring(2, 15) +
                          Math.random()
                            .toString(36)
                            .substring(2, 15);
                        if (listUser.length === 0) {
                          var haveNoRecord = (
                            <td>
                              <Translate contentKey="entity.action.table-no-record" />{' '}
                            </td>
                          );
                          return haveNoRecord;
                        }
                        if (listUser.length > 10) {
                          listUser.splice(10, listUser.length);
                          console.log(listUser.length);
                        }
                        if (event.type !== '') {
                          var tableElement = (
                            <tr key={index}>
                              <td key={ramdomIdName}>{event.name}</td>
                              <td key={ramdomIdEmail}>{event.email}</td>
                              <td key={ramdomIdPhone}>{event.phone}</td>
                              <td key={ramdomIdType}>{event.type}</td>
                              <td className="widget-heading text-danger" key={index}>
                                {event.error}
                              </td>
                            </tr>
                          );
                        }
                        return tableElement;
                      })
                    : ''}
                </tbody>
              </Table>
              {noRecord}
              <Col md="12">
                <Button tag={Link} to="/admin/user-management" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back" />
                  </span>
                </Button>
              </Col>
            </CardBody>
          </Card>
        </Loader>
      </Container>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  listFile: storeState.userManagement.listFiles,
  loading: storeState.userManagement.loading
});

const mapDispatchToProps = { getUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementDetail);
