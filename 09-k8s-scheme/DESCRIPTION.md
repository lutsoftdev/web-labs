# Опис схеми SoftShop у Kubernetes

Моделюємо сервіс **SoftShop API** (каталог товарів онлайн-магазину).
Він живе в namespace **`softshop`**.

Трафік ззовні йде на домен **`api.softshop.local`**:
DNS → Load Balancer → **Ingress** (за Host/Path) → **Service** `softshop-api` (ClusterIP)
→ 2 **Pod**-и з образом `softshop-api:1.0.0` (керує **Deployment**).

Два Pod-и закладені для базової відмовостійкості.

Збоку: код у **git** (`github.com/lutsoftdev/web-labs`) → **GitHub Actions** збирає Docker image
→ пушить у **container registry** → Pod-и завантажують цей image при старті.
