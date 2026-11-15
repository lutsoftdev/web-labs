# Практична 5 — Error-handling / resilience

```bash
cd 05-error-handling
npm install
# стабільний режим для демо:
set CHAOS=0
npm start
```

Відкрий http://localhost:8081

Перевірка ідемпотентності (PowerShell):
```powershell
$IDEM = [guid]::NewGuid().ToString()
curl.exe -i -X POST http://localhost:8081/orders -H "Content-Type: application/json" -H "Idempotency-Key: $IDEM" -H "X-Request-Id: demo-1" -d "{\"title\":\"Buy milk\"}"
curl.exe -i -X POST http://localhost:8081/orders -H "Content-Type: application/json" -H "Idempotency-Key: $IDEM" -H "X-Request-Id: demo-2" -d "{\"title\":\"Buy milk\"}"
```
