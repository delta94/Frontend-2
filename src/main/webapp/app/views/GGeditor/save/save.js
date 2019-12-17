import React from "react";
import { withPropsAPI } from "gg-editor";
import { Row, Col, Card, Input, Button } from 'antd';

class Save extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = async () => {
    const { propsAPI } = this.props;
   await propsAPI.save()
   await this.props.onClick(propsAPI.save())
  };


  render() {
    return (
      <Button disabled = {this.props.isSave} onClick={this.handleClick}>Save</Button>
    );
  }
}

export default withPropsAPI(Save);