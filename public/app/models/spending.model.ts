import { User } from './user.model';

export class Spending {
  id: number;
  description: string;
  spentDate: number;
  amount: number;
  crediter: User;
  equallyDivided: boolean;
  shareparts: object;
}

export declare type Spendings = Spending[];
