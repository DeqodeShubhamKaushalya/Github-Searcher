<p align="center">
  <h1>Github searcher API</h1>
</p>

## Description

To work on one feature of the app - to display a list of repos belonging to a particular GitHub handle, through APIs.

## What we want to achieve

- The user must be able to search for any GitHub repos handle, through the text field on UI. The search must trigger a call to the backend then to GitHub’s API.
- The user must be able to search for any user with the exact name. If not found, show proper error on UI else, insert the information in the back-end database, and use that information for subsequent APIs request.

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

- Authentication before access any api
- Authorization for validate each request
