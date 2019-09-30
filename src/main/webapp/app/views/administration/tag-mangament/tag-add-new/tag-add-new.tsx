import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Input } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import './tag-add-new.scss';
import { IRootState } from 'app/reducers';
import { Loader as LoaderAnim } from 'react-loaders';
import { postInsertTag } from '../../../../services/tag-management';
import { postInsertTagAction, getListTagDataAction } from '../../../../actions/tag-management';
import { openModal } from '../../../../actions/modal';
import { WARNING } from '../../../../constants/common';

interface ITagAddNewProps extends StateProps, DispatchProps {}
interface ITagAddNewState {
  listNewTag: INewTag[];
  textNew?: string;
}

interface INewTag {
  name?: string;
}
class TagAddNew extends React.Component<ITagAddNewProps, ITagAddNewState> {
  state = {
    listNewTag: [],
    textNew: ''
  };

  handleNewTag = event => {
    event.preventDefault();
    let { listNewTag } = this.state;
    let textNew = event.target.value;
    let listTextSplit = textNew.split('\n');
    listNewTag =
      listTextSplit.length > 0 &&
      listTextSplit.map(item => ({
        name: item
      }));
    this.setState({ textNew, listNewTag });
  };

  insertNewTag = () => {
    let { listNewTag } = this.state;
    let { modalState } = this.props;
    if (listNewTag && listNewTag.length > 0) {
      this.props.postInsertTagAction(listNewTag);
      setTimeout(() => {
        this.props.getListTagDataAction('', 0, 6);
        this.props.openModal(modalState);
      }, 250);
      this.setState({ textNew: '' });
    } else {
      this.props.openModal({
        type: WARNING,
        title: 'Bạn cần nhập tên tags'
      });
    }
  };

  componentDidMount() {
    var textAreas = document.getElementsByTagName('textarea');

    Array.prototype.forEach.call(textAreas, function(elem) {
      elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });
  }

  render() {
    let { textNew } = this.state;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;

    return (
      <div className="tag-add-new b-r">
        <p>Thêm tags</p>
        <p style={{ fontSize: '0.8rem' }}>
          <label style={{ fontWeight: 500 }}>Add tags here:</label>
          <label>(one per line or separated by a comma)</label>
        </p>
        <Input type="textarea" name="text" id="add-new-tag" placeholder="tag1\ntag2" value={textNew} onChange={this.handleNewTag} />
        <div className="btn-add-tag">
          <Button color="success" size="small" onClick={this.insertNewTag} disabled={!(textNew && textNew.length > 0)}>
            Add tags
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags,
  modalState: tagDataState.postMailRequest
});

const mapDispatchToProps = {
  postInsertTagAction,
  openModal,
  getListTagDataAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagAddNew);
