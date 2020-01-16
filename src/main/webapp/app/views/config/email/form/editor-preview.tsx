import React, { Fragment } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';

export interface IEditorPreviewProps extends StateProps, DispatchProps {
  data?: string;
}

interface IEditorPreviewState { }

class EditorPreview extends React.Component<IEditorPreviewProps, IEditorPreviewState> {
  state: IEditorPreviewState = {};
  componentDidMount() {
  }

  render() {
    return (
      <div className="editor-preview">
        <div dangerouslySetInnerHTML={{ __html: this.props.data }}></div>
      </div>
    );
  }

}

const mapStateToProps = ({ }: IRootState) => ({
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
)(EditorPreview);
