import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  TabContent,
  TabPane,
  DropdownItem,
  CardBody,
  Collapse,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Card,
  Col,
  Row,
  CardHeader,
  Button
} from 'reactstrap';

import { Translate, JhiPagination, getPaginationItemsNumber, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITEMS_PER_PAGE, ACTIVE_PAGE, MAX_BUTTON_COUNT } from 'app/constants/pagination.constants';
import { IRootState } from 'app/reducers';
import Sticky from 'react-stickynode';
import PageTitleAlt from '../../../layout/AppMain/PageTitleAlt';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactPaginate from 'react-paginate';
import SweetAlert from 'sweetalert-react';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import cx from 'classnames';
import PageTitle from '../../../layout/AppMain/PageTitle';
import './style/campaign.scss';

export interface ICampaignManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface ICampaignManagementState {
  isActive: boolean;
  isDelete: boolean;
}

export class CampaignManagement extends React.Component<ICampaignManagementProps, ICampaignManagementState> {
  state: ICampaignManagementState = {
    isDelete: false,
    isActive: false
  };

  render() {
    const { match, pageCount, loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <Loader message={spinner1} show={loading} priority={1}>
        <Fragment>
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
            <PageTitle heading="Danh Sách Chiến Dịch > Tạo Chiến Dịch M2M" icon="pe-7s-moon icon-gradient bg-amy-crisp" />
          </ReactCSSTransitionGroup>
        </Fragment>
      </Loader>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.userManagement.loading,
  listCategory: storeState.userManagement.listCategory,
  pageCount: Math.ceil(storeState.userManagement.totalElements / ITEMS_PER_PAGE)
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignManagement);
