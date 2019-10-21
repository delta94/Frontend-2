import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import { Card, Row, Avatar, Icon, Popover, Button, Collapse, Input, DatePicker, Checkbox, Col, Radio, Select } from 'antd';
import { Translate, translate } from 'react-jhipster';
import { openModal, closeModal } from '../../../../../actions/modal';
import SweetAlert from 'sweetalert-react';
import Merge from './merge/merge';
import Delete from './delete/delete';
import moment from 'moment';
import { resetMessage, getDetailUser, updateCategory, updateUserAction, getListDuplicateAction } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import './basic.scss';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import Ionicon from 'react-ionicons';
import $ from 'jquery';
import UserCategoryTag from './categories-tag/categories-tag';
import { RouteComponentProps, RouteProps } from 'react-router';
const { Option } = Select;

const { Panel } = Collapse;

export interface IBasicProps extends StateProps, DispatchProps, RouteProps {}

export interface IBasicState {
  visible: boolean;
  user: IUserDetails;
  fiedValue: [
    {
      id: string;
      value: string;
    }
  ];
  isOpenPopFirst: boolean;
  isOpenPopLast: boolean;
  isOpenPopEmail: boolean;
  isOpenPopMobile: boolean;
  listField: [
    {
      id?: string;
      type?: string;
      title?: string;
      fieldValue?: string;
      personalizationTag?: string;
      value?: string;
      check?: boolean;
    }
  ];
  tags?: [{ id?: string; name?: string }];
  isOpenPopTag: boolean;
}

export interface IUserDetails {
  email?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  tags?: [{ id?: string; name?: string }];
  fields?: any[];
}

export class Basic extends React.Component<IBasicProps, IBasicState> {
  state: IBasicState = {
    visible: false,
    user: this.props.user,
    fiedValue: [{ id: '', value: '' }],
    listField: this.props.user.fields,
    isOpenPopFirst: false,
    isOpenPopLast: false,
    isOpenPopEmail: false,
    isOpenPopMobile: false,
    tags: [{ id: '', name: '' }],
    isOpenPopTag: false
  };

  componentDidMount() {
    console.log(this.props);
    // this.props.getDetailUser(this.props.match.params.id)
  }

  hide = type => {
    this.setState({
      visible: false,
      isOpenPopFirst: false,
      isOpenPopLast: false,
      isOpenPopEmail: false,
      isOpenPopMobile: false,
      isOpenPopTag: false
    });
  };

  handleVisibleChange = async (visible, id, list) => {
    let listFields;
    if (id === 'admin') {
      this.setState({ visible });
    }
    if (id === 'fistName') {
      this.setState({ isOpenPopFirst: visible });
    }
    if (id === 'lastName') {
      this.setState({ isOpenPopLast: visible });
    }
    if (id === 'email') {
      this.setState({ isOpenPopEmail: visible });
    }
    if (id === 'mobile') {
      this.setState({ isOpenPopMobile: visible });
    }
    if (id === 'tag') {
      this.setState({ isOpenPopTag: visible });
    } else {
      listFields = this.state.listField.map(event => {
        if (event.id === id) {
          event.check = visible;
        }
        return event;
      });
      this.setState({ listField: listFields });
      await this.props.getDetailUser(this.state.user.id);
    }
  };

  closePopover = async () => {
    let listFields;
    listFields = this.state.listField.map(event => {
      event.check = false;
      return event;
    });
    this.setState({ listField: listFields });
    await this.props.getDetailUser(this.state.user.id);
  };

  contentUser = (id, value) => {
    let { loading } = this.props;
    return (
      <div>
        <div style={{ marginBottom: '2%' }}>
          <Input defaultValue={value} id={id} />
        </div>
        <div>
          <Button
            disabled={loading}
            onClick={() => {
              this.editUser(id);
            }}
            type="primary"
          >
            {' '}
            Chỉnh sửa{' '}
          </Button>{' '}
          &nbsp;
          <Button onClick={this.hide}>Hủy bỏ</Button>
        </div>
      </div>
    );
  };

  editUser = async id => {
    let { user, fiedValue, tags } = this.state;
    let { updateUserAction, getDetailUser } = this.props;
    let value = fiedValue.slice(1);
    let data = {
      email: id === 'email' ? $(`input#${id}`).val() : user.email,
      id: user.id,
      firstName: id === 'firstName' ? $(`input#${id}`).val() : user.firstName,
      lastName: id === 'lastName' ? $(`input#${id}`).val() : user.lastName,
      mobile: id === 'mobile' ? $(`input#${id}`).val() : user.mobile,
      tags: this.removeDuplicates(tags.slice(1), 'id')[0],
      fields: this.removeDuplicates(value, 'id')
    };
    await updateUserAction(data);
    this.closePopover();
    this.hide('');
    await getDetailUser(data.id);
    this.setState({ user: this.props.user, listField: this.props.user.fields });
  };

