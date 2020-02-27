import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import { Card, Row, Avatar, Icon, Popover, Button, Collapse, Input } from 'antd';
import { Translate, translate } from 'react-jhipster';
import { openModal, closeModal } from '../../../../../actions/modal';
import SweetAlert from 'sweetalert-react';
import { resetMessage, getDetailUser, updateCategory } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import './member.scss';
import Ionicon from 'react-ionicons';
import $ from 'jquery';

const { Panel } = Collapse;

export interface IMemberProps extends StateProps, DispatchProps {}

export interface IMemberState {}

export class Member extends React.Component<IMemberProps, IMemberState> {
  state: IMemberState = {};

  render() {
    const image = require('app/assets/utils/images/user-management/rank-bronze.png');
    return (
      <Fragment>
        <Collapse defaultActiveKey="2" expandIconPosition="right" className="collapse-member">
          <Panel header="Chưa xử lý" id="info-member" key="1">
            {/* <div style={{ display: 'flex', position: 'relative' }}>
              <Label className="rank-text" style={{ width: '50%' }}>
                Chưa xử lý
              </Label>
              <label className="phone-customer_span">
                {' '}
                <img src={image} />
              </label>
            </div>
            <div className="line-info">
              <Label className="content-text" style={{ width: '50%' }}>
                Quyền lợi hạng đồng{' '}
              </Label>
            </div>
            <div>
              <span style={{ marginLeft: '20px' }}>- Được hưởng quyền lợi 1</span>
            </div>
            <span style={{ marginLeft: '20px' }}>- Được hưởng quyền lợi 2</span> */}
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey="2" expandIconPosition="right" className="collapse-member">
          <Panel header="Chưa xử lý" extra={200} id="info-member" key="1">
            {/* <div style={{ display: 'flex', position: 'relative' }}>
              <Label className="rank-text" style={{ width: '50%' }}>
                Mua hàng tại cửa hàng
              </Label>
              <label className="phone-customer_span"> -100</label>
            </div>
            <div className="line-info">
              <Label className="content-text" style={{ width: '50%' }}>
                Đổi bánh trưng
              </Label>
              <span className="phone-customer_span">-100</span>
            </div> */}
          </Panel>
        </Collapse>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ handleModal, userManagement }: IRootState) => ({
  modalState: handleModal.data,
  user: userManagement.user
});

const mapDispatchToProps = { resetMessage, openModal, closeModal, getDetailUser, updateCategory };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member);
