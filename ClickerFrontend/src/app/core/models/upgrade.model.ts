export class Upgrade {
  id: number;
  img: string;
  name: string;
  desc: string;
  amount: number;
  cost: number;

  constructor(id: number, img: string, name: string, desc: string, amount: number, cost: number) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.desc = desc;
    this.amount = amount;
    this.cost = cost;
  }
}
