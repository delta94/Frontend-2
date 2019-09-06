import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';

import './landing.scss';
import { getCampaignInfoByStatus, getCampaignInfoById, getCountCampaignByStatus, bindingLandingPage } from 'app/actions/user-campaign';

export interface ILandingProps extends StateProps, DispatchProps, RouteComponentProps<{ customerCode: string; idCampaing: string }> {
  script?: string;
  htmlContent: string;
}

export interface ILandingState {
  modal?: boolean;
  activeTab: string;
}

export class Landing extends React.Component<ILandingProps, ILandingState> {
  state: ILandingState = {
    modal: false,
    activeTab: '1'
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const customerCode = this.props.match.params.customerCode;
    const idCampaing = this.props.match.params.idCampaing;
    console.info('idCampaing', idCampaing);
    console.info('customerCode', customerCode);

    // call service get thong tin landing page o day
    this.props.bindingLandingPage(idCampaing, customerCode);
  }

  componentDidMount() {
    // load script xu ly form submit
    const script = document.createElement('script');
    // script.innerHTML = this.props.script;
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    const htmlContent = this.props.htmlContent;
    return (
      // <div dangerouslySetInnerHTML={{__html: htmlContent}} />
      <div dangerouslySetInnerHTML={{ __html: 'day la trang landing_page' }} />
    );
  }
}

const mapStateToProps = ({ userCampaign }: IRootState) => ({
  camps: userCampaign.camps,
  loading: userCampaign.loading,
  total: userCampaign.total,
  totalActive: userCampaign.totalActive,
  totalFinish: userCampaign.totalFinish,
  totalNotActive: userCampaign.totalNotActive
});

const mapDispatchToProps = { getCampaignInfoByStatus, getCampaignInfoById, getCountCampaignByStatus, bindingLandingPage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
