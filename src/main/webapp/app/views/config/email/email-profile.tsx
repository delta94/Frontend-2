import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Row, Checkbox, Modal, Menu, Dropdown as DropdownAnt } from 'antd';
import { Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { IEmail } from 'app/common/models/email-config.model';
import { getEmailsAction, deleteEmailAction, getEmailDetailAction } from 'app/actions/email-config';
import './email.scss';
import { Button, Tooltip, Drawer } from 'antd';

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

const { confirm } = Modal;
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
    let { activePage, itemsPerPage } = this.state;
    this.props.getEmailsAction('', activePage, itemsPerPage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.listCheckboxItem != this.state.listCheckboxItem) {
      this.setState({ ...this.state });
    }
  }

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

  render() {
    let { total, totalPages, loading } = this.props;

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
              <Button className="btn-confirm-email">Xác thực email này</Button>
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
                  <Button icon="home" style={{ display: 'flex', alignSelf: 'center' }}>
                    Mặc định
                  </Button>
                  <Button icon="check" style={{ display: 'flex', alignSelf: 'center', color: 'green' }}>
                    Đã xác thực
                  </Button>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{ fontSize: 30, alignSelf: 'center' }}>
                  <Icon type="delete" />
                </div>
              </Row>
              <Row className="wrraper-email-body">
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 title-email">
                  <h3>TAi khoan email</h3>
                  <div>Cong ty abc</div>
                </div>
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 group-icons">
                  <Button icon="home" style={{ display: 'flex', alignSelf: 'center' }}>
                    Mặc định
                  </Button>
                  <Button icon="close" style={{ display: 'flex', alignSelf: 'center', color: 'red' }}>
                    Chưa xác thực
                  </Button>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{ fontSize: 30, alignSelf: 'center' }}>
                  <Icon type="delete" />
                </div>
              </Row>
            </Loader>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ emailConfigState }: IRootState) => ({
  loading: emailConfigState.loading,
  total: emailConfigState.emailData.totalElements,
  emails: emailConfigState.emailData.content,
  totalPages: emailConfigState.emailData.totalPages
});

const mapDispatchToProps = {
  getEmailsAction,
  deleteEmailAction,
  getEmailDetailAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailSendManagement);
