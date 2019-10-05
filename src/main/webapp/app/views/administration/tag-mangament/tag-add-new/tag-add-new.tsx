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
    let choseNewTag = [];
    let textNew = event.target.value;
    if (!textNew.trim()) {
      textNew = '';
    }

    let listTextSplit = textNew.split('\n');

    choseNewTag =
      listTextSplit &&
      listTextSplit.map(item => {
        return item && item !== '' ? { name: item } : null;
      });

    let listNewTag = [];
    choseNewTag.forEach(item => item && listNewTag.push(item));
    this.setState({ textNew, listNewTag });
  };

  async insertNewTag() {
    let { listNewTag } = this.state;
    if (listNewTag && listNewTag.length > 0) {
      this.setState({ textNew: '' });
      await this.props.postInsertTagAction(listNewTag);
      await this.props.getListTagDataAction('', 0, 6);
    } else {
      this.props.openModal({
        type: WARNING,
        title: 'Bạn cần nhập tên thẻ'
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalState) {
      return {
        modalState: nextProps.modalState
      };
    }

    return null;
  }

  componentDidMount() {
    var textAreas = document.getElementsByTagName('textarea');
    Array.prototype.forEach.call(textAreas, function(elem) {
      elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });
  }

  render() {
    let { textNew } = this.state;

    return (
      <div className="tag-add-new b-r">
        <p>
          <Translate contentKey="tag-management.tag-add" />
        </p>
        <p style={{ fontSize: '0.8rem' }}>
          <label style={{ fontWeight: 500 }}>
            <Translate contentKey="tag-management.tag-add-here" />
          </label>{' '}
          <label>
            <Translate contentKey="tag-management.tag-add-rule" />
          </label>
        </p>
        <Input
          type="textarea"
          name="text"
          id="add-new-tag"
          placeholder="Thẻ thứ nhất \nThẻ thứ hai"
          value={textNew}
          onChange={this.handleNewTag}
          maxLength={160}
          row={4}
        />
        <div className="btn-add-tag">
          <Button color="success" size="small" onClick={() => this.insertNewTag()} disabled={!(textNew && textNew.length > 0)}>
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
