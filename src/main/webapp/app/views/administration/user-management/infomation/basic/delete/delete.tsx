import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './delete.scss';
import { deleteUserAction } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import Ionicon from 'react-ionicons';
import Select from 'react-select';
import { List } from 'react-movable';
import $ from 'jquery';

export interface IDeleteProps extends StateProps, DispatchProps {
  onClick: Function;
  id: string;
}

export interface IDeleteState {
  modal: boolean;
  valueBtn1: string;
  valueBtn2: string;
  valueBtn3: string;
}

export class Delete extends React.Component<IDeleteProps, IDeleteState> {
  state: IDeleteState = {
    modal: false,
    valueBtn1: '',
    valueBtn2: '',
    valueBtn3: ''
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      valueBtn1: '',
      valueBtn2: '',
      valueBtn3: ''
    });
  };

  deleteUser = async () => {
    let { deleteUserAction, id, openModal } = this.props;
    deleteUserAction(id);
    this.toggle();
    openModal({
      show: true,
      type: 'success',
      title: translate('modal-data.title.success'),
      text: translate('alert.complete-delete')
    });
    window.location.assign('/#/app/views/customers/user-management');
  };

  render() {
    const { loading } = this.props;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Button className="btn float-right jh-create-entity" outline color="danger" onClick={this.toggle}>
          <Ionicon icon="ios-trash-outline" /> &nbsp; Delete
        </Button>

        <Modal isOpen={this.state.modal} id="delete-properties">
          <ModalHeader toggle={this.toggle} id="create-properties">
            XÓA THÔNG TIN KHÁCH HÀNG
          </ModalHeader>
          <ModalBody>
            <AvForm>
              <Row>
                <Col md="12">
                  <div>
                    <Label className="head-text">
                      <Translate contentKey="properties-management.delete.head-title" />
                    </Label>
                  </div>
                  <div>
                    <Col md="12" className="group-btn-delete">
                      <Input
                        type="checkbox"
                        onClick={() => {
                          this.setState({ valueBtn1: $('#btn1').prop('checked') });
                        }}
                        value="a"
                        id="btn1"
                      />{' '}
                      <Label for="btn1" className="text">
                        <Translate contentKey="properties-management.delete.content-title-1" />
                      </Label>
                    </Col>
                  </div>
                  <div>
                    <Col md="12" className="group-btn-delete">
                      <Input
                        type="checkbox"
                        onClick={() => {
                          this.setState({ valueBtn2: $('#btn2').prop('checked') });
                        }}
                        value="b"
                        id="btn2"
                      />{' '}
                      <Label for="btn2" className="text">
                        <Translate contentKey="properties-management.delete.content-title-2" />
                      </Label>
                    </Col>
                  </div>
                  <div>
                    <Col md="12" className="group-btn-delete">
                      <Input
                        type="checkbox"
                        onClick={() => {
                          this.setState({ valueBtn3: $('#btn3').prop('checked') });
                        }}
                        value="c"
                        id="btn3"
                      />{' '}
                      <Label for="btn3" className="text">
                        <Translate contentKey="properties-management.delete.content-title-3" />
                      </Label>
                    </Col>
                  </div>
                </Col>
              </Row>
            </AvForm>
          </ModalBody>
          <ModalFooter>
            <Button
              color="link"
              onClick={() => {
                this.setState({
                  modal: false,
                  valueBtn1: '',
                  valueBtn2: '',
                  valueBtn3: ''
                });
              }}
            >
              <Translate contentKey="properties-management.cancel" />
            </Button>
            <Button
              color="primary"
              disabled={this.state.valueBtn1 && this.state.valueBtn2 && this.state.valueBtn3 && !loading ? false : true}
              onClick={() => {
                this.deleteUser();
              }}
            >
              <Translate contentKey="properties-management.delete.button" />
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}
const mapStateToProps = ({ userManagement }: IRootState) => ({
  loading: userManagement.loading
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  deleteUserAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete);
