import React from 'react';
import SVGIcon from 'app/common/component/common-components';

export const TableSubComponent = row => {
  return (
    <div className="viewSubTable">
      <div className="email">
        <SVGIcon name="email" />
        <p>{row.data.original.email ? row.data.original.email : ''}</p>
      </div>
      <div className="phone">
        <SVGIcon name="phone" />
        <p>{row.data.original.phone ? row.data.original.phone : ''}</p>
      </div>
      <div className="converter">
        <SVGIcon name="converter" />
        <p>{row.data.original.converter ? row.data.original.converter.converterName : ''}</p>
      </div>
      <div className="link">
        <SVGIcon name="link" />
        <p>
          <a target="_blank" href={row.data.original.linkCv}>
            Link CV
          </a>
        </p>
      </div>
      <div className="linkPĐG">
        <SVGIcon name="link" />
        <p>
          <a target="_blank" href={row.data.original.linkPdg}>
            Link đánh giá
          </a>
        </p>
      </div>
    </div>
  );
};

export default TableSubComponent;
