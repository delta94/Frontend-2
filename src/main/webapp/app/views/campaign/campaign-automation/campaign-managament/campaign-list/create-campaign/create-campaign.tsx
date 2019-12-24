import react, { Fragment } from 'react';
import { saveCampaignAutoVersion, getDiagramCampaign, resetData, getTemplateCampaign } from 'app/actions/campaign-managament';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row, Badge, Col, Breadcrumb, Card, Tag } from 'antd';
import { Container } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import './create-campaign.scss';

interface ICreateCampaignProps extends StateProps, DispatchProps {}

interface ICreateCampaignState {
  infoVersion: {
    type: string;
    nameVersion: string;
    idVersion: string;
    cjId: string;
    status: string;
  };
}

class CreateCampaign extends React.Component<ICreateCampaignProps, ICreateCampaignState> {
  state: ICreateCampaignState = {
    infoVersion: {
      type: '',
      nameVersion: '',
      idVersion: '',
      cjId: '',
      status: ''
    }
  };
  componentDidMount() {
    const { getTemplateCampaign } = this.props;
    getTemplateCampaign();
  }

  difficulty = option => {
    let result = {
      difficulty: '',
      color: ''
    };
    switch (option) {
      case 0:
        result.difficulty = 'ĐƠN GIẢN';
        result.color = '#42C37F';
        break;
      case 1:
        result.difficulty = 'TRUNG BÌNH';
        result.color = '#9CA9AC';
        break;
      case 2:
        result.difficulty = 'PHỨC TẠP';
        result.color = '#F46C6C';
        break;
      default:
        break;
    }
    return result;
  };

  render() {
    const { list_template } = this.props;
    return (
      <div className="container-create">
        <Row className="row-title">
          <Col span={20}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <a onClick={() => window.location.assign('/#/app/views/customers/user-management')} href="javascript:void(0);">
                  <FontAwesomeIcon icon={faHome} />
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-auto')} href="javascript:void(0);">
                  Chiến dịch tự động
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament')} href="javascript:void(0);">
                  Danh sách chiến dịch
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament/new')} href="javascript:void(0);">
                  Tạo chiến dịch
                </a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Button
              style={{ background: '#3866DD' }}
              type="primary"
              onClick={async () => {
                await this.props.getDiagramCampaign([]);
                await this.props.saveCampaignAutoVersion(this.state.infoVersion);
                await this.props.resetData();
                await window.location.assign('#/flow');
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
            <div className="count-campaign">{list_template ? list_template.length : ''} chiến dịch mẫu </div>
            {list_template &&
              list_template.map((item, index) => {
                return (
                  <Col className="gutter-row" span={8} key={index}>
                    <div className="gutter-box">
                      <label className="text-title">{item.name}</label>
                      <Tag className="tag-group-content" style={{ margin: '1% 5%' }} color="#E6E8E9">
                        <label>#NHÓM 1</label>
                      </Tag>
                      <p>{item.description}</p>
                      <Tag color={this.difficulty(item.difficulty).color} style={{ margin: '7% 3%' }}>
                        <label style={{ lineHeight: '0' }}>{this.difficulty(item.difficulty).difficulty}</label>
                      </Tag>
                    </div>
                  </Col>
                );
              })}
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ campaignManagament, cjState }: IRootState) => ({
  loading: campaignManagament.loading,
  list_template: campaignManagament.listTemplateCampaign
});

const mapDispatchToProps = {
  saveCampaignAutoVersion,
  getDiagramCampaign,
  resetData,
  getTemplateCampaign
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaign);
