import { Status } from './Status';

export type Activity = {
  sequenceNumber: number;
  description: string;
  result: string;
  status?: Status;
  requestId: number;
  userId: number;
  activityDictionaryActivityType: string;
};

export type ActivityDictionaryElement = {
  activityType: string;
  activityName: string;
  estimatedDuration: number;
};
