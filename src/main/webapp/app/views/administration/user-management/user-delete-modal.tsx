import React, { Component, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SweetAlert from 'sweetalert-react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getUser, deleteUser } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export interface IUserManagementDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}
import { Button } from 'reactstrap';

export class UserManagementDeleteDialog extends React.Component<IUserManagementDeleteDialogProps> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
  }
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
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        // transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Button color="danger" onClick={() => this.setState({ message5: true })}>
          Xoá
        </Button>
        <SweetAlert
          title="Bạn muốn xoá?"
          confirmButtonColor=""
          show={() => this.setState({ message5: true })}
          text="Mục bị xoá sẽ không thể lấy lại!"
          showCancelButton
          onConfirm={() => this.setState({ showDeleteSuccessAlert: true })}
          onCancel={() => this.setState({ message5: false })}
        />
        <SweetAlert
          title="Deleted"
          confirmButtonColor=""
          show={() => this.setState({ showDeleteSuccessAlert: true })}
          text="Xoá thành công"
          type="success"
          onConfirm={() => this.setState({ showDeleteSuccessAlert: false, message5: false })}
        />
      </ReactCSSTransitionGroup>
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
