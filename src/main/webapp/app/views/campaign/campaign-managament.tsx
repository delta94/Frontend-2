import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Row, Col, Button, Input, Table, Card } from 'antd';
import SortableTree from 'react-sortable-tree';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import treeData, { data, columns } from './example-data';
import './campaign-managament.scss';

export interface ICampaginManagamentProps extends StateProps, DispatchProps {}

export interface ICampaginManagamentState {
  treeData: any[];
}

class CampaginManagament extends React.Component<ICampaginManagamentProps, ICampaginManagamentState> {
  state: ICampaginManagamentState = {
    treeData: treeData
  };

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  };

  render() {
    return (
      <Fragment>
        <div>
          <Row className="header-row" style={{ height: '50px' }}>
            <label>DÁNH SÁCH CHIẾN DỊCH</label>
          </Row>
          <Row className="row-main">
            <Col span={6} className="d-none d-lg-block">
              <Row className="row-sort-tree">
                <label>THƯ MỤC</label>
              </Row>
              <hr />
              <Row>
                <div style={{ height: 650 }}>
                  <SortableTree treeData={this.state.treeData} onChange={treeData => this.setState({ treeData })} />
                </div>
              </Row>
            </Col>
            <Col span={18} className="h-100 bg-white justify-content-center align-items-center">
              <Row>
                <Col span={6} style={{ padding: '20px' }}>
                  <label>22 Chiến dịch</label>
                </Col>
                <Col span={18} style={{ padding: '20px' }}>
                  <Input style={{ width: '200px' }} placeholder="tìm kiếm" />
                  <Button type="primary" style={{ float: 'right' }}>
                    {' '}
                    Tạo mới chiến dịch
                  </Button>
                </Col>
              </Row>
              <Row>
                <Table rowSelection={this.rowSelection} columns={columns} dataSource={data} />
              </Row>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authentication, handleModal }: IRootState) => ({
  modalState: handleModal.data,
  loading: authentication.loading
});

const mapDispatchToProps = { openModal, closeModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaginManagament);
