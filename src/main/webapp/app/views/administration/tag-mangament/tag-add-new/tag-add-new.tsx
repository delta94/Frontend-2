import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './tag-add-new.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';

interface ITagAddNewProps extends StateProps, DispatchProps {}
interface ITagAddNewState {}

class TagAddNew extends React.Component<ITagAddNewProps, ITagAddNewState> {
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
)(TagAddNew);
