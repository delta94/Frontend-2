import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Table, Label } from 'reactstrap';
import { Card, Row, Avatar, Icon, Popover, Button, Collapse, Input } from 'antd';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openModal, closeModal } from '../../../../../actions/modal';
import SweetAlert from 'sweetalert-react';
import { resetMessage, getDetailUser } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';
import './basic.scss';
import Ionicon from 'react-ionicons';

const { Panel } = Collapse;

export interface IBasicProps extends StateProps, DispatchProps {}

export interface IBasicState {
  visible: boolean;
}

export class Basic extends React.Component<IBasicProps, IBasicState> {
  state: IBasicState = {
    visible: false
  };

  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  formInput = () => {
    return (
      <div>
        <Input />
        <div>
          <Button onClick={() => false} type="primary">
            Save
          </Button>
          <Button>Canel</Button>
        </div>
      </div>
    );
  };

  render() {
    const { user } = this.props;
    const content = (
      <div>
        <div style={{ marginBottom: '2%' }}>
          <Button onClick={this.hide}>
            <i className="lnr-trash"> </i>&nbsp; Delete
          </Button>
        </div>
        <Button onClick={this.hide}>
          <Ionicon icon="md-git-merge" /> &nbsp; Merge
        </Button>
      </div>
    );

    return (
      <Fragment>
        <Card
          className="image-customer"
          extra={
            <Popover content={content} trigger="click" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
              <Icon type="setting" key="setting" />
            </Popover>
          }
        >
          <Avatar
            shape="square"
            size={64}
            icon="user"
            style={{ height: '6pc', width: '10pc', fontSize: '75px', background: 'antiquewhite' }}
          />
          <div className="details-customer-name">
            <Label>{user.name}</Label>
          </div>
          <div className="details-customer">
            <Label>{user.email}</Label>
          </div>
          <div className="details-customer">
            <Label>{user.phone}</Label>
          </div>
        </Card>
        <Collapse defaultActiveKey="1" expandIconPosition="right">
          <Panel header="THÔNG TIN CƠ BẢN" id="info-basic" key="1">
            <div style={{ display: 'flex', position: 'relative' }}>
              <Label style={{ width: '50%' }}>Phone</Label>
              <Popover content={this.formInput()} trigger="click">
                <span className="phone-customer_span">{user.phone}</span>
              </Popover>
            </div>
            <div style={{ display: 'flex', position: 'relative', borderTop: ' 1px solid #E5ECF4' }}>
              <Label style={{ width: '50%' }}>Organization name</Label>
              <Popover content={this.formInput()} trigger="click">
                <span className="phone-customer_span">{user.personalizationTag ? user.personalizationTag : 'Click to add'}</span>
              </Popover>
            </div>
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

const mapDispatchToProps = { resetMessage, openModal, closeModal, getDetailUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basic);
