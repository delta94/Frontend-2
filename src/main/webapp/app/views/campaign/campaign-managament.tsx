import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Row, Col, Button, Input, Table, Popover, Icon, Modal } from 'antd';
import $ from 'jquery';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import treeData, { data, columns } from './example-data';
import { getTreeFolder, insertTreeFolder } from 'app/actions/campaign-managament';
import TreeFolder from './tree-folder/tree-folder';
import Campaign from './campaign-list/campaign-list';
import './campaign-managament.scss';

const { confirm } = Modal;

export interface ICampaginManagamentProps extends StateProps, DispatchProps {}

export interface ICampaginManagamentState {
  hover: boolean;
  idTree: string;
}

class CampaginManagament extends React.Component<ICampaginManagamentProps, ICampaginManagamentState> {
  state: ICampaginManagamentState = {
    hover: false,
    idTree: ''
  };
  getId = idTree => {
    this.setState({ idTree });
  };

  render() {
    let { idTree } = this.state;
    return (
      <Fragment>
        <div>
          <Row className="header-row" style={{ height: '50px' }}>
            <label>DANH SÁCH CHIẾN DỊCH</label>
          </Row>
          <Row className="row-main">
            <Col span={6} className="d-none d-lg-block h-100 bg-white  align-items-center">
              <TreeFolder onClick={this.getId} />
            </Col>
            <Col span={18} className="h-100 bg-white  align-items-center">
              <Campaign folder_id_choose={idTree} />
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ campaignManagament }: IRootState) => ({
  loading: campaignManagament.loading,
  list_tree_folder: campaignManagament.tree_folder
});

const mapDispatchToProps = { openModal, closeModal, getTreeFolder, insertTreeFolder };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaginManagament);
