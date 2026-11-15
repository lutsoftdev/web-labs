# Сутності SoftShop (Domain)

## Піддомени
| Піддомен | Сутності | Тип |
|----------|----------|-----|
| Каталог | Product, Category | Core |
| Замовлення | Order, OrderItem | Core |
| Користувачі | Customer | Supporting |
| Оплата | Payment (майбутнє) | Generic |

## Product
- id, name, price, stock
- методи: `decreaseStock(qty)`, `isAvailable(qty)`

## Order
- id, customerId, items[], status, createdAt
- методи: `addItem(product, qty)`, `calculateTotal()`

## OrderItem
- productId, name, price, quantity

## Customer
- id, name, email
