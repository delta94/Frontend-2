import { CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../select-reward/select-reward.scss';
import { ULTILS_TYPES } from '../../../../../../constants/ultils';
import { Translate } from 'react-jhipster';
import React from 'react';
import Voucher from '../select-reward/voucher/voucher';

export interface SelectRewardProps {
  onClick: Function;
}

export interface SelectRewardState {
  displayVoucher: string;
  type: string;
}
class SelectReward extends React.Component<SelectRewardProps, SelectRewardState> {
  state: SelectRewardState = {
    displayVoucher: ULTILS_TYPES.DISPLAY_VOUCHER_TICKET,
    type: ULTILS_TYPES.EMPTY
  };

  //function select evoucher
  onClickVoucher = () => {
    this.setState({
      displayVoucher: ULTILS_TYPES.EMPTY,
      type: ULTILS_TYPES.SELECT_REWARD
    });
  };

  //function no select evoucher
  onClickNoVoucher = () => {
    this.setState({
      displayVoucher: ULTILS_TYPES.DISPLAY_VOUCHER_TICKET,
      type: ULTILS_TYPES.NO_SELECT_REWARD
    });
  };
  //function get value from seclect reward component to navigation
  getValueVoucher = value => {
    this.props.onClick(value);
  };
  render() {
    return (
      <div className="select-reward">
        <CardTitle>
          {' '}
          <Translate contentKey="campaign.select-reward" />
        </CardTitle>
        <Card>
          <CardBody>
            <FormGroup tag="fieldset">
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" onClick={this.onClickNoVoucher} /> <Translate contentKey="campaign.notifi-reward" />
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" onClick={this.onClickVoucher} />
                  <Translate contentKey="campaign.evoucher" />
                </Label>
              </FormGroup>
            </FormGroup>
            <div className={this.state.displayVoucher}>
              <Voucher onClick={this.getValueVoucher} />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SelectReward;
