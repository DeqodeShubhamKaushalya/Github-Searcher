<p align="center">
  <h1>Github searcher API</h1>
</p>

## Description

Developed a system in which user can access all the information of public repositories and user profile of a specific github handler.

## Prerequisite

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setting up env files

You will be required to create an environment file and add the content in it (Similar to .env.example).

```
.env
```

## Run app with Docker

```bash
$ docker-compose up -d --build
```

## Run app manually

- Installation

```bash
$ npm i
```

- Run the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## APIs

- [Postman Collection](https://www.postman.com/collections/e8835d5b8ee1349e1dcc)

## Further Improvements

- Authentication layer
- Ability to see private repositories
