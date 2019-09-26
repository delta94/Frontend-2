import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './tag-list.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';

export interface ITagListProps extends StateProps, DispatchProps {}
export interface ITagListState {}

class TagList extends React.Component<ITagListProps, ITagListState> {
  state = {};

  render() {
    const { loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div>
        <Loader message={spinner1} show={loading} priority={1} />
      </div>
    );
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
)(TagList);
