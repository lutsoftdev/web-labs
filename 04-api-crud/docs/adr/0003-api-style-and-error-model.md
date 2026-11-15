# ADR 0003: API style and error model

## Decision
REST + JSON. Помилки в єдиному форматі ErrorResponse:
`{ error, code, details, requestId }`.

Коди: 201 create, 200 read/update, 204 delete, 400 validation, 404 not found.
Контракт зафіксовано в `docs/api/openapi.yaml`.
