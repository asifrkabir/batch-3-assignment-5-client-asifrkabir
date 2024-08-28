import { TBike } from "./bike.type";

export type TRental = {
  _id: string;
  userId: string;
  bikeId: TBike;
  startTime: string;
  returnTime: string;
  totalCost: number;
  isReturned: boolean;
  paymentAmount: number;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
};
