# Практична 6 — Docker (рівень 75)

Мінімум 60: `docker run hello-world`  
Рівень 75: `.dockerignore` + `Dockerfile` + запуск контейнера (**без** docker-compose).

## Перевірка Docker
```bash
docker version
docker run hello-world
```

## Збірка і запуск SoftShop API
```bash
cd 06-docker
docker build -t softshop-api:1.0.0 .
docker run --name softshop --rm -d -p 8080:8080 softshop-api:1.0.0
curl http://localhost:8080/health
curl http://localhost:8080/items
docker logs softshop
docker stop softshop
```

Збережи скрін/лог `hello-world` і працюючого `/health` у `evidence/` (або встав у звіт).
