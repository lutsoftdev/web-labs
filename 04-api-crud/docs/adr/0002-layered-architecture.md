# ADR 0002: Layered architecture

## Структура
- `api/` — роути/контролери: HTTP → DTO, статус-коди
- `service/` — use-cases, валідація, оркестрація
- `domain/` — сутності без знання HTTP/БД

## Напрямок залежностей
api → service → domain (зверху вниз).

## Заборонено
- api не звертається напряму до сховища
- domain не імпортує express
