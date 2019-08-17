import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col,
  Card, CardBody,
  CardTitle, FormGroup, Label, Input
} from 'reactstrap';

import { Multiselect } from 'react-widgets'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let colors = [
  {name:'Orange',id:1},
  {name:'Red',id:2},
  {name:'Blue',id:3}
]

library.add(faSpinner);

class FormMultiSelectWidget extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      listCategory: [],
      categories: this.props.li,
    }
  }

  handChange = (name) =>{
    console.log(name)
  }

  handleCreate(name) {
    let { categories, value } = this.state;

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
    let { value, categories } = this.state;
    const {users} = this.props;
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
                      placeholder='Chọn phân loại'
                      data={users}
                      value={value}
                      className='Select-holder'
                      allowCreate="onFilter"
                      onCreate={name => this.handleCreate(name)}
                      onChange={data => this.handChange(data)}
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