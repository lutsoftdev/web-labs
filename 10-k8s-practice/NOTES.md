# Пояснювальна — Практична 10

## Зміст
1. Minikube
2. port-forward
3. ConfigMap vs Secret
4. describe / logs
5. Фрази (75)

## 1. Minikube
«Kubernetes у коробці» на ноутбуці — навчальний кластер з одного Node.

## 2. port-forward
Тунель з твого localhost до Service в кластері (як довгий подовжувач до розетки в іншій кімнаті).

## 3. ConfigMap vs Secret
- ConfigMap — звичайні налаштування (текст на вітрині)
- Secret — паролі/токени (сейф)
Обидва підставляються в Pod як змінні середовища.

## 4. Debug
- `kubectl describe` — «що з Pod-ом?» (події, причини)
- `kubectl logs` — «що написав застосунок?»

## 5. Фрази
- «На 75: Deployment+Service+ConfigMap+Secret+логи. Ingress — це вже 90.»
- «Зміна ConfigMap без перезбірки Docker-образу.»
