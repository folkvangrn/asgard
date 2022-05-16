export type Request = {
  id?: number;
  vehicleId?: string;
  description: string;
  result?: string;
  status?: RequestStatus;
  managerId?: number;
  dateRequest?: string;
  dateFinalized?: string;
};

enum RequestStatus {
  Opened = 'OPEN',
  Canceled = 'CANCELED',
  InProgress = 'IN_PROGRESS',
  Finish = 'FINISH',
}
