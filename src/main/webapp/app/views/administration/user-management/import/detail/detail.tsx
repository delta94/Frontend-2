import React from 'react';
//todo: bo vao thu muc rieng
import './detail.scss';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Table, Container, CardTitle, Card, CardBody } from 'reactstrap';
import { Button, Radio, Icon } from 'antd';
import { Translate } from 'react-jhipster';
import Loader from 'react-loader-advanced';
import LoaderAnim from 'react-loaders';
import { getUser, exportFileResult, openModalImport, closeModalImport } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IUserDetailProps extends StateProps, DispatchProps {}

export class UserDetail extends React.Component<IUserDetailProps> {
  render() {
    const { listFile, loading, openModalImport } = this.props;
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

    const spinner = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Container fluid>
        <Loader message={spinner} show={loading} priority={10}>
          <Card className="main-card mb-3">
            <CardBody>
              <Row style={{ marginBottom: '10px' }}>
                <Col md="6">
                  <CardTitle>
                    <Translate contentKey="userManagement.home.import-result-detail" />
                  </CardTitle>
                </Col>
                <Col md="6" style={{ textAlign: 'right' }} />
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

                <Button
                  className={hiddenLink}
                  type="link"
                  onClick={() => {
                    this.props.exportFileResult(this.props.listFile.fileName);
                  }}
                >
                  {/* them cac translate vao cac hard code*/}
                  <Icon type="cloud-download" style={{ fontSize: '24px' }} /> <Translate contentKey="userManagement.home.download-result" />
                </Button>
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
                      <Translate contentKey="userManagement.card-tag" />
                    </th>
                    <th>
                      <Translate contentKey="userManagement.home.reason-error" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listFile.listErrorImport
                    ? listFile.listErrorImport.map((event, index, listUser) => {
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
                        }
                        var tableElement = (
                          <tr key={index}>
                            <td>{event.firstName + ' ' + event.lastName}</td>
                            <td>{event.email}</td>
                            <td>{event.mobile}</td>
                            <td>{event.tag}</td>
                            <td className="widget-heading text-danger" key={index}>
                              {event.error}
                            </td>
                          </tr>
                        );
                        return tableElement;
                      })
                    : ''}
                </tbody>
              </Table>
              {noRecord}
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

const mapDispatchToProps = {
  getUser,
  exportFileResult,
  openModalImport,
  closeModalImport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);
