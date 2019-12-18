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
          <Panel header="Nguồn dữ liệu" key="1">
            <ItemPanel className="itemPanel">
              <Row className="row">
                <Col span={8}>
                  <Item
                    type="node"
                    size="90*90"
                    shape="custom-node-circle"
                    model={{
                      value: '',
                      param: 'DATA',
                      code: 'SOURCE',
                      color: '#23C00A',
                      backgroud: '#23C00A',
                      label: 'Danh sách khách hàng',
                      emailConfig: null,
                      smsConfig: null,
                      icon:
                        'data:image/png;base64,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',
                      labelOffsetY: 60
                    }}
                    src="data:image/png;base64,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"
                  />
                  <label>Danh sách khách hàng</label>
                </Col>
                <Col span={8}>
                  <Item
                    type="node"
                    size="90*90"
                    shape="custom-node-circle-multi"
                    model={{
                      value: '',
                      param: 'EVENT',
                      code: 'EVENT',
                      color: '#FA8C16',
                      label: 'Sự kiện',
                      emailConfig: null,
                      smsConfig: null,
                      icon:
                        'data:image/png;base64,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',
                      labelOffsetY: 60
                    }}
                    src="data:image/png;base64,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"
                  />
                  <label>Sự kiện</label>
                </Col>
                <Col span={8}>
                  <Item
                    type="node"
                    size="90*90"
                    shape="custom-node-circle-multi"
                    model={{
                      value: '',
                      param: 'END',
                      code: 'DES',
                      color: '#FA8C16',
                      label: 'END',
                      emailConfig: null,
                      smsConfig: null,
                      icon:
                        'data:image/png;base64,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',
                      labelOffsetY: 60
                    }}
                    src="data:image/png;base64,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"
                  />
                  <label>End</label>
                </Col>
              </Row>
            </ItemPanel>
          </Panel>
        </Collapse>
        <Collapse bordered={false} defaultActiveKey={['2']} expandIconPosition="right">
          <Panel header="Messages" key="2">
            <ItemPanel className="itemPanel">
              <Row className="row">
                <Col span={8}>
                  <Item
                    type="node"
                    size="99*50"
                    shape="custom-node-flow"
                    model={{
                      value: '',
                      code: 'SEND_SMS',
                      param: 'MESSAGE',
                      color: '#FA8C16',
                      label: 'Gửi tin nhắn',
                      emailConfig: null,
                      smsConfig: null,
                      icon:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJxSURBVHgB7ZnNahNRGIbf+bGxNKbBYIUaMF1YsChYFKqbaBa9Aruxq/YKuvIq3NQ7cGU3egO66I8uFBoUWhXMwhHShYVIf6h22iTH7zvJ1BpJM2emM5mheeBAOGTCkzPvnPlmPg1Nch8W0zrMOSHwADyigoaPQoin1u38s79TkMI5rX5uERA5RBbNEgeHBetewZLSI8W336It7EDi+uG4kSuuzJD5DOJBGjXYuia0OcQIzdDv65TqW4gTtEnoiCE96bCIpbQJRSaSg1gYvQmvlA/2kV9fhR+UpR1eVn6QgK10zORgBinTgF88S7/4uYn3u9tKx2T7zmPiQgp+8Sy9cM1bRDgefunFoxWOw3Gu9w9gzBz4b/44bs6EZ2k3rNy4ozTPPCqtdVyMQKWZ11sVvNqudPzeWH8Ss0PDcEPg0p9/71H+NztGopy0oyPt0CkSVL25JjRpKdaGL7/25EXqlvBqD/Hv2LDtxgUnlBZZEtpKt9Yrj7+XgN3GfGziwZFw5lXjEbj0lb6ErAw5CinDPJI7khTNm06UpKcyl+XgcvQ5RSFLf8IvgUrnP61i9tKw3H8dYd6Tp0vrbY/ZqVY7/m6g0mV7Hzu1hkTKMPCOIpJNJOS8H0LZ8lh8+usaNhSrwnYELs2nm4X5dn5aeI7H1MUh3KVdwQ2T6YwcKtvaSXiWfkg7ghe6+uTipu5t5cnV0e4+I6rEw+FMx0MbKb5RLbK6Tu9dXlj0pMOC2xdLiBPUV9RFrb6MGMGNUGrS1ufpo4VYICzu3OrWeGFL6LVC9MUFdWzZs9lmduBGKKivqEWoTUe9+iV6jlyGWZ3nBea5P8gn8d/ysJFOAAAAAElFTkSuQmCC',
                      labelOffsetY: 60
                    }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJxSURBVHgB7ZnNahNRGIbf+bGxNKbBYIUaMF1YsChYFKqbaBa9Aruxq/YKuvIq3NQ7cGU3egO66I8uFBoUWhXMwhHShYVIf6h22iTH7zvJ1BpJM2emM5mheeBAOGTCkzPvnPlmPg1Nch8W0zrMOSHwADyigoaPQoin1u38s79TkMI5rX5uERA5RBbNEgeHBetewZLSI8W336It7EDi+uG4kSuuzJD5DOJBGjXYuia0OcQIzdDv65TqW4gTtEnoiCE96bCIpbQJRSaSg1gYvQmvlA/2kV9fhR+UpR1eVn6QgK10zORgBinTgF88S7/4uYn3u9tKx2T7zmPiQgp+8Sy9cM1bRDgefunFoxWOw3Gu9w9gzBz4b/44bs6EZ2k3rNy4ozTPPCqtdVyMQKWZ11sVvNqudPzeWH8Ss0PDcEPg0p9/71H+NztGopy0oyPt0CkSVL25JjRpKdaGL7/25EXqlvBqD/Hv2LDtxgUnlBZZEtpKt9Yrj7+XgN3GfGziwZFw5lXjEbj0lb6ErAw5CinDPJI7khTNm06UpKcyl+XgcvQ5RSFLf8IvgUrnP61i9tKw3H8dYd6Tp0vrbY/ZqVY7/m6g0mV7Hzu1hkTKMPCOIpJNJOS8H0LZ8lh8+usaNhSrwnYELs2nm4X5dn5aeI7H1MUh3KVdwQ2T6YwcKtvaSXiWfkg7ghe6+uTipu5t5cnV0e4+I6rEw+FMx0MbKb5RLbK6Tu9dXlj0pMOC2xdLiBPUV9RFrb6MGMGNUGrS1ufpo4VYICzu3OrWeGFL6LVC9MUFdWzZs9lmduBGKKivqEWoTUe9+iV6jlyGWZ3nBea5P8gn8d/ysJFOAAAAAElFTkSuQmCC"
                  />
                  <label>Gửi tin nhắn</label>
                </Col>
                <Col span={8}>
                  <Item
                    type="node"
                    size="99*50"
                    shape="custom-node-flow"
                    model={{
                      value: '',
                      code: 'SEND_MAIL',
                      param: 'EMAIL',
                      color: '#FA8C16',
                      label: 'Gửi email',
                      emailConfig: null,
                      smsConfig: null,
                      icon:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANdSURBVHgB7Zk/TBNRHMd/dy1UIn8amkCERgoGkhpIIDrggnbAyQ0XmcCFkQknndxkgU0nnHSRTSYG/uggMQQSiCRthIM0NWBqKGq0hfb5vq89rRp69+7appf0m1y4XN7d+/R3v/f93eOnUE6BjSWvSu5JxugW4agUKbTJGJvVrg09/3OJBHBAydQsEbEAVawUjaVOQ9qNkCagO9ff7lU2sC4Orp4OuALrq2OcfIycIS+lKakqTJkkB0lxqTdVntX95CRxk1DJgapCl0tV6HLJkdBuM4OGvT6avHSZrtZdpFLpw4/vNBs7oMVE3HCs0rn+hhUaMOJroemOHjpJn5l6oBU1utwUrKsnf62H7oW3aO1bouB4w0iPt7RTNPWT7uxsCvBSyV97gV4H+8UbHY1sFRxrmNNIibWvCQGMB672XhcTFA90gAemTQQGKeL3eAzvk1qI0WRSTPSip9c2OIKByCIl8FwZSUHPfzmkiY87IgcxYdDiwrzra+U/vE+cj/Icll0r0paHCTDRSTpNC/zVjjS3St2PVHjS0S3SDesEKSErSz6NiQAeTSVpOtAtct2MMO6Rv0vk72h4W/y1IsvFJTtxFhwwRuCAxRj8YETYKjBkqyJmrXCDFo/jAughB/tXyH/4PNJiPn4kxtu1TttlHAATuzv0igPd52BPu4LU4HL/BsaCQ4GaO4rR1H6YiqGifHvA/gYbmsT5bV7yF7izDNY3CQ/WS/+wt7lo/m4bOuvbfcJvH0d3afbTwX/XprRI0fwdMvXBZAb4wX6Ep8ihuI5iMd7aJoBRTXXBaQBuxzkgy5HGawdwo8v1FzCEIoQFlw+sX8vmub2IW4LOB4bt5QMXku7vdiuqNLReguEaAJCtaDo4KupL/hwr4FLQ2AzoJRh5aaUEQ/ng+BQYbvJJ3S8F7a/x5Ca0t5Cg/IqKhSwjQ/cAJCLcEN2juc8xcRRLAB/afi/OsTBxmAmGITT2bc+uBEXBMNoG2RFSBAvUTNU03CNCI80t3HfbS7qxfccDgsKUb5PnyRR0pan6z5pyqQpdLjkUWqFlcpJ4X1Fl6cwKOUhohPImbWaGn2rkCDENnVtVGwgdMzUdqnxwxju24My1mXWhEUq8r6hUUJuO9+qXeRtuhdxnMwgwrv0C10KOf8EY6j8AAAAASUVORK5CYII=',
                      labelOffsetY: 60
                    }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANdSURBVHgB7Zk/TBNRHMd/dy1UIn8amkCERgoGkhpIIDrggnbAyQ0XmcCFkQknndxkgU0nnHSRTSYG/uggMQQSiCRthIM0NWBqKGq0hfb5vq89rRp69+7appf0m1y4XN7d+/R3v/f93eOnUE6BjSWvSu5JxugW4agUKbTJGJvVrg09/3OJBHBAydQsEbEAVawUjaVOQ9qNkCagO9ff7lU2sC4Orp4OuALrq2OcfIycIS+lKakqTJkkB0lxqTdVntX95CRxk1DJgapCl0tV6HLJkdBuM4OGvT6avHSZrtZdpFLpw4/vNBs7oMVE3HCs0rn+hhUaMOJroemOHjpJn5l6oBU1utwUrKsnf62H7oW3aO1bouB4w0iPt7RTNPWT7uxsCvBSyV97gV4H+8UbHY1sFRxrmNNIibWvCQGMB672XhcTFA90gAemTQQGKeL3eAzvk1qI0WRSTPSip9c2OIKByCIl8FwZSUHPfzmkiY87IgcxYdDiwrzra+U/vE+cj/Icll0r0paHCTDRSTpNC/zVjjS3St2PVHjS0S3SDesEKSErSz6NiQAeTSVpOtAtct2MMO6Rv0vk72h4W/y1IsvFJTtxFhwwRuCAxRj8YETYKjBkqyJmrXCDFo/jAughB/tXyH/4PNJiPn4kxtu1TttlHAATuzv0igPd52BPu4LU4HL/BsaCQ4GaO4rR1H6YiqGifHvA/gYbmsT5bV7yF7izDNY3CQ/WS/+wt7lo/m4bOuvbfcJvH0d3afbTwX/XprRI0fwdMvXBZAb4wX6Ep8ihuI5iMd7aJoBRTXXBaQBuxzkgy5HGawdwo8v1FzCEIoQFlw+sX8vmub2IW4LOB4bt5QMXku7vdiuqNLReguEaAJCtaDo4KupL/hwr4FLQ2AzoJRh5aaUEQ/ng+BQYbvJJ3S8F7a/x5Ca0t5Cg/IqKhSwjQ/cAJCLcEN2juc8xcRRLAB/afi/OsTBxmAmGITT2bc+uBEXBMNoG2RFSBAvUTNU03CNCI80t3HfbS7qxfccDgsKUb5PnyRR0pan6z5pyqQpdLjkUWqFlcpJ4X1Fl6cwKOUhohPImbWaGn2rkCDENnVtVGwgdMzUdqnxwxju24My1mXWhEUq8r6hUUJuO9+qXeRtuhdxnMwgwrv0C10KOf8EY6j8AAAAASUVORK5CYII="
                  />
                  <label>Gửi Email</label>
                </Col>
              </Row>
            </ItemPanel>
          </Panel>
        </Collapse>
        <Collapse bordered={false} defaultActiveKey={['3']} expandIconPosition="right">
          <Panel header="Điều kiện" key="3">
            <ItemPanel className="itemPanel">
              <Row className="row">
                <Col span={8}>
                  <Item
                    type="node"
                    size="100*100"
                    shape="custom-node-rhombus"
                    model={{
                      value: '',
                      code: 'GATEWAY',
                      color: '#1890FF',
                      label: 'Rẻ nhánh điều kiện',
                      icon:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ3SURBVHgB1ZnPbxNXEMe/87zrugKa5dDGlYqAUw9USnpp1R4ac6K3/pLaG2kOnInUXks20GMr0X+giXorUn9eqHqp6QGOJEhIcMKIiwWHhEBEiO0dZl60yzpZJ/buswmfg9fefd79ejzz3sw8QkEeh69PwpgagSaYaBLMgZw+9nwEr4JoieTIjCuIovrB8MESCkDIwUpYPVYuYZqZZ+UWwYBf14c2GKi3IswfDpsNDMhAolWsX8ICGDW4Y3FQ8X2JXgmDoFyqnJW/N8SQIEJ44LvmfF9j9xpgXcHgP+7y0+GgbrMZ4eReVje7XXwUVmu+4eujEKzoc3xD19fCNz7dbVxP0U++r06TWDhPoBWDA2PMH/r8XiMy3WNdfinLF/GCYXGVQ2Gzvv38DtF2hhCXGL2Fs6DVVsTvbvfxHe5RfiEu0QsOVI/OXumzXaLXL1TnRhV0/aJ6PKrMps8l7rHlFriDAlDlNXgTX8FUT4DGjoA31mTxvofO7cvo3L2GIsgCdDx2Ey8+KYLnUIDyqfPw3zuTec1//4wVv/HLF4ge3kMefJKVGDip762li1r5lS8X4L39cfJZBcbiSkc/7DpfRHhsbWvpIlZWd4gFs4h5+tesuMLV5DoFR1CRH2XGT9j35U8uWuG5nkX4Wg6hDUQxdw05KadcQsWkBStb1v0c/HTNflbLGxGfByI6q0ezIvlw3hlDA48k6JT27X8QrWb/7RqQnVuXn39vLJ9onQI1f/d8SeBRAHUHJbp/EyPBeDWPCVPEyIVasH3j177GdgVkzkBUpAKaMDSC1c//6BsbhIr6fC836gepliY9eZ3MWXXtifq8P/VtMn9rMG7+PYsiSDAG3rDyDDP+jkx1PycWVsF2ji5gZXsfXdYxBHR2qJz+zVpa0Zml9e+5woJjhiL61ZTg1v8/YvPKD3CJLi4NOEStnA4614I1xzYgaaY4xARvJe87jatwDvGSiSJaxksER/zQM6Jc5E/DEZo3r194E8OCyNRNS3preJmI2nW7qjw+P76yf+rCXWkcPNc8blNTZvoJDikd/UBy7FMYAnV9saLbjEU4QouCyunfpZpZtAuMS7RRqUcr2haMvPUriqJWjjG58+ZMFuPCNmkhtBgzcEB7+VJSpbRvXIIrYisrXendo/lqKC3XQlW5valWNJUxZ7mGtJjnD801w+T+6YvayfFNRVpi+6phY2eM9ImuDtPhcFV6Z9pbcLu054VFx5aebnb08tTZOaLPsA8wEc9kNdgz+9PaXo0iN4FZgJkD4f0/sy7sWmdpR94YWhjlaqkuAfmns/rSMX3tufi2/TuS4Gy0+thz6buidTUd9kKntTZvXNTJYK+xA+8jlmTrTPoOzlJZUVBvdTDjfB9xOynxU8jhNtZvJUnTnGfoO7ZZJHvjZKZETKDNlG0NoIaWdMS0JNeXXeyNPwOl6Lf8b1PrdQAAAABJRU5ErkJggg==',
                      labelOffsetY: 60
                    }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ3SURBVHgB1ZnPbxNXEMe/87zrugKa5dDGlYqAUw9USnpp1R4ac6K3/pLaG2kOnInUXks20GMr0X+giXorUn9eqHqp6QGOJEhIcMKIiwWHhEBEiO0dZl60yzpZJ/buswmfg9fefd79ejzz3sw8QkEeh69PwpgagSaYaBLMgZw+9nwEr4JoieTIjCuIovrB8MESCkDIwUpYPVYuYZqZZ+UWwYBf14c2GKi3IswfDpsNDMhAolWsX8ICGDW4Y3FQ8X2JXgmDoFyqnJW/N8SQIEJ44LvmfF9j9xpgXcHgP+7y0+GgbrMZ4eReVje7XXwUVmu+4eujEKzoc3xD19fCNz7dbVxP0U++r06TWDhPoBWDA2PMH/r8XiMy3WNdfinLF/GCYXGVQ2Gzvv38DtF2hhCXGL2Fs6DVVsTvbvfxHe5RfiEu0QsOVI/OXumzXaLXL1TnRhV0/aJ6PKrMps8l7rHlFriDAlDlNXgTX8FUT4DGjoA31mTxvofO7cvo3L2GIsgCdDx2Ey8+KYLnUIDyqfPw3zuTec1//4wVv/HLF4ge3kMefJKVGDip762li1r5lS8X4L39cfJZBcbiSkc/7DpfRHhsbWvpIlZWd4gFs4h5+tesuMLV5DoFR1CRH2XGT9j35U8uWuG5nkX4Wg6hDUQxdw05KadcQsWkBStb1v0c/HTNflbLGxGfByI6q0ezIvlw3hlDA48k6JT27X8QrWb/7RqQnVuXn39vLJ9onQI1f/d8SeBRAHUHJbp/EyPBeDWPCVPEyIVasH3j177GdgVkzkBUpAKaMDSC1c//6BsbhIr6fC836gepliY9eZ3MWXXtifq8P/VtMn9rMG7+PYsiSDAG3rDyDDP+jkx1PycWVsF2ji5gZXsfXdYxBHR2qJz+zVpa0Zml9e+5woJjhiL61ZTg1v8/YvPKD3CJLi4NOEStnA4614I1xzYgaaY4xARvJe87jatwDvGSiSJaxksER/zQM6Jc5E/DEZo3r194E8OCyNRNS3preJmI2nW7qjw+P76yf+rCXWkcPNc8blNTZvoJDikd/UBy7FMYAnV9saLbjEU4QouCyunfpZpZtAuMS7RRqUcr2haMvPUriqJWjjG58+ZMFuPCNmkhtBgzcEB7+VJSpbRvXIIrYisrXendo/lqKC3XQlW5valWNJUxZ7mGtJjnD801w+T+6YvayfFNRVpi+6phY2eM9ImuDtPhcFV6Z9pbcLu054VFx5aebnb08tTZOaLPsA8wEc9kNdgz+9PaXo0iN4FZgJkD4f0/sy7sWmdpR94YWhjlaqkuAfmns/rSMX3tufi2/TuS4Gy0+thz6buidTUd9kKntTZvXNTJYK+xA+8jlmTrTPoOzlJZUVBvdTDjfB9xOynxU8jhNtZvJUnTnGfoO7ZZJHvjZKZETKDNlG0NoIaWdMS0JNeXXeyNPwOl6Lf8b1PrdQAAAABJRU5ErkJggg=="
                  />
                  <label>Rẻ nhánh điều kiện</label>
                </Col>

                <Col span={8}>
                  <Item
                    type="node"
                    size="100*100"
                    shape="custom-node-rhombus"
                    model={{
                      value: '',
                      code: 'TIMER',
                      param: 'WAIT',
                      color: '#1890FF',
                      label: 'Chờ',
                      icon:
                        'data:image/png;base64,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',
                      labelOffsetY: 60,
                      condition: 'empty'
                    }}
                    src="data:image/png;base64,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"
                  />
                  <label>Chờ</label>
                </Col>
                <Col span={8}>
                  <Item
                    type="node"
                    size="100*100"
                    shape="custom-node-rhombus"
                    model={{
                      value: '',
                      param: 'WAIT-UNTIL',
                      code: 'TIMER_EVENT',
                      color: '#1890FF',
                      label: 'Chờ sự kiện',
                      icon:
                        'data:image/png;base64,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',
                      labelOffsetY: 60,
                      condition: 'empty'
                    }}
                    src="data:image/png;base64,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"
                  />
                  <label>Chờ sự kiện</label>
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
