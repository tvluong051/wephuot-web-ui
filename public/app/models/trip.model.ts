import { Users } from './user.model';

export enum TripStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED'
}

export class Trip {
  tripId: string;
  name: string;
  description: string;
  status: TripStatus;
  createdDate: number;
  lastModified: number;
  thumbnailPhoto: string;
  participants: Users;
}

export declare type Trips = Trip[];


