export enum VehicleType {
  CityCar = 'city_car',
  Compact = 'compact',
  FamilyCar = 'family_car',
  Suv = 'suv',
  Convertible = 'convertible',
  Minivan = 'minivan',
  Truck = 'truck',
  Bus = 'bus',
}

export type Vehicle = {
  vin: string;
  type: VehicleType;
};
