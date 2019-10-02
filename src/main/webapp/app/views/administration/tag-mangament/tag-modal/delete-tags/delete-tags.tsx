import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col } from 'reactstrap';

import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader as LoaderAnim } from 'react-loaders';
import Loader from 'react-loader-advanced';
import SweetAlert from 'sweetalert-react';

export interface ITagDeleteProps extends StateProps, DispatchProps {
  dataModal?: any;
  singleModalData?: any;
}
export interface ITagDeleteState {
  dataModal: any;
  listContentData: any;
}

class TagDelete extends React.PureComponent<ITagDeleteProps, ITagDeleteState> {
  state = {
    dataModal: [],
    listContentData: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.dataModal !== prevState.dataModal || nextProps.singleModalData !== prevState.singleModalData) {
      let { singleModalData, dataModal } = nextProps;
      let { listContentData } = prevState;

      if (!singleModalData) {
        dataModal &&
          dataModal.forEach(item => {
            if (item.checked) {
              listContentData.push(item);
            }
          });
      } else {
        listContentData.push(singleModalData);
        return {
          dataModal,
          singleModalData,
          listContentData
        };
      }
    }
    return null;
  }

  render() {
    let { singleModalData, dataModal } = this.props;
    let listContentData = [];

    if (singleModalData) {
      listContentData.push(singleModalData);
    } else {
      dataModal &&
        dataModal.forEach(item => {
          if (item.checked) {
            listContentData.push(item);
          }
        });
    }

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
                  {item.name}
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
