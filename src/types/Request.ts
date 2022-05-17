export type Request = {
  id?: number;
  vehicleVin?: string;
  description: string;
  result?: string;
  status?: RequestStatus;
  managerId?: number;
  dateRequest?: string;
  dateFinalized?: string;
};

export enum RequestStatus {
  Open = 'OPEN',
  Canceled = 'CANCELED',
  InProgress = 'IN_PROGRESS',
  Finish = 'FINISH',
}
