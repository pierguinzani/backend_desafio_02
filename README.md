# backend_desafio_02

Antes de rodar com docker, altere o .env para HOSTMONGO=mongo:${MONGO_INTERNAL_PORT}/

```
sudo docker-compose --env-file ./.env up -d 
```
Para rodar os teste com o docker, rode o comando:

```
docker-compose -f docker-compose.test.yml up

```

# Estrutura da API
```
├── bin
│   └── server.js
├── config
│   └── index.js
├── docker-compose.test.yml
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── nodemon.json
├── package.json
├── README.md
├── src
│   ├── database
│   │   └── index.js
│   ├── index.js
│   ├── middlewares
│   │   └── error-handling.js
│   ├── model
│   │   └── index.js
│   ├── routes
│   │   ├── index.js
│   │   └── repository
│   │       ├── create.js
│   │       ├── index.js
│   │       ├── like.js
│   │       ├── list.js
│   │       ├── remove.js
│   │       └── update.js
│   ├── __tests__
│   │   ├── app.spec.js
│   │   └── repository
│   │       ├── create.spec.js
│   │       ├── like.spec.js
│   │       ├── list.spec.js
│   │       ├── remove.spec.js
│   │       └── update.spec.js
│   └── utils
│       ├── swagger.example.json
│       └── swagger.json
└── yarn.lock
```
# Teste com o Swagger

```
https://localhost:3333/api-docs
```
