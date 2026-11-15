# REPORT — Практична 10 (рівень 75)

## Контрольні відповіді

### Що робить Deployment?
Слідкує, щоб завжди було N копій Pod-ів з потрібним образом (як керуюча компанія).

### Що робить Service?
Дає стабільну адресу всередині кластера і розкидає трафік по Pod-ах.

### Навіщо ConfigMap?
Несекретні налаштування (текст привітання, порт) без перезбірки образу.

### Навіщо Secret?
Чутливі дані (токен). У манифесті для навчання — `stringData`; у проді — краще зовнішнє сховище секретів.

### Як ConfigMap впливає на поведінку?
Змінюємо `APP_MESSAGE` → перезапускаємо Pod → `/api/status` показує новий текст.

## Команди (рівень 60 + 75)

```bash
# збірка образу в Docker (для minikube зручно:)
minikube start
eval $(minikube docker-env)   # Git Bash / WSL
# Windows PowerShell:
# minikube docker-env --shell powershell | Invoke-Expression

cd 10-k8s-practice
docker build -t softshop-k8s-demo:1.0.0 .

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

kubectl get pods -n softshop
kubectl describe deployment softshop-api -n softshop
kubectl logs -l app=softshop-api -n softshop --tail=50

# доступ (60+):
kubectl port-forward -n softshop svc/softshop-api 8080:80
# браузер/curl: http://localhost:8080/api/status
```

### Демонстрація впливу ConfigMap (75)
1. `kubectl edit configmap softshop-config -n softshop` — зміни `APP_MESSAGE`
2. `kubectl rollout restart deployment/softshop-api -n softshop`
3. Знову `port-forward` і перевір `/api/status` — повідомлення змінилось
4. `kubectl describe pod ...` і `kubectl logs ...` — для debug

Ingress (90+) **не робимо** — ціль 75 балів.
