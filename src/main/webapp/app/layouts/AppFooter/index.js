import React, {Fragment} from 'react';
import MegaMenuFooter from './components/FooterMegaMenu';
import FooterDots from './components/FooterDots';

class AppFooter extends React.Component {
    render() {


        return (
            <Fragment>
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                            <FooterDots/>
                        </div>
                        <div className="app-footer-right">
                            <MegaMenuFooter/>
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
}

export default AppFooter;
