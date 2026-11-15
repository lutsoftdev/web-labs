export class Product {
  constructor({ id, name, price, stock }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  isAvailable(qty) {
    return this.stock >= qty;
  }

  decreaseStock(qty) {
    if (!this.isAvailable(qty)) {
      throw new Error("Not enough stock");
    }
    this.stock -= qty;
  }
}
