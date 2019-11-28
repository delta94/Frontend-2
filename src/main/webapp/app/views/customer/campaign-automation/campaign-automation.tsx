import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Table } from 'reactstrap';
import { Row, Col, Button, Input, Popover, Icon, Modal } from 'antd';
import $ from 'jquery';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';
import { getTreeFolder, insertTreeFolder } from 'app/actions/campaign-managament';
import './campaign-automation.scss';

const { confirm } = Modal;

export interface ICampaginAutoProps extends StateProps, DispatchProps {}

export interface ICampaginAutoState {}

class CampaginAuto extends React.Component<ICampaginAutoProps, ICampaginAutoState> {
  state: ICampaginAutoState = {
    hover: false,
    idTree: ''
  };

  movePage = () => {
    location.assign('#/app/views/campaign-managament');
  };

  render() {
    return (
      <Fragment>
        <div id="campaing-auto">
          <Row id="title-campaign-auto">
            <Col span={11} style={{ paddingTop: '14px', margin: '0px 12px' }}>
              Chiến dịch tự động
            </Col>
            <Col span={12} style={{ textAlign: 'right', margin: '10px' }}>
              <Button type="primary" onClick={this.movePage}>
                Quản lý Chiến dịch
              </Button>
            </Col>
          </Row>
        </div>
        <div className="body-campaign-auto">
          <Row gutter={16}>
            <Col className="gutter-row" span={6} style={{ textAlign: 'center' }}>
              <div className="gutter-box">Tổng số chiến dịch</div>
              <div className="gutter-box">Tổng số chiến dịch</div>
            </Col>
            <Col className="gutter-row" span={6} style={{ textAlign: 'center' }}>
              <div className="gutter-box">Chiến dịch đang thực hiện</div>
              <div className="gutter-box">Tổng số chiến dịch</div>
            </Col>
            <Col className="gutter-row" span={6} style={{ textAlign: 'center' }}>
              <div className="gutter-box">Chiến dịch kết thúc</div>
              <div className="gutter-box">Tổng số chiến dịch</div>
            </Col>
            <Col className="gutter-row" span={6} style={{ textAlign: 'center' }}>
              <div className="gutter-box">Chiến dịch mới</div>
              <div className="gutter-box">Tổng số chiến dịch</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Table responsive striped>
              <thead>
                <th>Số thứ tự</th>
                <th>Trạng thái</th>
                <th>Kết quả</th>
                <th>Chỉnh sửa gần nhất</th>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Dừng</td>
                  <td>170/190 contact</td>
                  <td>14/11/2019 16:40:20</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Dừng</td>
                  <td>170/190 contact</td>
                  <td>14/11/2019 16:40:20</td>
                </tr>
              </tbody>
            </Table>
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
)(CampaginAuto);
