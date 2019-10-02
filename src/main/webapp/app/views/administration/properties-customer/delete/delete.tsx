import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';

import { Translate, translate } from 'react-jhipster';
import $ from 'jquery';
import './delete.scss';
import { postDeleteProp, getListProp } from 'app/actions/properties-customer';
import { IRootState } from 'app/reducers';
import { openModal, closeModal } from 'app/actions/modal';

export interface IDeleteProps extends StateProps, DispatchProps {
  isOpen: boolean;
  id: string;
  ramdomId: number;
}

export interface IDeleteState {
  modalDelete: boolean;
  valueBtn1: string;
  valueBtn2: string;
  valueBtn3: string;
}

export class Delete extends React.Component<IDeleteProps, IDeleteState> {
  state: IDeleteState = {
    modalDelete: false,
    valueBtn1: '',
    valueBtn2: '',
    valueBtn3: ''
  };
  componentWillReceiveProps(nextProps) {
    this.state.modalDelete = nextProps.CloseModal;
    this.setState({
      modalDelete: nextProps.CloseModal
    });
  }

  toggle = () => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      valueBtn1: '',
      valueBtn2: '',
      valueBtn3: ''
    });
  };
  render() {
    const { postDeleteProp, id } = this.props;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal isOpen={this.state.modalDelete} id="content-properties">
          <ModalHeader toggle={this.toggle} id="create-properties">
            <Translate contentKey="properties-management.delete.title" />
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
                  modalDelete: false,
                  valueBtn1: '',
                  valueBtn2: '',
                  valueBtn3: ''
                });
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              color="primary"
              disabled={this.state.valueBtn1 && this.state.valueBtn2 && this.state.valueBtn3 ? false : true}
              onClick={async () => {
                await postDeleteProp(id);
                this.props.getListProp();
                if (this.props.isDelete) {
                  this.setState({
                    modalDelete: false,
                    valueBtn1: '',
                    valueBtn2: '',
                    valueBtn3: ''
                  });
                  this.props.openModal({
                    show: true,
                    type: 'success',
                    title: translate('modal-data.title.success'),
                    text: translate('alert.complete-delete')
                  });
                }
              }}
            >
              Xóa
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
  isComplete: storeState.propertiesState.isCompelete,
  isDelete: storeState.propertiesState.isDelete,
  CloseModal: storeState.propertiesState.openModalDelete
});

const mapDispatchToProps = {
  postDeleteProp,
  getListProp,
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete);
