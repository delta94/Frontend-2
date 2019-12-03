import react, { Fragment } from 'react';

import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Icon, Card, Tag } from 'antd';
import { Container } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getListCampaignInfolderDataAction } from 'app/actions/campaign-managament';
import './create-campaign.scss';

interface ICreateCampaignProps extends StateProps, DispatchProps {}

interface ICreateCampaignState {}

class CreateCampaign extends React.Component<ICreateCampaignProps, ICreateCampaignState> {
  state: ICreateCampaignState = {};

  render() {
    return (
      <div className="container-create">
        <Row className="row-title">
          <Col span={20}>
            <FontAwesomeIcon icon={faHome} /> > <label className="title"> Chiến dịch tự động > Danh sách chiến dịch > Tạo Chiến dịch</label>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              onClick={() => {
                window.location.assign('#/flow');
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              &nbsp; Tạo chiến dịch mới{' '}
            </Button>
          </Col>
        </Row>
        <br />
        <Container fluid>
          <Card>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box">
                  <label className="text-title">Chúc mừng sinh nhật</label>
                  <Tag style={{ float: 'right' }} color="#108ee9">
                    #nhóm 1
                  </Tag>
                  <p>
                    Chiến dịch gửi quà chúc mừng khách hàng nhân ngày sinh nhật, tặng quà khách hàng VIP sử đã sử dụng trên 100.000.000 tiền
                    sản phẩm...{' '}
                  </p>
                  <Tag color="#87d068">Đơn giản</Tag>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box">
                  <label className="text-title">Chúc mừng sinh nhật</label>
                  <Tag style={{ float: 'right' }} color="#108ee9">
                    #nhóm 1
                  </Tag>
                  <p>
                    Chiến dịch gửi quà chúc mừng khách hàng nhân ngày sinh nhật, tặng quà khách hàng VIP sử đã sử dụng trên 100.000.000 tiền
                    sản phẩm...{' '}
                  </p>
                  <Tag color="#87d068">Đơn giản</Tag>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box">
                  <label className="text-title">Chúc mừng sinh nhật</label>
                  <Tag style={{ float: 'right' }} color="#108ee9">
                    #nhóm 1
                  </Tag>
                  <p>
                    Chiến dịch gửi quà chúc mừng khách hàng nhân ngày sinh nhật, tặng quà khách hàng VIP sử đã sử dụng trên 100.000.000 tiền
                    sản phẩm...{' '}
                  </p>
                  <Tag color="#87d068">Đơn giản</Tag>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box">
                  <label className="text-title">Chúc mừng sinh nhật</label>
                  <Tag style={{ float: 'right' }} color="#108ee9">
                    #nhóm 1
                  </Tag>
                  <p>
                    Chiến dịch gửi quà chúc mừng khách hàng nhân ngày sinh nhật, tặng quà khách hàng VIP sử đã sử dụng trên 100.000.000 tiền
                    sản phẩm...{' '}
                  </p>
                  <Tag color="#87d068">Đơn giản</Tag>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ campaignManagament, cjState }: IRootState) => ({
  loading: campaignManagament.loading
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaign);
