import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import './tag-mangament.scss';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import TagList from './tag-list/tag-list';
import SweetAlert from 'sweetalert-react';
import { openModal, closeModal } from '../../../actions/modal';
import TagAddNew from './tag-add-new/tag-add-new';

export interface ITagManagementProps extends StateProps, DispatchProps {}

export interface ITagManagementState {}
class TagManagement extends React.Component<ITagManagementProps, ITagManagementState> {
  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalState) {
      return {
        modalState: nextProps.modalState
      };
    }

    return null;
  }

  render() {
    let { modalState } = this.props;

    return (
      <div className="tag-management">
        <div id="title-common-header">
          <Translate contentKey="tag-management.header" />
        </div>
        <Fragment>
          <SweetAlert
            title={modalState.title ? modalState.title : 'No title'}
            confirmButtonColor=""
            show={modalState.show ? modalState.show : false}
            text={modalState.text ? modalState.text : 'No'}
            type={modalState.type ? modalState.type : 'error'}
            onConfirm={() => this.props.closeModal()}
          />
          <Row>
            <TagAddNew />
            <TagList />
          </Row>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState, handleModal }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags,
  modalState: tagDataState.tagResponse
});

const mapDispatchToProps = {
  openModal,
  closeModal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagManagement);
