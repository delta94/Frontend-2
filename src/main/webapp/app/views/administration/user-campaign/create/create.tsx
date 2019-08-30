import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import InformationCampaign from './info/info';
import Navigation from './navigation/navigation';
import { Container } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import '../create/create.scss';

export interface ICreateProps extends StateProps, DispatchProps {}

export interface ICreateState {
  isActive: boolean;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  state: ICreateState = {
    isActive: false
  };

  render() {
    return (
      <Fragment>
        <div id="userCreate">
          <ReactCSSTransitionGroup
            className={cx('app-inner-layout chat-layout', {
              'open-mobile-menu': this.state.isActive
            })}
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Container fluid className="container-create">
              {/* info campaign */}
              <InformationCampaign />

              {/* navigation campaign */}
              <Navigation />
            </Container>
          </ReactCSSTransitionGroup>
        </div>
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
