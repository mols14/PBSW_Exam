export class Upgrade {
  id: number;
  img: string;
  name: string;
  desc: string;
  amount: number;
  cost: number;  // New property for the cost of the upgrade

  constructor(id: number, img: string, name: string, desc: string, amount: number, cost: number) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.desc = desc;
    this.amount = amount;
    this.cost = cost;
  }
}
