import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Checkbox } from 'antd';
import './group-delete-modal.scss';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { makeRandomId } from '../../group-modal-config/group-modal-config';
// const listCheckbox =

interface IGroupDeleteModalProps {
  is_open: boolean;
  id_delete: string;
  handleDeleteModal: Function;
  deleteGroupFromState: Function;
}

interface IGroupDeleteModalState {
  is_disable: boolean;
  listCheckBox: Array<{ key: any; description: string; checked: boolean; color: string }>;
  listCheck: any;
  id_delete: string;
}

export default class GroupDeleteModal extends React.PureComponent<IGroupDeleteModalProps, IGroupDeleteModalState> {
  state: IGroupDeleteModalState = {
    id_delete: '',
    is_disable: true,
    listCheck: [false, false, false, false, false],
    listCheckBox: [
      {
        key: 0,
        description: 'Tôi hiểu rằng tất cả các liên hệ trong danh sách sẽ bị xóa',
        checked: false,
        color: ''
      },
      {
        key: 1,
        description: 'Tôi hiểu rằng tất cả các chiến dịch và phản hồi chiến dịch trong danh sách sẽ bị xóa',
        checked: false,
        color: ''
      },
      {
        key: 2,
        description: 'Tôi hiểu rằng tất cả các phản hồi về danh sách sẽ bị xóa',
        checked: false,
        color: ''
      },
      {
        key: 3,
        description: 'Tôi hiểu rằng tất cả các cài đặt(thành phần, các trường, v.v ) của danh sách sẽ bị xóa',
        checked: false,
        color: ''
      },
      {
        key: 4,
        description: 'Tôi hiểu rằng sẽ không thể hoàn tác sau khi xóa danh sách sẽ bị xóa vĩnh viễn',
        color: 'red',
        checked: false
      }
    ]
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.listCheckBox) {
      let listCheck = prevState.listCheckBox.map(item => {
        return item.checked;
      });
      return {
        listCheck
      };
    }

    if (nextProps.is_open) {
      let { list_check, listCheckBox } = prevState;
      list_check.forEach(item => (item = false));
      listCheckBox.forEach(item => (item.checked = false));
      return {
        list_check,
        is_disable: true,
        listCheckBox
      };
    }

    return null;
  }

  handleCheckBox = key => {
    let { listCheckBox } = this.state;
    listCheckBox[key].checked = !listCheckBox[key].checked;
    this.setState({ listCheckBox });
  };

  _closeModalDelete = () => {
    let { listCheckBox } = this.state;
    listCheckBox.forEach(item => (item.checked = false));
    this.setState({ listCheckBox });
  };

  render() {
    let { is_open, id_delete } = this.props;
    let { listCheckBox, is_disable, listCheck } = this.state;
    let number_disable = listCheck.indexOf(false);
    if (number_disable === -1) {
      is_disable = false;
    }

    return (
      <Modal className="modal-delete" isOpen={is_open} toggle={() => this.props.handleDeleteModal()}>
        <ModalHeader>XÓA NHÓM NÀY</ModalHeader>
        <ModalBody>
          {listCheck &&
            listCheckBox &&
            listCheckBox.map((item, index) => {
              return (
                <label key={index}>
                  <Checkbox
                    id={makeRandomId(8)}
                    onChange={() => this.handleCheckBox(index)}
                    style={{ color: item.color, width: '100%' }}
                    checked={listCheck[index]}
                  >
                    {item.description}
                  </Checkbox>
                </label>
              );
            })}
        </ModalBody>
        <ModalFooter>
          <Button
            key="cancel"
            color="none"
            onClick={() => {
              this.props.handleDeleteModal();
              this._closeModalDelete();
              this.setState({ is_disable: true });
            }}
          >
            Hủy
          </Button>
          <Button
            key="delete"
            color="danger"
            onClick={() => {
              this.props.deleteGroupFromState(id_delete);
              this.setState({ is_disable: true });
            }}
            disabled={is_disable}
          >
            Xóa
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
