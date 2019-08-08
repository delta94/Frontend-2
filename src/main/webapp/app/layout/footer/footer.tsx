import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12" className="pull-center">
        <p>
          <Translate contentKey="footer.language">BoIn offered in:</Translate>
        </p>
      </Col>
      {/* <Col md="6"> */}
      {/* <span>English&nbsp;&nbsp;&nbsp;</span>
        <span>ไทย&nbsp;&nbsp;&nbsp;</span>
        <span>Tiếng Việt&nbsp;&nbsp;&nbsp;</span> */}
      {/* </Col> */}
    </Row>
  </div>
);

export default Footer;
