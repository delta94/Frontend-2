import React, { CSSProperties } from 'react';
import DOMPurify from 'dompurify';
import './preview.scss';
import { connect } from 'react-redux';
import { Col, Row, Button, Container } from 'reactstrap';
import { IRootState } from 'app/reducers';
import { IContentParams } from 'app/common/model/email-config.model';

export interface IPreviewLandingProps extends StateProps, DispatchProps { }

export interface IPreviewLandingProps {
  htmlDOM?: string;
  scriptDOM?: string;
  styleForDOM?: string;
  contentParams?: IContentParams[];
}

interface IPreviewLandingState {
  styleForDOM?: string;
  scriptDOM?: string;
  showMobile: boolean
}

class PreviewEmailLanding extends React.PureComponent<IPreviewLandingProps, IPreviewLandingState> {
  constructor(props) {
    super(props);
  }

  state: IPreviewLandingState = {
    styleForDOM: '',
    scriptDOM: 'function test(){alert("test")}',
    showMobile: false
  };


  escapeRegExp = string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  replaceAll = (str, term, replacement) => {
    return str.replace(new RegExp(this.escapeRegExp(term), 'g'), replacement);
  };

  componentDidMount() {
    // @ts-ignore:2339
    let { contentParams, htmlDOM } = this.props;
    htmlDOM = htmlDOM ? htmlDOM : '';
    if (contentParams && contentParams.length > 0) {
      for (let i = 0; i < contentParams.length; i++) {
        let item = contentParams[i];
        let paramCode = item.paramCode;
        let sampleValue = item.sampleValue;

        htmlDOM = this.replaceAll(htmlDOM, paramCode, sampleValue);
      }
    }
    // @ts-ignore:2339
    document.getElementById('fred').contentWindow.document.write(htmlDOM);
  }

  render() {
    let { showMobile } = this.state
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} style={{ textAlign: "center" }}>
            <Button color="none" style={{ fontSize: "24px" }} onClick={() => this.setState({ showMobile: false })}>
              <i className="pe-7s-monitor"> </i></Button>
            <Button color="none" style={{ fontSize: "24px" }} onClick={() => this.setState({ showMobile: true })}>
              <i className="pe-7s-phone"> </i></Button>
          </Col>
        </Row>
        <Row>
          <Col sm={showMobile ? "12" : ""} xs={12} md={showMobile ? { size: 6, offset: 3 } : ''}>
            <iframe id="fred" width="100%" height="500px" />
          </Col>
        </Row>
      </Container>
    )

  }
}

const mapStateToProps = ({ }: IRootState) => ({
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
)(PreviewEmailLanding);
