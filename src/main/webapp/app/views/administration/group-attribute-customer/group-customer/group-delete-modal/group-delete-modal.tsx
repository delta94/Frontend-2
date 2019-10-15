import React from 'react';
import { Button } from 'reactstrap';
import { Checkbox, Modal } from 'antd';
import './group-delete-modal.scss';

interface IGroupDeleteModalProps {
  is_open: boolean;
  id_delete: string;
  handleDeleteModal: Function;
  deleteGroupFromState: Function;
}

interface IGroupDeleteModalState {
  is_disable: boolean;
}

const list_rule = [{}];

export default class GroupDeleteModal extends React.PureComponent<IGroupDeleteModalProps, IGroupDeleteModalState> {
  state: IGroupDeleteModalState = {
    is_disable: true
  };

  handleCheckBox = event => {
    let newArray = event;
    if (newArray.length === 5) {
      this.setState({ is_disable: false });
    } else {
      this.setState({ is_disable: true });
    }
  };

  render() {
    let { is_open, id_delete } = this.props;
    let { is_disable } = this.state;
    return (
      <Modal
        title="Xóa nhóm này"
        visible={is_open}
        onOk={() => {
          this.props.handleDeleteModal();
        }}
        onCancel={() => {
          this.props.handleDeleteModal();
        }}
        footer={[
          <Button
            key="cancel"
            color="dange"
            onClick={() => {
              this.props.handleDeleteModal();
              this.setState({ is_disable: true });
            }}
          >
            Hủy
          </Button>,
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
        ]}
      >
        <Checkbox.Group style={{ width: '100%' }} onChange={this.handleCheckBox}>
          <ul>
            <li>
              <Checkbox value="A" key="rule_one">
                {' '}
                Tôi hiểu rằng tất cả các liên hệ trong danh sách sẽ bị xóa
              </Checkbox>
            </li>
            <li>
              <Checkbox value="B" key="rule_two">
                Tôi hiểu rằng tất cả các chiến dịch và phản hồi chiến dịch trong danh sách sẽ bị xóa
              </Checkbox>
            </li>
            <li>
              <Checkbox value="C" key="rule_three">
                Tôi hiểu rằng tất cả các phản hồi về danh sách sẽ bị xóa
              </Checkbox>
            </li>
            <li>
              <Checkbox value="E" key="rule_four">
                Tôi hiểu rằng tất cả các cài đặt(thành phần, các trường, v.v ) của danh sách sẽ bị xóa
              </Checkbox>
            </li>
            <li>
              <Checkbox style={{ color: 'red' }} value="D" key="rule_five">
                Tôi hiểu rằng sẽ không thể hoàn tác sau khi xóa danh sách sẽ bị xóa vĩnh viễn
              </Checkbox>
            </li>
          </ul>
        </Checkbox.Group>
        ,
      </Modal>
    );
  }
}
