import React, { Fragment, Component } from 'react';
import Slider from 'react-slick';
import { Input, Card, Col, Container, Row } from 'reactstrap';
import SweetAlert from 'sweetalert-react';
import { ICampaignManagementState } from '../campaign-create';

export interface IResponsiveProps {}

export interface IResponsiveState {
  isActive: boolean;
  cssTitle: string;
  cssGrid: string;
  urlImage: string;
  gridItem: string;
  fileImport: string;
  image: string;
  isError: boolean;
  disableDocument: string;
}
export default class Responsive extends Component<IResponsiveProps, IResponsiveState> {
  constructor(props: IResponsiveProps) {
    super(props);
  }
  state: IResponsiveState = {
    isActive: true,
    cssTitle: 'camp-titles',
    cssGrid: '',
    urlImage: '',
    gridItem: 'grid-items',
    fileImport: '',
    image: '',
    isError: false,
    disableDocument: ''
  };
  onClick = () => {
    console.log(this.props.value.listValid.name);
    this.setState({
      isActive: !this.state.isActive
    });

    if (
      this.props.value.listValid.day !== undefined &&
      this.props.value.listValid.name !== undefined &&
      this.props.value.listValid.descri !== undefined &&
      this.props.value.listValid.day !== '' &&
      this.props.value.listValid.name !== '' &&
      this.props.value.listValid.descri !== '' &&
      this.props.value.ValidateField === '' &&
      this.props.value.ValidateDay === '' &&
      this.props.value.ValidateName === ''
    ) {
      this.setState({
        isError: false,
        disableDocument: 'campaign-document'
      });

      this.props.onClick('true');
    } else {
      this.setState({
        isError: true,
        disableDocument: ''
      });
    }
  };
  render() {
    return (
      <Fragment>
        <SweetAlert
          title="vui lòng input các trường còn thiếu"
          confirmButtonColor=""
          show={this.state.isError}
          text=""
          type="error"
          onConfirm={() => this.setState({ isError: false })}
        />
        <Row className={this.state.disableDocument}>
          <Col onClick={this.onClick}>
            <div className="grid-items">
              <div className="camp-top">
                <label className="camp-titles"> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách aaaaa</label>
              </div>
            </div>
          </Col>
          <Col onClick={this.onClick}>
            <div className="grid-items">
              <div className="camp-top">
                <label className="camp-titles"> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách aaaaa</label>
              </div>
            </div>
          </Col>
          <Col onClick={this.onClick}>
            <div className="grid-items">
              <div className="camp-top">
                <label className="camp-titles"> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách aaaaa</label>
              </div>
            </div>
          </Col>
          <Col onClick={this.onClick}>
            <div className="grid-items">
              <div className="camp-top">
                <label className="camp-titles"> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách aaaaa</label>
              </div>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
