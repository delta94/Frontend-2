import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import { downloadTotalResults } from 'app/actions/user-management';

import { Row, Col, Card, CardBody, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { makeData } from '../utils';
type MyProps = {};
type MyState = { value: any };
class DataTableBasic extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      value: makeData()
    };
  }

  render() {
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          className="table-details"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <div className="label-table-detail">
                  <Translate contentKey="userManagement.home.line-error" />
                  <button className="link-result" onClick={() => ({})}>
                    {/* them cac translate vao cac hard code*/}
                    <Translate contentKey="userManagement.home.download-result" />
                  </button>
                </div>

                <CardBody>
                  <ReactTable
                    data={this.state.value}
                    columns={[
                      {
                        columns: [
                          {
                            Header: 'Tên Khách Hàng',
                            accessor: 'firstName'
                          },
                          {
                            Header: 'Email',
                            id: 'lastName',
                            accessor: d => d.lastName
                          }
                        ]
                      },
                      {
                        columns: [
                          {
                            Header: 'Số điện thoại',
                            accessor: 'age'
                          },
                          {
                            Header: 'Phân Loại',
                            accessor: 'status'
                          }
                        ]
                      },
                      {
                        columns: [
                          {
                            Header: 'Lý do không thành công',
                            accessor: 'visits'
                          }
                        ]
                      }
                    ]}
                    showPagination={false}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>

        <Col md="12">
          <Button tag={Link} to="/admin/user-management" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />
            &nbsp;
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back" />
            </span>
          </Button>
        </Col>
      </Fragment>
    );
  }
}
const mapStateToProps = (storeState: IRootState) => ({
  ListFile: storeState.userManagement.listFiles,
  listUser: storeState.userManagement.dowloadTemplate
});

const mapDispatchToProps = { downloadTotalResults };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableBasic);
