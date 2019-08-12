import React, {Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Card, CardBody
} from 'reactstrap';

import ReactTable from "react-table";

import {makeData} from './utils';

export default class DataTableBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: makeData()
        };
    }

    render() { 
        const {data} = this.state; 

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    className = "table-details"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                   
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
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
                                        showPagination ={false}
                                        defaultPageSize={3}
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