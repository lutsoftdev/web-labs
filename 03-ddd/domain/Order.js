import { OrderItem } from "./OrderItem.js";

export class Order {
  constructor({ id, customerId }) {
    this.id = id;
    this.customerId = customerId;
    this.items = [];
    this.status = "NEW";
    this.createdAt = new Date().toISOString();
  }

  addItem(product, quantity) {
    if (!product.isAvailable(quantity)) {
      throw new Error("Not enough stock");
    }
    this.items.push(
      new OrderItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      })
    );
  }

  calculateTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
