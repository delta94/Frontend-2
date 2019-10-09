import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Timeline, Card, Icon } from 'antd';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { openModal, closeModal } from '../../../../../actions/modal';
import './history-active.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { resetMessage } from 'app/actions/user-management';
import { IRootState } from 'app/reducers';

export interface IHistoryActiveProps extends StateProps, DispatchProps {}

export interface IHistoryActiveState {}

export class HistoryActive extends React.Component<IHistoryActiveProps, IHistoryActiveState> {
  state: IHistoryActiveState = {};

  render() {
    return (
      <Card title="LỊCH SỬ TƯƠNG TÁC">
        <VerticalTimeline className="time-line" layout="2-column">
          <PerfectScrollbar>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-success"> </i>}
              date="30 minutes"
            >
              <h4 className="timeline-title">All Hands Meeting</h4>
              <p>
                Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a>
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-warning"> </i>}
              date="12:25 PM"
            >
              <p>
                Another meeting today, at <b className="text-danger">12:00 PM</b>
              </p>
              <p>
                Yet another one, at <span className="text-success">15:00 PM</span>
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-danger"> </i>}
              date="15:00 PM"
            >
              <h4 className="timeline-title">Build the production release</h4>
              <p>
                Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore magna elit enim at minim veniam quis
                nostrud
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-primary"> </i>}
              date="15:00 PM"
            >
              <h4 className="timeline-title text-success">Something not important</h4>
              <p>Lorem ipsum dolor sit amit,consectetur elit enim at minim veniam quis nostrud</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-success"> </i>}
              date="10:30 PM"
            >
              <h4 className="timeline-title">All Hands Meeting</h4>
              <p>
                Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a>
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-warning"> </i>}
              date="12:25 PM"
            >
              <p>
                Another meeting today, at <b className="text-danger">12:00 PM</b>
              </p>
              <p>
                Yet another one, at <span className="text-success">15:00 PM</span>
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-danger"> </i>}
              date="15:00 PM"
            >
              <h4 className="timeline-title">Build the production release</h4>
              <p>
                Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore magna elit enim at minim veniam quis
                nostrud
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-primary"> </i>}
              date="15:00 PM"
            >
              <h4 className="timeline-title text-success">Something not important</h4>
              <p>Lorem ipsum dolor sit amit,consectetur elit enim at minim veniam quis nostrud</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-success"> </i>}
              date="10:30 PM"
            >
              <h4 className="timeline-title">All Hands Meeting</h4>
              <p>
                Lorem ipsum dolor sic amet, today at <a href="javascript:void(0);">12:00 PM</a>
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-warning"> </i>}
              date="12:25 PM"
            >
              <p>
                Another meeting today, at <b className="text-danger">12:00 PM</b>
              </p>
              <p>
                Yet another one, at <span className="text-success">15:00 PM</span>
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-danger"> </i>}
              date="15:00 PM"
            >
              <h4 className="timeline-title">Build the production release</h4>
              <p>
                Lorem ipsum dolor sit amit,consectetur eiusmdd tempor incididunt ut labore et dolore magna elit enim at minim veniam quis
                nostrud
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-item"
              icon={<i className="badge badge-dot badge-dot-xl badge-primary"> </i>}
              date="15:00 PM"
            >
              <h4 className="timeline-title text-success">Something not important</h4>
              <p>Lorem ipsum dolor sit amit,consectetur elit enim at minim veniam quis nostrud</p>
            </VerticalTimelineElement>
          </PerfectScrollbar>
        </VerticalTimeline>
      </Card>
    );
  }
}

const mapStateToProps = ({ handleModal }: IRootState) => ({
  modalState: handleModal.data
});

const mapDispatchToProps = { resetMessage, openModal, closeModal };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryActive);
