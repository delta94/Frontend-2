import { CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../select-reward/select-reward.scss';
import { ULTILS_TYPES } from '../../../../../../constants/ultils';
import { Translate } from 'react-jhipster';
import React from 'react';
import Voucher from '../select-reward/voucher/voucher';

export interface SelectRewardProps {}

export interface SelectRewardState {
  displayVoucher: string;
}
class SelectReward extends React.Component<SelectRewardProps, SelectRewardState> {
  state: SelectRewardState = {
    displayVoucher: ULTILS_TYPES.DISPLAY_VOUCHER_TICKET
  };

  onClickVoucher = () => {
    this.setState({
      displayVoucher: ULTILS_TYPES.EMPTY
    });
  };

  onClickNoVoucher = () => {
    this.setState({
      displayVoucher: ULTILS_TYPES.DISPLAY_VOUCHER_TICKET
    });
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
              <Voucher />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SelectReward;
