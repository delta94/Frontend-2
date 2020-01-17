import React, { Fragment } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { IRootState } from 'app/reducers';
import { Input, Icon, Row, Col, Tag, Tabs, Button } from 'antd';
import './email-template.scss'

interface IEmailTemplateManagementProps extends StateProps, DispatchProps {
}

interface IEmailTemplateManagementState {
  activePage: number;
  itemsPerPage: number;
  textSearch: string;
}

const { TabPane } = Tabs;

class EmailTemplateManagement extends React.Component<IEmailTemplateManagementProps, IEmailTemplateManagementState> {
  state: IEmailTemplateManagementState = {
    activePage: 0,
    itemsPerPage: 9,
    textSearch: '',
  };

  componentDidMount() {
  }

  onchangeTextSearch = (event) => {
    this.setState({ textSearch: event.target.value });
  }

  setPageIndex = (pageIndex) => {

  }

  render() {
    let { textSearch } = this.state;
    let { totalPages, } = this.props;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Loader message={spinner1} show={false} priority={1}>
        <Fragment></Fragment>
        <div className="email-template-management">
          <div className="email-template-title-header">
            <label>Choose Templates</label>
          </div>
          <Row>
            <div className="email-template-search">
              <Input
                style={{ float: 'right' }}
                id="searchText"
                value={textSearch}
                onChange={this.onchangeTextSearch}
                onPressEnter={() => {
                  null
                }}
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Search Templates"
              />
            </div>
          </Row>
          <Row>
            <div className="email-template-list">
              <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Tab 1" key="1">
                  <Col span={8} >
                    <div className="gutter">
                      <div className="gutter-content"><Button>Preview</Button></div>
                      <div className="gutter-title"></div>
                    </div>
                  </Col>
                  <Col span={8} ><div className="gutter"></div></Col>
                  <Col span={8} ><div className="gutter"></div></Col>
                  <Col span={8} ><div className="gutter"></div></Col>
                  <Col span={8} ><div className="gutter"></div></Col>
                  <Col span={8} ><div className="gutter"></div></Col>
                  <Col span={8} ><div className="gutter"></div></Col>
                  <Col span={8} ><div className="gutter"></div></Col>
                  <Col span={8} ><div className="gutter"></div></Col>
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
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
          </Row>
        </div>
      </Loader>
    );
  }

}

const mapStateToProps = ({ }: IRootState) => ({
  loading: false,
  total: 20,
  totalPages: 3
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
)(EmailTemplateManagement);
