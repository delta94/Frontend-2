import React from 'react';
import { Modal, Row, Col, Button } from 'antd';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import './modal-interactive.scss';
import { Translate } from 'react-jhipster';

interface IModalIteractiveProps extends StateProps, DispatchProps {
  isOpenModal: boolean;
  onClick: Function;
}
interface IModalIteractiveState {}
class ModalIteractive extends React.Component<IModalIteractiveProps, IModalIteractiveState> {
  state: IModalIteractiveState = {};
  hideModal = () => {
    const { onClick, isOpenModal } = this.props;
    onClick(!isOpenModal);
  };
  render() {
    let { isOpenModal, list_customer_interactive } = this.props;
    return (
      <Modal
        width={820}
        className="modal-inactive"
        destroyOnClose
        closable={false}
        maskClosable={false}
        title="Danh sách hành động"
        visible={isOpenModal}
        onOk={this.hideModal}
        footer={[
          <Button key="submit" color="none" onClick={this.hideModal}>
            <Translate contentKey="detail-flow.modal.close" />
          </Button>
        ]}
      >
        <div>
          <label>{list_customer_interactive ? list_customer_interactive.length : 0} bản ghi</label>
        </div>
        <Table responsive striped className="main-table-interactive">
          <thead>
            <th>STT</th>
            <th style={{ width: '30%' }}>
              {' '}
              <Translate contentKey="detail-flow.modal.action" />
            </th>
            <th style={{ width: '30%' }}>
              <Translate contentKey="detail-flow.modal.status" />
            </th>
            <th>
              <Translate contentKey="detail-flow.modal.time" />
            </th>
          </thead>
          <tbody>
            {list_customer_interactive &&
              list_customer_interactive.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.activityName}</td>
                    <td>
                      <Translate contentKey="detail-flow.modal.complete" />
                    </td>
                    <td>{item.endTime}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Modal>
    );
  }
}
const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  list_customer_interactive: campaignManagament.listCustomerInteractive
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModalIteractive);
