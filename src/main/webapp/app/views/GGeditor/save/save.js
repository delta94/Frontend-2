import React from "react";
import { withPropsAPI } from "gg-editor";
import { Row, Col, Card, Input, Button } from 'antd';

class Save extends React.Component {
  constructor(props){
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
      <div >
        <Button type="primary" onClick={this.handleClick}>Save Node</Button>
      </div>
    );
  }
}

export default withPropsAPI(Save);