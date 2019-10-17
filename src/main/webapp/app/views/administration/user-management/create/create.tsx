import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import { AvForm, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { DatePicker, Checkbox, Row, Col, Radio, Select } from 'antd';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './create.scss';
import { insertUser } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import $ from 'jquery';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getListProp } from 'app/actions/properties-customer';
import { getUsers } from 'app/actions/user-management';

const { Option } = Select;

export interface ICreateProps extends StateProps, DispatchProps {}

export interface ICreateState {
  modal: boolean;
  collapse: boolean;
  validFirstName: string;
  validLastName: string;
  validPhone: string;
  validEmail: string;
  fiedValue: [
    {
      id: string;
      value: string;
    }
  ];
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  state: ICreateState = {
    modal: false,
    collapse: false,
    validFirstName: '',
    validLastName: '',
    validPhone: '',
    validEmail: '',
    fiedValue: [
      {
        id: '',
        value: ''
      }
    ]
  };

  componentDidMount() {
    const { getListProp } = this.props;
    getListProp();
  }

  toggle = data => {
    this.setState({
      modal: !this.state.modal,
      collapse: false,
      validFirstName: '',
      validLastName: '',
      validPhone: '',
      validEmail: ''
    });
    if (data.length > 0) {
      for (var member in data) delete data[member];
    }
  };

  showCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  handleSubmit = async () => {
    const { insertUser, getUsers } = this.props;
    let { fiedValue } = this.state;
    let value = fiedValue.slice(1);
    let data = {
      firstName: $(`input#first-name`).val(),
      lastName: $(`input#last-name`).val(),
      email: $(`input#email`).val(),
      mobile: $(`input#phone`).val(),
      fields: this.removeDuplicates(value, 'id')
    };
    if (this.IsValidateForm()) {
      await insertUser(data);
      await getUsers(0, 10, '', '');

      this.toggle(data);
    }
  };

  removeDuplicates = (array, key) => {
    return array.reduce((accumulator, element, currentIndex, arr) => {
      if (!accumulator.find(el => el[key] == element[key]) && arr.map(c => c.id).lastIndexOf(element.id) == currentIndex) {
        accumulator.push(element);
      }
      return accumulator;
    }, []);
  };

  IsValidateForm = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var vnfont = /((09|03|07|08|05)+([0-9]{8})$)/g;
    let valueEmail = $(`input#email`).val();
    let valuePhone = $(`input#phone`).val();
    let countError = 0;
    if ($(`input#first-name`).val() === '') {
      this.setState({ validFirstName: '* Vui lòng nhập tên' });
      countError++;
    } else {
      this.setState({ validFirstName: '' });
    }
    if ($(`input#last-name`).val() === '') {
      this.setState({ validLastName: '* Vui lòng nhập họ' });
      countError++;
    } else {
      this.setState({ validLastName: '' });
    }
    if (valueEmail === '') {
      this.setState({ validEmail: '* Vui lòng nhập số điện thoại' });
      countError++;
    } else if (!re.test(String(valueEmail))) {
      this.setState({ validEmail: '* Vui lòng nhập đúng định dạng email' });
      countError++;
    } else {
      this.setState({ validEmail: '' });
    }
    if (valuePhone === '') {
      this.setState({ validPhone: '* Vui lòng nhập số điện thoại' });
      countError++;
    } else if (!vnfont.test(String(valuePhone))) {
      this.setState({ validPhone: '* Vui lòng nhập đúng định dạng số điện thoại' });
      countError++;
    } else {
      this.setState({ validPhone: '' });
    }
    if (countError > 0) {
      return false;
    } else {
      return true;
    }
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

