import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { Tooltip, Icon, Input } from 'antd';
import { Translate, translate } from 'react-jhipster';
import $ from 'jquery';
import './edit.scss';
import { updateProp, getListProp } from 'app/actions/properties-customer';
import { IRootState } from 'app/reducers';
import { openModal, closeModal } from 'app/actions/modal';
import PerfectScrollbar from 'react-perfect-scrollbar';

export interface IEditProps extends StateProps, DispatchProps {
  isOpen: boolean;
  id: string;
  ramdomId: number;
}

export interface IEditState {
  modal: boolean;
  validField: string;
}

export class Edit extends React.Component<IEditProps, IEditState> {
  state: IEditState = {
    modal: false,
    validField: ''
  };
  componentWillReceiveProps(nextProps) {
    this.state.modal = nextProps.CloseModal;
    this.setState({
      modal: nextProps.CloseModal
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      validField: ''
    });
  };

  editProp = async () => {
    let { id } = this.props;
    let tag = `${$(`input#tag`).val()}`;
    let data = {
      id: id,
      title: $(`input#field-name`).val(),
      personalizationTag: '{{' + tag + '}}'
    };
    if (tag) {
      await this.props.updateProp(id, data);
      this.props.getListProp();
      this.props.openModal({
        show: true,
        type: 'success',
        title: translate('modal-data.title.success'),
        text: translate('properties-management.edit.complete')
      });
    } else {
      this.setState({ validField: translate('properties-management.error.param-none') });
    }
  };

  formatPersonalizationTag(personalizationTag) {
    let personalizationTagFormat = null;
    personalizationTagFormat = personalizationTag && personalizationTag.includes('{{') && personalizationTag.includes('}}')
      ? personalizationTag.replace('{{', '').replace('}}', '') : '';
    return personalizationTagFormat;
  }

  render() {
    const { getList, id, loading } = this.props;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal isOpen={this.state.modal} id="edit-properties">
          <ModalHeader toggle={this.toggle} id="create-properties">
            <Translate contentKey="properties-management.edit.title" />
          </ModalHeader>
          <PerfectScrollbar>
            <ModalBody>
              <AvForm>
                {getList.map((event, index) => {
                  if (event.id === id) {
                    return (
                      <Row key={index}>
                        <Col md="12">
                          <div className="option-create">
                            <Label>
                              <Translate contentKey="properties-management.form.name" />{' '}
                            </Label>
                            <Input maxLength={160} defaultValue={event.title} id="field-name" />
                          </div>
                          <div className="option-create">
                            <Label>
                              <Translate contentKey="properties-management.form.persionalization" />
                            </Label>
                            <Input maxLength={160} addonBefore="{{" addonAfter="}}"
                              defaultValue={this.formatPersonalizationTag(event.personalizationTag)}
                              id="tag" />
                            <p style={{ textAlign: 'center' }} className="error">
                              {this.state.validField}
                            </p>
                          </div>
                          {/* <div className="option-create">
                            <Label>
                              <Translate contentKey="properties-management.form.default-value" />
                            </Label>
                            <Input maxLength={160}  id="default-value" />
                          </div> */}
                        </Col>
                      </Row>
                    );
                  }
                  return '';
                })}
              </AvForm>
            </ModalBody>
          </PerfectScrollbar>
          <ModalFooter>
            <Button
              color="link"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <Translate contentKey="properties-management.cancel" />
            </Button>
            <Button
              disabled={loading}
              color="primary"
              onClick={() => {
                this.editProp();
              }}
            >
              <Translate contentKey="properties-management.edit.button" />
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
  updateProp,
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
