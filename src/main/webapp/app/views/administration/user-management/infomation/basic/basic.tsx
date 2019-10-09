import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import { Card, Row, Avatar, Icon, Popover, Button, Collapse, Input } from 'antd';
import { Translate, translate } from 'react-jhipster';
import { openModal, closeModal } from '../../../../../actions/modal';
import SweetAlert from 'sweetalert-react';
import { resetMessage, getDetailUser, updateCategory } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import './basic.scss';
import Ionicon from 'react-ionicons';
import $ from 'jquery';
import UserCategoryTag from './categories-tag/categories-tag';

const { Panel } = Collapse;

export interface IBasicProps extends StateProps, DispatchProps {}

export interface IBasicState {
  visible: boolean;
  isOpenPhone: boolean;
  isOpenOrganizationName: boolean;
  isOpentag: boolean;
  isOpentitle: boolean;
  valuePhone: string;
  valueName: string;
  valueTitle: string;
  validateText: string;
}

export class Basic extends React.Component<IBasicProps, IBasicState> {
  state: IBasicState = {
    visible: false,
    isOpenPhone: false,
    isOpenOrganizationName: false,
    isOpentag: false,
    isOpentitle: false,
    valuePhone: this.props.user.phone,
    valueName: this.props.user.type,
    valueTitle: this.props.user.personalizationTag,
    validateText: ''
  };

  hide = () => {
    this.setState({
      visible: false,
      isOpenPhone: false,
      isOpenOrganizationName: false,
      isOpentitle: false
    });
  };

  handleVisibleChange = (visible, id) => {
    if (id === 'admin') {
      this.setState({ visible });
    }
    if (id === 'phone') {
      this.setState({ isOpenPhone: visible });
    }
    if (id === 'tag-name') {
      this.setState({ isOpenOrganizationName: visible });
    }
    if (id === 'title') {
      this.setState({ isOpentitle: visible });
    }
  };
  onChangeText = id => {
    let { isOpenPhone, isOpenOrganizationName, isOpentitle } = this.state;
    let valueName = $(`input#${id}`).val();
    var vnfont = /((09|03|07|08|05)+([0-9]{8})$)/g;
    if (isOpenPhone) {
      if (!vnfont.test(String(valueName))) {
        this.setState({ validateText: '* Số điện thoại sai định dạng' });
      } else {
        this.state.valuePhone = String(valueName);
        this.setState({ valuePhone: String(valueName), validateText: '' });
      }
    }
    if (isOpenOrganizationName) {
      this.state.valueName = String(valueName);
      this.setState({ valueName: String(valueName) });
    }
    if (isOpentitle) {
      this.state.valueTitle = String(valueName);
      this.setState({ valueTitle: String(valueName) });
    }
  };

  handleChange = category => {
    this.props.updateCategory(category);
  };

  formInput = () => {
    let id = Math.random()
      .toString(36)
      .substring(7);
    return (
      <div>
        <Input id={id} />
        <div className=" group-btn-popover ">
          <Button
            onClick={() => {
              this.onChangeText(id);
              this.hide();
            }}
            type="primary"
          >
            Save
          </Button>

          <Button
            onClick={() => {
              this.hide();
            }}
            className="btn-canel-popover"
          >
            Canel
          </Button>
        </div>
      </div>
    );
  };

  setting = () => {
    const content = (
      <div>
        <div style={{ marginBottom: '2%' }}>
          <Button onClick={this.hide}>
            <i className="lnr-trash"> </i>&nbsp; Delete
          </Button>
        </div>
        <Button onClick={this.hide}>
          <Ionicon icon="md-git-merge" /> &nbsp; Merge
        </Button>
      </div>
    );
    return content;
  };

  render() {
    const { user } = this.props;
    let { valuePhone, isOpenPhone, valueName, valueTitle } = this.state;

    return (
      <Fragment>
        <Card
          className="image-customer"
          extra={
            <Popover
              content={this.setting()}
              trigger="click"
              visible={this.state.visible}
              onVisibleChange={event => this.handleVisibleChange(event, 'admin')}
            >
              <Icon type="setting" key="setting" />
            </Popover>
          }
        >
          <Avatar
            shape="square"
            size={64}
            icon="user"
            style={{ height: '6pc', width: '10pc', fontSize: '75px', background: 'antiquewhite' }}
          />
          <div className="details-customer-name">
            <Label>{user.name}</Label>
          </div>
          <div className="details-customer">
            <Label>{user.email}</Label>
          </div>
          <div className="details-customer">
            <Label>{user.phone}</Label>
          </div>
        </Card>
        <Collapse defaultActiveKey="1" expandIconPosition="right">
          <Panel header="THÔNG TIN CƠ BẢN" id="info-basic" key="1">
            <div style={{ display: 'flex', position: 'relative' }}>
              <Label className="content-text" style={{ width: '50%' }}>
                Phone
              </Label>
              <Popover
                visible={isOpenPhone}
                onVisibleChange={event => this.handleVisibleChange(event, 'phone')}
                content={this.formInput()}
                trigger="click"
              >
                <label className="phone-customer_span">
                  {valuePhone ? <Label className="value-text">{valuePhone}</Label> : <Label className=" value-empty">Click to add</Label>}
                </label>
              </Popover>
            </div>
            <div className="line-info">
              <Label className="content-text" style={{ width: '50%' }}>
                Organization name
              </Label>
              <Popover
                visible={this.state.isOpenOrganizationName}
                onVisibleChange={event => this.handleVisibleChange(event, 'tag-name')}
                content={this.formInput()}
                trigger="click"
              >
                <span className="phone-customer_span">
                  {valueName ? <Label className="value-text">{valueName}</Label> : <Label className=" value-empty">Click to add</Label>}
                </span>
              </Popover>
            </div>
            <div className="line-info">
              <Label className="content-text" style={{ width: '50%' }}>
                Organization title
              </Label>
              <Popover
                visible={this.state.isOpentitle}
                onVisibleChange={event => this.handleVisibleChange(event, 'title')}
                content={this.formInput()}
                trigger="click"
              >
                <span className="phone-customer_span">
                  {valueTitle ? <Label className="value-text">{valueTitle}</Label> : <Label className=" value-empty">Click to add</Label>}
                </span>
              </Popover>
            </div>
            <div className="line-info">
              <Label className="content-text" for="categories">
                <Translate contentKey="userManagement.categories" />
              </Label>
              <div className="phone-customer_span">
                <UserCategoryTag defaultCate={user.categorys} handleChange={this.handleChange} />
              </div>
            </div>
            <p style={{ textAlign: 'center' }} className="error">
              {this.state.validateText}
            </p>
          </Panel>
        </Collapse>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ handleModal, userManagement }: IRootState) => ({
  modalState: handleModal.data,
  user: userManagement.user
});

const mapDispatchToProps = { resetMessage, openModal, closeModal, getDetailUser, updateCategory };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basic);
