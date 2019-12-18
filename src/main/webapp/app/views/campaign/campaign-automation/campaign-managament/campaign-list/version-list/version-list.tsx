import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Row, Col, Breadcrumb, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { saveCampaignAutoVersion } from 'app/actions/campaign-managament';
import './version-list.scss';
import { Container, Card } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';

interface IVersionListProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}
interface IVersionListState {
  infoVersion: {
    nameVersion: string;
    idVersion: string;
  };
}
export class VersionList extends React.Component<IVersionListProps, IVersionListState> {
  state: IVersionListState = {
    infoVersion: {
      nameVersion: '',
      idVersion: ''
    }
  };

  componentDidMount() {
    const { campaign_list } = this.props;
    let data =
      campaign_list &&
      campaign_list
        .map(event => {
          if (event.cjVersionId === this.props.match.params.id) {
            return {
              nameVersion: event.name,
              idVersion: event.cjVersionId
            };
          }
        })
        .filter(Boolean);
    if (campaign_list === undefined) {
      window.location.assign('/#/app/views/campaigns/campaign-managament');
    } else {
      this.setState({ infoVersion: data[0] });
    }
  }

  createVersion = async () => {
    const { saveCampaignAutoVersion } = this.props;
    const { infoVersion } = this.state;
    await saveCampaignAutoVersion(infoVersion);
    window.location.assign('/#/flow');
  };

  render() {
    let { infoVersion } = this.state;
    const imgCopy = require('app/assets/utils/images/campaign-managament/copy-version.png');
    const imgDelete = require('app/assets/utils/images/campaign-managament/delete-version.png');
    const imgLine = require('app/assets/utils/images/campaign-managament/line-version.png');
    return (
      <div className="version">
        <Row className="header-row">
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
              <a onClick={() => window.location.assign('/#/app/views/campaigns/campaign-managament')} href="javascript:void(0);">
                {infoVersion.nameVersion}
              </a>
            </Breadcrumb.Item>

            <label className="ant-breadcrumb-link">Version</label>
          </Breadcrumb>
        </Row>
        <Container fluid className="container-version">
          <Card>
            <Row className="body-version">
              <img src={imgCopy} /> &nbsp; &nbsp;
              <img src={imgDelete} />
              &nbsp; &nbsp; &nbsp;
              <img src={imgLine} />
              <Button onClick={this.createVersion} type="primary" style={{ background: '#3866DD', marginLeft: '2%' }}>
                Tạo version mới
              </Button>
              <Button type="primary" style={{ background: '#97A3B4', marginLeft: '1%' }}>
                Dừng version
              </Button>
            </Row>
          </Card>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = ({ campaignManagament, cjState }: IRootState) => ({
  campaign_list: campaignManagament.campaign.data
});

const mapDispatchToProps = {
  saveCampaignAutoVersion
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionList);
