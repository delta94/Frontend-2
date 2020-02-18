import { Moment } from 'moment';

export const EVENT_TYPE = {
  INTERVIEW_EVENT: 'INTERVIEW_EVENT',
  PERSONAL_EVENT: 'PERSONAL_EVENT',
  FREE_EVENT: 'FREE_EVENT'
};

export interface IFreeTime {
  startTime?: string;
  endTime?: string;
}

interface IEventToServerInfo {
  date: string;
  startTime: string;
  endTime: string;
}

export interface IEventToServer {
  interviewerFreeTime: IEventToServerInfo;
}

export interface IEvent {
  interviewerId?: string | number;
  interviewSessionHistoryId?: string | number;
  programCode?: string;
  programName?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  start?: any;
  end?: any;
  id?: number | string;
  title?: string;
  code?: string;
  allDay?: boolean;
  eventType?: string;
  freeTime?: IFreeTime[];
  rendering?: string;
  editable?: boolean;
  color?: string;
  textColor?: string;
  classNames?: any;
  startTimeFrame?: any;
  endTimeFrame?: any;
  displayEventTime?: boolean;
}

export const defaultEventValue: Readonly<IEvent> = {};
