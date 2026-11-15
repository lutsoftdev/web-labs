# Практична 7 — CI/CD (рівень 75)

Рівень 75: CI у власному репо + delivery для **одного** сервісу.
Обрано **варіант B**: `docker save` → upload-artifact (без GHCR).

## Локально
```bash
cd 07-cicd
npm install
npm test
npm start
```

## CI
Workflow: `../.github/workflows/ci.yml`

Після push на GitHub:
1. Actions → зелений CI
2. Artifacts → `softshop-api-image`
3. Бейдж у кореневому README

![CI](https://github.com/lutsoftdev/web-labs/actions/workflows/ci.yml/badge.svg)
