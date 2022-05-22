import { Status } from './Status';

export type Activity = {
  id?: number;
  sequenceNumber: number;
  description: string;
  result: string;
  status?: Status;
  requestId: number;
  workerId: number;
  activityDictionaryActivityType: string;
};

export type ActivityDictionaryElement = {
  activityType: string;
  activityName: string;
  estimatedDuration: number;
};
