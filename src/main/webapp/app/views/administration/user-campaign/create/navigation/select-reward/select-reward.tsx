import { CardBody, FormGroup, Label, Input, Card, CardTitle, Button } from 'reactstrap';
import '../select-reward/select-reward.scss';
import { ULTILS_TYPES } from '../../../../../../constants/ultils';
import { Translate } from 'react-jhipster';
import React from 'react';
import Voucher from '../select-reward/voucher/voucher';
import { connect } from 'react-redux';
import { getNavigationReward } from 'app/actions/navigation-info';
import { openModal, closeModal } from 'app/actions/modal';
import { IRootState } from 'app/reducers';

export interface SelectRewardProps extends StateProps, DispatchProps {}

export interface SelectRewardState {
  displayVoucher: string;
  type: string;
  isCheck: boolean;
}
class SelectReward extends React.Component<SelectRewardProps, SelectRewardState> {
  state: SelectRewardState = {
    displayVoucher: ULTILS_TYPES.DISPLAY_VOUCHER_TICKET,
    type: ULTILS_TYPES.EMPTY,
    isCheck: true
  };

  //function select evoucher
  onClickVoucher = () => {
    this.setState(prevState => ({
      displayVoucher: ULTILS_TYPES.EMPTY,
      type: ULTILS_TYPES.SELECT_REWARD,
      isCheck: !prevState.isCheck
    }));
    this.props.getNavigationReward({ type: parseInt(ULTILS_TYPES.SELECT_REWARD) });
  };

  //function no select evoucher
  onClickNoVoucher = () => {
    this.setState(prevState => ({
      displayVoucher: ULTILS_TYPES.DISPLAY_VOUCHER_TICKET,
      type: ULTILS_TYPES.NO_SELECT_REWARD,
      isCheck: !prevState.isCheck
    }));

    this.props.getNavigationReward({ type: parseInt(ULTILS_TYPES.NO_SELECT_REWARD) });
  };
  //function get value from seclect reward component to navigation

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
                <label className="radio">
                  <input type="radio" name="radio1" onClick={this.onClickNoVoucher} checked={this.state.isCheck} />{' '}
                  <Translate contentKey="campaign.notifi-reward" />
                </label>
              </FormGroup>
              <FormGroup check>
                <label className="radio">
                  <input type="radio" name="radio1" onClick={this.onClickVoucher} />
                  <Translate contentKey="campaign.evoucher" />
                </label>
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

const mapStateToProps = ({ navigationInfo }: IRootState) => ({
  selectRewards: navigationInfo.reward.voucherId
});

const mapDispatchToProps = { getNavigationReward, openModal, closeModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectReward);
