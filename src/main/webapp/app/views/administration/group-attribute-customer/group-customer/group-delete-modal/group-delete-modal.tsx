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
}

export default class GroupDeleteModal extends React.PureComponent<IGroupDeleteModalProps, IGroupDeleteModalState> {
  state: IGroupDeleteModalState = {
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

  handleCheckBox = key => {
    let { listCheck } = this.state;
    listCheck[key] = !listCheck[key];
    this.setState({ listCheck });
  };

  _closeModalDelete = () => {
    let { listCheckBox } = this.state;
    listCheckBox.forEach(item => (item.checked = false));
    this.setState({ listCheckBox });
  };

  render() {
    let { is_open, id_delete } = this.props;
    let { listCheckBox, listCheck } = this.state;

    let is_disable = false;

    listCheck.forEach(item => {
      if (item === false) {
        is_disable === true;
      }
    });

    return (
      <Modal isOpen={is_open} toggle={() => this.props.handleDeleteModal()}>
        <ModalHeader>XÓA NHÓM NÀY</ModalHeader>
        <ModalBody>
          {listCheckBox &&
            listCheckBox.map((item, index) => {
              return (
                <label key={index}>
                  <Checkbox
                    id={makeRandomId(8)}
                    onChange={() => this.handleCheckBox(item.key)}
                    style={{ color: item.color, width: '100%' }}
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
            disabled={is_disable}
            onClick={() => {
              this.props.deleteGroupFromState(id_delete);
            }}
          >
            Xóa
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
