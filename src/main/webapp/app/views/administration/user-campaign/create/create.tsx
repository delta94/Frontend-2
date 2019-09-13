import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import InformationCampaign from './info/info';
import Navigation from './navigation/navigation';
import { Container, Collapse, Card, CardTitle } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import '../create/create.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { ULTILS_TYPES } from '../../../../constants/ultils';
import { openModal, closeModal } from 'app/actions/modal';
import SweetAlert from 'sweetalert-react';

export interface ICreateProps extends StateProps, DispatchProps {}

export interface ICreateEntity {}
export interface ICreateState {
  //list value info
  listInfo: {};
  //collapse componemt table detail
  collapse: boolean;

  //display componemt navigation
  isDisplayTable: string;

  //change icon
  changeIcon: string;

  //id type campaign
  campaignTypeId: string;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  state: ICreateState = {
    listInfo: {},
    collapse: true,
    isDisplayTable: ULTILS_TYPES.DISPLAY_NAVIGATION,
    changeIcon: ULTILS_TYPES.ICON_DOWN,
    campaignTypeId: ULTILS_TYPES.EMPTY
  };

  //function handler click collapse
  toggle = () => {
    this.setState({
      collapse: !this.state.collapse
    });
    if (this.state.collapse) {
      this.setState({
        collapse: false,
        changeIcon: ULTILS_TYPES.ICON_UP
      });
    } else {
      this.setState({
        collapse: true,
        changeIcon: ULTILS_TYPES.ICON_DOWN
      });
    }
  };

  //function handler display componemt navigation
  isDisPlayInfo = (e, list) => {
    this.setState({
      isDisplayTable: e
    });
    this.state.listInfo = list;
  };

  //function handler collapse table detail
  isDisable = event => {
    if (event > 1) {
      this.setState({
        collapse: false,
        changeIcon: ULTILS_TYPES.ICON_UP
      });
    } else {
      this.setState({
        collapse: true,
        changeIcon: ULTILS_TYPES.ICON_DOWN
      });
    }
  };

  render() {
    const { listInfo } = this.state;
    const { modalState } = this.props;
    return (
      <Fragment>
        <SweetAlert
          title={modalState.title ? modalState.title : 'No title'}
          confirmButtonColor=""
          show={modalState.show ? modalState.show : false}
          text={modalState.text ? modalState.text : 'No'}
          type={modalState.type ? modalState.type : 'error'}
          onConfirm={() => this.props.closeModal()}
        />
        <div id="userCreate">
          <ReactCSSTransitionGroup
            className={cx('app-inner-layout chat-layout')}
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Container fluid className="container-create">
              <div className="title-page">
                <div className="title-head">
                  <Translate contentKey="campaign.title-create-screen" />
                  <Link to={'/admin/user-campaign'} className="pe-7s-close-circle" />
                </div>
              </div>
              <Card className="card-info">
                <CardTitle>
                  <Translate contentKey="campaign.info-campaign" />{' '}
                  <i className={this.state.changeIcon} onClick={this.toggle}>
                    {' '}
                  </i>{' '}
                </CardTitle>
              </Card>
              <Collapse isOpen={this.state.collapse}>
                {/* info campaign */}
                <InformationCampaign onClick={this.isDisPlayInfo} />
              </Collapse>
              <br />
              {/* navigation campaign */}
              <div className={this.state.isDisplayTable}>
                <Navigation valueListInfo={listInfo} onClick={this.isDisable} />
              </div>
            </Container>
          </ReactCSSTransitionGroup>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ userCampaign, handleModal }: IRootState) => ({
  loading: userCampaign.loading,
  modalState: handleModal.data
});

const mapDispatchToProps = { openModal, closeModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
