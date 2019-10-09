import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import { AvForm, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
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

export interface ICreateProps extends StateProps, DispatchProps {}

export interface ICreateState {
  modal: boolean;
  collapse: boolean;
  validFirstName: string;
  validLastName: string;
  validPhone: string;
  validEmail: string;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  state: ICreateState = {
    modal: false,
    collapse: false,
    validFirstName: '',
    validLastName: '',
    validPhone: '',
    validEmail: ''
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      collapse: false,
      validFirstName: '',
      validLastName: '',
      validPhone: '',
      validEmail: ''
    });
  };

  showCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  handleSubmit = () => {
    const { insertUser } = this.props;
    let data = {
      firstName: $(`input#first-name`).val(),
      lastName: $(`input#last-name`).val(),
      mobile: $(`input#email`).val(),
      email: $(`input#phone`).val(),
      fields: [
        {
          title: $(`input#name-title`).val(),
          param: $(`input#name-param`).val(),
          update: $(`input#update`).val(),
          marrigare: $('input[name=radio]:checked').val()
        }
      ]
    };
    if (this.IsValidateForm()) {
      insertUser(data);
      // this.props.openModal({
      //   show: true,
      //   type: 'success',
      //   title: translate('modal-data.title.success'),
      //   text: translate('alert.success-properties')
      // });
      this.toggle();
    }
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

  render() {
    const { loading } = this.props;
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
                  <Col md="12">
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
                      <div className="option-create">
                        <Label>Tên tổ chức</Label>
                        <Input maxLength={160} id="name-tag" name="name" label="Field Name" />
                      </div>
                      <div className="option-create">
                        <Label>Chức danh tổ chức</Label>
                        <Input maxLength={160} id="name-title" name="name" label="Field Name" />
                      </div>
                      <div className="option-create">
                        <Label>Organization name</Label>
                        <Input maxLength={160} id="name-param" name="name" label="Field Name" />
                      </div>
                      <div className="option-create">
                        <Label>Update</Label>
                        <Input maxLength={160} id="update" name="name" label="Field Name" />
                      </div>
                      <div className="option-create">
                        <AvRadioGroup inline id="marrigare-text" name="radioCustomInputExample" label="Marrigare">
                          <div id="btn-radio-yes">
                            <AvRadio className="text-radio" customInput name="radio" label="Yes" value="Yes" />
                          </div>
                          <AvRadio className="text-radio" customInput name="radio" label="No" value="No" />
                        </AvRadioGroup>
                      </div>
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
  loading: storeState.propertiesState.loading,
  isComplete: storeState.propertiesState.isCompelete
});

const mapDispatchToProps = {
  insertUser,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
