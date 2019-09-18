import React, { Fragment, Component, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import cx from 'classnames';
import Hamburger from 'react-hamburgers';
import '../navigation/navigation.scss';
import SelectCustomer from './select-customer/select-customer';
import SelectReward from './select-reward/select-reward';
import CreateLandingPage from './create-landingpage/create-landingpage';
import CreateContent from './create-content/create-content';
import Review from './review/review';
import { TabContent, TabPane, DropdownItem, Card, Col, Row, Button } from 'reactstrap';
import classnames from 'classnames';
import { getContentPageParams, postSaveDataCampain } from 'app/actions/user-campaign';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openModal, closeModal } from '../../../../../actions/modal';
import { openLoading, closeLoading } from '../../../../../actions/loading';
import { postSaveDataCampainService } from 'app/services/user-campaign';
import { IOpenModal } from 'app/reducers/modal';
import { refreshNavigationInfo } from '../../../../../actions/navigation-info';

export interface INavigationProps extends StateProps, DispatchProps {
  onClick: Function;
  valueListInfo: {};
}

export interface INavigationState {
  listCustomerGroup: any[];
  activeTab: number;
  active: boolean;
  endTab: boolean;
  startTab: boolean;
  loading: boolean;
}
export class Navigation extends Component<INavigationProps, INavigationState> {
  constructor(props) {
    super(props);
    this.state = {
      listCustomerGroup: [],
      activeTab: 1,
      active: false,
      endTab: false,
      loading: false,
      startTab: false
    };
  }

