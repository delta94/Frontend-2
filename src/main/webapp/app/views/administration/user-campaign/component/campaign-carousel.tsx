import React, { Fragment, Component } from 'react';
import Slider from 'react-slick';
import { Input, Card, Col, Container, Row } from 'reactstrap';

export interface IResponsiveProps {}

export interface IResponsiveState {
  isActive: boolean;
  cssTitle: string;
  cssGrid: string;
  urlImage: string;
  gridItem: string;
  fileImport: string;
  image: string;
}
export default class Responsive extends Component<IResponsiveProps, IResponsiveState> {
  state: IResponsiveState = {
    isActive: true,
    cssTitle: 'camp-titles',
    cssGrid: '',
    urlImage: '',
    gridItem: 'grid-items',
    fileImport: '',
    image: ''
  };
  onClick = () => {
    this.setState({
      isActive: !this.state.isActive
    });
    if (this.state.isActive) {
      this.setState({
        cssTitle: 'camp-title-click',
        urlImage: 'https://abeon-hosting.com/images/complete-png-4.png',
        gridItem: 'grid-items-Click'
      });
    } else {
      this.setState({
        cssTitle: 'camp-titles',
        urlImage: '',
        gridItem: 'grid-items'
      });
    }
  };
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Fragment>
        <Slider {...settings}>
          <Col onClick={this.onClick}>
            <div className={this.state.gridItem}>
              <div className="camp-top">
                <label className={this.state.cssTitle}> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách hàngaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</label>
              </div>
            </div>
          </Col>
          <Col onClick={this.onClick}>
            <div className={this.state.gridItem}>
              <div className="camp-top">
                <label className={this.state.cssTitle}> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách hàngaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</label>
              </div>
            </div>
          </Col>
          <Col onClick={this.onClick}>
            <div className={this.state.gridItem}>
              <div className="camp-top">
                <label className={this.state.cssTitle}> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách hàngaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</label>
              </div>
            </div>
          </Col>
          <Col onClick={this.onClick}>
            <div className={this.state.gridItem}>
              <div className="camp-top">
                <label className={this.state.cssTitle}> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách hàngaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</label>
              </div>
            </div>
          </Col>
          <Col onClick={this.onClick}>
            <div className={this.state.gridItem}>
              <div className="camp-top">
                <label className={this.state.cssTitle}> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách hàngaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</label>
              </div>
            </div>
          </Col>
          <Col onClick={this.onClick}>
            <div className={this.state.gridItem}>
              <div className="camp-top">
                <label className={this.state.cssTitle}> M2M kịch bản 1</label>
                <img className="image-tites" src={this.state.urlImage} />
              </div>
              <div className="label-text">
                <label>kịch bản 1 dành cho đối tượng khách hàngaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</label>
              </div>
            </div>
          </Col>
        </Slider>
      </Fragment>
    );
  }
}
