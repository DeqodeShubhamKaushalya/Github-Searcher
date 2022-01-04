<p align="center">
  <h1>Github searcher API</h1>
</p>

## Description

- We developed a system in which user can access all the information of public repositories and user profile of a specific github handler.

## What we want to achieve

- We want to develop a system in which user can easily access all the information of public repositories and also user can access complete profile of a specific git handler.

## Prerequisite

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setting up env files

You will be required to create an environment file and add the content in it (Similar to .env.example).

```
.env
```

## Running app with Docker

```bash
$ docker-compose up -d --build
```

## Installation

```bash
$ npm i
```

## Running the app

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
