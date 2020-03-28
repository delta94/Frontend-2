import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-responsive-tabs';
import { IRootState } from 'app/reducers';
import PageTitle from 'app/layout/AppMain/PageTitle'
import { Redirect, RouteComponentProps } from 'react-router';
import PeopleInfected from './people-infected/people-infected'

export interface IHomeProps extends StateProps, DispatchProps, RouteComponentProps<{history}> {}
export interface IHomeStates {
}
const content = [
    {
        title: 'Sales Report',
        content: <PeopleInfected/>
    },
    {
        title: 'Account Activity',
        content: <PeopleInfected/>
    },
    {
        title: 'Profile Status',
        content: <PeopleInfected/>
    },
    {
        title: 'New Accounts',
        content: <PeopleInfected/>
    },
]


export class Home extends React.Component<IHomeProps, IHomeStates> {

    getTabs() {
        return content.map((tab, index) => ({
            title: tab.title,
            getContent: () => tab.content,
            key: index,
        }));
    }

  render() {

    return (
        <Fragment>
        <div className="app-inner-layout">
            <div className="app-inner-layout__header-boxed p-0">
                <div className="app-inner-layout__header page-title-icon-rounded text-white bg-premium-dark mb-4">
                    <PageTitle
                        heading="Tổng số ca"
                        icon="pe-7s-umbrella icon-gradient bg-sunny-morning"
                    />
                </div>
            </div>
            <Tabs tabsWrapperClass="body-tabs body-tabs-layout body-tabs-big" transform={false} showInkBar={true} items={this.getTabs()}/>
        </div>
    </Fragment>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  logoutUrl: storeState.authentication.logoutUrl,
  idToken: storeState.authentication.idToken
});

const mapDispatchToProps = {  };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
