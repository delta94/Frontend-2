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

library.add(faSpinner);

class FormMultiSelectWidget extends React.Component {

  handleChange = (data) => {
    this.props.handleChange(data)
  }

  render() {
    const { listCategory, defaultCate } = this.props;
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
                      data={listCategory}
                      defaultValue={defaultCate}
                      value={defaultCate}
                      className='Select-holder'
                      allowCreate="onFilter"
                      onCreate={name => this.props.handleCreate(name)}
                      onChange={data => this.handleChange(data)}
                      textField="typeName"
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