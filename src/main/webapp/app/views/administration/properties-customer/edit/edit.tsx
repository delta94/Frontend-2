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
import { Select } from 'antd';

const { Option } = Select;

export interface IEditProps extends StateProps, DispatchProps {
  isOpen: boolean;
  id: string;
  ramdomId: number;
}

export interface IEditState {
  modal: boolean;
  validField: string;
  selectedOptionType: string;
}

export class Edit extends React.Component<IEditProps, IEditState> {
  state: IEditState = {
    modal: false,
    selectedOptionType: '',
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
    let { selectedOptionType } = this.state;
    let type = `${$(`input#tag`).val()}`;
    let defaultValue = String($(`input#default-value`).val());
    let personalizationTag = '%' + `${$(`input#tag`).val()}` + '%';
    let selectOption = String(
      this.props.getList
        .map(event => {
          if (event.id == this.props.id) {
            return event.type;
          }
        })
        .filter(function(el) {
          return el != null;
        })
    );
    if (defaultValue.trim().length === 0 && String(type) !== 'Text Input') {
      this.setState({ validField: ' * Vui lòng nhập giá trị ' });
    } else {
      let data = {
        id: id,
        title: $(`input#field-name`).val(),
        type: selectedOptionType ? selectedOptionType : selectOption,
        personalizationTag: personalizationTag
      };
      await this.props.updateProp(id, data);
      this.props.getListProp();
      this.props.openModal({
        show: true,
        type: 'success',
        title: translate('modal-data.title.success'),
        text: translate('properties-management.edit.complete')
      });
    }
  };

  handleChange = value => {
    let { selectedOptionType } = this.state;
    selectedOptionType = value;
    this.setState({ selectedOptionType: value });
  };

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
                            <Input
                              maxLength={160}
                              addonBefore="%"
                              addonAfter="%"
                              defaultValue={event.personalizationTag.slice(1, event.personalizationTag.length - 1)}
                              id="tag"
                            />
                          </div>
                          <div className="option-create">
                            <Label>Phân loại</Label>
                            <Select defaultValue={event.type} onChange={this.handleChange}>
                              <Option value="Text Input">Text Input</Option>
                              <Option value="Dropdown List">Dropdown List</Option>
                              <Option value="Radio">Radio</Option>
                              <Option value="Checkbox">Checkbox</Option>
                              <Option value="Date">Date</Option>
                            </Select>
                          </div>
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
