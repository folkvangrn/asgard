export type Request = {
  id?: number;
  description: string;
  result?: string;
  status?: RequestStatus;
  dateRequest?: string;
  dateFinalized?: string;
  managerId?: number;
  managerUsername?: string;
  vehicleVin?: string;
  vehicleClass?: string;
  vehicleClientId?: number;
  vehicleClientFirstName?: string;
  vehicleClientLastName?: string;
  vehicleClientEmail?: string;
  vehicleClientCompanyName?: string;
  vehicleClientPhoneNumber?: string;
};

export enum RequestStatus {
  Open = 'OPEN',
  Canceled = 'CANCELED',
  InProgress = 'IN_PROGRESS',
  Finish = 'FINISH',
}
