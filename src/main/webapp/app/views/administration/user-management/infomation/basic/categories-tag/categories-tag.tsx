import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col, Card } from 'reactstrap';
import { translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Multiselect } from 'react-widgets';
import { IRootState } from 'app/reducers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getComboTagsAction } from 'app/actions/tag-management';

library.add(faSpinner);

export interface IUserUpdateProps extends StateProps, DispatchProps {
  defaultCate?: any[];
  handleChange?: Function;
}

export interface IUserUpdateState {
  isNew: boolean;
}

class UserCategoryTag extends React.Component<IUserUpdateProps, IUserUpdateState> {
  handleChange = data => {
    this.props.handleChange(data);
    if (data.length < 1) {
      this.props.getComboTagsAction('');
    }
  };

  componentDidMount() {
    this.props.getComboTagsAction('');
  }

  handleCreate = name => {
    this.props.getComboTagsAction(name);
  };

  render() {
    const { comboTag, defaultCate } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <Row form>
                  <Col md={12}>
                    <Multiselect
                      dropUp
                      placeholder={translate('userManagement.choose-categories')}
                      data={comboTag}
                      value={defaultCate}
                      className="Select-holder"
                      allowCreate="onFilter"
                      onCreate={name => this.handleCreate(name)}
                      onChange={data => this.handleChange(data)}
                      textField="name"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ tagDataState }: IRootState) => ({
  comboTag: tagDataState.combo_tag
});

const mapDispatchToProps = { getComboTagsAction };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCategoryTag);