  removeDuplicates = (array, key) => {
    return array.reduce((accumulator, element, currentIndex, arr) => {
      if (!accumulator.find(el => el[key] == element[key]) && arr.map(c => c.id).lastIndexOf(element.id) == currentIndex) {
        accumulator.push(element);
      }
      return accumulator;
    }, []);
  };

  handleChange = category => {
    let { tags } = this.state;

    let data = category.map(event => {
      return {
        id: event.id,
        name: event.name
      };
    });
    tags.push(data);
    this.setState({ tags });
    this.props.updateCategory(category);
  };

  setting = () => {
    let { user } = this.props;
    const content = (
      <div>
        <div style={{ marginBottom: '2%' }}>
          <Delete id={user.id} onClick={() => this.hide('delete')} />
        </div>
        <Merge id={user.id} email={user.email} phone={user.mobile} onClick={() => this.hide('merge')} />
      </div>
    );
    return content;
  };

  onChangeDate = (id, dateString) => {
    let { fiedValue } = this.state;
    let data = {
      id: id,
      value: String(dateString)
    };
    fiedValue.push(data);
    this.setState({ fiedValue });
  };

  onChangeCheckbox = (id, checkedValues) => {
    let { fiedValue } = this.state;
    let data = {
      id: id,
      value: String(checkedValues)
    };
    fiedValue.push(data);
    this.setState({ fiedValue });
  };

  onChangeRadio = (value, id) => {
    let { fiedValue } = this.state;
    let data = {
      id: id,
      value: String(value.target.value)
    };
    fiedValue.push(data);
    this.setState({ fiedValue });
  };

  handleChangeDrop = (id, value) => {
    let { fiedValue } = this.state;
    let data = {
      id: id,
      value: String(value)
    };
    fiedValue.push(data);
    this.setState({ fiedValue });
  };
  onChangeText = (id, value) => {
    let { fiedValue } = this.state;
    let data = {
      id: id,
      value: String(value.target.value)
    };
    fiedValue.push(data);
    this.setState({ fiedValue });
  };

  optionsCheckbox = value => {
    return value;
  };

