import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { Tooltip, Icon, Input } from 'antd';
import { Translate, translate } from 'react-jhipster';
import $ from 'jquery';
import './edit.scss';
import { postDeleteProp, getListProp } from 'app/actions/properties-customer';
import { IRootState } from 'app/reducers';
import { openModal, closeModal } from 'app/actions/modal';

export interface IEditProps extends StateProps, DispatchProps {
  isOpen: boolean;
  id: string;
  ramdomId: number;
}

export interface IEditState {
  modal: boolean;
}

export class Edit extends React.Component<IEditProps, IEditState> {
  state: IEditState = {
    modal: false
  };
  componentWillReceiveProps(nextProps) {
    this.state.modal = nextProps.CloseModal;
    this.setState({
      modal: nextProps.CloseModal
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handlerChange = e => {
    console.log('%' + e.target.value + '%');
  };

  render() {
    const { getList, id } = this.props;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal isOpen={this.state.modal} id="content-properties">
          <ModalHeader toggle={this.toggle} id="create-properties">
            sửa thuộc tính
          </ModalHeader>
          <ModalBody>
            <AvForm>
              {getList.map((event, index) => {
                if (event.id === id) {
                  return (
                    <Row>
                      <Col md="12">
                        <div className="option-create">
                          <Label>Field Name</Label>
                          <Input defaultValue={event.title} />
                        </div>
                        <div className="option-create">
                          <Translate contentKey="properties-management.form.persionalization" />
                          <Input addonBefore="%" addonAfter="%" defaultValue={event.type} onChange={this.handlerChange} />
                        </div>
                        <div className="option-create">
                          <Label>Default value</Label>
                          <Input defaultValue={event.fieldValue} />
                        </div>
                      </Col>
                    </Row>
                  );
                }
                return '';
              })}
            </AvForm>
          </ModalBody>
          <ModalFooter>
            <Button
              color="link"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={async () => {
                this.props.getListProp();
                if (this.props.isUpdate) {
                  this.setState({
                    modal: false
                  });
                  this.props.openModal({
                    show: true,
                    type: 'success',
                    title: translate('modal-data.title.success'),
                    text: translate('alert.success-properties')
                  });
                }
              }}
            >
              Add
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
  isUpdate: storeState.propertiesState.isUpdate,
  CloseModal: storeState.propertiesState.openModalEdit
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
)(Edit);
