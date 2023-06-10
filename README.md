# GO Train Schedule API

The API provides a simplified train timetable with weekday train times leaving Union Station. With the following endpoints:

- GET /schedule
- GET /schedule/{line}
- GET /schedule/{line}?departure={time}

## Environment

Require Node v16 and npm package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to build the project.

```bash
node -v (v16.20.0)
npm -v (8.19.4)
```

## Build, run and test

```bash
npm install
npm start
npm test
```

## Usage

```bash
curl 'localhost:3000/schedule'
curl 'localhost:3000/schedule/lakeshore'
curl 'localhost:3000/schedule/barrie?departure=2:30PM'
```
