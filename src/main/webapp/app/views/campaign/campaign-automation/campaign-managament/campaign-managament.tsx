import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Row, Col, Button, Input, Table, Breadcrumb, Icon, Modal } from 'antd';
import $ from 'jquery';
import LoaderAnim from 'react-loaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCopy, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
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
          <Row className="row-main">
            <Col span={4} className="d-none d-lg-block h-100 bg-white  align-items-center">
              <TreeFolder onClick={this.getId} />
            </Col>
            <Col span={20} className="h-100 bg-white  align-items-center">
              <Row className="header-row">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item>
                    <a href="javascript:void(0);">
                      <FontAwesomeIcon icon={faHome} />
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="javascript:void(0);">Chiến dịch tự động</a>
                  </Breadcrumb.Item>

                  <label className="ant-breadcrumb-link">Danh sách chiến dịch</label>
                </Breadcrumb>
              </Row>
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