  render() {
    const { getDetailUser, loading } = this.props;
    let { user, isOpenPopEmail, isOpenPopFirst, isOpenPopLast, isOpenPopMobile, listField, isOpenPopTag } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Fragment>
        <Loader message={spinner1} show={loading} priority={1}>
          <Card
            className="image-customer"
            extra={
              <Popover
                content={this.setting()}
                trigger="click"
                placement="right"
                visible={this.state.visible}
                onVisibleChange={event => this.handleVisibleChange(event, 'admin', '')}
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
              <Label>{user ? user.firstName + ' ' + user.lastName : ''}</Label>
            </div>
            <div className="details-customer">
              <Label>{user.email ? user.email : ''}</Label>
            </div>
            <div className="details-customer">
              <Label>{user.mobile ? user.mobile : ''}</Label>
            </div>
          </Card>
          <Collapse defaultActiveKey="1" expandIconPosition="right">
            <Panel header="THÔNG TIN CƠ BẢN" id="info-basic" key="1">
              <div style={{ display: 'flex', position: 'relative' }}>
                <Label className="content-text" style={{ width: '50%' }}>
                  First Name
                </Label>
                <label className="phone-customer_span">
                  <Popover
                    content={this.contentUser('firstName', user.firstName)}
                    visible={isOpenPopFirst}
                    onVisibleChange={event => this.handleVisibleChange(event, 'fistName', '')}
                    title="Frist Name"
                    trigger="click"
                  >
                    {user.firstName ? user.firstName : ''}
                  </Popover>
                </label>
              </div>
              <div className="line-info">
                <Label className="content-text" style={{ width: '50%' }}>
                  Last Name
                </Label>
                <span className="phone-customer_span">
                  <Popover
                    content={this.contentUser('lastName', user.lastName)}
                    visible={isOpenPopLast}
                    onVisibleChange={event => this.handleVisibleChange(event, 'lastName', '')}
                    title="Last Name"
                    trigger="click"
                  >
                    {user.lastName ? user.lastName : ''}
                  </Popover>
                </span>
              </div>
              <div className="line-info">
                <Label className="content-text" style={{ width: '50%' }}>
                  Email
                </Label>

                <span className="phone-customer_span">
                  <Popover
                    content={this.contentUser('email', user.email)}
                    visible={isOpenPopEmail}
                    onVisibleChange={event => this.handleVisibleChange(event, 'email', '')}
                    title="Email"
                    trigger="click"
                  >
                    {user.email ? user.email : ''}
                  </Popover>
                </span>
              </div>
              <div className="line-info">
                <Label className="content-text" style={{ width: '50%' }}>
                  Mobile
                </Label>
                <span className="phone-customer_span">
                  <Popover
                    content={this.contentUser('mobile', user.mobile)}
                    visible={isOpenPopMobile}
                    onVisibleChange={event => this.handleVisibleChange(event, 'mobile', '')}
                    title="Mobile"
                    trigger="click"
                  >
                    {user.mobile ? user.mobile : ''}
                  </Popover>
                </span>
              </div>
              {listField
                ? listField.map((value, index) => {
                    return (
                      <div className="line-info" key={index}>
                        <Label className="content-text" style={{ width: '50%' }}>
                          {value.title}
                        </Label>
                        <div className="phone-customer_span">
                          <Popover
                            content={
                              <div>
                                {value.type === 'Checkbox' ? (
                                  <Row>
                                    <Col span={8} key={index}>
                                      <Checkbox.Group
                                        className="checkbox-update"
                                        options={this.optionsCheckbox(String(value.fieldValue).split('||'))}
                                        defaultValue={String(value.value).split(',')}
                                        onChange={event => this.onChangeCheckbox(value.id, event)}
                                      />
                                    </Col>
                                  </Row>
                                ) : (
                                  ''
                                )}
                                {value.type === 'Radio' ? (
                                  <Radio.Group
                                    onChange={event => this.onChangeRadio(event, value.id)}
                                    className="radio-group"
                                    name="radiogroup"
                                    defaultValue={value.value}
                                  >
                                    <Row>
                                      {String(value.fieldValue)
                                        .split('||')
                                        .map((event, index) => {
                                          return (
                                            <Col span={8} key={index}>
                                              <Radio value={event}>{event}</Radio>
                                            </Col>
                                          );
                                        })}
                                    </Row>
                                  </Radio.Group>
                                ) : (
                                  ''
                                )}
                                {value.type === 'Text Input' ? (
                                  <Input
                                    defaultValue={value.value}
                                    className="box"
                                    onChange={event => this.onChangeText(value.id, event)}
                                  />
                                ) : (
                                  ''
                                )}
                                {value.type === 'Date' ? (
                                  <DatePicker
                                    defaultValue={value.value ? moment(value.value) : null}
                                    className="date-update box"
                                    onChange={(event, dateString) => this.onChangeDate(value.id, dateString)}
                                  />
                                ) : (
                                  ''
                                )}
                                {value.type === 'Dropdown List' ? (
                                  <Select
                                    className="checkbox-group"
                                    defaultValue={value.value}
                                    id="box"
                                    onChange={event => this.handleChangeDrop(value.id, event)}
                                  >
                                    {String(value.fieldValue)
                                      .split('||')
                                      .map((event, index) => {
                                        return (
                                          <Option key={index} value={String(event)}>
                                            {event}
                                          </Option>
                                        );
                                      })}
                                  </Select>
                                ) : (
                                  ''
                                )}
                                <div style={{ marginTop: '5%' }}>
                                  <Button
                                    onClick={() => {
                                      this.editUser(value.id);
                                    }}
                                    disabled={this.props.loading}
                                    type="primary"
                                  >
                                    {' '}
                                    Chỉnh sửa{' '}
                                  </Button>{' '}
                                  &nbsp;
                                  <Button onClick={this.closePopover}>Hủy bỏ</Button>
                                </div>
                              </div>
                            }
                            visible={value.check}
                            onVisibleChange={event => this.handleVisibleChange(event, value.id, value)}
                            title={value.type}
                            trigger="click"
                          >
                            {value.value && value.value.trim().length > 0 ? value.value : <span className="empty">Click to add</span>}
                          </Popover>
                        </div>
                      </div>
                    );
                  })
                : ''}
              <div className="line-info">
                <Label className="content-text" for="categories">
                  <Translate contentKey="userManagement.categories" />
                </Label>
                <div className="phone-customer_span">
                  <Popover
                    content={
                      <div>
                        <UserCategoryTag handleChange={this.handleChange} />
                        <div>
                          <Button
                            onClick={() => {
                              this.editUser(user.id);
                            }}
                            disabled={this.props.loading}
                            type="primary"
                          >
                            {' '}
                            Chỉnh sửa{' '}
                          </Button>{' '}
                          &nbsp;
                          <Button onClick={this.hide}>Hủy bỏ</Button>
                        </div>
                      </div>
                    }
                    trigger="click"
                    visible={isOpenPopTag}
                    onVisibleChange={event => this.handleVisibleChange(event, 'tag', '')}
                  >
                    {user.tags && user.tags.length > 0 ? user.tags.map(event => event.name) : <span className="empty">Click to add</span>}
                  </Popover>
                </div>
              </div>
            </Panel>
          </Collapse>
        </Loader>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ handleModal, userManagement }: IRootState) => ({
  modalState: handleModal.data,
  loading: userManagement.loading,
  user: userManagement.user,
  data: userManagement.data
});

const mapDispatchToProps = { resetMessage, openModal, closeModal, getDetailUser, updateCategory, updateUserAction, getListDuplicateAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basic);
