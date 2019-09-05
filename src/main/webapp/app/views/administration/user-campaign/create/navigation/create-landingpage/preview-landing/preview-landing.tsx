import React, { CSSProperties } from 'react';
import DOMPurify from 'dompurify';
import './preview-landing.scss';

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

  render() {
    let { htmlDOM, styleForDOM, scriptDOM } = this.props;
    return (
      <div>
        <style>{styleForDOM}</style>
        <script type="text/css">{scriptDOM}</script>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlDOM) }} />
      </div>
    );
  }
}

export default PreviewLanding;
