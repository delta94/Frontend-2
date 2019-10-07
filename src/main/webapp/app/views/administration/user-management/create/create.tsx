import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import { AvForm, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './create.scss';
import { getListProp, insertProp } from 'app/actions/properties-customer';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import $ from 'jquery';
import PerfectScrollbar from 'react-perfect-scrollbar';

export interface ICreateProps extends StateProps, DispatchProps {}

export interface ICreateState {
  modal: boolean;
  collapse: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  number: string;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  state: ICreateState = {
    modal: false,
    collapse: false,
    firstName: '',
    lastName: '',
    phone: '',
    number: ''
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal, collapse: false });
  };

  showCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  handleSubmit = () => {
    if (this.IsValidateForm()) {
    }
  };

  IsValidateForm = () => {
    if ($(`input#first-name`).val() === '') {
      this.setState({});
    }
    return true;
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
                    <div className="option-create">
                      <Label>
                        <Translate contentKey="userManagement.lastName" />
                      </Label>
                      <Input maxLength={160} id="last-name" name="name" label="Field Name" />
                    </div>
                    <div className="option-create">
                      <Label>
                        <Translate contentKey="userManagement.email" />
                      </Label>
                      <Input maxLength={160} id="email" name="name" label="Field Name" />
                    </div>
                    <div className="option-create">
                      <Label>
                        <Translate contentKey="userManagement.mobile" />
                      </Label>
                      <Input maxLength={160} id="phone" name="name" label="Field Name" />
                    </div>
                    <Collapse isOpen={this.state.collapse}>
                      <div className="option-create">
                        <Label>Tên tổ chức</Label>
                        <Input maxLength={160} name="name" label="Field Name" />
                      </div>
                      <div className="option-create">
                        <Label>Chức danh tổ chức</Label>
                        <Input maxLength={160} name="name" label="Field Name" />
                      </div>
                      <div className="option-create">
                        <Label>Organization name</Label>
                        <Input maxLength={160} name="name" label="Field Name" />
                      </div>
                      <div className="option-create">
                        <Label>Update</Label>
                        <Input maxLength={160} name="name" label="Field Name" />
                      </div>
                      <div className="option-create">
                        <AvRadioGroup inline id="marrigare-text" name="radioCustomInputExample" label="Marrigare">
                          <div id="btn-radio-yes">
                            <AvRadio className="text-radio" customInput label="Yes" value="Bulbasaur" />
                          </div>
                          <AvRadio className="text-radio" customInput label="No" value="Squirtle" />
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
  getListProp,
  insertProp,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
