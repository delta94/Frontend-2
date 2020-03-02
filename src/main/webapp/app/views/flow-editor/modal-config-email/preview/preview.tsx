import React, { CSSProperties } from 'react';
import DOMPurify from 'dompurify';
import './preview.scss';
import { connect } from 'react-redux';
import { Col, Row, Button, Container } from 'reactstrap';
import { IRootState } from 'app/reducers';
import { isThisSecond } from 'date-fns';

export interface IPreviewLandingProps extends StateProps, DispatchProps {}

export interface IPreviewLandingProps {
  htmlDOM?: string;
  scriptDOM?: string;
  styleForDOM?: string;
}

interface IPreviewLandingState {
  htmlDOM?: string;
  styleForDOM?: string;
  scriptDOM?: string;
  showMobile: boolean;
}

class PreviewLanding extends React.PureComponent<IPreviewLandingProps, IPreviewLandingState> {
  constructor(props) {
    super(props);
  }

  state: IPreviewLandingState = {
    htmlDOM: '',
    styleForDOM: '',
    scriptDOM: 'function test(){alert("test")}',
    showMobile: false
  };

  setValueForPopUp = event => {};

  escapeRegExp = string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  replaceAll = (str, term, replacement) => {
    return str.replace(new RegExp(this.escapeRegExp(term), 'g'), replacement);
  };

  componentDidMount() {
    let { listCampainContentParams, htmlDOM } = this.props;
    let newValue: string = '';

    let listParam = listCampainContentParams.map(item => {
      return { paramCode: item.paramCode, sampleValue: item.sampleValue };
    });

    for (let i = 0; i < listParam.length; i++) {
      let item = listParam[i];
      let paramCode = item.paramCode;
      let sampleValue = item.sampleValue;

      htmlDOM = this.replaceAll(htmlDOM, paramCode, sampleValue);
    }

    // @ts-ignore:2339
    document.getElementById('fred').contentWindow.document.write(htmlDOM);
  }

  render() {
    let { showMobile } = this.state;
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} style={{ textAlign: 'center' }}>
            <Button color="none" style={{ fontSize: '24px' }} onClick={() => this.setState({ showMobile: false })}>
              <i className="pe-7s-monitor"> </i>
            </Button>
            <Button color="none" style={{ fontSize: '24px' }} onClick={() => this.setState({ showMobile: true })}>
              <i className="pe-7s-phone"> </i>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={showMobile ? '12' : ''} xs={12} md={showMobile ? { size: 6, offset: 3 } : ''}>
            <iframe id="fred" width="100%" height="500px" />
          </Col>
        </Row>
      </Container>
    );
  }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const mapStateToProps = ({ userCampaign }: IRootState) => {
  return {
    listCampainContentParams: userCampaign.listCampainContentParams
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewLanding);
