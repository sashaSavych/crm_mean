import { OrderPosition, Position } from '../models/entities.interface';

export class OrderService {
  public list: OrderPosition[] = [];
  public price = 0;

  addOrder(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    });
    const existingOP = this.list.find(p => p._id === position._id);
    if (existingOP) {
      existingOP.quantity += position.quantity;
    } else {
      this.list.push(orderPosition);
    }
    this.calculatePrice();
  }

  private calculatePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0)
  }

  removeOrder(orderPosition: OrderPosition) {
    const idx = this.list.findIndex(p => p._id === orderPosition._id);
    this.list.splice(idx, 1);
    this.calculatePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }
}
