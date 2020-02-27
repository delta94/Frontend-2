import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { limitString } from '../../tag-list/tag-list';

export interface ITagDeleteProps extends StateProps, DispatchProps {
  listCheckBox?: any;
  singleModalData?: any;
}
export interface ITagDeleteState {
  listCheckBox: any;
  listContentData: any;
}

class TagDelete extends React.PureComponent<ITagDeleteProps, ITagDeleteState> {
  state = {
    listCheckBox: [],
    listContentData: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.listCheckBox !== prevState.listCheckBox || nextProps.singleModalData !== prevState.singleModalData) {
      let { singleModalData, listCheckBox } = nextProps;
      let { listContentData } = prevState;

      if (!singleModalData) {
        listCheckBox &&
          listCheckBox.forEach(item => {
            if (item.checked) {
              listContentData.push(item);
            }
          });
      } else {
        listContentData.push(singleModalData);
        return {
          listCheckBox,
          singleModalData,
          listContentData
        };
      }
    }
    return null;
  }

  render() {
    let { singleModalData, listCheckBox } = this.props;
    let listContentData = [];

    singleModalData.id
      ? listContentData.push(singleModalData)
      : listCheckBox &&
        listCheckBox.forEach(item => {
          item.checked ? listContentData.push(item) : null;
        });

    return (
      <div className="tag-delete">
        <p>
          <Translate contentKey="tag-management.tag-delete-rule" />
        </p>
        <div className="tag-modal-content">
          {listContentData &&
            listContentData.map((item, index) => {
              return (
                <label className="label-delete" id={item.id} key={index}>
                  {limitString(item.name)}
                </label>
              );
            })}
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
)(TagDelete);
