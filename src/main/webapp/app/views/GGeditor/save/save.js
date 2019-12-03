import React from "react";
import { withPropsAPI } from "gg-editor";
import { Row, Col, Card, Input, Button } from 'antd';

class Save extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const { propsAPI } = this.props;
    console.log(propsAPI.save())
    propsAPI.save()
    localStorage.setItem("nodeStore", JSON.stringify(propsAPI.save()))
  };


  render() {
    return (
      <Button  onClick={this.handleClick}>Save</Button>
    );
  }
}

export default withPropsAPI(Save);