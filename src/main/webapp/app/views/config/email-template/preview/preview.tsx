import React, { CSSProperties } from 'react';
import DOMPurify from 'dompurify';
import './preview.scss';
import { connect } from 'react-redux';
import { Col, Row, Button, Container } from 'reactstrap';
import { IRootState } from 'app/reducers';
import { isThisSecond } from 'date-fns';

export interface IPreviewLandingProps extends StateProps, DispatchProps { }

export interface IPreviewLandingProps {
  htmlDOM?: string;
  scriptDOM?: string;
  styleForDOM?: string;
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


  componentDidMount() {
    // @ts-ignore:2339
    document.getElementById('fred').contentWindow.document.write(this.props.htmlDOM);
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
