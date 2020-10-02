# backend_desafio_02

Antes de rodar com docker, altere o .env para HOSTMONGO=mongo:${MONGO_INTERNAL_PORT}/

```
sudo docker-compose --env-file ./.env.staging up -d 
```
Para rodar os teste com o docker, rode o comando:

```
docker-compose -f docker-compose.test.yml up
```