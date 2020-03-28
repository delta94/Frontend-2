import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';


class PageTitle extends Component {
    render() {
        let {
            enablePageTitleIcon,
            enablePageTitleSubheading,
            heading,
            icon,
            subheading
        } = this.props;


        return (

            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div
                            className={cx("page-title-icon", {'d-none': !enablePageTitleIcon})}>
                            <i className={icon}/>
                        </div>
                        <div>
                            {heading}
                            <div
                                className={cx("page-title-subheading", {'d-none': !enablePageTitleSubheading})}>
                                {subheading}
                            </div>
                        </div>
                    </div>
                    <label> 123213213</label>
                    <label> 123213213</label>
                    <label> 123213213</label>
                    {/* <div className="page-title-actions">
                        {this.randomize(arr)}
                    </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    enablePageTitleIcon: state.themeOptions.enablePageTitleIcon,
    enablePageTitleSubheading: state.themeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);