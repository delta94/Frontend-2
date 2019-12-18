import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Row, Col, Breadcrumb, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './version-list.scss';
import { Container, Card } from 'reactstrap';

interface IVersionListProps extends StateProps, DispatchProps {
  nameVersion?: string;
  idVersion?: string;
}
interface IVersionListState {}
export class VersionList extends React.Component<IVersionListProps, IVersionListState> {
  state: IVersionListState = {};

  render() {
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
                Sinh nhật khách hàng
              </a>
            </Breadcrumb.Item>

            <label className="ant-breadcrumb-link">Version</label>
          </Breadcrumb>
        </Row>
        <Container fluid className="container-version">
          <Card>
            <Row className="body-version">
              <img src={imgCopy} /> &nbsp; &nbsp;
              <img src={imgDelete} />&nbsp; &nbsp; &nbsp;
              <img src={imgLine} />
              <Button type="primary" style={{ background: '#3866DD', marginLeft: '2%' }}>
                Tạo version mới
              </Button>
              <Button style={{ background: '#97A3B4', marginLeft: '1%' }}>Dừng version</Button>
            </Row>
          </Card>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = ({ campaignManagament, cjState }: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionList);
