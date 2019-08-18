import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUser, deleteUser } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IUserManagementDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export class UserManagementDeleteDialog extends React.Component<IUserManagementDeleteDialogProps> {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }
  //todo : hiện modal, không chuyển trang
  confirmDelete = event => {
    this.props.deleteUser(this.props.user.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { user } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title" />
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="userManagement.delete.question" interpolate={{ id: user.id }} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel" />
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user
});

const mapDispatchToProps = { getUser, deleteUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementDeleteDialog);
