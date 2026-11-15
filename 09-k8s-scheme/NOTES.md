# Пояснювальна — Практична 9

## Зміст
1. Cluster / Node / Namespace
2. Pod / Deployment / Service / Ingress
3. git → CI → registry
4. Фрази

## 1. Аналогії
- **Cluster** — місто
- **Node** — будинок (сервер)
- **Namespace** — район (`softshop`)
- **Pod** — квартира з мешканцем-контейнером
- **Deployment** — керуюча компанія: тримає N квартир живими
- **Service** — ресепшн з одним номером: розкидає дзвінки по квартирах
- **Ingress** — охорона на в'їзді в місто за адресою/шляхом

## 2. Шлях запиту
Client → DNS → LB → Ingress → Service → Pods

## 3. Шлях коду
git push → CI/CD збирає image → registry → Pod скачує image

## 4. Фрази
- «Pod ефемерний; Deployment слідкує, щоб їх була потрібна кількість.»
- «Service дає стабільне ім'я всередині кластера.»