  toggle = tab => {
    let { activeTab } = this.state;
    if (!this.checkThrowStep(activeTab, null, tab).isError && tab !== activeTab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  componentDidMount() {
    let activeTab: number = this.state.activeTab;
    if (activeTab === 5) {
      this.setState({ endTab: true });
    }

    if (activeTab === 1) {
      this.setState({ startTab: true });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.activeTab === 5) {
      return { endTab: true };
    } else if (prevState.activeTab === 1) {
      return { startTab: true };
    } else {
      return { endTab: false, startTab: false };
    }
  }

  checkThrowStep = (activeTab, param, nextStep) => {
    let { navigationInfo, totalContact, evoucherDetail } = this.props;
    let modalState: IOpenModal = { show: false, title: '', text: '', type: '' };
    let rollBack = activeTab < nextStep;
    let isError = false;
    let countContact = totalContact ? totalContact : 0;
    let valueVoucher = evoucherDetail.value;
    switch (activeTab) {
      case 1:
        if (countContact < 1) {
          modalState = {
            show: true,
            type: 'warning',
            title: 'Thiếu trường thông tin',
            text: 'Vui lòng chọn tệp khách hàng'
          };
        }
        break;
      case 2:
        if (navigationInfo.reward.type === 2 && rollBack) {
          if (!valueVoucher) {
            modalState = {
              show: true,
              type: 'warning',
              title: 'Thiếu trường thông tin',
              text: 'Vui lòng chọn evoucher'
            };
          }
        }
        break;
      case 3:
        if (navigationInfo.contentTemplates[0].content === '' && rollBack) {
          modalState = {
            show: true,
            title: 'Thiếu trường thông tin',
            text: 'Bạn cần chọn landingpage',
            type: 'warning'
          };
        }
        break;
      case 4:
        if (navigationInfo.contentTemplates[1].templateId === '' && rollBack) {
          modalState = {
            show: true,
            title: 'Thiếu trường thông tin',
            text: 'Bạn cần chọn mail quà tặng',
            type: 'warning'
          };
        } else if (navigationInfo.contentTemplates[2].templateId === '' && rollBack) {
          modalState = {
            show: true,
            title: 'Thiếu trường thông tin',
            text: 'Bạn cần chọn mail giới thiệu',
            type: 'warning'
          };
        }
        break;

      default:
        break;
    }

    if (modalState.show === true) {
      param = 0;
      isError = true;
      this.props.openModal(modalState);
    }

    return { param, isError };
  };

  onHandletTab = (param: number) => {
    let { navigationInfo, totalContact, evoucherDetail } = this.props;
    let { activeTab } = this.state;
    let activeTabNumber: number = activeTab;
    activeTabNumber += param;

    let modalState: IOpenModal = { show: false, title: '', text: '', type: '' };
    let isError = false;
    let rollBack = activeTab < activeTabNumber;
    let countContact = totalContact ? totalContact : 0;
    let valueVoucher = evoucherDetail.value;
    switch (activeTab) {
      case 1:
        if (countContact < 1) {
          modalState = {
            show: true,
            type: 'warning',
            title: 'Thiếu trường thông tin',
            text: 'Vui lòng chọn tệp khách hàng'
          };
        }
        break;
      case 2:
        if (navigationInfo.reward.type === 2) {
          if (!valueVoucher) {
            modalState = {
              show: true,
              type: 'warning',
              title: 'Thiếu trường thông tin',
              text: 'Vui lòng chọn evoucher'
            };
          }
        }
        break;
      case 3:
        if (navigationInfo.contentTemplates[0].content === '' && rollBack) {
          modalState = {
            show: true,
            title: 'Thiếu trường thông tin',
            text: 'Bạn cần chọn landingpage',
            type: 'warning'
          };
        }
        break;
      case 4:
        if (navigationInfo.contentTemplates[1].templateId === '' && rollBack) {
          modalState = {
            show: true,
            title: 'Thiếu trường thông tin',
            text: 'Bạn cần chọn mail quà tặng',
            type: 'warning'
          };
        } else if (navigationInfo.contentTemplates[2].templateId === '' && rollBack) {
          modalState = {
            show: true,
            title: 'Thiếu trường thông tin',
            text: 'Bạn cần chọn mail giới thiệu',
            type: 'warning'
          };
        }
        break;
      default:
        break;
    }

    if (modalState.show === true) {
      param = 0;
      isError = true;
      this.props.openModal(modalState);
    } else {
      if (activeTabNumber === 6) {
        this.setState({ activeTab: 5, endTab: true });
      } else if (activeTabNumber === 0) {
        this.setState({ activeTab: 1 });
      } else {
        this.setState({ activeTab: activeTabNumber });
      }
    }

    return { param, isError };
  };

  createNewCampain() {
    let { navigationInfo } = this.props;
    if (navigationInfo.campaignTypeId === '' || navigationInfo.contentTemplates === null || navigationInfo.customerCampaigns === []) {
      this.props.openModal({ show: false, type: 'warning', text: 'Thiếu trường thông tin', title: 'Thông báo' });
    } else {
      this.props.openLoading();
      postSaveDataCampainService(navigationInfo)
        .then(item => {
          this.props.closeLoading();
          if (item) {
            this.props.openModal({
              show: true,
              type: 'success',
              title: 'Thành công',
              text: 'Đã tạo chiến dịch thành công'
            });
            this.props.refreshNavigationInfo();
          }

          setTimeout(() => {
            this.props.closeModal();
            window.location.assign('/#/app/views/administration/user-campaign');
          }, 500);
        })
        .catch(err => {
          this.props.closeLoading();
          this.props.openModal({
            show: true,
            type: 'error',
            title: 'Thất bại',
            text: 'Danh sách khách hàng bị thiếu'
          });
        });
    }
  }

  render() {
    const { endTab, activeTab, startTab } = this.state;
    const { listStep } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          className={cx('app-inner-layout chat-layout', {
            'open-mobile-menu': this.state.active
          })}
          component="div"
          transitionName="TabsAnimation"
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Card className="col-md-3 app-inner-layout__sidebar b-r">
            <div className="p-3">
              <div className="dropdown-menu p-0 dropdown-menu-inline dropdown-menu-rounded dropdown-menu-hover-primary">
                {listStep.map(event => {
                  let isPass = event.step && parseInt(event.step, 0) < activeTab;
                  var elements = (
                    <DropdownItem
                      toggle={false}
                      className={classnames('mb-1', { active: this.state.activeTab === parseInt(event.step) })}
                      onClick={() => {
                        this.toggle(event.step);
                      }}
                    >
                      <div id="circle" style={{ backgroundColor: isPass ? '#3866DD' : '' }}>
                        <label className="step-icon"> {event.step}</label>
                      </div>
                      <label className="descrition-item" style={{ color: isPass ? '#3866DD' : '#CED4DA' }}>
                        {' '}
                        {event.description}
                      </label>
                    </DropdownItem>
                  );
                  return elements;
                })}
              </div>
            </div>
          </Card>

          <Card className="col-md-9 app-inner-layout__content">
            <Row className="row-content-info">
              <div className="mobile-app-menu-btn mb-3">
                <Hamburger active={this.state.active} type="elastic" onClick={() => this.setState({ active: !this.state.active })} />
              </div>
              {/* Tab Content */}
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={1}>
                  <SelectCustomer />
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                {/* task 2  */}
                <TabPane tabId={2}>
                  <SelectReward />
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                {/* task 3 */}
                <TabPane tabId={3}>
                  <CreateLandingPage />
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                {/* task 4  */}
                <TabPane tabId={4}>
                  <div className="add-content">
                    <CreateContent />
                  </div>
                  <div className="mt-5" />
                  <div className="clearfix" />
                </TabPane>
                <TabPane tabId={5}>
                  <Review />
                </TabPane>
              </TabContent>
            </Row>
            <div className="b-t" style={{ padding: '10px' }}>
              <Row className=" footer">
                <Col xs="8" sm="6" md="6">
                  <Button
                    className="btnBack"
                    style={{ display: startTab ? 'none' : 'block' }}
                    onClick={() => {
                      this.onHandletTab(-1);
                    }}
                  >
                    Quay lại
                  </Button>
                </Col>
                <Col xs="8" sm="6" md="6">
                  <Button
                    className="btnNext"
                    style={{ float: 'right', color: 'white', backgroundColor: activeTab === 5 ? '#23C00A' : '#3866dd' }}
                    onClick={() => {
                      this.onHandletTab(1);
                      if (endTab) {
                        this.createNewCampain();
                      }
                    }}
                  >
                    {endTab ? <FontAwesomeIcon icon={faCheck} /> : ''}
                    {endTab ? 'Tạo chiến dịch' : 'Tiếp tục'}
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ userCampaign, navigationInfo, loadingState }: IRootState) => ({
  loading: userCampaign.loading,
  listStep: userCampaign.listStepCampaign,
  listContentParams: userCampaign.listCampainContentParams,
  navigationInfo,
  postMailRequest: userCampaign.postMailRequest,
  evoucherDetail: userCampaign.EvoucherDetail,
  totalContact: userCampaign.totalContact.totalContact
});

const mapDispatchToProps = {
  getContentPageParams,
  postSaveDataCampain,
  openModal,
  closeModal,
  openLoading,
  closeLoading,
  refreshNavigationInfo
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
