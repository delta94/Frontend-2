import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Card, CardBody
} from 'reactstrap';

import ReactTable from "react-table";

import {makeData} from "./user-utils";

export default class DataTableBasic extends React.Component {
    constructor() {
        super();
        this.state = {
            data: makeData()
        };
    }

    render() {
        const {data} = this.state;

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div" // thẻ div
                    transitionName="TabsAnimation"  // Tên bảng
                    transitionAppear={true}   // anything
                    transitionAppearTimeout={0} // time xuất hiện
                    transitionEnter={false}  
                    transitionLeave={false}>
                    <div>
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <ReactTable
                                        data={data}  // gen từ  makeData();
                                        columns={[
                                            {
                                                columns: [
                                                    {
                                                        Header: "Họ tên",  // thead
                                                        accessor: "fullName"  // map với trường data trong makeData();
                                                    },
                                                    {
                                                        Header: "Số điện thoại",
                                                        accessor: "phone",
                                                    }
                                                ]
                                            },
                                            {
                                                
                                                columns: [
                                                    {
                                                        Header: "Email",
                                                        accessor: "email"
                                                    },
                                                    {
                                                        Header: "Phân loại",
                                                        accessor: "profiles"
                                                    }
                                                ]
                                            },
                                            {
                                                Header: "Chức năng",
                                                columns: [
                                                    {
                                                        accessor: (<Button tag={Link} to={`${match.url}/${user.fullName}/edit`} color="primary" size="sm">
                                                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                                                        <span className="d-none d-md-inline">
                                                          <Translate contentKey="entity.action.edit">Edit</Translate>
                                                        </span>
                                                      </Button>)
                                                    },
                                                        <Button
                                                        tag={Link}
                                                        to={`${match.url}/${user.fullName}/delete`}
                                                        color="danger"
                                                        size="sm"
                                                        disabled={account.fullName === user.fullName}
                                                    >
                                                        <FontAwesomeIcon icon="trash" />{' '}
                                                        <span className="d-none d-md-inline">
                                                        <Translate contentKey="entity.action.delete">Delete</Translate>
                                                        </span>
                                                    </Button> 
                                                ]
                                            }
                                        ]}
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}