import React, {Component, Fragment} from 'react';
import {renderToStaticMarkup} from 'react-dom/server'
import SweetAlert from 'sweetalert-react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Card, CardBody, Button,
    CardTitle
} from 'reactstrap';

export default class SweetAlerts extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
        };
    }

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    
                        <Col md="3">
                            <Card className="mb-3 text-center">
                                <CardBody>
                                    <CardTitle>Confirm Button Function</CardTitle>
                                    <Button color="primary" onClick={() => this.setState({message5: true})}>Show
                                        Alert</Button>
                                    <SweetAlert
                                        title="Are you sure?"
                                        confirmButtonColor=""
                                        show={this.state.message5}
                                        text="You will not be able to recover this imaginary file!"
                                        showCancelButton
                                        onConfirm={() => this.setState({showDeleteSuccessAlert: true})}
                                        onCancel={() => this.setState({message5: true})}/>

                                    <SweetAlert
                                        title="Deleted"
                                        confirmButtonColor=""
                                        show={this.state.showDeleteSuccessAlert}
                                        text="Your imaginary file has been deleted."
                                        type="success"
                                        onConfirm={() => this.setState({showDeleteSuccessAlert: false})}/>
                                </CardBody>
                            </Card>
                        </Col>

                        

                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}
