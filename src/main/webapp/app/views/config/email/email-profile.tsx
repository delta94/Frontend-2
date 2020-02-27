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

const { confirm } = Modal;

interface IEmailSendManagementProps extends StateProps, DispatchProps {}
interface IEmailSendManagementState {
  activePage: number;
  itemsPerPage: number;
  textSearch?: string;
  listCheckboxItem: ICheckboxItem[];
  isCheckAll: boolean;
  visible: boolean;
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
    visible: false
  };

  componentDidMount() {
    // get list email here
    let { activePage, itemsPerPage } = this.state;
    // this.props.getEmailsProfile();
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

  hanldeSetEmailProfileDefault = () => {
    confirm({
      title: 'Thông báo',
      content: 'Bạn có muốn đặt email này thành mặc định',
      onOk() {
        //call api here just one email set by default
      },
      onCancel() {}
    });
  };
  hanldeVerifileEmail = () => {
    // TODO
    //call api here
    Modal.info({
      title: 'Thông báo',
      content: (
        <div>
          <p>
            Hệ thống đã gửi email xác nhận đến địa chỉ email của bạn. Vui lòng kiểm tra và xác nhận đường linh trong 24h
            <b> Lưu ý</b>: Trong trường hợp không xác nhận được email, hãy kiểm tra thư mục spam, hoặc xem lại chính xác địa chỉ email muốn
            xác thực.
          </p>
        </div>
      ),
      onOk() {}
    });
    this.setState({
      visible: false
    });
  };
  hanldeDeleteEmail = () => {
    //TODO
    confirm({
      title: 'Thông báo',
      content: 'Bạn có muốn thực sự muốn xóa email này',
      onOk() {
        //call api here
        // this.props.deleteEmailsProfile()
      },
      onCancel() {}
    });
  };

  ValidateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };
  hanldeCreateEmail = () => {
    // TODO
    // this.props.createEmailsProfile()
  };

  render() {
    let { total, totalPages, loading } = this.props;
    const {} = this.state;

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
          <div style={{ margin: '10px 0px' }}> 0 bản ghi</div>
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
              <Input></Input>
              <label htmlFor="">Tên người gửi</label>
              <Input></Input>
              <Button className="btn-confirm-email" onClick={this.hanldeVerifileEmail}>
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
              <Row className="wrraper-email-body">
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 title-email">
                  <h3>TAi khoan email</h3>
                  <div>Cong ty abc</div>
                </div>
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 group-icons">
                  {/* <Button icon="home" style={{ display: 'flex', alignSelf: 'center' }} >
                    Mặc định
                  </Button> */}
                  <Button style={{ display: 'flex', alignSelf: 'center' }} onClick={this.hanldeSetEmailProfileDefault}>
                    Đặt làm mặc định
                  </Button>
                  {
                    // when verifiled
                    //   <Button icon="check" className="verifiled-btn">
                    //   Đã xác thực
                    // </Button>
                  }

                  {
                    // when no verifile
                    /* <Button icon="close" className="verifile-btn" >
                    Chưa xác thực
                  </Button> */
                  }
                  {
                    // when send code verifile
                    <div style={{ display: 'flex' }}>
                      <Button className="verifile-btn" onClick={this.hanldeVerifileEmail}>
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
                  }
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 delete-btn">
                  <Icon type="delete" onClick={this.hanldeDeleteEmail} />
                </div>
              </Row>
            </Loader>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ emailProfileState }: IRootState) => ({
  loading: emailProfileState.loading,
  total: emailProfileState.emailData.totalElements,
  emails: emailProfileState.emailData.content,
  totalPages: emailProfileState.emailData.totalPages
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
