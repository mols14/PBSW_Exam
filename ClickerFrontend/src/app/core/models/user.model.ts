import { Upgrade } from './upgrade.model';

export class User {
  totalScore: number;
  upgrades: Upgrade[];

  constructor(totalScore: number, upgrades: Upgrade[]) {
    this.totalScore = totalScore;
    this.upgrades = upgrades;
  }
}
