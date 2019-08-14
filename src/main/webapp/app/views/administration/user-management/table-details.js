import React, { Fragment } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';

import {
    Row, Col,
    Card, CardBody, Label, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

import ReactTable from "react-table";

import { makeData } from './utils';

export default class DataTableBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: makeData()
        };
    }

    render() {

        const { data } = this.state;
        return (
            <Fragment>

                <ReactCSSTransitionGroup
                    component="div"
                    className="table-details"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <Label style={{
                                    marginBottom: '-10px',
                                    marginTop: '5px',
                                    marginLeft: '15px'
                                }}>
                                    <h4>
                                        <Translate contentKey="userManagement.home.line-error">Line Error</Translate>
                                        <a href="#/top" style={{ float: 'right', marginRight: '10px' }}>Tải kết quả đầy đủ</a>
                                    </h4>

                                </Label>
                                <CardBody>
                                    <ReactTable
                                        data={data}
                                        columns={[
                                            {

                                                columns: [
                                                    {
                                                        Header: "Tên Khách Hàng",
                                                        accessor: "firstName"
                                                    },
                                                    {
                                                        Header: "Email",
                                                        id: "lastName",
                                                        accessor: d => d.lastName
                                                    }
                                                ]
                                            },
                                            {

                                                columns: [
                                                    {
                                                        Header: "Số điện thoại",
                                                        accessor: "age"
                                                    },
                                                    {
                                                        Header: "Phân Loại",
                                                        accessor: "status"
                                                    }
                                                ]
                                            },
                                            {

                                                columns: [
                                                    {
                                                        Header: "Lý do không thành công",
                                                        accessor: "visits"
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
             
                <Col md ="12">
                <Button tag={Link} to="/admin/user-management" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            </Col>
            </Fragment >
        )
    }
} 