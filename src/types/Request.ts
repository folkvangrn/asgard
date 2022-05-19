import { Status } from './Status';
export type Request = {
  id?: number;
  description: string;
  result?: string;
  status?: Status;
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
