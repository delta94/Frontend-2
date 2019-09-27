import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Input } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './tag-add-new.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import { getListTags } from '../../../../services/tag-management';

interface ITagAddNewProps extends StateProps, DispatchProps {}
interface ITagAddNewState {}

class TagAddNew extends React.Component<ITagAddNewProps, ITagAddNewState> {
  state = {};

  render() {
    const { loading } = this.props;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div className="tag-add-new b-r">
        <p>Thêm tags</p>
        <p style={{ fontSize: '0.8rem' }}>
          <label style={{ fontWeight: 500 }}>Add tags here:</label>
          <label>(one per line or separated by a comma)</label>
        </p>
        <Input type="textarea" name="text" id="add-new-tag" />
        <div className="btn-add-tag">
          <Button color="primary" size="small">
            Add tags
          </Button>
        </div>
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
