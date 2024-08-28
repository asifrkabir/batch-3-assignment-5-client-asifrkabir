import { TBike } from "./bike.type";
import { TUser } from "./user.type";

export type TRental = {
  _id: string;
  userId: TUser;
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
