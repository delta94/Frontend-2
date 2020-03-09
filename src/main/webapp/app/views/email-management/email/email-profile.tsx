import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// service
import {
  createEmailsProfile,
  deleteEmailsProfile,
  getEmailsProfile,
  reactiveEmailProfile,
  setDefaultEmailProfile,
  verifileEmailProfile
} from '../../../actions/email-profile';
import { IRootState } from 'app/reducers';

import { Translate, translate } from 'react-jhipster';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { IEmail } from 'app/common/models/email-config.model';
import './email.scss';
// reactstrap
import { Table, UncontrolledDropdown, DropdownToggle, Button, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import {
  Col,
  CardHeader,
  Container,
  CardBody,
  Progress,
  ListGroup,
  ListGroupItem,
  CardFooter,
  CustomInput,
  UncontrolledButtonDropdown
} from 'reactstrap';
//antd
import { Tooltip, Drawer } from 'antd';
import { Input, Icon, Row, Checkbox, Modal, Menu, Dropdown as DropdownAnt } from 'antd';
import { Card, Avatar, List } from 'antd';
import email from './email';
import emailProfile from 'app/reducers/email-profile';
import { faTrashAlt, faHome, faTimes } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Meta } = Card;

const { confirm } = Modal;

interface IEmailSendManagementProps extends StateProps, DispatchProps {}
interface IEmailSendManagementState {
  activePage: number;
  itemsPerPage: number;
  textSearch?: string;
  listCheckboxItem: ICheckboxItem[];
  isCheckAll: boolean;
  visible: boolean;
  emailForm: string;
  fromNameForm: string;
  verifileCode: string;
}

interface ICheckboxItem extends IEmail {
  checked: boolean;
}

const pageDefault: number = 0;
const pageSizeDefault: number = 8;

class EmailSendManagement extends React.Component<IEmailSendManagementProps, IEmailSendManagementState> {
  state: IEmailSendManagementState = {
    activePage: 0,
    itemsPerPage: pageSizeDefault,
    textSearch: '',
    listCheckboxItem: [],
    isCheckAll: false,
    visible: false,
    emailForm: '',
    fromNameForm: '',
    verifileCode: ''
  };

