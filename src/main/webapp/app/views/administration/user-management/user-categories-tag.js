import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle, FormGroup, Label, Input
} from 'reactstrap';

import {Multiselect} from 'react-widgets'

import {library} from '@fortawesome/fontawesome-svg-core';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

let colors = ['Orange', 'Red', 'Blue', 'Purple']

library.add(faSpinner);

class FormMultiSelectWidget extends React.Component {
    constructor(...args) {
        super(...args)

        this.state = {
            listCategory: [],
            categories: this.props.li,
        }
    }

    handleCreate(name) {
        let {categories, value} = this.state;

        let newOption = {
            name,
            id: categories.length + 1
        }

        this.setState({
            value: [...value, newOption],  // select new option
            categories: [...categories, newOption] // add new option to our dataset
        })
    }

    render() {
        let {value, categories} = this.state;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    // transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        
                        <Col md="12" >
                            <Card className="main-card mb-3">
                                    <Row form>
                                        <Col md={12}>
                                            <Multiselect 
                                                placeholder = 'Chọn phân loại'
                                                data={categories}
                                                value={value}
                                                className='Select-holder'
                                                allowCreate="onFilter"
                                                onCreate={name => this.handleCreate(name)}
                                                onChange={value => this.setState({value})}
                                                textField="name"
                                            />
                                        </Col>
                                    </Row>
                            </Card>
                            
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

export default FormMultiSelectWidget;