  render() {
    const { loading, getList } = this.props;
    let { collapse } = this.state;
    return (
      <span className="d-inline-block mb-2 mr-2" id="btn-modal-create">
        <Button className="btn btn-primary float-right jh-create-entity" color="primary" onClick={this.toggle}>
          <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel" />
        </Button>

        <Modal isOpen={this.state.modal} id="content-user">
          <ModalHeader toggle={this.toggle} id="create-properties">
            <Translate contentKey="properties-management.add.properties" />
          </ModalHeader>
          <PerfectScrollbar>
            <ModalBody>
              <AvForm>
                <Row>
                  <Col span={24}>
                    <div className="option-create">
                      <Label>
                        <Translate contentKey="userManagement.firstName" />
                      </Label>
                      <Input maxLength={160} id="first-name" name="name" label="Field Name" />
                    </div>
                    <p className="error">{this.state.validFirstName}</p>
                    <div className="option-create">
                      <Label>
                        <Translate contentKey="userManagement.lastName" />
                      </Label>
                      <Input maxLength={160} id="last-name" name="name" label="Field Name" />
                    </div>
                    <p className="error">{this.state.validLastName}</p>
                    <div className="option-create">
                      <Label>
                        <Translate contentKey="userManagement.email" />
                      </Label>
                      <Input maxLength={160} id="email" name="name" label="Field Name" />
                    </div>
                    <p className="error">{this.state.validEmail}</p>
                    <div className="option-create">
                      <Label>
                        <Translate contentKey="userManagement.mobile" />
                      </Label>
                      <Input maxLength={160} id="phone" name="name" label="Field Name" />
                    </div>
                    <p className="error">{this.state.validPhone}</p>
                    <Collapse isOpen={this.state.collapse}>
                      {getList.map((value, index) => {
                        if (
                          !(
                            value.title === 'First Name' ||
                            value.title === 'Last Name' ||
                            value.title === 'Email' ||
                            value.title === 'Mobile'
                          )
                        ) {
                          let object = (
                            <div className="option-create" key={index}>
                              <Label>{value.title}</Label>
                              {value.type === 'Checkbox' ? (
                                <Checkbox.Group className="checkbox-group" onChange={event => this.onChangeCheckbox(value.id, event)}>
                                  <Row>
                                    {String(value.fieldValue)
                                      .split('||')
                                      .map((event, index) => {
                                        return (
                                          <Col span={8} key={index}>
                                            <Checkbox value={String(event)}>{event}</Checkbox>
                                          </Col>
                                        );
                                      })}
                                  </Row>
                                </Checkbox.Group>
                              ) : (
                                ''
                              )}
                              {value.type === 'Radio' ? (
                                <Radio.Group
                                  onChange={event => this.onChangeRadio(event, value.id)}
                                  className="radio-group"
                                  name="radiogroup"
                                  defaultValue={event}
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
                                <Input id={value.id} onChange={event => this.onChangeText(value.id, event)} />
                              ) : (
                                ''
                              )}
                              {value.type === 'Date' ? (
                                <DatePicker
                                  className="date-create"
                                  onChange={(event, dateString) => this.onChangeDate(value.id, dateString)}
                                />
                              ) : (
                                ''
                              )}
                              {value.type === 'Dropdown List' ? (
                                <Select className="checkbox-group" onChange={event => this.handleChangeDrop(value.id, event)}>
                                  {String(value.fieldValue)
                                    .split('||')
                                    .map((event, index) => {
                                      return (
                                        <Option value={String(event)} key={index}>
                                          {event}
                                        </Option>
                                      );
                                    })}
                                </Select>
                              ) : (
                                ''
                              )}
                            </div>
                          );
                          return object;
                        }
                        return '';
                      })}
                    </Collapse>
                    <div className="option-create" id="has-collapse" style={{ display: collapse ? 'none' : '' }}>
                      <p>Only required fields are being displayed </p>
                      <button id="btn-collapse" onClick={this.showCollapse}>
                        Click here to shocustomer fields
                      </button>
                    </div>
                  </Col>
                </Row>
              </AvForm>
            </ModalBody>
          </PerfectScrollbar>
          <ModalFooter>
            <Button color="link" onClick={this.toggle}>
              <Translate contentKey="properties-management.cancel" />
            </Button>
            <Button disabled={loading} onClick={this.handleSubmit} color="primary">
              <Translate contentKey="properties-management.button-field" />
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}
const mapStateToProps = (storeState: IRootState) => ({
  getList: storeState.propertiesState.list_prop,
  loading: storeState.userManagement.loading,
  isComplete: storeState.propertiesState.isCompelete
});

const mapDispatchToProps = {
  insertUser,
  openModal,
  closeModal,
  getListProp,
  getUsers
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