  componentDidMount() {
    // get list email here
    let { activePage, itemsPerPage } = this.state;
    this.props.getEmailsProfile();
  }
  // show verifile email drawer here
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };

  // createEmailTemplate = () => {
  //   location.assign('#/app/views/config/email-template');
  // };

  componentWillReceiveProps(nextProps) {
    // change verifile code call api send email
    if (nextProps && nextProps.verifileCode && nextProps.verifileCode !== this.state.verifileCode) {
      this.setState({
        verifileCode: nextProps.verifileCode
      });
      this.props.verifileEmailProfile(nextProps.verifileCode);
    }
  }

  hanldeSetEmailProfileDefault = (id: string) => {
    const { setDefaultEmailProfile, getEmailsProfile } = this.props;
    confirm({
      title: 'Thông báo',
      content: 'Bạn có muốn đặt email này thành mặc định',
      async onOk() {
        //call api here
        try {
          await setDefaultEmailProfile(id);
          await getEmailsProfile();
        } catch (error) {
          console.log('error');
        }
      },
      onCancel() {}
    });
  };
  hanldeReActiveEmail = (id: string) => {
    //call api here
    this.showInfoSendCodeVerifile();
    this.props.reactiveEmailProfile(id);
    this.setState({
      visible: false
    });
  };
  hanldeDeleteEmail = (id: string) => {
    const { deleteEmailsProfile, getEmailsProfile } = this.props;
    //TODO
    confirm({
      title: 'Thông báo',
      content: 'Bạn có muốn thực sự muốn xóa email này',
      async onOk() {
        //call api here
        let check = true;
        try {
          await deleteEmailsProfile(id);
        } catch (error) {
          check = false;
        }
        if (check) {
          await getEmailsProfile();
        }
      },
      onCancel() {}
    });
  };

  validateEmail = mail => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(mail)) {
      return true;
    }
    return false;
  };

  showInfoSendCodeVerifile = () => {
    Modal.info({
      title: 'Thông báo',
      content: (
        <div>
          <p>
            Hệ thống đã gửi email xác nhận đến địa chỉ email của bạn. Vui lòng kiểm tra và xác nhận đường link trong 24h
            <br />
            <b> Lưu ý</b>: Trong trường hợp không xác nhận được email, hãy kiểm tra thư mục spam, hoặc xem lại chính xác địa chỉ email muốn
            xác thực.
          </p>
        </div>
      ),
      onOk() {}
    });
  };
  hanldeCreateEmail = async () => {
    // TODO
    const { emailForm, fromNameForm } = this.state;
    if (this.validateEmail(emailForm) && fromNameForm) {
      let check = true;
      try {
        await this.props.createEmailsProfile({
          email: emailForm,
          fromName: fromNameForm
        });
      } catch (error) {
        check = false;
      }
      if (check) {
        await this.setState({
          emailForm: '',
          fromNameForm: '',
          visible: false
        });
        await this.props.getEmailsProfile();
        setTimeout(() => {
          this.showInfoSendCodeVerifile();
        }, 100);
      }
    } else if (!this.validateEmail(emailForm)) {
      toast.error('Bạn đã nhập sai định dạng email !');
    } else {
      toast.error('Đã có sự cố xảy ra  !');
      this.onClose();
    }
  };

  render() {
    let { totalPages, loading, emailProfileData, totalElements, authentication, loadingForm } = this.props;
    const { emailForm, fromNameForm } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Fragment>
        <div>
          <Row>
            <div className="email-title-header">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {' '}
                  <div>
                    <span>Cấu hình email gửi&nbsp;</span>
                    <Tooltip
                      placement="rightTop"
                      title="Địa chỉ email gửi từ hệ thống.Các chiến dịch sử dụng
                    tính năng gửi email sẽ sử dụng 01 các địa chỉ email dưới đây
                    để gửi email tới thành viên"
                    >
                      <Icon type="question-circle" style={{ verticalAlign: 'text-top', fontSize: 15 }} />
                    </Tooltip>
                  </div>
                </div>
                <Button className="mb-2 mr-2" color="primary" onClick={this.showDrawer} style={{ alignSelf: 'flex-end' }}>
                  Thêm mới email
                </Button>
              </div>
            </div>
          </Row>
          <div className="header-title">
            <div style={{ margin: '10px 0px' }}> &nbsp; {totalElements} bản ghi</div>
            <div style={{ paddingRight: '2%', fontStyle: 'italic' }}>
              Email gửi cần được xác thực trước khi được sử đụng trong các chiến dịch &nbsp;{' '}
            </div>
          </div>
          {/*drawer*/}
          <div>
            <Drawer
              title="Tạo địa chỉ mới gửi email đi"
              width={400}
              placement="right"
              onClose={this.onClose}
              visible={this.state.visible}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <Loader message={spinner1} show={loadingForm} priority={1}>
                <label htmlFor="">Địa chỉ gửi</label>
                <Input
                  value={emailForm}
                  name="email"
                  onChange={event => {
                    this.setState({ emailForm: event.target.value });
                  }}
                ></Input>
                <br />
                <br />
                <label htmlFor="">Tên người gửi</label>
                <Input
                  value={fromNameForm}
                  name="fromName"
                  onChange={event => {
                    this.setState({ fromNameForm: event.target.value });
                  }}
                ></Input>
                <Button
                  outline
                  className="btn-confirm-email mb-2 mr-2"
                  color="primary"
                  disabled={!emailForm || !fromNameForm}
                  onClick={this.hanldeCreateEmail}
                >
                  Xác thực email này
                </Button>
                <div className="email-note">
                  Vì cần xác thực email ?
                  <br />
                  Xác thực giúp chúng tôi xác định email của bạn có tồn tại, tăng độ tin cậy khi gửi đi
                </div>
              </Loader>
            </Drawer>
          </div>
          <Row>
            <Loader message={spinner1} show={loading} priority={1}>
              <List
                itemLayout="horizontal"
                dataSource={emailProfileData && emailProfileData}
                renderItem={emaiProfile => (
                  <List.Item className="list-item">
                    <List.Item.Meta
                      avatar={<i className="fas fa-envelope"></i>}
                      title={<b>{emaiProfile.email}</b>}
                      description={emaiProfile.fromName}
                    />
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', paddingRight: '2%' }}>
                      <div className="group-icons" style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {emaiProfile.isDefault === 1 && emaiProfile.isActivated === 1 && (
                          <Button
                            outline
                            className="verifiled-btn mb-2 mr-2"
                            color="primary"
                            style={{ display: 'flex', alignSelf: 'center' }}
                          >
                            <FontAwesomeIcon icon={faHome} />
                            &nbsp; Mặc định
                          </Button>
                        )}
                        {emaiProfile.isDefault !== 1 && emaiProfile.isActivated === 1 && (
                          <Button
                            outline
                            className="mb-2 mr-2"
                            color="primary"
                            style={{ display: 'flex', alignSelf: 'center' }}
                            onClick={() => this.hanldeSetEmailProfileDefault(emaiProfile.id)}
                          >
                            Đặt làm mặc định
                          </Button>
                        )}
                        {// when verifiled
                        emaiProfile.isActivated === 1 && (
                          <Button icon="check" outline className="verifiled-btn mb-2 mr-2" color="success">
                            Đã xác thực
                          </Button>
                        )}

                        {// when no verifile
                        emaiProfile.isActivated !== 1 && (
                          <Button outline className="verifiled-btn mb-2 mr-2" color="danger">
                            <FontAwesomeIcon icon={faTimes} /> &nbsp;Chưa xác thực
                          </Button>
                        )}
                        {// when send code verifile
                        emaiProfile.isActivated !== 1 && (
                          <div style={{ display: 'flex' }}>
                            <Tooltip
                              placement="bottom"
                              title="Vì sao cần xác thực email ?
                      Xác thực giúp chúng tôi xác nhận email của bạn có tồn tại,
                      tăng độ tin cậy khi gửi email"
                            >
                              <Button
                                outline
                                className="verifiled-btn mb-2 mr-2"
                                color="danger"
                                onClick={() => this.hanldeReActiveEmail(emaiProfile.id)}
                              >
                                Gửi lại mã xác thực
                              </Button>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                      <div className="delete-btn">
                        {emaiProfile.isDefault !== 1 && (
                          <span onClick={() => this.hanldeDeleteEmail(emaiProfile.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </span>
                        )}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Loader>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ emailProfileState, authentication }: IRootState) => ({
  loading: emailProfileState.loading,
  loadingForm: emailProfileState.loadingForm,
  emailProfileData: emailProfileState.emailProfileData.content,
  totalElements: emailProfileState.emailProfileData.totalElements,
  totalPages: emailProfileState.emailProfileData.totalPages,
  verifileCode: emailProfileState.verifileCode,
  authentication: authentication
});

const mapDispatchToProps = {
  createEmailsProfile,
  deleteEmailsProfile,
  getEmailsProfile,
  reactiveEmailProfile,
  setDefaultEmailProfile,
  verifileEmailProfile
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailSendManagement);
