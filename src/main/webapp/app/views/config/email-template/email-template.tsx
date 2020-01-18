import React, { Fragment } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { IRootState } from 'app/reducers';
import { Input, Icon, Row, Col, Tag, Tabs, Button } from 'antd';
import { Button as Btn } from 'reactstrap';
import {
  getEmailCategoriesAction, getEmailTemplatesAction
} from 'app/actions/email-config';
import './email-template.scss'

interface IEmailTemplateManagementProps extends StateProps, DispatchProps {
}

interface IEmailTemplateManagementState {
  activePage: number;
  itemsPerPage: number;
  textSearch: string;
  activeKey: string;
}

const { TabPane } = Tabs;
const pageDefault: number = 0;
const pageSizeDefault: number = 3;

class EmailTemplateManagement extends React.Component<IEmailTemplateManagementProps, IEmailTemplateManagementState> {
  state: IEmailTemplateManagementState = {
    activePage: 0,
    itemsPerPage: pageSizeDefault,
    textSearch: '',
    activeKey: ''
  };

  async componentDidMount() {
    await this.props.getEmailCategoriesAction();
    this.setState({
      activeKey: this.props.emailCategories[0].id
    });
    this.props.getEmailTemplatesAction(this.props.emailCategories[0].id, '', pageDefault, pageSizeDefault);
  }

  back = () => {
    location.assign('#/app/views/config/emails');
  }

  onchangeTextSearch = (event) => {
    this.setState({ textSearch: event.target.value });
  }

  onchangeTabEmailCategory = activeKey => {
    let { textSearch } = this.state;
    this.props.getEmailTemplatesAction(activeKey, textSearch, pageDefault, pageSizeDefault);
    this.setState({
      activeKey: activeKey
    });
  }

  setPageIndex = (pageIndex) => {
    let { activeKey, textSearch, itemsPerPage } = this.state;
    this.props.getEmailTemplatesAction(activeKey, textSearch, parseInt(pageIndex), itemsPerPage);
    this.setState({ activePage: parseInt(pageIndex) });
  }

  chooseTemplate = emailTemplateId => {
    location.assign('#/app/views/config/emails/' + emailTemplateId + '/copyTemplate');
  }

  render() {
    let { textSearch, activeKey, activePage, itemsPerPage } = this.state;
    let { totalPages, loading, emailCategories, emailTemplates } = this.props;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Fragment>
        <div className="email-template-management">
          <div className="email-template-title-header">
            <label>Choose Templates</label>
            <Btn color="primary" onClick={this.back}>Back</Btn>
          </div>
          <Row>
            <div className="email-template-search">
              <Input
                style={{ float: 'right' }}
                id="searchText"
                value={textSearch}
                onChange={this.onchangeTextSearch}
                onPressEnter={() => {
                  this.props.getEmailTemplatesAction(activeKey, textSearch, pageDefault, itemsPerPage);
                }}
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Search Templates"
              />
            </div>
          </Row>
          <Row>
            <Loader message={spinner1} show={loading} priority={1}>
              <div className="email-template-list">
                {
                  emailCategories && emailCategories.length > 0 ? (
                    <Tabs onChange={this.onchangeTabEmailCategory} defaultActiveKey={activeKey} type="card">
                      {
                        emailCategories.map((category, index) => (
                          <TabPane tab={category.name} key={category.id}>
                            {
                              emailTemplates && emailCategories.length > 0 ? (
                                emailTemplates.map((emailTemplate, index) => (
                                  <Col span={8} >
                                    <div className="gutter">
                                      <div className="gutter-content">
                                        <Button>Preview</Button>
                                        <Button onClick={() => this.chooseTemplate(emailTemplate.id)} style={{ marginLeft: '5px' }}>Choose</Button>
                                      </div>
                                      <div className="gutter-title">{emailTemplate.subject}</div>
                                    </div>
                                  </Col>
                                ))
                              ) : ''
                            }
                          </TabPane>
                        ))
                      }
                    </Tabs>
                  ) : ""
                }
              </div>

              <div className="email-template-navigation">
                {totalPages && totalPages >= 2 ? (
                  <Row className="justify-content-center" style={{ float: 'right' }}>
                    <ReactPaginate
                      previousLabel={'<'}
                      nextLabel={'>'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={totalPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={event => this.setPageIndex(event.selected)}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                    />
                  </Row>
                ) : (
                    ''
                  )}
              </div>
            </Loader>
          </Row>
        </div>
      </Fragment>
    );
  }

}

const mapStateToProps = ({ emailConfigState }: IRootState) => ({
  loading: emailConfigState.loading,
  emailTemplates: emailConfigState.emailTemplateData.content,
  total: emailConfigState.emailTemplateData.totalElements,
  totalPages: emailConfigState.emailTemplateData.totalPages,
  emailCategories: emailConfigState.emailTemplateCategories
});

const mapDispatchToProps = {
  getEmailCategoriesAction, getEmailTemplatesAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailTemplateManagement);
