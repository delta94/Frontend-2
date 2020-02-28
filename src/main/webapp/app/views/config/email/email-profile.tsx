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
import { Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { IEmail } from 'app/common/models/email-config.model';
import { getEmailsAction, deleteEmailAction, getEmailDetailAction } from 'app/actions/email-config';
import './email.scss';

//antd
import { Button, Tooltip, Drawer } from 'antd';
import { Input, Icon, Row, Checkbox, Modal, Menu, Dropdown as DropdownAnt } from 'antd';
import { Card, Avatar } from 'antd';
import email from './email';
import emailProfile from 'app/reducers/email-profile';

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
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
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
            Hệ thống đã gửi email xác nhận đến địa chỉ email của bạn. Vui lòng kiểm tra và xác nhận đường linh trong 24h
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
        await this.props.getEmailsProfile();
        await this.setState({
          emailForm: '',
          fromNameForm: ''
        });
        this.showInfoSendCodeVerifile();
        this.onClose();
      }
    } else if (!this.validateEmail(emailForm)) {
      toast.error('Bạn đã nhập sai định dạng email !');
    } else {
      toast.error('Đã có sự cố xảy ra  !');
      this.onClose();
    }
  };

  render() {
    let { totalPages, loading, emailProfileData, totalElements } = this.props;
    const { emailForm, fromNameForm } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Fragment>
        <div className="email-management">
          <Row>
            <div className="email-title-header">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {' '}
                  <h4>
                    Cấu hình email gửi&nbsp;
                    <Tooltip
                      placement="rightTop"
                      title="Địa chỉ email gửi từ hệ thống.Các chiến dịch sử dụng
                    tính năng gửi email sẽ sử dụng 01 các địa chỉ email dưới đây
                    để gửi email tới thành viên"
                    >
                      <Icon type="question-circle" style={{ verticalAlign: 'text-top' }} />
                    </Tooltip>
                  </h4>
                  <div>Email gửi cần được xác thực trước khi được sử đụng trong các chiến dịch</div>
                </div>
                <Button type="primary" onClick={this.showDrawer}>
                  Tạo mới
                </Button>
              </div>
              <hr style={{ borderTop: 'dotted 1px' }} />
            </div>
          </Row>
          <div style={{ margin: '10px 0px' }}> {totalElements} bản ghi</div>
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
              <label htmlFor="">Địa chỉ gửi</label>
              <Input
                value={emailForm}
                name="email"
                onChange={event => {
                  this.setState({ emailForm: event.target.value });
                }}
              ></Input>
              <label htmlFor="">Tên người gửi</label>
              <Input
                value={fromNameForm}
                name="fromName"
                onChange={event => {
                  this.setState({ fromNameForm: event.target.value });
                }}
              ></Input>
              <Button className="btn-confirm-email" disabled={!emailForm || !fromNameForm} onClick={this.hanldeCreateEmail}>
                Xác thực email này
              </Button>
              <div className="email-note">
                Vì cần xác thực email ?
                <br />
                Xác thực giúp chúng tôi xác định email của bạn có tồn tại, tăng độ tin cậy khi gửi đi
              </div>
            </Drawer>
          </div>

          <Row>
            <Loader message={spinner1} show={loading} priority={1}>
              {emailProfileData &&
                emailProfileData.map(emaiProfile => (
                  <Row className="wrraper-email-body" key={emaiProfile.id}>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 title-email">
                      <h3>{emaiProfile.email}</h3>
                      <div>{emaiProfile.fromName}</div>
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 group-icons">
                      {emaiProfile.isDefault === 1 && emaiProfile.isActivated === 1 && (
                        <Button icon="home" style={{ display: 'flex', alignSelf: 'center' }}>
                          Mặc định
                        </Button>
                      )}
                      {emaiProfile.isDefault !== 1 && emaiProfile.isActivated === 1 && (
                        <Button
                          style={{ display: 'flex', alignSelf: 'center' }}
                          onClick={() => this.hanldeSetEmailProfileDefault(emaiProfile.id)}
                        >
                          Đặt làm mặc định
                        </Button>
                      )}
                      {// when verifiled
                      emaiProfile.isActivated === 1 && (
                        <Button icon="check" className="verifiled-btn">
                          Đã xác thực
                        </Button>
                      )}

                      {// when no verifile
                      emaiProfile.isActivated !== 1 && (
                        <Button icon="close" className="verifile-btn">
                          Chưa xác thực
                        </Button>
                      )}
                      {// when send code verifile
                      emaiProfile.isActivated !== 1 && (
                        <div style={{ display: 'flex' }}>
                          <Button className="verifile-btn" onClick={() => this.hanldeReActiveEmail(emaiProfile.id)}>
                            Gửi lại mã xác thực
                          </Button>
                          <Tooltip
                            placement="bottom"
                            title="Vì sao cần xác thực email ?
                      Xác thực giup chúng tôi xác nhận email của bạn có tồn tại,
                      tăng độ tin cậy khi gửi email"
                          >
                            <Icon type="question-circle" style={{ padding: 5 }} />
                          </Tooltip>
                        </div>
                      )}
                    </div>
                    {emaiProfile.isDefault !== 1 && (
                      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 delete-btn">
                        <Icon type="delete" onClick={() => this.hanldeDeleteEmail(emaiProfile.id)} />
                      </div>
                    )}
                  </Row>
                ))}
            </Loader>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ emailProfileState }: IRootState) => ({
  loading: emailProfileState.loading,
  emailProfileData: emailProfileState.emailProfileData.content,
  totalElements: emailProfileState.emailProfileData.totalElements,
  totalPages: emailProfileState.emailProfileData.totalPages,
  verifileCode: emailProfileState.verifileCode
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
