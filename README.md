# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker desktop [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Downloading

```
git clone {https://github.com/baranovdv/nodejs2024Q1-service}
```

## Choose branch

```
git co develop-part2
```

## Installing NPM modules

```
npm install
```

## Running application

Rename .env.example to .env

```
docker-compose up
```

## Test home-library container
Docker Scout included in Docker Desktop after v4.17

```
npm run scout:test
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```