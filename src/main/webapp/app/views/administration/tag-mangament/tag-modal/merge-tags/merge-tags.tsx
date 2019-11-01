import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu, AutoComplete, Icon } from 'antd';
import { getListTagDataAction } from '../../../../../actions/tag-management';
import { getListTags } from '../../../../../services/tag-management';
import { Translate } from 'react-jhipster';
import Select from 'react-select';
import { FormGroup } from 'reactstrap';
import { limitString } from './../../tag-list/tag-list';

interface ITagMergeProps extends StateProps, DispatchProps {
  listCheckBox: any;
  updateTargetTagFromTagMerge: Function;
  targetTag?: {
    id?: string;
    name?: string;
  };
}

interface ITagMergeState {
  result?: Array<{ label: string; value: string }>[];
}

class TagMerge extends React.PureComponent<ITagMergeProps, ITagMergeState> {
  state: ITagMergeState = {
    result: []
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.targetTag) {
      return { targetTag: nextProps.targetTag };
    }

    return null;
  }

  setTargetTag = item => {
    let targetTag = { id: null, name: null };
    targetTag['name'] = item.label;
    targetTag['id'] = item.value;
    this.props.updateTargetTagFromTagMerge(targetTag);
  };

  handleSearch = value => {
    let result;
    if (!value || value.length === 0) {
      result = [];
    } else {
      Promise.resolve(getListTags(value, 0, 0, true))
        .then(item => {
          let listTagRes = item.data;
          if (listTagRes && listTagRes.length > 0) {
            result = listTagRes.map(item => ({ label: item.name, value: item.id }));
          }

          this.setState({ result });
        })
        .catch(err => {
          throw err;
        });
    }
  };

  render() {
    let { listCheckBox } = this.props;
    let { result } = this.state;
    let listContentData = [];

    listCheckBox &&
      listCheckBox.forEach(item => {
        if (item.checked) {
          listContentData.push(item);
        }
      });

    return (
      <div className="tag-merge">
        <div className="tag-modal-content">
          <h6>
            {' '}
            <Translate contentKey="tag-management.tag-will-merge" />
          </h6>
          {listContentData &&
            listContentData.map((item, index) => {
              return (
                <label className="label-merge" key={index}>
                  {limitString(item.name, 25)}
                </label>
              );
            })}
        </div>
        <div className="tag-merge">
          <div className="tag-search-merge" style={{ fontWeight: 500 }}>
            <Translate contentKey="tag-management.tag-merge-to" />
            {listContentData && listContentData.length > 0 ? (
              <FormGroup>
                <Select onChange={this.setTargetTag} options={result} onInputChange={this.handleSearch} style={{ width: '100px' }} />
              </FormGroup>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { getListTagDataAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagMerge);
