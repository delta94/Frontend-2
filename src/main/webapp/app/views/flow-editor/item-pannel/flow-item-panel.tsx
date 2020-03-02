import React, { Fragment } from 'react';
import { Card, Row, Col, Collapse } from 'antd';
import { ItemPanel, Item } from 'gg-editor';
import './index.scss';

const { Panel } = Collapse;

class FlowItemPanel extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Fragment>
        <Collapse bordered={false} defaultActiveKey={['1']} expandIconPosition="right">
          <Panel header="Messages" key="1">
            <ItemPanel className="itemPanel">
              <Row className="row">
                <Col span={8}>
                  <Item
                    type="node"
                    size="99*50"
                    shape="custom-node-flow"
                    model={{
                      value: '',
                      code: 'PROCESS',
                      param: 'PROCESS',
                      color: '#FA8C16',
                      label: 'Xử lý',
                      emailConfig: null,
                      smsConfig: null,
                      icon:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANdSURBVHgB7Zk/TBNRHMd/dy1UIn8amkCERgoGkhpIIDrggnbAyQ0XmcCFkQknndxkgU0nnHSRTSYG/uggMQQSiCRthIM0NWBqKGq0hfb5vq89rRp69+7appf0m1y4XN7d+/R3v/f93eOnUE6BjSWvSu5JxugW4agUKbTJGJvVrg09/3OJBHBAydQsEbEAVawUjaVOQ9qNkCagO9ff7lU2sC4Orp4OuALrq2OcfIycIS+lKakqTJkkB0lxqTdVntX95CRxk1DJgapCl0tV6HLJkdBuM4OGvT6avHSZrtZdpFLpw4/vNBs7oMVE3HCs0rn+hhUaMOJroemOHjpJn5l6oBU1utwUrKsnf62H7oW3aO1bouB4w0iPt7RTNPWT7uxsCvBSyV97gV4H+8UbHY1sFRxrmNNIibWvCQGMB672XhcTFA90gAemTQQGKeL3eAzvk1qI0WRSTPSip9c2OIKByCIl8FwZSUHPfzmkiY87IgcxYdDiwrzra+U/vE+cj/Icll0r0paHCTDRSTpNC/zVjjS3St2PVHjS0S3SDesEKSErSz6NiQAeTSVpOtAtct2MMO6Rv0vk72h4W/y1IsvFJTtxFhwwRuCAxRj8YETYKjBkqyJmrXCDFo/jAughB/tXyH/4PNJiPn4kxtu1TttlHAATuzv0igPd52BPu4LU4HL/BsaCQ4GaO4rR1H6YiqGifHvA/gYbmsT5bV7yF7izDNY3CQ/WS/+wt7lo/m4bOuvbfcJvH0d3afbTwX/XprRI0fwdMvXBZAb4wX6Ep8ihuI5iMd7aJoBRTXXBaQBuxzkgy5HGawdwo8v1FzCEIoQFlw+sX8vmub2IW4LOB4bt5QMXku7vdiuqNLReguEaAJCtaDo4KupL/hwr4FLQ2AzoJRh5aaUEQ/ng+BQYbvJJ3S8F7a/x5Ca0t5Cg/IqKhSwjQ/cAJCLcEN2juc8xcRRLAB/afi/OsTBxmAmGITT2bc+uBEXBMNoG2RFSBAvUTNU03CNCI80t3HfbS7qxfccDgsKUb5PnyRR0pan6z5pyqQpdLjkUWqFlcpJ4X1Fl6cwKOUhohPImbWaGn2rkCDENnVtVGwgdMzUdqnxwxju24My1mXWhEUq8r6hUUJuO9+qXeRtuhdxnMwgwrv0C10KOf8EY6j8AAAAASUVORK5CYII=',
                      labelOffsetY: 60
                    }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANdSURBVHgB7Zk/TBNRHMd/dy1UIn8amkCERgoGkhpIIDrggnbAyQ0XmcCFkQknndxkgU0nnHSRTSYG/uggMQQSiCRthIM0NWBqKGq0hfb5vq89rRp69+7appf0m1y4XN7d+/R3v/f93eOnUE6BjSWvSu5JxugW4agUKbTJGJvVrg09/3OJBHBAydQsEbEAVawUjaVOQ9qNkCagO9ff7lU2sC4Orp4OuALrq2OcfIycIS+lKakqTJkkB0lxqTdVntX95CRxk1DJgapCl0tV6HLJkdBuM4OGvT6avHSZrtZdpFLpw4/vNBs7oMVE3HCs0rn+hhUaMOJroemOHjpJn5l6oBU1utwUrKsnf62H7oW3aO1bouB4w0iPt7RTNPWT7uxsCvBSyV97gV4H+8UbHY1sFRxrmNNIibWvCQGMB672XhcTFA90gAemTQQGKeL3eAzvk1qI0WRSTPSip9c2OIKByCIl8FwZSUHPfzmkiY87IgcxYdDiwrzra+U/vE+cj/Icll0r0paHCTDRSTpNC/zVjjS3St2PVHjS0S3SDesEKSErSz6NiQAeTSVpOtAtct2MMO6Rv0vk72h4W/y1IsvFJTtxFhwwRuCAxRj8YETYKjBkqyJmrXCDFo/jAughB/tXyH/4PNJiPn4kxtu1TttlHAATuzv0igPd52BPu4LU4HL/BsaCQ4GaO4rR1H6YiqGifHvA/gYbmsT5bV7yF7izDNY3CQ/WS/+wt7lo/m4bOuvbfcJvH0d3afbTwX/XprRI0fwdMvXBZAb4wX6Ep8ihuI5iMd7aJoBRTXXBaQBuxzkgy5HGawdwo8v1FzCEIoQFlw+sX8vmub2IW4LOB4bt5QMXku7vdiuqNLReguEaAJCtaDo4KupL/hwr4FLQ2AzoJRh5aaUEQ/ng+BQYbvJJ3S8F7a/x5Ca0t5Cg/IqKhSwjQ/cAJCLcEN2juc8xcRRLAB/afi/OsTBxmAmGITT2bc+uBEXBMNoG2RFSBAvUTNU03CNCI80t3HfbS7qxfccDgsKUb5PnyRR0pan6z5pyqQpdLjkUWqFlcpJ4X1Fl6cwKOUhohPImbWaGn2rkCDENnVtVGwgdMzUdqnxwxju24My1mXWhEUq8r6hUUJuO9+qXeRtuhdxnMwgwrv0C10KOf8EY6j8AAAAASUVORK5CYII="
                  />
                  <label>Xử lý</label>
                </Col>
              </Row>
            </ItemPanel>
          </Panel>
        </Collapse>
        <Collapse bordered={false} defaultActiveKey={['2']} expandIconPosition="right">
          <Panel header="Điều kiện" key="2">
            <ItemPanel className="itemPanel">
              <Row className="row">
                <Col span={8}>
                  <Item
                    type="node"
                    size="95*95"
                    shape="custom-node-rhombus"
                    model={{
                      value: '',
                      code: 'GATEWAY',
                      color: '#1890FF',
                      label: 'Rẻ nhánh điều kiện',
                      icon:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPrSURBVHhe7Zo/aBRBFIffbM4ignqxTJpIEI9gEYvYKYgQSyM2NupdqYKcaSxSqEVKzRFILBO7NCKWBpT0sbAQvCYQi1hqUDAQzIz7u525f7nL7e68mTsu+eDYmbvA8vvm7dtxVzrmiCP00SujRZU9GexPE6lRzKWk9XLpxHrlR894FzA+o54JkkVFlNVfGbaklAXfIrwKGJ/ZXw4P+WjWGqmCfHlevNFT53gTECe8wacELwKShDf4kuBcQJrwBh8SnAqwCW9wLcGZAI7wBpcSnAjgDG9wJYFdgIvwBhcSWAW4DG/glsAmwEd4A6cEFgE+wxu4JFgL6EZ4A4cEKwHdDG+wlZBaQC+EN9hISCWgl8Ib0kpILKAXwxvSSEgkgCv8qUGiW5OCLgwTjZwl+r1LtP2T6NNXRRub+o9SklRCbAFc4Z/eFHTvavvTQkThtawc05JEQiwBXOEXCoKuX6ydEiF//FKV8eRY4/e+JHQUwBV+Oiz5uTvR6RBsdlU2lDsuhYV8QLmRaL6xqSi/FMlJSxwJgT62hLPh3b1Sc43Vbb7WISUffv8n7AcAFTE8FI3TEgi5knui7utpS9oK4AyPpmdWFo2uXWkjPH43oCps6SShpQDO8IbZVVX5LK7ZlXUaDpNwoAe4CJ+EtdmguvJTc3aNsJlWPaGhAvDSIjx0LfzDKVENjybIGR6ElVA6X9yb0NMKVQG5Il5Tyed66hX0COwPHt2IChK9AJeLA7IZkZnX4wpVAWJgv8GML9Ac384E1c0RwuNuwL36BiHUBN5N6mmdAKW8C0C5rzyoXfMfwzvA7VeSytvR3BHZwQE6o8c1AUqqHT30xnIYHuUPlsK7w+Nl/uu+EzUBJL7ooRew6vUNb/GDn9tjeJatby/Fdz2tCcBrafyop86p3+XZ/gswCYJk+9ugkrKgh30JFvivzJT0tMKBjVCu+C8fBAKbob4C4ZXcu1YuDTZU+QEBoN8ktAsPWgoA/SLhsPCgoQfUUy5lVqRUTnvC5Bg1PCDhplN40PHsriqh/gEJx8OPZuKEB20rwOCqEi6Hq28YHuKtgrjhQUcBwIWEdxuq+vTn/We+1U8SHiRSz305YBt8OvxwbX+ThgeJa69X7w5pwoNUF1+vSUgbHqTuPr0iwSY8sGq/3ZZgGx5YCQDdksARHlgLAL4lcIUHLAKALwmc4QGbAOBaAnd4wCoAuJLgIjxgFwC4JbgKD5wIAFwSXIYHzgQAWwmuwwOnAkBaCT7CA+cCQFIJvsIDLwJAXAk+wwNvAkAnCb7Dg1hPhLiIniwF55RSzf9xaYdIvtiVwSWf4btOrrg7io+eHnOMd4j+A1kabQNb55dcAAAAAElFTkSuQmCC',
                      labelOffsetY: 60
                    }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPrSURBVHhe7Zo/aBRBFIffbM4ignqxTJpIEI9gEYvYKYgQSyM2NupdqYKcaSxSqEVKzRFILBO7NCKWBpT0sbAQvCYQi1hqUDAQzIz7u525f7nL7e68mTsu+eDYmbvA8vvm7dtxVzrmiCP00SujRZU9GexPE6lRzKWk9XLpxHrlR894FzA+o54JkkVFlNVfGbaklAXfIrwKGJ/ZXw4P+WjWGqmCfHlevNFT53gTECe8wacELwKShDf4kuBcQJrwBh8SnAqwCW9wLcGZAI7wBpcSnAjgDG9wJYFdgIvwBhcSWAW4DG/glsAmwEd4A6cEFgE+wxu4JFgL6EZ4A4cEKwHdDG+wlZBaQC+EN9hISCWgl8Ib0kpILKAXwxvSSEgkgCv8qUGiW5OCLgwTjZwl+r1LtP2T6NNXRRub+o9SklRCbAFc4Z/eFHTvavvTQkThtawc05JEQiwBXOEXCoKuX6ydEiF//FKV8eRY4/e+JHQUwBV+Oiz5uTvR6RBsdlU2lDsuhYV8QLmRaL6xqSi/FMlJSxwJgT62hLPh3b1Sc43Vbb7WISUffv8n7AcAFTE8FI3TEgi5knui7utpS9oK4AyPpmdWFo2uXWkjPH43oCps6SShpQDO8IbZVVX5LK7ZlXUaDpNwoAe4CJ+EtdmguvJTc3aNsJlWPaGhAvDSIjx0LfzDKVENjybIGR6ElVA6X9yb0NMKVQG5Il5Tyed66hX0COwPHt2IChK9AJeLA7IZkZnX4wpVAWJgv8GML9Ac384E1c0RwuNuwL36BiHUBN5N6mmdAKW8C0C5rzyoXfMfwzvA7VeSytvR3BHZwQE6o8c1AUqqHT30xnIYHuUPlsK7w+Nl/uu+EzUBJL7ooRew6vUNb/GDn9tjeJatby/Fdz2tCcBrafyop86p3+XZ/gswCYJk+9ugkrKgh30JFvivzJT0tMKBjVCu+C8fBAKbob4C4ZXcu1YuDTZU+QEBoN8ktAsPWgoA/SLhsPCgoQfUUy5lVqRUTnvC5Bg1PCDhplN40PHsriqh/gEJx8OPZuKEB20rwOCqEi6Hq28YHuKtgrjhQUcBwIWEdxuq+vTn/We+1U8SHiRSz305YBt8OvxwbX+ThgeJa69X7w5pwoNUF1+vSUgbHqTuPr0iwSY8sGq/3ZZgGx5YCQDdksARHlgLAL4lcIUHLAKALwmc4QGbAOBaAnd4wCoAuJLgIjxgFwC4JbgKD5wIAFwSXIYHzgQAWwmuwwOnAkBaCT7CA+cCQFIJvsIDLwJAXAk+wwNvAkAnCb7Dg1hPhLiIniwF55RSzf9xaYdIvtiVwSWf4btOrrg7io+eHnOMd4j+A1kabQNb55dcAAAAAElFTkSuQmCC"
                  />
                  <label>Rẻ nhánh điều kiện</label>
                </Col>
              </Row>
            </ItemPanel>
          </Panel>
        </Collapse>
        {/* // </Sider> */}
      </Fragment>
    );
  }
}

export default FlowItemPanel;
