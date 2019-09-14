import React, { CSSProperties } from 'react';
import DOMPurify from 'dompurify';
import './preview-landing.scss';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';

export interface IPreviewLandingProps extends StateProps, DispatchProps {}

export interface IPreviewLandingProps {
  htmlDOM?: string;
  scriptDOM?: string;
  styleForDOM?: string;
}

interface IPreviewLandingState {
  htmlDOM?: string;
  styleDOM?: string;
  scriptDOM?: string;
}

class PreviewLanding extends React.PureComponent<IPreviewLandingProps, IPreviewLandingState> {
  constructor(props) {
    super(props);
  }

  state = {
    htmlDOM: '',
    styleForDOM: '',
    scriptDOM: 'function test(){alert("test")}'
  };

  setValueForPopUp = event => {};

  render() {
    let { listCampainContentParams, htmlDOM } = this.props;
    let newValue: string = '';

    let listParam = listCampainContentParams.map(item => {
      return { paramCode: item.paramCode, sampleValue: item.sampleValue };
    });

    for (let i = 0; i < listParam.length; i++) {
      let item = listParam[i];
      let paramCode = item.paramCode;
      let sampleValue = item.sampleValue;

      newValue = htmlDOM.replace(paramCode, sampleValue);
      htmlDOM = newValue;
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: htmlDOM }} />
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewLanding);
