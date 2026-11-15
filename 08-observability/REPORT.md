# Практична 8 — Observability (рівень 75)

Навчальний стенд: https://github.com/vivalafit/observability-demo

## 60 балів — запуск стенду
```bash
git clone https://github.com/vivalafit/observability-demo
cd observability-demo
docker compose up -d --build
```

Сервіси:
- API http://localhost:3000
- Grafana http://localhost:3001 (admin / admin)
- Prometheus http://localhost:9090

На дашборді **Observability Demo / RED** мають з'явитись Rate, Errors, Duration.
У Explore — трейси Tempo і логи Loki.

### Що бачимо на скрінах (підписи)
1. **RED**: Rate — скільки запитів/с; Errors — частка помилок; Duration — затримка.
2. **Tempo**: один trace = шлях одного запиту через сервіс (як трек посилки).
3. **Loki**: текстові логи сервісу (що саме пішло не так).

> Додай свої скріни в `screenshots/` після запуску стенду.

## 75 балів — свій дашборд My SoftShop RED
Дашборд експортовано: `docs/my-demo-red-dashboard.json`

Панелі:
1. **Requests/s** — `sum(rate(http_server_requests_total{service_name="demo-app"}[5m]))`
2. **Error rate %** — 100 * 5xx / all
3. **Latency p95** — `histogram_quantile(0.95, ...)`
4. **Logs table** — LogQL `{service_name="demo-app"} |= "error"` (або аналог зі стенду)

Як користуватись у проді:
- Rate↑ без Errors↑ — просто пік трафіку
- Error rate↑ — треба дивитись логи/трейси
- p95↑ — вузьке місце (БД, зовнішній API)

### Імпорт у Grafana
Dashboards → Import → завантажити `docs/my-demo-red-dashboard.json`
