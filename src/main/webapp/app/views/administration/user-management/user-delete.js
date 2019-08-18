import React, {Component, Fragment} from 'react';
import {renderToStaticMarkup} from 'react-dom/server'
import SweetAlert from 'sweetalert-react';
import { getUsers, updateUser, deleteUser,getUser } from 'app/actions/user-management';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/reducers';


export interface IUserManagementDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export class UserManagementDeleteDialog extends React.Component<IUserManagementDeleteDialogProps> {
    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
      }
      confirmDelete = event => {
        this.props.deleteUser(this.props.user.id);
        this.handleClose(event);
      };
    
      handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
      };

    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            showDeleteSuccessAlert: false,
            message5: false
        };
    }
    render() {
        return (
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                                    <Button color="danger" onClick={() => this.setState({message5: true})}>Xoá</Button>
                                    <SweetAlert
                                        title="Are you sure?"
                                        confirmButtonColor=""
                                        // show={this.state.message5}
                                        text="You will not be able to recover this imaginary file!"
                                        showCancelButton
                                        onConfirm={() => this.setState({showDeleteSuccessAlert: true})}
                                        onCancel={() => this.setState({message5: false})}/>

                                    <SweetAlert
                                        title="Deleted"
                                        confirmButtonColor=""
                                        // show={this.state.showDeleteSuccessAlert}
                                        text="Your imaginary file has been deleted."
                                        type="success"
                                        onConfirm={() => this.setState({showDeleteSuccessAlert: false, message5: false})}/>

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
  