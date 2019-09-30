import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Loader as LoaderAnim } from 'react-loaders';
import { Menu, Dropdown, Icon } from 'antd';

export interface ITagMergeProps extends StateProps, DispatchProps {
  dataModal: any;
  updateTargetTagFromTagMerge: Function;
}

export interface ITagMergeState {
  targetTag?: {
    id?: string;
    name?: string;
  };
}

class TagMerge extends React.PureComponent<ITagMergeProps, ITagMergeState> {
  state = {
    targetTag: {
      id: null,
      name: null
    }
  };

  menuMergeTag = () => {
    let { dataModal } = this.props;
    return (
      <Menu>
        {dataModal &&
          dataModal.map((item, index) => {
            if (item.checked) {
              return (
                <Menu.Item
                  key={index}
                  onClick={() => {
                    this.props.updateTargetTagFromTagMerge(item), console.log(item);
                  }}
                >
                  <Icon type="delete" /> {item.name}
                </Menu.Item>
              );
            }
          })}
      </Menu>
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.targetTag) {
      console.log(nextProps.targetTag);
      return { targetTag: nextProps.targetTag };
    }
  }

  render() {
    let { dataModal } = this.props;
    let { targetTag } = this.state;
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
          <h6>The tags will be merged</h6>
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
          <p style={{ fontWeight: 500 }}>Merge into tag</p>
          {listContentData && listContentData.length > 0 ? (
            <Dropdown.Button overlay={this.menuMergeTag} placement="bottomCenter" icon={<Icon type="caret-down" />}>
              {targetTag ? targetTag.name : null}
            </Dropdown.Button>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagMerge);
