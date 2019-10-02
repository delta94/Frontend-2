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
  modalState: any;
}

interface INewTag {
  name?: string;
}
class TagAddNew extends React.Component<ITagAddNewProps, ITagAddNewState> {
  state = {
    listNewTag: [],
    textNew: '',
    modalState: null
  };

  handleNewTag = event => {
    event.preventDefault();
    let { listNewTag } = this.state;
    let textNew = event.target.value;
    if (!textNew.trim()) {
      textNew = '';
    }

    let listTextSplit = textNew.split('\n');
    listNewTag =
      listTextSplit.length > 0 &&
      listTextSplit.map(item => {
        if (item.trim())
          return {
            name: item
          };
      });
    this.setState({ textNew, listNewTag });
  };

  insertNewTag = () => {
    let { listNewTag } = this.state;
    if (listNewTag && listNewTag.length > 0) {
      this.props.postInsertTagAction(listNewTag);
      this.setState({ textNew: '' });
    } else {
      this.props.openModal({
        type: WARNING,
        title: 'Bạn cần nhập tên tags'
      });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalState) {
      console.log(nextProps.modalState);
      return {
        modalState: nextProps.modalState
      };
    }
  }

  componentDidMount() {
    var textAreas = document.getElementsByTagName('textarea');
    Array.prototype.forEach.call(textAreas, function(elem) {
      elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });
  }

  render() {
    let { textNew } = this.state;
    const spinner1 = <LoaderAnim color="#ffffff" type="ball-pulse" />;
    let tagInputHolder = translate('tag-management.tag-1') + '\n' + translate('tag-management.tag-2');

    return (
      <div className="tag-add-new b-r">
        <p>
          <Translate contentKey="tag-management.tag-add" />
        </p>
        <p style={{ fontSize: '0.8rem' }}>
          <label style={{ fontWeight: 500 }}>
            <Translate contentKey="tag-management.tag-add-here" />
          </label>
          <label>
            <Translate contentKey="tag-management.tag-add-rule" />
          </label>
        </p>
        <Input
          type="textarea"
          name="text"
          id="add-new-tag"
          placeholder={`${tagInputHolder}`}
          value={textNew}
          onChange={this.handleNewTag}
          maxLength={160}
          row={4}
        />
        <div className="btn-add-tag">
          <Button color="success" size="small" onClick={this.insertNewTag} disabled={!(textNew && textNew.length > 0)}>
            <Translate contentKey="tag-management.tag-add-new" />
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({
  loading: tagDataState.loading,
  list_tags: tagDataState.list_tags,
  modalState: tagDataState.tagResponse
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
