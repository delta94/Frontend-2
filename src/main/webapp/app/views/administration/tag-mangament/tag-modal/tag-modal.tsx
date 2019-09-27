import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Modal } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../tag-mangament/tag-mangament.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { getListTags } from '../../../services/tag-management';

export interface ITagModalProps extends StateProps, DispatchProps {}
export interface ITagModalState {}
class TagModal extends React.Component<ITagModalProps, ITagModalState> {
  state = {};

  componentDidMount() {}

  render() {
    const { loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return <Modal />;
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagModal);
