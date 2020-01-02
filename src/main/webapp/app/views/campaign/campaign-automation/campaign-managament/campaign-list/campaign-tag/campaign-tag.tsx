import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Multiselect } from 'react-widgets';
import { IRootState } from 'app/reducers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getCjTagsAction } from 'app/actions/cj-tag';
import './campaign-tag.scss';

library.add(faSpinner);

interface ICampaignTagProps extends StateProps, DispatchProps {
  defaultCate?: any[];
  handleChange?: Function;
  defaultValue?: any[];
}

interface ICampaignTagState {}

class CampaignTag extends React.Component<ICampaignTagProps, ICampaignTagState> {
  state: ICampaignTagState = {};

  handleChange = data => {
    this.props.handleChange(data);
    if (data.length < 1) {
      this.props.getCjTagsAction('');
    }
  };

  componentDidMount() {
    this.props.getCjTagsAction();
  }

  handleCreate = name => {
    this.props.getCjTagsAction(name);
  };

  render() {
    const { comboTag, defaultCate, defaultValue } = this.props;
    console.log(defaultValue);
    console.log(defaultCate);
    return (
      <Multiselect
        placeholder={'Chọn thẻ'}
        defaultValue={defaultValue}
        data={comboTag}
        // value={defaultValue}
        className="Select-holder"
        allowCreate="onFilter"
        onCreate={name => this.handleCreate(name)}
        onChange={data => this.handleChange(data)}
        textField="name"
      />
    );
  }
}

const mapStateToProps = ({ cjTagState }: IRootState) => ({
  comboTag: cjTagState.cj_tags
});

const mapDispatchToProps = { getCjTagsAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignTag);
