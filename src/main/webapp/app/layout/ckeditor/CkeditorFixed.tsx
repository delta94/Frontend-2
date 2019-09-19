import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import CKEditor from 'ckeditor4-react';
import { getContentPageParams } from '../../actions/user-campaign';
import { IRootState } from 'app/reducers';
import { getNavigationContentTemplates } from '../../actions/navigation-info';
import { FORM_LANDING, PARAMESTER, CONTENT, EMAIL_EWARD, EMAIL_INTRO } from '../../constants/common';

export interface ICreateContentProps extends StateProps, DispatchProps {
  id?: string;
  param?: number;
  type?: string;
  data?: string;
}

export interface ICreateContentState {
  data: string;
}

class CreateContent extends React.PureComponent<ICreateContentProps, ICreateContentState> {
  constructor(props) {
    super(props);
  }

  public state = {
    data: ''
  };

  handleModelChange = event => {
    let { listCampainContentParams, type } = this.props;
    let paramester = [];

    listCampainContentParams.forEach(item => {
      if (event.indexOf(item.paramCode) > 0) {
        paramester.push(item);
      }
    });

    let newParamester = paramester.map(item => ({
      id: item.id,
      name: item.paramName,
      code: item.paramCode
    }));

    this.props.getNavigationContentTemplates(newParamester, type, PARAMESTER);
    this.props.getNavigationContentTemplates(event, type, CONTENT);
  };

  render() {
    let { id, data } = this.props;

    return (
      <CKEditor
        id={id}
        editorName="editor2"
        data={data}
        config={{
          extraPlugins: 'stylesheetparser'
        }}
        onChange={event => {
          this.handleModelChange(event.editor.getData());
        }}
      />
    );
  }
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const mapStateToProps = ({ userCampaign, navigationInfo }: IRootState) => ({
  listCampainContentParams: userCampaign.listCampainContentParams,
  contentTemplates: navigationInfo.contentTemplates
});

const mapDispatchToProps = {
  getContentPageParams,
  getNavigationContentTemplates
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContent);
