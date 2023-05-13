# Dockerized ExpressJs Boilerplate

Containerized ExpressJs with typescript.

## Installation

Install dockerized-expressjs-with-typescript with yarn

> _Make sure you you have docker engine in your host machine. You can also download [here](https://docs.docker.com/engine/install/)._

There's a script that will automatically build and run container.

```bash
  bin/install
  or
  docker compose -f docker-compose.yml build &&
         docker compose -f docker-compose.yml up
```

## Run Locally

Clone the project

```bash
  git clone git@github.com:mhar-daria/dockerized-expressjs-with-typescript.git
```

Go to the project directory

```bash
  cd dockerized-expressjs-with-typescript
```

Build and Run Container

```bash
  bin/install
```

Restart Container

```bash
  bin/start
```

Go to Container

```bash
    bin/sh
    or
    docker exec -it express-api sh
```

## Environment Variables

Environment variables is stored in `.env`

To change DB credentials update

`POSTGRES_PASSWORD`
`POSTGRES_USER`
`POSTGRES_DB`
`POSTGRES_DRIVER`
`POSTGRES_HOST`
`POSTGRES_PORT`

## Credentials

Database

`host`: db
`user`: express
`password`: expresspostgres
`port`: 5432
`database`: express_db
