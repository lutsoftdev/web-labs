export class Product {
  constructor({ id, name, price, stock, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
