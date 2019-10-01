import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu, AutoComplete, Icon } from 'antd';
import { getListTagDataAction } from '../../../../../actions/tag-management';
import { getListTags } from '../../../../../services/tag-management';
import { Translate } from 'react-jhipster';
import Select from 'react-select';
import { FormGroup } from 'reactstrap';

const options = [
  { label: '1', value: 'test' },
  { label: '1', value: 'test' },
  { label: '1', value: 'test' },
  { label: '1', value: 'test' }
];

interface ITagMergeProps extends StateProps, DispatchProps {
  dataModal: any;
  updateTargetTagFromTagMerge: Function;
}

interface ITagMergeState {
  targetTag?: {
    id?: string;
    name?: string;
  };
  result?: Array<{ label: string; value: string }>[];
  isSearching: boolean;
}

class TagMerge extends React.PureComponent<ITagMergeProps, ITagMergeState> {
  state: ITagMergeState = {
    targetTag: {
      id: null,
      name: null
    },
    result: [],
    isSearching: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.targetTag) {
      return { targetTag: nextProps.targetTag };
    }
  }

  setTargetTag = item => {
    let { targetTag } = this.state;
    console.log(item);
    targetTag['name'] = item.label;
    targetTag['id'] = item.value;
    this.setState({ targetTag });
    this.props.updateTargetTagFromTagMerge(item);
  };

  handleSearch = value => {
    let result;
    if (!value || value.length === 0) {
      result = [];
    } else {
      Promise.resolve(getListTags(value, 0, 10))
        .then(item => {
          console.log(item);
          let listTagRes = item.data.content;
          if (listTagRes && listTagRes.length > 0) {
            result = listTagRes.map(item => ({ label: item.name, value: item.id }));
          }

          console.log(result);
          this.setState({ result });
        })
        .catch(err => {
          throw err;
        });
    }
  };

  handleInput = value => {
    console.log(value);
  };

  render() {
    let { dataModal } = this.props;
    let { targetTag, result } = this.state;
    let listContentData = [];

    dataModal &&
      dataModal.forEach(item => {
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
                  {item.name}
                </label>
              );
            })}
        </div>
        <div className="tag-merge">
          <p style={{ fontWeight: 500 }}>
            <Translate contentKey="tag-management.tag-merge-to" />
          </p>
          {listContentData && listContentData.length > 0 ? (
            <FormGroup>
              <Select
                value={targetTag.name}
                onChange={this.setTargetTag}
                options={result}
                onInputChange={this.handleSearch}
                style={{ width: '100px' }}
              />
            </FormGroup>
          ) : null}
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
