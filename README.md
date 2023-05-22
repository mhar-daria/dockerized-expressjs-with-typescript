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

## Endpoints

### Users

[POST] [/api/<version>/users](#post-api-versions-users)

[GET] [/api/<version>/users](#get-api-versions-users)

### Credentials

[POST] [/api/login](#pist-api-login)

### POST /api/login

Login to the platform

**Paramters**

| Name       | Required | Type   | Description                                                  |
| ---------- | -------- | ------ | ------------------------------------------------------------ |
| `email`    | required | string | The email used by the user when he/she sign up               |
| `password` | required | string | The hashed password generated encrypted using AES.           |
| `tkid`     | required | string | Key string that will be used to encrypt and decrypt password |

**Password Generation**

`AES.encrypt(<raw password>, <tkid>)`

**Response**

```
// Valid Credentials

{
    "message": "successfully logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYiLCJmaXJzdE5hbWUiOiJUZXN0IiwibGFzdE5hbWUiOiJBY2NvdW50IiwidXNlcm5hbWUiOiJ0ZXN0MTAxLWZLN0gxREVuV0giLCJwYXNzd29yZCI6ImVlMDE2NjQ0MTE5MjU0YzNjOTA3MzlmMjA5ZWRjZjYxYmJiZGY5OTE2NjdlN2MxNDEzOTlmNjkxN2QyNmNkNGQiLCJzYWx0IjoiemcyWU94dXhlWiIsImVtYWlsIjoidGVzdDEwMUBlbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA1LTIyVDA2OjU1OjQ0LjUyNVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA1LTIyVDA2OjU1OjQ0LjUyNVoiLCJkZWxldGVkQXQiOm51bGx9LCJpYXQiOjE2ODQ3MzUwMTAsImRhdGUiOiIyMDIzLTA1LTIyVDA2OjU2OjUwLjU1N1oiLCJleHAiOjE2ODQ5NTEwMTB9.OoKoBqp3yRIwC3_HN4_oceonJcNED8-5oa-5m6JZotw",
    "expiration": "2023-05-24 5:56:50",
    "tokenType": "bearer"
}

or

// Invalid Credentials

{
    "message": "Email or password is incorrect."
}
```
