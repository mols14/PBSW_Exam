import { UpgradeSaved } from './upgrade.model';

export class User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role: string = "User";
  totalScore: number;
  upgrades: UpgradeSaved[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    username: string,
    email: string,
    totalScore: number,
    upgrades: UpgradeSaved[],
    password?: string,
    id?: number,
    role?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role || this.role;
    this.totalScore = totalScore;
    this.upgrades = upgrades;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
