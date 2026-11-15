# Практична 4 — OpenAPI + CRUD (модульний моноліт)

## Запуск
```bash
cd 04-api-crud
npm install
npm test
npm start
```

## API документація
- Специфікація: [docs/api/openapi.yaml](docs/api/openapi.yaml)
- Перевірка: вставити YAML у https://editor.swagger.io/
- Скрін: `docs/api/swagger_screenshot.png` (зроби після перевірки)

## Приклади
```bash
curl -X POST http://localhost:8080/products -H "Content-Type: application/json" -d "{\"name\":\"Mouse\",\"price\":499,\"stock\":5}"
curl http://localhost:8080/products
curl http://localhost:8080/health
```
