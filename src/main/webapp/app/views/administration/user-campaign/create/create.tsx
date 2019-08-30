import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import InformationCampaign from './info/info';

export interface ICreateProps extends StateProps, DispatchProps {}

export interface ICreateState {}

export class Create extends React.Component<ICreateProps, ICreateState> {
  state: ICreateState = {};

  render() {
    return (
      <Fragment>
        <InformationCampaign />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  loading: userCampaign.loading
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
